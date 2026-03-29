import LoginForm from '@/components/auth/LoginForm'

interface LoginPageProps {
  searchParams: { redirectTo?: string }
}

export default function LoginPage({ searchParams }: LoginPageProps) {
  return <LoginForm redirectTo={searchParams.redirectTo} />
}
