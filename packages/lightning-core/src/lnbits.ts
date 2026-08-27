import { LNBitsClient } from './lnbits-sdk';
import { withBackoff } from './retry';
import { assertPositiveSats, satsFromApi, satsToApiNumber } from './sats';
import {
  assertAdminKey,
  assertBolt11,
  assertHttpUrl,
  assertMemo,
  assertPaymentHash,
  assertWalletId,
  assertWalletName,
  errorMessage
} from './validate';
import type { Invoice, PaymentStatus, WalletBalance } from './types';

export interface WalletConfig {
  id: string;
  adminKey: string;
  invoiceKey: string;
  name: string;
}

type LnBitsWallet = {
  id: string;
  adminkey: string;
  inkey: string;
};

type LnBitsInvoice = {
  payment_hash: string;
  payment_request: string;
};

type LnBitsInvoiceStatus = {
  paid: boolean;
  preimage?: string;
};

type LnBitsWalletDetails = {
  balance: unknown;
};

type LnBitsPayment = {
  payment_hash?: string;
  preimage?: string;
  paid?: boolean;
};

interface LnBitsClientLike {
  createWallet(args: { name: string; adminKey: boolean }): Promise<LnBitsWallet>;
  createInvoice(args: {
    amount: number;
    memo: string;
    out: boolean;
  }): Promise<LnBitsInvoice>;
  checkInvoice(paymentHash: string): Promise<LnBitsInvoiceStatus>;
  getWalletDetails(walletId: string): Promise<LnBitsWalletDetails>;
  payInvoice(args: { bolt11: string; out: boolean }): Promise<LnBitsPayment>;
}

export class LightningService {
  private client: LnBitsClientLike;

  constructor(apiUrl: string, adminKey: string) {
    const url = assertHttpUrl(apiUrl);
    const key = assertAdminKey(adminKey);
    this.client = new LNBitsClient({
      baseURL: url,
      adminKey: key
    });
  }

  async createWallet(name: string): Promise<WalletConfig> {
    const walletName = assertWalletName(name);
    try {
      const wallet = await withBackoff(() =>
        this.client.createWallet({
          name: walletName,
          adminKey: true
        })
      );

      return {
        id: wallet.id,
        adminKey: wallet.adminkey,
        invoiceKey: wallet.inkey,
        name: walletName
      };
    } catch (error) {
      throw new Error(`Failed to create wallet: ${errorMessage(error)}`);
    }
  }

  async createInvoice(
    walletId: string,
    amount: bigint,
    memo: string
  ): Promise<Invoice> {
    assertWalletId(walletId);
    const sats = assertPositiveSats(amount, 'invoice amount');
    const invoiceMemo = assertMemo(memo);
    try {
      const invoice = await withBackoff(() =>
        this.client.createInvoice({
          amount: satsToApiNumber(sats, 'invoice amount'),
          memo: invoiceMemo,
          out: false
        })
      );

      return {
        paymentHash: invoice.payment_hash,
        paymentRequest: invoice.payment_request,
        amount: sats,
        memo: invoiceMemo
      };
    } catch (error) {
      throw new Error(`Failed to create invoice: ${errorMessage(error)}`);
    }
  }

  async checkInvoice(paymentHash: string): Promise<PaymentStatus> {
    const hash = assertPaymentHash(paymentHash);
    try {
      const status = await withBackoff(() => this.client.checkInvoice(hash));
      return {
        paid: status.paid === true,
        preimage: status.preimage,
        paymentHash: hash
      };
    } catch (error) {
      throw new Error(`Failed to check invoice: ${errorMessage(error)}`);
    }
  }

  async getWalletBalance(walletId: string): Promise<WalletBalance> {
    const id = assertWalletId(walletId);
    try {
      const details = await withBackoff(() => this.client.getWalletDetails(id));
      return {
        balance: satsFromApi(details.balance, 'wallet balance'),
        currency: 'sats'
      };
    } catch (error) {
      throw new Error(`Failed to get wallet balance: ${errorMessage(error)}`);
    }
  }

  async payInvoice(walletId: string, bolt11: string): Promise<PaymentStatus> {
    assertWalletId(walletId);
    const invoice = assertBolt11(bolt11);
    try {
      // No retry: pay is not idempotent and could double-spend.
      const payment = await this.client.payInvoice({
        bolt11: invoice,
        out: true
      });
      if (!payment.payment_hash) {
        throw new Error('Payment not confirmed: missing payment hash');
      }
      const paid = payment.paid === true || Boolean(payment.preimage);
      return {
        paid,
        paymentHash: payment.payment_hash,
        preimage: payment.preimage
      };
    } catch (error) {
      throw new Error(`Failed to pay invoice: ${errorMessage(error)}`);
    }
  }
}
