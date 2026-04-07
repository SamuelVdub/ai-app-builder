import { createClient } from '@/lib/supabase/server'
import type { Contact } from '@/types/greenhouse'
import ContactsGrid from '@/components/greenhouse/ContactsGrid'

export const dynamic = 'force-dynamic'

export default async function ContactsPage() {
  const supabase = createClient()
  const { data } = await supabase.from('contacts').select('*').order('order_num')
  const contacts = (data ?? []) as Contact[]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>Contacts</h1>
        <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
          Shared directory — updates in real time for all team members. Tap a card to edit.
        </p>
      </div>

      <ContactsGrid initialContacts={contacts} />
    </div>
  )
}
