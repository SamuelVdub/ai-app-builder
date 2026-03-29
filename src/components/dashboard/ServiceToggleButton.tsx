'use client'

import { useState, useTransition } from 'react'
import { toggleServiceAction } from '@/actions/services'

interface ServiceToggleButtonProps {
  serviceId: string
  initialConnected: boolean
  isCustom?: boolean
}

export default function ServiceToggleButton({
  serviceId,
  initialConnected,
  isCustom,
}: ServiceToggleButtonProps) {
  const [connected, setConnected] = useState(initialConnected)
  const [isPending, startTransition] = useTransition()

  if (isCustom) return null

  const handleToggle = () => {
    const next = !connected
    setConnected(next) // optimistic
    startTransition(async () => {
      try {
        await toggleServiceAction(serviceId, next)
      } catch {
        setConnected(!next) // revert on error
      }
    })
  }

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`
        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all
        ${
          connected
            ? 'bg-[var(--success)]/10 text-[var(--success)] border border-[var(--success)]/20 hover:bg-[var(--success)]/20'
            : 'bg-[var(--surface-hover)] text-[var(--muted)] border border-[var(--border)] hover:border-[var(--border-hover)] hover:text-[var(--foreground)]'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-[var(--success)]' : 'bg-[var(--muted)]'}`}
      />
      {isPending ? 'Saving...' : connected ? 'Connected' : 'Not connected'}
    </button>
  )
}
