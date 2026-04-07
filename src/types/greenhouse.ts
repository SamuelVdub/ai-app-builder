export type PhaseStatus = 'not_started' | 'in_progress' | 'complete' | 'at_risk'
export type TaskStatus  = 'not_started' | 'in_progress' | 'complete' | 'at_risk'

export interface Phase {
  id: string
  name: string
  description: string | null
  start_date: string
  end_date: string
  status: PhaseStatus
  order_num: number
  created_at: string
}

export interface Task {
  id: string
  phase_id: string
  title: string
  assignee: string | null
  due_date: string | null
  status: TaskStatus
  notes: string | null
  is_critical_path: boolean
  order_num: number
  created_at: string
  updated_at: string
}

export interface Contact {
  id: string
  name: string
  role: string | null
  phone: string | null
  email: string | null
  notes: string | null
  order_num: number
  created_at: string
  updated_at: string
}

export interface Update {
  id: string
  message: string
  author: string | null
  task_id: string | null
  created_at: string
}

export const STATUS_LABELS: Record<PhaseStatus, string> = {
  not_started: 'Not Started',
  in_progress: 'In Progress',
  complete:    'Complete',
  at_risk:     'At Risk',
}

export const STATUS_COLORS: Record<PhaseStatus, { bg: string; text: string; border: string }> = {
  not_started: { bg: 'bg-gray-800',   text: 'text-gray-400',  border: 'border-gray-700' },
  in_progress: { bg: 'bg-blue-900',   text: 'text-blue-300',  border: 'border-blue-700' },
  complete:    { bg: 'bg-green-900',  text: 'text-green-300', border: 'border-green-700' },
  at_risk:     { bg: 'bg-amber-900',  text: 'text-amber-300', border: 'border-amber-700' },
}

export const STATUS_BAR_COLORS: Record<PhaseStatus, string> = {
  not_started: 'bg-gray-600',
  in_progress: 'bg-blue-500',
  complete:    'bg-green-500',
  at_risk:     'bg-amber-500',
}

export const ASSIGNEES = ['Samuel', 'Art', 'Titus', 'Rich VanWingerden', 'Oncor', 'USDA', 'Contractor', 'TBD']

// Project timeline bounds
export const PROJECT_START = '2026-04-07'
export const PROJECT_END   = '2027-01-01'
