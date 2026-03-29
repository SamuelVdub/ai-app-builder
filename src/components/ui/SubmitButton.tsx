'use client'

import { useFormStatus } from 'react-dom'
import Button from './Button'

interface SubmitButtonProps {
  children: React.ReactNode
  className?: string
}

export default function SubmitButton({ children, className }: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" loading={pending} className={className}>
      {children}
    </Button>
  )
}
