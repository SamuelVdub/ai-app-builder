import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PublicDashboard from '@/components/share/PublicDashboard'
import PublicOnboarding from '@/components/share/PublicOnboarding'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import type { UserService, CustomService, OnboardingProgress, Profile } from '@/types'

interface SharePageProps {
  params: { username: string }
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  return {
    title: `${params.username}'s Dev Setup — AI App Builder`,
    description: `Check out ${params.username}'s developer tool setup and onboarding progress.`,
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const supabase = createClient()

  const { data: rawProfile } = await supabase
    .from('profiles')
    .select('id, username, created_at')
    .eq('username', params.username)
    .single()

  if (!rawProfile) notFound()

  const profile = rawProfile as Profile

  const [
    { data: rawUserServices },
    { data: rawCustomServices },
    { data: rawOnboardingProgress },
  ] = await Promise.all([
    supabase.from('user_services').select('*').eq('user_id', profile.id),
    supabase.from('custom_services').select('*').eq('user_id', profile.id),
    supabase.from('onboarding_progress').select('*').eq('user_id', profile.id),
  ])

  const userServices = (rawUserServices ?? []) as UserService[]
  const customServices = (rawCustomServices ?? []) as CustomService[]
  const onboardingProgress = (rawOnboardingProgress ?? []) as OnboardingProgress[]

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-start justify-between gap-4 mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--accent)]/20 flex items-center justify-center">
              <span className="text-sm font-bold text-[var(--accent)]">
                {profile.username[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-[var(--foreground)]">
                {profile.username}&apos;s Dev Setup
              </h1>
              <p className="text-xs text-[var(--muted)]">
                Member since {formatDate(profile.created_at)}
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-medium text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            <div className="w-6 h-6 rounded-md bg-[var(--accent)] flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            AI App Builder
          </Link>
        </div>

        <div className="space-y-10">
          <PublicDashboard
            userServices={userServices}
            customServices={customServices}
          />
          <PublicOnboarding progress={onboardingProgress} />
        </div>

        <div className="mt-12 rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent)]/5 p-8 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-[var(--foreground)] mb-2">
            Create your own dev setup page
          </h2>
          <p className="text-sm text-[var(--muted)] mb-6">
            Track your tools, follow the setup checklist, and share your progress with others.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition-colors"
          >
            Sign up for free
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
