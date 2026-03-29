'use client'

import { useTransition } from 'react'
import { markStepCompleteAction, resetStepAction } from '@/actions/onboarding'
import type { OnboardingStep } from '@/lib/constants'

interface OnboardingStepProps {
  step: OnboardingStep
  completed: boolean
  index: number
}

export default function OnboardingStepCard({ step, completed, index }: OnboardingStepProps) {
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    startTransition(async () => {
      if (completed) {
        await resetStepAction(step.id)
      } else {
        await markStepCompleteAction(step.id)
      }
    })
  }

  return (
    <div
      className={`
        flex items-start gap-4 rounded-xl border p-5 transition-all
        ${completed
          ? 'border-[var(--success)]/20 bg-[var(--success)]/5'
          : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]'
        }
      `}
    >
      {/* Step number / check */}
      <div
        className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all
          ${completed
            ? 'bg-[var(--success)] text-white'
            : 'bg-[var(--surface-hover)] text-[var(--muted)] border border-[var(--border)]'
          }
        `}
      >
        {completed ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          index + 1
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className={`font-semibold text-sm mb-1 ${completed ? 'text-[var(--success)]' : 'text-[var(--foreground)]'}`}
        >
          {step.title}
        </h3>
        <p className="text-xs text-[var(--muted)] leading-relaxed mb-3">{step.description}</p>
        <div className="flex items-center gap-3">
          <a
            href={step.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--accent)] hover:underline"
          >
            Open link
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button
            onClick={handleToggle}
            disabled={isPending}
            className={`
              inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full border transition-all
              disabled:opacity-50 disabled:cursor-not-allowed
              ${completed
                ? 'border-[var(--success)]/20 text-[var(--success)] hover:bg-[var(--success)]/10'
                : 'border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]'
              }
            `}
          >
            {isPending ? 'Saving...' : completed ? '✓ Completed — undo' : 'Mark complete'}
          </button>
        </div>
      </div>
    </div>
  )
}
