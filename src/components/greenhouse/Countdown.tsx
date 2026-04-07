'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
  targetDate: string
  initialDays: number
}

export default function Countdown({ targetDate, initialDays }: CountdownProps) {
  const [days, setDays] = useState(initialDays)

  useEffect(() => {
    function calc() {
      const target = new Date(targetDate)
      const today  = new Date()
      today.setHours(0, 0, 0, 0)
      setDays(Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
    }
    calc()
    const id = setInterval(calc, 60_000)
    return () => clearInterval(id)
  }, [targetDate])

  return (
    <p className="text-3xl font-bold" style={{ color: days <= 60 ? 'var(--warning)' : 'var(--accent)' }}>
      {days.toLocaleString()}
    </p>
  )
}
