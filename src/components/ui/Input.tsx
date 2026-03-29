import { cn } from '@/lib/utils'
import { InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-[var(--foreground)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            'h-10 w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] transition-colors',
            'focus:outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-[var(--error)] focus:border-[var(--error)] focus:ring-[var(--error)]',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-[var(--error)]">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input
