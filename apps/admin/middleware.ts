import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  SESSION_COOKIE,
  getAdminAccessToken,
  verifySessionValue
} from './lib/admin-session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/login') {
    return NextResponse.next();
  }

  const secret = getAdminAccessToken();
  const cookie = request.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = secret
    ? await verifySessionValue(cookie, secret)
    : false;

  if (!authenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/login';
    loginUrl.search = '';
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
