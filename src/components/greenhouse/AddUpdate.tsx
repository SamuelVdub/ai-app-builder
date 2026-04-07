'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const AUTHORS = ['Samuel', 'Art', 'Titus', 'Rich VanWingerden', 'Contractor', 'Other']

export default function AddUpdate() {
  const router = useRouter()
  const [message, setMessage]   = useState('')
  const [author, setAuthor]     = useState('Samuel')
  const [saving, setSaving]     = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setSaving(true)
    const supabase = createClient()
    await supabase.from('updates').insert({ message: message.trim(), author })
    setMessage('')
    setSaving(false)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap sm:flex-nowrap">
      <select
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        className="px-3 py-2 rounded-xl text-sm outline-none flex-shrink-0"
        style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        }}
      >
        {AUTHORS.map((a) => <option key={a} value={a}>{a}</option>)}
      </select>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Add an update or note…"
        className="flex-1 min-w-0 px-3 py-2 rounded-xl text-sm outline-none"
        style={{
          background: 'var(--background)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        }}
        onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
      />
      <button
        type="submit"
        disabled={saving || !message.trim()}
        className="px-4 py-2 rounded-xl text-sm font-medium flex-shrink-0 disabled:opacity-50"
        style={{ background: 'var(--accent)', color: '#000' }}
      >
        {saving ? 'Posting…' : 'Post'}
      </button>
    </form>
  )
}
