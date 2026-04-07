'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Task, TaskStatus } from '@/types/greenhouse'
import { STATUS_LABELS, STATUS_COLORS, ASSIGNEES } from '@/types/greenhouse'

interface TaskRowProps {
  task: Task
}

export default function TaskRow({ task }: TaskRowProps) {
  const router = useRouter()
  const [editing, setEditing] = useState(false)
  const [saving, setSaving]   = useState(false)

  const [status,   setStatus]   = useState<TaskStatus>(task.status)
  const [assignee, setAssignee] = useState(task.assignee ?? '')
  const [dueDate,  setDueDate]  = useState(task.due_date ?? '')
  const [notes,    setNotes]    = useState(task.notes ?? '')

  const colors = STATUS_COLORS[status]

  async function save() {
    setSaving(true)
    const supabase = createClient()
    await supabase
      .from('tasks')
      .update({
        status,
        assignee: assignee || null,
        due_date: dueDate || null,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', task.id)
    setSaving(false)
    setEditing(false)
    router.refresh()
  }

  function cancel() {
    setStatus(task.status)
    setAssignee(task.assignee ?? '')
    setDueDate(task.due_date ?? '')
    setNotes(task.notes ?? '')
    setEditing(false)
  }

  const inputStyle = {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    color: 'var(--foreground)',
  }

  if (editing) {
    return (
      <div className="px-4 py-3 space-y-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          {task.is_critical_path && (
            <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{ background: '#451a03', color: 'var(--warning)' }}>⚑ Critical</span>
          )}
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{task.title}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
              className="w-full px-2 py-1.5 rounded-lg text-xs outline-none"
              style={inputStyle}
            >
              {Object.entries(STATUS_LABELS).map(([v, l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Assignee</label>
            <select
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg text-xs outline-none"
              style={inputStyle}
            >
              <option value="">Unassigned</option>
              {ASSIGNEES.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-2 py-1.5 rounded-lg text-xs outline-none"
              style={inputStyle}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Notes</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full px-2 py-1.5 rounded-lg text-xs outline-none resize-none"
            style={inputStyle}
            placeholder="Add notes…"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={save}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#000' }}
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button
            onClick={cancel}
            className="px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: 'var(--surface-hover)', color: 'var(--foreground)' }}
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      className="px-4 py-3 flex items-start gap-3 cursor-pointer hover:bg-[var(--surface-hover)] transition-colors"
      style={{ borderBottom: '1px solid var(--border)' }}
      onClick={() => setEditing(true)}
    >
      {/* Status dot */}
      <div className="flex-shrink-0 mt-0.5">
        {status === 'complete' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--success)">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : status === 'at_risk' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--warning)">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        ) : status === 'in_progress' ? (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--info)">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ) : (
          <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: 'var(--border-hover)' }} />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm" style={{
            color: status === 'complete' ? 'var(--muted)' : 'var(--foreground)',
            textDecoration: status === 'complete' ? 'line-through' : 'none',
          }}>
            {task.title}
          </p>
          {task.is_critical_path && (
            <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0"
                  style={{ background: '#451a03', color: 'var(--warning)' }}>⚑</span>
          )}
          <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${colors.bg} ${colors.text}`}>
            {STATUS_LABELS[status]}
          </span>
        </div>

        {task.notes && (
          <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--muted)' }}>{task.notes}</p>
        )}

        <div className="flex items-center gap-3 mt-1 flex-wrap">
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

      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24"
           strokeWidth={1.5} stroke="var(--border-hover)">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
      </svg>
    </div>
  )
}
