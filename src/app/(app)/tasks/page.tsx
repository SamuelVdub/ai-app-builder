import { createClient } from '@/lib/supabase/server'
import type { Phase, Task } from '@/types/greenhouse'
import { STATUS_LABELS, STATUS_COLORS, STATUS_BAR_COLORS } from '@/types/greenhouse'
import TaskRow from '@/components/greenhouse/TaskRow'
import PhaseStatusToggle from '@/components/greenhouse/PhaseStatusToggle'

export const dynamic = 'force-dynamic'

export default async function TasksPage() {
  const supabase = createClient()

  const [{ data: phases }, { data: tasks }] = await Promise.all([
    supabase.from('phases').select('*').order('order_num'),
    supabase.from('tasks').select('*').order('order_num'),
  ])

  const phaseList = (phases ?? []) as Phase[]
  const taskList  = (tasks  ?? []) as Task[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Task Tracker</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Tap any task to edit status, assignee, due date, or notes.
        </p>
      </div>

      <div className="space-y-4">
        {phaseList.map((phase) => {
          const phaseTasks = taskList.filter((t) => t.phase_id === phase.id)
          const done = phaseTasks.filter((t) => t.status === 'complete').length
          const pct  = phaseTasks.length ? Math.round((done / phaseTasks.length) * 100) : 0
          const colors   = STATUS_COLORS[phase.status]
          const barColor = STATUS_BAR_COLORS[phase.status]
          const s = new Date(phase.start_date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          const e = new Date(phase.end_date   + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

          return (
            <div key={phase.id} className="rounded-2xl overflow-hidden"
                 style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

              {/* Phase header */}
              <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${colors.bg} ${colors.text}`}>
                      {STATUS_LABELS[phase.status]}
                    </span>
                    <h2 className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>
                      {phase.name}
                    </h2>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{s} – {e}</span>
                    <span className="text-xs" style={{ color: 'var(--muted)' }}>{done}/{phaseTasks.length}</span>
                    <PhaseStatusToggle phase={phase} />
                  </div>
                </div>

                {phaseTasks.length > 0 && (
                  <div className="mt-2 w-full h-1 rounded-full" style={{ background: 'var(--border)' }}>
                    <div className={`h-1 rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
                  </div>
                )}
              </div>

              {/* Tasks */}
              <div>
                {phaseTasks.map((task) => (
                  <TaskRow key={task.id} task={task} />
                ))}
                {phaseTasks.length === 0 && (
                  <div className="px-4 py-6 text-center text-sm" style={{ color: 'var(--muted)' }}>
                    No tasks in this phase yet.
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
