export interface BackoffOptions {
  retries?: number;
  baseMs?: number;
  factor?: number;
  retryOn?: (error: unknown) => boolean;
  sleep?: (ms: number) => Promise<void>;
}

const DEFAULT_SLEEP = (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

export function isTransientLnBitsError(error: unknown): boolean {
  const status =
    typeof error === 'object' && error !== null && 'status' in error
      ? Number((error as { status: unknown }).status)
      : NaN;
  if ([429, 502, 503, 504].includes(status)) {
    return true;
  }
  const message = error instanceof Error ? error.message : String(error);
  return /network|timeout|econnreset|econnrefused|fetch failed|socket|503|502|429/i.test(
    message
  );
}

export async function withBackoff<T>(
  fn: () => Promise<T>,
  options: BackoffOptions = {}
): Promise<T> {
  const retries = options.retries ?? 3;
  const baseMs = options.baseMs ?? 200;
  const factor = options.factor ?? 2;
  const retryOn = options.retryOn ?? isTransientLnBitsError;
  const sleep = options.sleep ?? DEFAULT_SLEEP;

  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === retries || !retryOn(error)) {
        throw error;
      }
      await sleep(baseMs * factor ** attempt);
    }
  }
  throw lastError;
}
