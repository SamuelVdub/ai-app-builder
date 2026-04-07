'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Contact } from '@/types/greenhouse'

interface Props {
  contact: Contact
  onUpdated: (updated: Contact) => void
  onDeleted: (id: string) => void
}

export default function ContactCard({ contact, onUpdated, onDeleted }: Props) {
  const [editing, setEditing] = useState(false)
  const [saving, setSaving]   = useState(false)

  const [name,  setName]  = useState(contact.name)
  const [role,  setRole]  = useState(contact.role  ?? '')
  const [phone, setPhone] = useState(contact.phone ?? '')
  const [email, setEmail] = useState(contact.email ?? '')
  const [notes, setNotes] = useState(contact.notes ?? '')

  const inputStyle = {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    color: 'var(--foreground)',
  }

  async function save() {
    if (!name.trim()) return
    setSaving(true)
    const supabase = createClient()
    const { data } = await supabase
      .from('contacts')
      .update({
        name: name.trim(),
        role:  role.trim()  || null,
        phone: phone.trim() || null,
        email: email.trim() || null,
        notes: notes.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', contact.id)
      .select()
      .single()
    setSaving(false)
    setEditing(false)
    if (data) onUpdated(data as Contact)
  }

  async function del() {
    if (!confirm(`Delete ${contact.name}?`)) return
    const supabase = createClient()
    await supabase.from('contacts').delete().eq('id', contact.id)
    onDeleted(contact.id)
  }

  function cancel() {
    setName(contact.name)
    setRole(contact.role ?? '')
    setPhone(contact.phone ?? '')
    setEmail(contact.email ?? '')
    setNotes(contact.notes ?? '')
    setEditing(false)
  }

  if (editing) {
    return (
      <div className="rounded-2xl p-4 space-y-3"
           style={{ background: 'var(--surface)', border: '1px solid var(--accent)' }}>
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Name *</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Role</label>
            <input value={role} onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle}
              placeholder="e.g. Greenhouse Structure Supplier" />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)}
              type="tel" className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div>
            <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)}
              type="email" className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
          </div>
          <div className="col-span-2">
            <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Notes</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)}
              rows={2} className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
              style={inputStyle} placeholder="Additional notes…" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button onClick={save} disabled={saving || !name.trim()}
            className="px-3 py-1.5 rounded-lg text-xs font-medium disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#000' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
          <button onClick={cancel}
            className="px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: 'var(--surface-hover)', color: 'var(--foreground)' }}>
            Cancel
          </button>
          <button onClick={del}
            className="ml-auto px-3 py-1.5 rounded-lg text-xs font-medium"
            style={{ background: '#450a0a', color: 'var(--error)' }}>
            Delete
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-2xl p-4 space-y-2 cursor-pointer"
         style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
         onClick={() => setEditing(true)}>

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate" style={{ color: 'var(--foreground)' }}>
            {contact.name}
          </p>
          {contact.role && (
            <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--accent)' }}>
              {contact.role}
            </p>
          )}
        </div>
        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24"
             strokeWidth={1.5} stroke="var(--border-hover)">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        </svg>
      </div>

      <div className="space-y-1">
        {contact.phone ? (
          <a href={`tel:${contact.phone}`}
             onClick={(e) => e.stopPropagation()}
             className="flex items-center gap-1.5 text-xs hover:underline"
             style={{ color: 'var(--muted)' }}>
            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            {contact.phone}
          </a>
        ) : (
          <p className="text-xs" style={{ color: 'var(--border-hover)' }}>No phone — tap to add</p>
        )}

        {contact.email ? (
          <a href={`mailto:${contact.email}`}
             onClick={(e) => e.stopPropagation()}
             className="flex items-center gap-1.5 text-xs hover:underline truncate"
             style={{ color: 'var(--muted)' }}>
            <svg className="w-3 h-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="truncate">{contact.email}</span>
          </a>
        ) : (
          <p className="text-xs" style={{ color: 'var(--border-hover)' }}>No email — tap to add</p>
        )}
      </div>

      {contact.notes && (
        <p className="text-xs pt-1 line-clamp-2" style={{ color: 'var(--muted)' }}>{contact.notes}</p>
      )}
    </div>
  )
}
