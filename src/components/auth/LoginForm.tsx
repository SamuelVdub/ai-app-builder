'use client'

import { useFormState } from 'react-dom'
import Link from 'next/link'
import { loginAction } from '@/actions/auth'
import SubmitButton from '@/components/ui/SubmitButton'
import Input from '@/components/ui/Input'

interface LoginFormProps {
  redirectTo?: string
}

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const [state, action] = useFormState(loginAction, null)

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8">
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">Welcome back</h1>
      <p className="text-sm text-[var(--muted)] mb-6">Sign in to your account</p>

      <form action={action} className="space-y-4">
        {redirectTo && (
          <input type="hidden" name="redirectTo" value={redirectTo} />
        )}

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
          autoComplete="current-password"
          required
        />

        {state?.error && (
          <p className="text-sm text-[var(--error)] bg-[var(--error)]/10 border border-[var(--error)]/20 rounded-lg px-4 py-3">
            {state.error}
          </p>
        )}

        <SubmitButton className="w-full">Sign in</SubmitButton>
      </form>

      <p className="text-sm text-center text-[var(--muted)] mt-6">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-[var(--accent)] hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  )
}
