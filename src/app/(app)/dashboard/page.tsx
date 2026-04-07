import { createClient } from '@/lib/supabase/server'
import type { Phase, Task, Update } from '@/types/greenhouse'
import { STATUS_COLORS, STATUS_LABELS } from '@/types/greenhouse'
import Countdown from '@/components/greenhouse/Countdown'
import AddUpdate from '@/components/greenhouse/AddUpdate'

export const dynamic = 'force-dynamic'

function phaseProgressPercent(phases: Phase[]): number {
  if (!phases.length) return 0
  const weights: Record<string, number> = {
    not_started: 0,
    in_progress: 0.5,
    complete: 1,
    at_risk: 0.25,
  }
  const total = phases.reduce((sum, p) => sum + (weights[p.status] ?? 0), 0)
  return Math.round((total / phases.length) * 100)
}

function daysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const today  = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export default async function DashboardPage() {
  const supabase = createClient()

  const [{ data: phases }, { data: tasks }, { data: updates }] = await Promise.all([
    supabase.from('phases').select('*').order('order_num'),
    supabase.from('tasks').select('*').order('order_num'),
    supabase.from('updates').select('*').order('created_at', { ascending: false }).limit(10),
  ])

  const phaseList  = (phases  ?? []) as Phase[]
  const taskList   = (tasks   ?? []) as Task[]
  const updateList = (updates ?? []) as Update[]

  const criticalTasks    = taskList.filter((t) => t.is_critical_path)
  const overallProgress  = phaseProgressPercent(phaseList)
  const days             = daysUntil('2027-01-01')
  const completedPhases  = phaseList.filter((p) => p.status === 'complete').length
  const inProgressPhases = phaseList.filter((p) => p.status === 'in_progress').length
  const atRiskItems      = taskList.filter((t) => t.status === 'at_risk').length
  const completedTasks   = taskList.filter((t) => t.status === 'complete').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
          Kelston Way Greenhouse
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          5-Acre Commercial Build · Oglesby, Texas · Coryell/McLennan County
        </p>
      </div>

      {/* Top stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="col-span-2 lg:col-span-1 rounded-2xl p-4 flex flex-col gap-1"
             style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>
            Days Until Jan 1, 2027
          </p>
          <Countdown targetDate="2027-01-01" initialDays={days} />
          <p className="text-xs" style={{ color: 'var(--muted)' }}>Operational target date</p>
        </div>

        <div className="rounded-2xl p-4 flex flex-col gap-1"
             style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>
            Overall Progress
          </p>
          <p className="text-3xl font-bold" style={{ color: 'var(--accent)' }}>{overallProgress}%</p>
          <div className="w-full h-1.5 rounded-full mt-1" style={{ background: 'var(--border)' }}>
            <div className="h-1.5 rounded-full" style={{ width: `${overallProgress}%`, background: 'var(--accent)' }} />
          </div>
        </div>

        <div className="rounded-2xl p-4 flex flex-col gap-1"
             style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>
            Phases
          </p>
          <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            {completedPhases}
            <span className="text-base font-normal" style={{ color: 'var(--muted)' }}>/7</span>
          </p>
          <p className="text-xs" style={{ color: 'var(--muted)' }}>{inProgressPhases} in progress</p>
        </div>

        <div className="rounded-2xl p-4 flex flex-col gap-1"
             style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-xs font-medium uppercase tracking-wide" style={{ color: 'var(--muted)' }}>
            Tasks Done
          </p>
          <p className="text-3xl font-bold" style={{ color: 'var(--foreground)' }}>
            {completedTasks}
            <span className="text-base font-normal" style={{ color: 'var(--muted)' }}>/{taskList.length}</span>
          </p>
          <p className="text-xs" style={{ color: atRiskItems > 0 ? 'var(--warning)' : 'var(--muted)' }}>
            {atRiskItems > 0 ? `${atRiskItems} at risk` : 'on track'}
          </p>
        </div>
      </div>

      {/* Critical Path Items */}
      <div className="rounded-2xl overflow-hidden"
           style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="px-4 py-3 flex items-center gap-2 border-b" style={{ borderColor: 'var(--border)' }}>
          <span className="w-2 h-2 rounded-full animate-pulse flex-shrink-0"
                style={{ background: 'var(--warning)' }} />
          <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Critical Path Items
          </h2>
          <span className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: '#451a03', color: 'var(--warning)' }}>
            5 items — start immediately
          </span>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {criticalTasks.map((task) => {
            const colors = STATUS_COLORS[task.status]
            return (
              <div key={task.id} className="px-4 py-3 flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  {task.status === 'complete' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--success)">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : task.status === 'at_risk' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--warning)">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  ) : task.status === 'in_progress' ? (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--info)">
                      <path strokeLinecap="round" strokeLinejoin="round"
                        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="var(--muted)">
                      <circle cx="12" cy="12" r="9" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
                      {task.title}
                    </p>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
                      {STATUS_LABELS[task.status]}
                    </span>
                  </div>
                  {task.notes && (
                    <p className="text-xs mt-0.5 line-clamp-2" style={{ color: 'var(--muted)' }}>
                      {task.notes}
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-1">
                    {task.assignee && (
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>→ {task.assignee}</span>
                    )}
                    {task.due_date && (
                      <span className="text-xs" style={{ color: 'var(--muted)' }}>
                        Due {new Date(task.due_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
          {criticalTasks.length === 0 && (
            <div className="px-4 py-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
              No critical path items found.
            </div>
          )}
        </div>
      </div>

      {/* Phase Overview */}
      <div className="rounded-2xl overflow-hidden"
           style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Phase Overview
          </h2>
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {phaseList.map((phase) => {
            const colors = STATUS_COLORS[phase.status]
            const phaseTasks = taskList.filter((t) => t.phase_id === phase.id)
            const done = phaseTasks.filter((t) => t.status === 'complete').length
            const pct  = phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0
            const barColor =
              phase.status === 'complete'    ? 'var(--success)'  :
              phase.status === 'at_risk'     ? 'var(--warning)'  :
              phase.status === 'in_progress' ? 'var(--info)'     : 'var(--muted)'
            const s = new Date(phase.start_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            const e = new Date(phase.end_date   + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

            return (
              <div key={phase.id} className="px-4 py-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${colors.bg} ${colors.text}`}>
                      {STATUS_LABELS[phase.status]}
                    </span>
                    <p className="text-sm font-medium truncate" style={{ color: 'var(--foreground)' }}>
                      {phase.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs flex-shrink-0" style={{ color: 'var(--muted)' }}>
                    <span>{s} – {e}</span>
                    <span>{done}/{phaseTasks.length}</span>
                  </div>
                </div>
                {phaseTasks.length > 0 && (
                  <div className="mt-2 w-full h-1 rounded-full" style={{ background: 'var(--border)' }}>
                    <div className="h-1 rounded-full" style={{ width: `${pct}%`, background: barColor }} />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Updates */}
      <div className="rounded-2xl overflow-hidden"
           style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <h2 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>Recent Updates</h2>
        </div>
        <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <AddUpdate />
        </div>
        <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
          {updateList.map((u) => (
            <div key={u.id} className="px-4 py-3">
              <p className="text-sm" style={{ color: 'var(--foreground)' }}>{u.message}</p>
              <div className="flex items-center gap-2 mt-1">
                {u.author && (
                  <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>{u.author}</span>
                )}
                <span className="text-xs" style={{ color: 'var(--muted)' }}>
                  {new Date(u.created_at).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          ))}
          {updateList.length === 0 && (
            <div className="px-4 py-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
              No updates yet. Add the first one above.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
