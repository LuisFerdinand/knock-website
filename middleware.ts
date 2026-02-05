// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // If the path is already the under-construction page, allow it
  if (request.nextUrl.pathname === '/under-construction') {
    return NextResponse.next();
  }
  
  // Redirect all other paths to the under-construction page
  return NextResponse.redirect(new URL('/under-construction', request.url));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - under-construction (the under construction page itself)
     * - under/ (the directory containing the image)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|under-construction|under/).*)',
  ],
};