const WALLET_ID = /^[A-Za-z0-9_-]{1,128}$/;
const PAYMENT_HASH = /^[a-fA-F0-9]{16,128}$/;
const BOLT11 = /^ln[a-zA-Z0-9]+$/i;

function requireTrimmed(value: string, label: string): string {
  if (typeof value !== 'string') {
    throw new Error(`${label} is required`);
  }
  const trimmed = value.trim();
  if (!trimmed) {
    throw new Error(`${label} is required`);
  }
  return trimmed;
}

export function assertWalletName(name: string): string {
  const trimmed = requireTrimmed(name, 'wallet name');
  if (trimmed.length > 64) {
    throw new Error('wallet name must be 64 characters or fewer');
  }
  if (/[\u0000-\u001F\u007F]/.test(trimmed)) {
    throw new Error('wallet name contains invalid characters');
  }
  return trimmed;
}

export function assertWalletId(walletId: string): string {
  const trimmed = requireTrimmed(walletId, 'wallet id');
  if (!WALLET_ID.test(trimmed)) {
    throw new Error('wallet id is invalid');
  }
  return trimmed;
}

export function assertMemo(memo: string): string {
  if (typeof memo !== 'string') {
    throw new Error('memo is required');
  }
  if (memo.length > 256) {
    throw new Error('memo must be 256 characters or fewer');
  }
  if (/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/.test(memo)) {
    throw new Error('memo contains invalid characters');
  }
  return memo;
}

export function assertPaymentHash(paymentHash: string): string {
  const trimmed = requireTrimmed(paymentHash, 'payment hash');
  if (!PAYMENT_HASH.test(trimmed)) {
    throw new Error('payment hash is invalid');
  }
  return trimmed;
}

export function assertBolt11(bolt11: string): string {
  const trimmed = requireTrimmed(bolt11, 'bolt11');
  if (trimmed.length < 10 || !BOLT11.test(trimmed)) {
    throw new Error('bolt11 invoice is invalid');
  }
  return trimmed;
}

export function assertHttpUrl(url: string, label = 'api url'): string {
  const trimmed = requireTrimmed(url, label);
  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    throw new Error(`${label} is invalid`);
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    throw new Error(`${label} is invalid`);
  }
  return trimmed;
}

export function assertAdminKey(adminKey: string): string {
  const trimmed = requireTrimmed(adminKey, 'admin key');
  if (trimmed.length < 8) {
    throw new Error('admin key is invalid');
  }
  return trimmed;
}

export function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return 'unknown error';
}
