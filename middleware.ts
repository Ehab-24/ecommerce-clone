import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

  const protectedRoutes = ['/products', '/orders', '/analytics', '/logout']
  const authRoutes = ['/login', '/api/login']

  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname)
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname) || request.nextUrl.pathname === '/'

  const cookie = request.cookies.get('x-access-token')

  if (isAuthRoute && cookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if ((!cookie || !cookie.value) && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if ((!cookie || !cookie.value) && isAuthRoute) {
    return NextResponse.next()
  }

  const credentials = JSON.parse(cookie!.value)

  console.log(credentials)

  if (credentials.email !== process.env.ROOT_EMAIL) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (credentials.password !== process.env.ROOT_PASSWORD) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  console.log('hello')

  return NextResponse.next()
}
