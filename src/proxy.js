// proxy.js (placed in the root of your project or inside /src)
import { NextResponse } from 'next/server';

export function proxy(request) {
  // 1. Get the requested URL path
  const path = request.nextUrl.pathname;

  // 2. Read the user's role from cookies 
  const userRole = request.cookies.get('userRole')?.value || 'guest';

  // --- Route Protection Logic ---

  // 3. Protect Admin Routes
  if (path.startsWith('/admin')) {
    if (userRole !== 'admin') {
      if (userRole === 'active_user') {
        return NextResponse.redirect(new URL('/active-user/generated-form', request.url));
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 4. Protect Active User Routes
  if (path.startsWith('/active-user')) {
    if (userRole !== 'active_user' && userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // 5. Allow request to proceed
  return NextResponse.next();
}

// --- Proxy Configuration ---
export const config = {
  matcher: [
    '/admin/:path*', 
    '/active-user/:path*'
  ],
};