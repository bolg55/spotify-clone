import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  // Token will exist if user logged in
  const token = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie:
      process.env.NEXTAUTH_URL?.startsWith('https://') ??
      !!process.env.VERCEL_URL,
  })

  const { pathname } = req.nextUrl

  // Allow the req if the following is true...
  // 1) It's a req for next-auth session & provider fetching
  // 2) the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Redirect to login if they don't have a token AND are requesting a protected route

  if (!token && pathname !== '/login') {
    return NextResponse.redirect('/login')
  }
}
