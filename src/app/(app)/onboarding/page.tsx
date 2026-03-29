import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { ONBOARDING_STEPS } from '@/lib/constants'
import OnboardingStepCard from '@/components/onboarding/OnboardingStep'
import type { OnboardingProgress } from '@/types'

export default async function OnboardingPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: rawProgress } = await supabase
    .from('onboarding_progress')
    .select('step_id')
    .eq('user_id', user.id)

  const progressRows = (rawProgress ?? []) as Pick<OnboardingProgress, 'step_id'>[]
  const completedSteps = new Set(progressRows.map((r) => r.step_id))
  const completedCount = completedSteps.size
  const totalSteps = ONBOARDING_STEPS.length
  const progressPct = Math.round((completedCount / totalSteps) * 100)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Onboarding Checklist</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Set up your developer environment step by step
        </p>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[var(--foreground)]">
            {completedCount === totalSteps ? '🎉 All done!' : `${completedCount} of ${totalSteps} completed`}
          </span>
          <span className="text-sm font-semibold text-[var(--accent)]">{progressPct}%</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--surface-hover)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {completedCount === totalSteps && (
          <p className="text-xs text-[var(--muted)] mt-3">
            You&apos;re all set up! Share your progress page with friends who are just getting started.
          </p>
        )}
      </div>

      <div className="space-y-3">
        {ONBOARDING_STEPS.map((step, index) => (
          <OnboardingStepCard
            key={step.id}
            step={step}
            completed={completedSteps.has(step.id)}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
