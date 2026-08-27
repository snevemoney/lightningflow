/** Shared Lightning types used by LightningService. */
export interface LightningConfig {
  apiUrl: string;
  adminKey: string;
}

export interface Invoice {
  paymentHash: string;
  paymentRequest: string;
  amount: bigint;
  memo: string;
}

export interface PaymentStatus {
  paid: boolean;
  preimage?: string;
  paymentHash: string;
}

export interface WalletBalance {
  balance: bigint;
  currency: string;
}
