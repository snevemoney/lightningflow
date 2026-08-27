import { isTransientLnBitsError, withBackoff } from './retry';

describe('withBackoff', () => {
  it('returns on first success', async () => {
    const fn = jest.fn().mockResolvedValue('ok');
    await expect(withBackoff(fn, { sleep: async () => undefined })).resolves.toBe(
      'ok'
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries transient failures then succeeds', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(Object.assign(new Error('timeout'), { status: 503 }))
      .mockResolvedValue('ok');
    const sleep = jest.fn().mockResolvedValue(undefined);
    await expect(withBackoff(fn, { retries: 2, baseMs: 1, sleep })).resolves.toBe(
      'ok'
    );
    expect(fn).toHaveBeenCalledTimes(2);
    expect(sleep).toHaveBeenCalledTimes(1);
  });

  it('does not retry non-transient errors', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('bad request'));
    await expect(withBackoff(fn, { sleep: async () => undefined })).rejects.toThrow(
      'bad request'
    );
    expect(fn).toHaveBeenCalledTimes(1);
  });
});

describe('isTransientLnBitsError', () => {
  it('treats 429/502/503 and network messages as transient', () => {
    expect(isTransientLnBitsError({ status: 429 })).toBe(true);
    expect(isTransientLnBitsError(new Error('fetch failed'))).toBe(true);
    expect(isTransientLnBitsError(new Error('invalid invoice'))).toBe(false);
  });
});
