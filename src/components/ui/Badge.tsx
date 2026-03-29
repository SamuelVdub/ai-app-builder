import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'success' | 'muted' | 'accent'
  className?: string
}

export default function Badge({ children, variant = 'muted', className }: BadgeProps) {
  const variants = {
    success: 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20',
    muted: 'bg-[var(--surface-hover)] text-[var(--muted)] border-[var(--border)]',
    accent: 'bg-[var(--accent)]/10 text-[var(--accent)] border-[var(--accent)]/20',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
