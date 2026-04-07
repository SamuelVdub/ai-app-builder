import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kelston Way Greenhouse Project Hub',
  description: '5-Acre Commercial Greenhouse Build — Oglesby, Texas. Targeting operational January 1, 2027.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
