'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Phase, PhaseStatus } from '@/types/greenhouse'
import { STATUS_LABELS } from '@/types/greenhouse'

interface Props {
  phase: Phase
}

export default function PhaseStatusToggle({ phase }: Props) {
  const router = useRouter()
  const [open, setOpen]     = useState(false)
  const [saving, setSaving] = useState(false)

  async function updateStatus(status: PhaseStatus) {
    setSaving(true)
    setOpen(false)
    const supabase = createClient()
    await supabase.from('phases').update({ status }).eq('id', phase.id)
    setSaving(false)
    router.refresh()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={saving}
        className="text-xs px-2 py-1 rounded-lg disabled:opacity-50"
        style={{ background: 'var(--surface-hover)', color: 'var(--muted)' }}
      >
        {saving ? '…' : 'Set status'}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-8 z-20 rounded-xl overflow-hidden w-36 shadow-xl"
               style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {(Object.keys(STATUS_LABELS) as PhaseStatus[]).map((s) => (
              <button
                key={s}
                onClick={() => updateStatus(s)}
                className="w-full text-left px-3 py-2 text-xs hover:bg-[var(--surface-hover)] transition-colors"
                style={{ color: 'var(--foreground)' }}
              >
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
