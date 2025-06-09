import { NextRequest, NextResponse } from "next/server"
import { getTokenFromCookies, verifyToken } from "./lib/auth"

// Paths that require authentication
const protectedPaths = ["/dashboard", "/profile"]

// Paths that should redirect authenticated users away
const authPaths = ["/login", "/register"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get token from cookies
  const token = getTokenFromCookies(request.headers.get("cookie"))
  const isAuthenticated = token ? !!verifyToken(token) : false

  // Check if current path is protected
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  
  // Check if current path is an auth path
  const isAuthPath = authPaths.some(path => pathname.startsWith(path))

  // Redirect unauthenticated users from protected paths to login
  if (isProtectedPath && !isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect authenticated users from auth paths to dashboard
  if (isAuthPath && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Match all paths except static files and API routes
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
}