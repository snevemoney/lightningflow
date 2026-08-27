export interface LNBitsClientConfig {
  baseURL: string;
  adminKey: string;
}

export class LNBitsClient {
  private readonly baseURL: string;
  private readonly adminKey: string;

  constructor(config: LNBitsClientConfig) {
    this.baseURL = config.baseURL.replace(/\/+$/, '');
    this.adminKey = config.adminKey;
  }

  async createWallet(args: { name: string; adminKey: boolean }): Promise<{
    id: string;
    adminkey: string;
    inkey: string;
  }> {
    return this.request('/usermanager/api/v1/wallets', {
      method: 'POST',
      body: JSON.stringify({
        wallet_name: args.name,
        admin_id: args.adminKey
      })
    });
  }

  async createInvoice(args: {
    amount: number;
    memo: string;
    out: boolean;
  }): Promise<{ payment_hash: string; payment_request: string }> {
    return this.request('/api/v1/payments', {
      method: 'POST',
      body: JSON.stringify({
        amount: args.amount,
        memo: args.memo,
        out: args.out
      })
    });
  }

  async checkInvoice(
    paymentHash: string
  ): Promise<{ paid: boolean; preimage?: string }> {
    return this.request(`/api/v1/payments/${encodeURIComponent(paymentHash)}`);
  }

  async getWalletDetails(
    walletId: string
  ): Promise<{ balance: unknown }> {
    return this.request(
      `/api/v1/wallet/${encodeURIComponent(walletId)}`
    );
  }

  async payInvoice(args: {
    bolt11: string;
    out: boolean;
  }): Promise<{ payment_hash?: string; preimage?: string; paid?: boolean }> {
    return this.request('/api/v1/payments', {
      method: 'POST',
      body: JSON.stringify({
        bolt11: args.bolt11,
        out: args.out
      })
    });
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseURL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': this.adminKey,
        ...(init?.headers ?? {})
      }
    });
    if (!response.ok) {
      const error = new Error(`LNBits request failed: ${response.status}`);
      (error as { status?: number }).status = response.status;
      throw error;
    }
    return (await response.json()) as T;
  }
}
