import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { BUILT_IN_SERVICES } from '@/lib/constants'
import ServiceCard from '@/components/dashboard/ServiceCard'
import type { ServiceCardData, UserService, CustomService } from '@/types'

export default async function DashboardPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const [{ data: rawUserServices }, { data: rawCustomServices }, { data: rawOnboarding }] =
    await Promise.all([
      supabase.from('user_services').select('*').eq('user_id', user.id),
      supabase.from('custom_services').select('*').eq('user_id', user.id),
      supabase.from('onboarding_progress').select('step_id').eq('user_id', user.id),
    ])

  const userServices = (rawUserServices ?? []) as UserService[]
  const customServices = (rawCustomServices ?? []) as CustomService[]
  const onboardingProgress = rawOnboarding ?? []

  const completedCount = onboardingProgress.length
  const showOnboardingBanner = completedCount < 5

  const connectedMap = new Map(userServices.map((s) => [s.service_id, s.connected]))

  const builtInCards: ServiceCardData[] = BUILT_IN_SERVICES.map((service) => ({
    ...service,
    connected: connectedMap.get(service.id) ?? false,
  }))

  const customCards: ServiceCardData[] = customServices.map((s) => ({
    id: s.id,
    name: s.name,
    description: s.description ?? '',
    url: s.url,
    icon: 'custom',
    color: '#888888',
    connected: false,
    isCustom: true,
  }))

  const allCards = [...builtInCards, ...customCards]
  const connectedCount = builtInCards.filter((c) => c.connected).length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Dashboard</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          {connectedCount} of {BUILT_IN_SERVICES.length} services connected
        </p>
      </div>

      {showOnboardingBanner && (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--foreground)]">
                Complete your setup — {completedCount}/5 steps done
              </p>
              <p className="text-xs text-[var(--muted)]">Follow the checklist to get your dev environment ready</p>
            </div>
          </div>
          <Link
            href="/onboarding"
            className="flex-shrink-0 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            View checklist →
          </Link>
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[var(--foreground)]">Services</h2>
          <Link
            href="/add-service"
            className="inline-flex items-center gap-1.5 text-xs text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add custom
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCards.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </div>
  )
}
