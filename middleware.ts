// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const REALM = 'Admin Area';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api/admin')) {
    return NextResponse.next();
  }

  const user = (process.env.ADMIN_USER || '').trim();
  const pass = (process.env.ADMIN_PASS || '').trim();

  // If not set, return 500 so you know it's a config issue
  if (!user || !pass) {
    return new NextResponse('Admin credentials not configured', { status: 500 });
  }

  const auth = req.headers.get('authorization') || '';
  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) return unauthorized();

  try {
    const decoded = atob(encoded);
    const idx = decoded.indexOf(':');
    const inUser = decoded.slice(0, idx);
    const inPass = decoded.slice(idx + 1);

    if (inUser === user && inPass === pass) {
      return NextResponse.next();
    }
  } catch {
    /* ignore */
  }
  return unauthorized();
}

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"` },
  });
}

export const config = { matcher: ['/admin/:path*', '/api/admin/:path*'] };
