import { LNBitsClient } from 'lnbits';

export interface WalletConfig {
  id: string;
  adminKey: string;
  invoiceKey: string;
  name: string;
}

export class LightningService {
  private client: LNBitsClient;
  
  constructor(apiUrl: string, adminKey: string) {
    this.client = new LNBitsClient({
      baseURL: apiUrl,
      adminKey: adminKey
    });
  }

  async createWallet(name: string): Promise<WalletConfig> {
    try {
      const wallet = await this.client.createWallet({
        name: name,
        adminKey: true
      });

      return {
        id: wallet.id,
        adminKey: wallet.adminkey,
        invoiceKey: wallet.inkey,
        name: name
      };
    } catch (error) {
      throw new Error(`Failed to create wallet: ${error.message}`);
    }
  }

  async createInvoice(walletId: string, amount: number, memo: string) {
    try {
      const invoice = await this.client.createInvoice({
        amount: amount,
        memo: memo,
        out: false
      });

      return {
        paymentHash: invoice.payment_hash,
        paymentRequest: invoice.payment_request,
        amount: amount,
        memo: memo
      };
    } catch (error) {
      throw new Error(`Failed to create invoice: ${error.message}`);
    }
  }

  async checkInvoice(paymentHash: string) {
    try {
      const status = await this.client.checkInvoice(paymentHash);
      return {
        paid: status.paid,
        preimage: status.preimage,
        paymentHash: paymentHash
      };
    } catch (error) {
      throw new Error(`Failed to check invoice: ${error.message}`);
    }
  }

  async getWalletBalance(walletId: string) {
    try {
      const balance = await this.client.getWalletDetails(walletId);
      return {
        balance: balance.balance,
        currency: 'sats'
      };
    } catch (error) {
      throw new Error(`Failed to get wallet balance: ${error.message}`);
    }
  }

  async payInvoice(walletId: string, bolt11: string) {
    try {
      const payment = await this.client.payInvoice({
        bolt11: bolt11,
        out: true
      });
      return {
        paid: true,
        paymentHash: payment.payment_hash,
        preimage: payment.preimage
      };
    } catch (error) {
      throw new Error(`Failed to pay invoice: ${error.message}`);
    }
  }
} 