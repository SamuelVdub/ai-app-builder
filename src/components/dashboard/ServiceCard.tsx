import type { ServiceCardData } from '@/types'
import ServiceIcon from './ServiceIcon'
import ServiceToggleButton from './ServiceToggleButton'
import DeleteCustomServiceButton from './DeleteCustomServiceButton'

interface ServiceCardProps {
  service: ServiceCardData
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface-hover)]">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--background)] border border-[var(--border)] flex items-center justify-center">
            <ServiceIcon iconId={service.icon} color={service.color} size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[var(--foreground)]">{service.name}</h3>
            {service.isCustom && (
              <span className="text-xs text-[var(--muted)]">Custom</span>
            )}
          </div>
        </div>
        {service.isCustom && (
          <DeleteCustomServiceButton id={service.id} />
        )}
      </div>

      {/* Description */}
      <p className="text-xs text-[var(--muted)] leading-relaxed flex-1">{service.description}</p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <ServiceToggleButton
          serviceId={service.id}
          initialConnected={service.connected}
          isCustom={service.isCustom}
        />
        <a
          href={service.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
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
}
