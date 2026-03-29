'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { logoutAction } from '@/actions/auth'

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/onboarding', label: 'Onboarding' },
  { href: '/add-service', label: 'Add Service' },
  { href: '/chat', label: 'AI Chat' },
]

interface MobileHeaderProps {
  username?: string | null
}

export default function MobileHeader({ username }: MobileHeaderProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="lg:hidden">
      <div className="flex items-center justify-between px-4 h-14 border-b border-[var(--border)] bg-[var(--surface)]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[var(--accent)] flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-semibold text-sm">AI App Builder</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors"
        >
          {open ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <div className="bg-[var(--surface)] border-b border-[var(--border)] px-3 py-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-lg text-sm font-medium transition-all',
                pathname === item.href
                  ? 'bg-[var(--accent)]/10 text-[var(--accent)]'
                  : 'text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)]'
              )}
            >
              {item.label}
            </Link>
          ))}
          {username && (
            <Link
              href={`/u/${username}`}
              target="_blank"
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all"
            >
              Share my page
            </Link>
          )}
          <form action={logoutAction}>
            <button
              type="submit"
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-[var(--muted)] hover:text-[var(--error)] hover:bg-[var(--error)]/10 transition-all"
            >
              Sign out
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
