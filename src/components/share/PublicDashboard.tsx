import { BUILT_IN_SERVICES } from '@/lib/constants'
import ServiceIcon from '@/components/dashboard/ServiceIcon'
import type { UserService, CustomService } from '@/types'

interface PublicDashboardProps {
  userServices: UserService[]
  customServices: CustomService[]
}

export default function PublicDashboard({ userServices, customServices }: PublicDashboardProps) {
  const connectedMap = new Map(userServices.map((s) => [s.service_id, s.connected]))

  return (
    <div>
      <h2 className="text-base font-semibold text-[var(--foreground)] mb-4">Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {BUILT_IN_SERVICES.map((service) => {
          const connected = connectedMap.get(service.id) ?? false
          return (
            <div
              key={service.id}
              className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
            >
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
                  <ServiceIcon iconId={service.icon} color={service.color} size={20} />
                </div>
                <h3 className="font-semibold text-sm text-[var(--foreground)]">{service.name}</h3>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed flex-1">{service.description}</p>
              <div className="flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    connected
                      ? 'bg-[var(--success)]/10 text-[var(--success)] border-[var(--success)]/20'
                      : 'bg-[var(--surface-hover)] text-[var(--muted)] border-[var(--border)]'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-[var(--success)]' : 'bg-[var(--muted)]'}`} />
                  {connected ? 'Connected' : 'Not connected'}
                </span>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1"
                >
                  Open
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )
        })}

        {customServices.map((service) => (
          <div
            key={service.id}
            className="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
                <ServiceIcon iconId="custom" color="#888" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-[var(--foreground)]">{service.name}</h3>
                <span className="text-xs text-[var(--muted)]">Custom</span>
              </div>
            </div>
            {service.description && (
              <p className="text-xs text-[var(--muted)] leading-relaxed flex-1">{service.description}</p>
            )}
            <a
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors inline-flex items-center gap-1 self-start"
            >
              Open link
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
