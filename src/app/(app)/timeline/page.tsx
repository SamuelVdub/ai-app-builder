import { createClient } from '@/lib/supabase/server'
import type { Phase, Task } from '@/types/greenhouse'
import { STATUS_LABELS, STATUS_COLORS, STATUS_BAR_COLORS } from '@/types/greenhouse'

export const dynamic = 'force-dynamic'

// Project timeline: April 7, 2026 → January 1, 2027
const PROJECT_START = new Date('2026-04-07T12:00:00')
const PROJECT_END   = new Date('2027-01-01T12:00:00')
const TOTAL_DAYS    = (PROJECT_END.getTime() - PROJECT_START.getTime()) / (1000 * 60 * 60 * 24)

function toPercent(dateStr: string): number {
  const d = new Date(dateStr + 'T12:00:00')
  const elapsed = (d.getTime() - PROJECT_START.getTime()) / (1000 * 60 * 60 * 24)
  return Math.max(0, Math.min(100, (elapsed / TOTAL_DAYS) * 100))
}

function widthPercent(startStr: string, endStr: string): number {
  const s = toPercent(startStr)
  const e = toPercent(endStr)
  return Math.max(1, e - s)
}

// Month markers from Apr 2026 to Jan 2027
const MONTH_MARKERS = [
  { label: 'Apr',  date: '2026-04-07' },
  { label: 'May',  date: '2026-05-01' },
  { label: 'Jun',  date: '2026-06-01' },
  { label: 'Jul',  date: '2026-07-01' },
  { label: 'Aug',  date: '2026-08-01' },
  { label: 'Sep',  date: '2026-09-01' },
  { label: 'Oct',  date: '2026-10-01' },
  { label: 'Nov',  date: '2026-11-01' },
  { label: 'Dec',  date: '2026-12-01' },
  { label: 'Jan',  date: '2027-01-01' },
]

// Today's position
function todayPercent(): number {
  const today = new Date()
  const elapsed = (today.getTime() - PROJECT_START.getTime()) / (1000 * 60 * 60 * 24)
  return Math.max(0, Math.min(100, (elapsed / TOTAL_DAYS) * 100))
}

