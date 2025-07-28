import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionToken = request.cookies.get('session-token');

  // Protected routes
  const isProtectedRoute = pathname.startsWith('/dashboard');
  
  // Auth routes
  const isAuthRoute = pathname.startsWith('/login');

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !sessionToken) {
    const url = new URL('/login', request.url);
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if accessing auth route with session
  if (isAuthRoute && sessionToken) {
    const url = new URL('/dashboard', request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/login',
  ],
};