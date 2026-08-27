'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  SESSION_COOKIE,
  SESSION_TTL_MS,
  createSessionValue,
  getAdminAccessToken,
  safeEqual
} from '../../lib/admin-session';

export async function loginAction(
  _prev: { error: string },
  formData: FormData
): Promise<{ error: string }> {
  const configured = getAdminAccessToken();
  if (!configured) {
    return { error: 'Admin access is not configured.' };
  }

  const token = String(formData.get('token') ?? '');
  if (!safeEqual(token, configured)) {
    return { error: 'Invalid credentials.' };
  }

  const session = await createSessionValue(configured);
  if (!session) {
    return { error: 'Admin access is not configured.' };
  }

  cookies().set(SESSION_COOKIE, session, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: Math.floor(SESSION_TTL_MS / 1000)
  });

  redirect('/node');
}

export async function logoutAction(): Promise<void> {
  cookies().delete(SESSION_COOKIE);
  redirect('/login');
}
