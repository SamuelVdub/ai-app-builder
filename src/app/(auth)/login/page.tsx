'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/dashboard')
      router.refresh()
    } else {
      setError('Incorrect password. Try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--background)' }}>
      <div className="w-full max-w-sm">
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
               style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--foreground)' }}>
            Kelston Way
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
            Greenhouse Project Hub
          </p>
        </div>

        {/* Login Card */}
        <form onSubmit={handleSubmit}
              className="rounded-2xl p-6 space-y-4"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--muted)' }}>
              Project Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter project password"
              required
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-colors"
              style={{
                background: 'var(--background)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          {error && (
            <p className="text-sm px-3 py-2 rounded-lg" style={{ background: '#450a0a', color: 'var(--error)' }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full py-3 rounded-xl text-sm font-semibold transition-all disabled:opacity-50"
            style={{ background: 'var(--accent)', color: '#000' }}
          >
            {loading ? 'Signing in…' : 'Enter Project Hub'}
          </button>

          <p className="text-xs text-center" style={{ color: 'var(--muted)' }}>
            Shared access for Samuel, Art, Titus, and team
          </p>
        </form>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--muted)' }}>
          Kelston Way Greenhouse · Oglesby, Texas · 5 Acres
        </p>
      </div>
    </div>
  )
}
