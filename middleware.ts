import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "./lib/auth";

export function middleware(request: NextRequest) {

  const protectedRoutes = ['/products', '/orders', '/analytics', '/logout']
  const authRoutes = ['/login']

  const isAuthRoute = authRoutes.includes(request.nextUrl.pathname)
  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname) || request.nextUrl.pathname === '/'

  // const errorResponse = NextResponse.json({ message: "user not logged in" }, { status: 401 })

  const cookie = request.cookies.get('x-access-token')
  console.log('cookie:', cookie)

  if (isAuthRoute && cookie) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  if ((!cookie || !cookie.value) && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  // TODO: verify token

  return NextResponse.next()

  // const token: string = cookie?.value || ''
  // if (!token && isProtectedRoute) {
  //   console.log('1')
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  //
  // const decodedData = "some"
  // // TODO:
  // // const decodedData = verifyToken(token)
  // // if (!decodedData) {
  // //   return NextResponse.redirect(new URL('/login', request.url))
  // // }
  //
  // if (isProtectedRoute && !decodedData) {
  //   console.log('2')
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }
  // if (isAuthRoute && decodedData) {
  //   console.log('3')
  //   return NextResponse.redirect(new URL('/', request.url))
  // }
}
