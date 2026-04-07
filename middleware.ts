import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/dashboard', '/timeline', '/tasks', '/contacts']
const AUTH_PATHS = ['/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  const isAuthPage  = AUTH_PATHS.some((p) => pathname.startsWith(p))

  const accessCookie = request.cookies.get('gh_access')
  const hasAccess    = accessCookie?.value === 'granted'

  if (isProtected && !hasAccess) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  if (isAuthPage && hasAccess) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|icons/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
