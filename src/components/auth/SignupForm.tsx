'use client'

import { useFormState } from 'react-dom'
import Link from 'next/link'
import { signupAction } from '@/actions/auth'
import SubmitButton from '@/components/ui/SubmitButton'
import Input from '@/components/ui/Input'

export default function SignupForm() {
  const [state, action] = useFormState(signupAction, null)

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Create an account</h1>
      <p className="text-sm text-[var(--muted)] mb-6">Start building with the best tools</p>

      <form action={action} className="space-y-4">
        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          required
        />

        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          autoComplete="new-password"
          required
        />
        <p className="text-xs text-[var(--muted)] -mt-1">At least 6 characters</p>

        {state?.error && (
          <p className="text-sm text-[var(--error)] bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-lg px-4 py-3">
            {state.error}
          </p>
        )}

        <SubmitButton className="w-full">Create account</SubmitButton>
      </form>

      <p className="text-sm text-center text-[var(--muted)] mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-[var(--accent)] hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  )
}
