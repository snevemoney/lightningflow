/** Local satoshi amounts are integer bigint. Convert at the LNBits boundary only. */

export type Sats = bigint;

export function assertSats(value: bigint, label = 'amount'): Sats {
  if (typeof value !== 'bigint') {
    throw new Error(`${label} must be an integer satoshi amount`);
  }
  if (value < 0n) {
    throw new Error(`${label} must not be negative`);
  }
  return value;
}

export function assertPositiveSats(value: bigint, label = 'amount'): Sats {
  const sats = assertSats(value, label);
  if (sats < 1n) {
    throw new Error(`${label} must be at least 1 sat`);
  }
  return sats;
}

export function satsToApiNumber(value: bigint, label = 'amount'): number {
  const sats = assertSats(value, label);
  if (sats > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error(`${label} exceeds safe integer range`);
  }
  return Number(sats);
}

export function satsFromApi(value: unknown, label = 'amount'): Sats {
  if (typeof value === 'bigint') {
    return assertSats(value, label);
  }
  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value)) {
      throw new Error(`${label} from API is not a safe integer`);
    }
    return assertSats(BigInt(value), label);
  }
  if (typeof value === 'string' && /^-?\d+$/.test(value)) {
    return assertSats(BigInt(value), label);
  }
  throw new Error(`${label} from API is not an integer satoshi amount`);
}