export default async function TimelinePage() {
  const supabase = createClient()
  const [{ data: phases }, { data: tasks }] = await Promise.all([
    supabase.from('phases').select('*').order('order_num'),
    supabase.from('tasks').select('*').order('order_num'),
  ])

  const phaseList = (phases ?? []) as Phase[]
  const taskList  = (tasks  ?? []) as Task[]
  const todayPct  = todayPercent()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Project Timeline</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          April 7, 2026 → January 1, 2027 · 7 phases
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap">
        {Object.entries(STATUS_LABELS).map(([status, label]) => {
          const barColor = STATUS_BAR_COLORS[status as keyof typeof STATUS_BAR_COLORS]
          return (
            <div key={status} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded-sm ${barColor}`} />
              <span className="text-xs" style={{ color: 'var(--muted)' }}>{label}</span>
            </div>
          )
        })}
        <div className="flex items-center gap-1.5">
          <div className="w-px h-4 bg-amber-400" />
          <span className="text-xs" style={{ color: 'var(--muted)' }}>Today</span>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="rounded-2xl overflow-hidden"
           style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

        {/* Month header */}
        <div className="px-4 pt-4 pb-2">
          <div className="relative h-6" style={{ marginLeft: '180px' }}>
            {MONTH_MARKERS.map((m) => {
              const pct = toPercent(m.date)
              return (
                <div key={m.label}
                     className="absolute text-xs"
                     style={{
                       left: `${pct}%`,
                       color: 'var(--muted)',
                       transform: 'translateX(-50%)',
                       whiteSpace: 'nowrap',
                     }}>
                  {m.label}
                </div>
              )
            })}
          </div>
        </div>

        {/* Phases */}
        <div className="px-4 pb-4 space-y-2">
          {phaseList.map((phase) => {
            const left  = toPercent(phase.start_date)
            const width = widthPercent(phase.start_date, phase.end_date)
            const barColor = STATUS_BAR_COLORS[phase.status]
            const colors   = STATUS_COLORS[phase.status]
            const phaseTasks = taskList.filter((t) => t.phase_id === phase.id)
            const done = phaseTasks.filter((t) => t.status === 'complete').length

            return (
              <div key={phase.id}>
                {/* Phase row */}
                <div className="flex items-center gap-3">
                  {/* Phase label */}
                  <div className="flex-shrink-0 text-right" style={{ width: '172px' }}>
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--foreground)' }}>
                      {phase.name.replace(/Phase \d+: /, '')}
                    </p>
                    <p className="text-xs" style={{ color: 'var(--muted)' }}>
                      {done}/{phaseTasks.length} tasks
                    </p>
                  </div>

                  {/* Gantt bar container */}
                  <div className="flex-1 relative h-8 rounded" style={{ background: 'var(--border)' }}>
                    {/* Today marker */}
                    {todayPct >= 0 && todayPct <= 100 && (
                      <div className="absolute top-0 bottom-0 w-px z-10"
                           style={{ left: `${todayPct}%`, background: '#fbbf24', opacity: 0.8 }} />
                    )}

                    {/* Phase bar */}
                    <div
                      className={`absolute top-1 bottom-1 rounded ${barColor} flex items-center px-2 overflow-hidden`}
                      style={{ left: `${left}%`, width: `${width}%`, minWidth: '4px' }}
                    >
                      <span className="text-xs font-medium truncate" style={{ color: '#000', opacity: 0.85 }}>
                        {width > 8 ? STATUS_LABELS[phase.status] : ''}
                      </span>
                    </div>
                  </div>

                  {/* Status badge */}
                  <div className="flex-shrink-0 w-24">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                      {STATUS_LABELS[phase.status]}
                    </span>
                  </div>
                </div>

                {/* Critical task sub-rows */}
                {phaseTasks.filter((t) => t.is_critical_path).map((task) => {
                  if (!task.due_date) return null
                  const taskLeft  = toPercent(phase.start_date)
                  const taskRight = toPercent(task.due_date)
                  const taskW     = Math.max(0.5, taskRight - taskLeft)
                  const taskBar   = STATUS_BAR_COLORS[task.status]

                  return (
                    <div key={task.id} className="flex items-center gap-3 mt-1">
                      <div className="flex-shrink-0 text-right" style={{ width: '172px' }}>
                        <p className="text-xs truncate" style={{ color: 'var(--muted)' }}>
                          ⚑ {task.title.length > 28 ? task.title.slice(0, 28) + '…' : task.title}
                        </p>
                      </div>
                      <div className="flex-1 relative h-4 rounded" style={{ background: 'transparent' }}>
                        {todayPct >= 0 && todayPct <= 100 && (
                          <div className="absolute top-0 bottom-0 w-px z-10"
                               style={{ left: `${todayPct}%`, background: '#fbbf24', opacity: 0.5 }} />
                        )}
                        <div
                          className={`absolute top-0.5 bottom-0.5 rounded-sm opacity-70 ${taskBar}`}
                          style={{ left: `${taskLeft}%`, width: `${taskW}%`, minWidth: '4px' }}
                        />
                      </div>
                      <div className="flex-shrink-0 w-24" />
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>

        {/* Divider + date labels */}
        <div className="px-4 pb-4">
          <div className="relative" style={{ marginLeft: '180px' }}>
            <div className="w-full h-px" style={{ background: 'var(--border)' }} />
            <div className="relative h-5 mt-1">
              {MONTH_MARKERS.map((m) => {
                const pct = toPercent(m.date)
                return (
                  <div key={m.label + '-bot'}
                       className="absolute text-xs"
                       style={{
                         left: `${pct}%`,
                         color: 'var(--border-hover)',
                         transform: 'translateX(-50%)',
                         whiteSpace: 'nowrap',
                       }}>
                    |
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Phase detail cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {phaseList.map((phase) => {
          const colors     = STATUS_COLORS[phase.status]
          const phaseTasks = taskList.filter((t) => t.phase_id === phase.id)
          const done       = phaseTasks.filter((t) => t.status === 'complete').length
          const pct        = phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0
          const barColor   = STATUS_BAR_COLORS[phase.status]
          const s = new Date(phase.start_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          const e = new Date(phase.end_date   + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

          return (
            <div key={phase.id} className="rounded-2xl p-4 space-y-3"
                 style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                    {phase.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>{s} – {e}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${colors.bg} ${colors.text}`}>
                  {STATUS_LABELS[phase.status]}
                </span>
              </div>

              {phase.description && (
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{phase.description}</p>
              )}

              <div>
                <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--muted)' }}>
                  <span>Progress</span>
                  <span>{done}/{phaseTasks.length} tasks ({pct}%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: 'var(--border)' }}>
                  <div className={`h-1.5 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                </div>
              </div>

              {phaseTasks.filter((t) => t.is_critical_path).length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {phaseTasks.filter((t) => t.is_critical_path).map((t) => (
                    <span key={t.id} className="text-xs px-2 py-0.5 rounded-full"
                          style={{ background: '#451a03', color: 'var(--warning)' }}>
                      ⚑ {t.title.length > 30 ? t.title.slice(0, 30) + '…' : t.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
