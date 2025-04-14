export * from './lnbits';

// Re-export common types
export interface LightningConfig {
  apiUrl: string;
  adminKey: string;
}

export interface Invoice {
  paymentHash: string;
  paymentRequest: string;
  amount: number;
  memo: string;
}

export interface PaymentStatus {
  paid: boolean;
  preimage?: string;
  paymentHash: string;
}

export interface WalletBalance {
  balance: number;
  currency: string;
} 