'use client'

import { useTransition } from 'react'
import { deleteCustomServiceAction } from '@/actions/services'

export default function DeleteCustomServiceButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition()

  return (
    <button
      onClick={() =>
        startTransition(() => deleteCustomServiceAction(id))
      }
      disabled={isPending}
      className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-[var(--muted)] hover:text-[var(--error)] hover:bg-[var(--error)]/10 transition-all disabled:opacity-50"
      title="Delete service"
    >
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  )
}
