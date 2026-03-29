import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[var(--border)] mb-4">404</h1>
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2">Page not found</h2>
        <p className="text-sm text-[var(--muted)] mb-8">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-medium transition-colors"
        >
          Go to dashboard
        </Link>
      </div>
    </div>
  )
}
