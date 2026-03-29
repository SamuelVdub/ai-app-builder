import { ONBOARDING_STEPS } from '@/lib/constants'
import type { OnboardingProgress } from '@/types'

interface PublicOnboardingProps {
  progress: OnboardingProgress[]
}

export default function PublicOnboarding({ progress }: PublicOnboardingProps) {
  const completedSteps = new Set(progress.map((p) => p.step_id))
  const completedCount = completedSteps.size
  const totalSteps = ONBOARDING_STEPS.length
  const progressPct = Math.round((completedCount / totalSteps) * 100)

  return (
    <div>
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-4">Setup Progress</h2>

      {/* Progress bar */}
      <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-[var(--foreground)]">
            {completedCount}/{totalSteps} steps completed
          </span>
          <span className="text-sm font-semibold text-[var(--accent)]">{progressPct}%</span>
        </div>
        <div className="h-2 rounded-full bg-[var(--surface-hover)] overflow-hidden">
          <div
            className="h-full rounded-full bg-[var(--accent)] transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {ONBOARDING_STEPS.map((step, index) => {
          const completed = completedSteps.has(step.id)
          return (
            <div
              key={step.id}
              className={`flex items-start gap-4 rounded-xl border p-4 ${
                completed
                  ? 'border-[var(--success)]/20 bg-[var(--success)]/5'
                  : 'border-[var(--border)] bg-[var(--surface)]'
              }`}
            >
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${
                  completed
                    ? 'bg-[var(--success)] text-white'
                    : 'bg-[var(--surface-hover)] text-[var(--muted)] border border-[var(--border)]'
                }`}
              >
                {completed ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <div>
                <h3
                  className={`font-semibold text-sm ${
                    completed ? 'text-[var(--success)]' : 'text-[var(--foreground)]'
                  }`}
                >
                  {step.title}
                </h3>
                <p className="text-xs text-[var(--muted)] mt-0.5">{step.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
