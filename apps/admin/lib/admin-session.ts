export const SESSION_COOKIE = 'lf_admin_session';
export const SESSION_TTL_MS = 12 * 60 * 60 * 1000;

export function getAdminAccessToken(): string | null {
  const value = process.env.ADMIN_ACCESS_TOKEN;
  if (typeof value !== 'string') {
    return null;
  }
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function safeEqual(left: string, right: string): boolean {
  const encoder = new TextEncoder();
  const a = encoder.encode(left);
  const b = encoder.encode(right);
  const len = Math.max(a.length, b.length, 1);
  let mismatch = a.length === b.length ? 0 : 1;
  for (let i = 0; i < len; i += 1) {
    mismatch |= (a[i] ?? 0) ^ (b[i] ?? 0);
  }
  return mismatch === 0;
}

async function hmacHex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(data)
  );
  return Array.from(new Uint8Array(signature))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export async function createSessionValue(
  secret: string,
  now = Date.now()
): Promise<string | null> {
  if (!secret.trim()) {
    return null;
  }
  const expiry = now + SESSION_TTL_MS;
  const payload = `v1.${expiry}`;
  const signature = await hmacHex(secret, payload);
  return `${payload}.${signature}`;
}

export async function verifySessionValue(
  cookie: string | undefined,
  secret: string,
  now = Date.now()
): Promise<boolean> {
  if (!cookie || !secret.trim()) {
    return false;
  }
  const parts = cookie.split('.');
  if (parts.length !== 3) {
    return false;
  }
  const [version, expiryRaw, signature] = parts;
  if (version !== 'v1' || !/^\d+$/.test(expiryRaw) || !signature) {
    return false;
  }
  const expiry = Number(expiryRaw);
  if (!Number.isSafeInteger(expiry) || expiry <= now) {
    return false;
  }
  const expected = await hmacHex(secret, `${version}.${expiryRaw}`);
  return safeEqual(signature, expected);
}
