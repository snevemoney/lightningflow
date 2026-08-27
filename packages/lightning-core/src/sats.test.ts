import { assertPositiveSats, satsFromApi, satsToApiNumber } from './sats';

describe('sats', () => {
  it('accepts integer satoshis', () => {
    expect(assertPositiveSats(1n)).toBe(1n);
    expect(satsToApiNumber(2500n)).toBe(2500);
  });

  it('rejects zero, negative, and unsafe API numbers', () => {
    expect(() => assertPositiveSats(0n)).toThrow('at least 1 sat');
    expect(() => satsFromApi(1.5, 'wallet balance')).toThrow(
      'not a safe integer'
    );
    expect(() => satsFromApi('12.0', 'wallet balance')).toThrow(
      'not an integer satoshi amount'
    );
  });

  it('parses integer strings and safe numbers from the API', () => {
    expect(satsFromApi(100, 'wallet balance')).toBe(100n);
    expect(satsFromApi('100', 'wallet balance')).toBe(100n);
  });
});
