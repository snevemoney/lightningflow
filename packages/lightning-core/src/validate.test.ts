import {
  assertAdminKey,
  assertBolt11,
  assertHttpUrl,
  assertMemo,
  assertPaymentHash,
  assertWalletId,
  assertWalletName
} from './validate';

describe('validate', () => {
  it('accepts well-formed inputs', () => {
    expect(assertWalletName('  Cafe  ')).toBe('Cafe');
    expect(assertWalletId('wallet_1')).toBe('wallet_1');
    expect(assertMemo('tips')).toBe('tips');
    expect(assertPaymentHash('aa'.repeat(16))).toHaveLength(32);
    expect(assertBolt11('lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl2pkx2ctnv5sxxmmwwd5kgetjypeh2ursdae8g6twvus8g6rfwvs8qun0dfjkxaq8rkx3yf5tcsyz3d73gafnh3cax9rn449d9p5uxz9ezhhypd0elx87sjle52x86fux2ypatgddc6k63n7erqz25le42c4u4ecky03ylcqca784w')).toMatch(/^ln/i);
    expect(assertHttpUrl('https://lnbits.example/')).toBe('https://lnbits.example/');
    expect(assertAdminKey('abcd1234secret')).toBe('abcd1234secret');
  });

  it('rejects empty, malformed, and oversized inputs', () => {
    expect(() => assertWalletName('   ')).toThrow('required');
    expect(() => assertWalletId('bad id')).toThrow('invalid');
    expect(() => assertMemo('x'.repeat(257))).toThrow('256');
    expect(() => assertPaymentHash('zz')).toThrow('invalid');
    expect(() => assertBolt11('bitcoin:abc')).toThrow('invalid');
    expect(() => assertHttpUrl('ftp://lnbits.example')).toThrow('invalid');
    expect(() => assertAdminKey('short')).toThrow('invalid');
  });
});
