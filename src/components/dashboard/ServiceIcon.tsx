interface ServiceIconProps {
  iconId: string
  color: string
  size?: number
}

export default function ServiceIcon({ iconId, color, size = 32 }: ServiceIconProps) {
  const s = size

  if (iconId === 'github') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    )
  }

  if (iconId === 'vercel') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    )
  }

  if (iconId === 'supabase') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ color }}>
        <path
          d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.18 12.785.shared.765 13.73h9.5c.5 0 .84-.5.664-.972L8.5 4.235l3.4-3.2z"
          fill="currentColor"
        />
        <path
          d="M12.1 22.964c.015.986 1.26 1.41 1.874.637l9.262-11.652c.584-.735.107-1.799-.857-1.799h-9.5c-.5 0-.84.5-.664.972l2.394 7.523-2.51 4.32z"
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    )
  }

  if (iconId === 'vscode') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 19.88V4.12a1.5 1.5 0 0 0-.85-1.533zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    )
  }

  if (iconId === 'nodejs') {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" style={{ color }}>
        <path d="M11.998.000C5.373.000.000 5.373.000 11.998s5.373 11.998 11.998 11.998 11.997-5.373 11.997-11.998S18.623.000 11.998.000zm-.328 20.753l-6.33-3.655V6.9l6.33 3.655v10.198zm.656 0V10.555l6.33-3.655v10.198l-6.33 3.655zM5.996 6.033l6.002-3.466 6.002 3.466-6.002 3.465L5.996 6.033z" />
      </svg>
    )
  }

  // Custom service fallback
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} style={{ color: 'var(--muted)' }}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  )
}
