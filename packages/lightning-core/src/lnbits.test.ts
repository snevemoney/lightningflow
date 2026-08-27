import { LightningService } from './lnbits';

const createWallet = jest.fn();
const createInvoice = jest.fn();
const checkInvoice = jest.fn();
const getWalletDetails = jest.fn();
const payInvoice = jest.fn();

jest.mock('./lnbits-sdk', () => ({
  LNBitsClient: jest.fn().mockImplementation(() => ({
    createWallet,
    createInvoice,
    checkInvoice,
    getWalletDetails,
    payInvoice
  }))
}));

describe('LightningService', () => {
  const service = new LightningService(
    'https://lnbits.example',
    'admin-key-value'
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fails closed when url or admin key is missing', () => {
    expect(() => new LightningService('', 'admin-key-value')).toThrow(
      'api url is required'
    );
    expect(() => new LightningService('https://lnbits.example', '')).toThrow(
      'admin key is required'
    );
  });

  it('validates createInvoice inputs and returns typed sats', async () => {
    createInvoice.mockResolvedValue({
      payment_hash: 'ab'.repeat(16),
      payment_request: 'lnbc1testinvoice'
    });
    const invoice = await service.createInvoice('wallet1', 100n, 'coffee');
    expect(invoice.amount).toBe(100n);
    expect(createInvoice).toHaveBeenCalledWith({
      amount: 100,
      memo: 'coffee',
      out: false
    });
    await expect(service.createInvoice('wallet1', 0n, 'coffee')).rejects.toThrow(
      'at least 1 sat'
    );
  });

  it('returns wallet balance as bigint', async () => {
    getWalletDetails.mockResolvedValue({ balance: 42 });
    await expect(service.getWalletBalance('wallet1')).resolves.toEqual({
      balance: 42n,
      currency: 'sats'
    });
  });

  it('does not hardcode payInvoice paid=true', async () => {
    payInvoice.mockResolvedValue({
      payment_hash: 'ab'.repeat(16),
      paid: false
    });
    await expect(
      service.payInvoice('wallet1', 'lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl')
    ).resolves.toMatchObject({ paid: false });
  });

  it('treats a preimage as payment confirmation', async () => {
    payInvoice.mockResolvedValue({
      payment_hash: 'ab'.repeat(16),
      preimage: 'ff'.repeat(16)
    });
    await expect(
      service.payInvoice('wallet1', 'lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl')
    ).resolves.toMatchObject({ paid: true });
  });

  it('does not retry payInvoice', async () => {
    payInvoice.mockRejectedValue(Object.assign(new Error('timeout'), { status: 503 }));
    await expect(
      service.payInvoice('wallet1', 'lnbc1pvjluezpp5qqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqqqsyqcyq5rqwzqfqypqdpl')
    ).rejects.toThrow('Failed to pay invoice');
    expect(payInvoice).toHaveBeenCalledTimes(1);
  });
});
