'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Contact } from '@/types/greenhouse'
import ContactCard from './ContactCard'

interface Props {
  initialContacts: Contact[]
}

export default function ContactsGrid({ initialContacts }: Props) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [adding, setAdding]     = useState(false)
  const [saving, setSaving]     = useState(false)

  // New contact form state
  const [name,  setName]  = useState('')
  const [role,  setRole]  = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [notes, setNotes] = useState('')

  // Real-time subscription
  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel('contacts-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'contacts' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setContacts((prev) => [...prev, payload.new as Contact])
        } else if (payload.eventType === 'UPDATE') {
          setContacts((prev) =>
            prev.map((c) => c.id === (payload.new as Contact).id ? payload.new as Contact : c)
          )
        } else if (payload.eventType === 'DELETE') {
          setContacts((prev) => prev.filter((c) => c.id !== (payload.old as Contact).id))
        }
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  async function addContact(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setSaving(true)
    const supabase = createClient()
    const maxOrder = contacts.reduce((m, c) => Math.max(m, c.order_num), 0)
    await supabase.from('contacts').insert({
      name: name.trim(),
      role:  role.trim()  || null,
      phone: phone.trim() || null,
      email: email.trim() || null,
      notes: notes.trim() || null,
      order_num: maxOrder + 1,
    })
    setName(''); setRole(''); setPhone(''); setEmail(''); setNotes('')
    setSaving(false)
    setAdding(false)
    // Realtime will update state
  }

  const inputStyle = {
    background: 'var(--background)',
    border: '1px solid var(--border)',
    color: 'var(--foreground)',
  }

  return (
    <div className="space-y-4">
      {/* Add contact button / form */}
      {!adding ? (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--foreground)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="var(--accent)">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Contact
        </button>
      ) : (
        <form onSubmit={addContact}
              className="rounded-2xl p-4 space-y-3"
              style={{ background: 'var(--surface)', border: '1px solid var(--accent)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>New Contact</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Name *</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required
                className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle}
                placeholder="Full name or organization" autoFocus />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Role</label>
              <input value={role} onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle}
                placeholder="e.g. Grading Contractor" />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel"
                className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
            <div>
              <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"
                className="w-full px-3 py-2 rounded-xl text-sm outline-none" style={inputStyle} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs mb-1" style={{ color: 'var(--muted)' }}>Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2}
                className="w-full px-3 py-2 rounded-xl text-sm outline-none resize-none"
                style={inputStyle} placeholder="Key info, lead times, context…" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button type="submit" disabled={saving || !name.trim()}
              className="px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50"
              style={{ background: 'var(--accent)', color: '#000' }}>
              {saving ? 'Adding…' : 'Add Contact'}
            </button>
            <button type="button" onClick={() => setAdding(false)}
              className="px-4 py-2 rounded-xl text-sm font-medium"
              style={{ background: 'var(--surface-hover)', color: 'var(--foreground)' }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onUpdated={(updated) =>
              setContacts((prev) => prev.map((c) => c.id === updated.id ? updated : c))
            }
            onDeleted={(id) =>
              setContacts((prev) => prev.filter((c) => c.id !== id))
            }
          />
        ))}
        {contacts.length === 0 && (
          <div className="col-span-3 py-12 text-center text-sm" style={{ color: 'var(--muted)' }}>
            No contacts yet. Add the first one above.
          </div>
        )}
      </div>
    </div>
  )
}
