// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REALM = 'Admin Area';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Only guard admin routes
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  const user = process.env.ADMIN_USER ?? '';
  const pass = process.env.ADMIN_PASS ?? '';

  const auth = req.headers.get('authorization') || '';
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) {
    return unauthorized();
  }

  try {
    // Edge runtime has atob
    const decoded = atob(encoded);
    const sep = decoded.indexOf(':');
    const inUser = decoded.slice(0, sep);
    const inPass = decoded.slice(sep + 1);

    if (inUser === user && inPass === pass) {
      return NextResponse.next();
    }
  } catch {
    /* fallthrough */
  }

  return unauthorized();
}

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"` },
  });
}

// Apply to both page and API under /admin
export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
