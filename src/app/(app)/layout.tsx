import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/layout/Sidebar'
import MobileHeader from '@/components/layout/MobileHeader'

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  const profile = rawProfile as { username: string } | null

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="hidden lg:block">
        <Sidebar userEmail={user.email} username={profile?.username} />
      </div>

      <MobileHeader username={profile?.username} />

      <main className="lg:pl-64">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
