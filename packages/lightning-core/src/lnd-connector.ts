/**
 * LND Connector - Utility for connecting to Lightning Network Daemon
 */

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';

// Define default LND connection parameters
const DEFAULT_LND_HOST = process.env.LND_HOST || 'localhost:10009';
const DEFAULT_MACAROON_PATH = process.env.LND_MACAROON_PATH || path.join(process.cwd(), 'lnd-data/data/chain/bitcoin/testnet/admin.macaroon');
const DEFAULT_TLS_CERT_PATH = process.env.LND_TLS_CERT_PATH || path.join(process.cwd(), 'lnd-data/tls.cert');

// LND connector class
export class LndConnector {
  private lnrpc: any;
  private invoicesrpc: any;
  private routerrpc: any;
  private client: any;
  private invoicesClient: any;
  private routerClient: any;
  private isConnected: boolean = false;

  constructor(
    private host: string = DEFAULT_LND_HOST,
    private macaroonPath: string = DEFAULT_MACAROON_PATH,
    private tlsCertPath: string = DEFAULT_TLS_CERT_PATH
  ) {}

  /**
   * Initialize connection to LND
   */
  async connect(): Promise<void> {
    try {
      // Check if files exist
      await this.checkFiles();

      // Load LND proto files
      const packageDefinition = await protoLoader.load(
        [
          path.join(__dirname, '../protos/lightning.proto'),
          path.join(__dirname, '../protos/invoices.proto'),
          path.join(__dirname, '../protos/router.proto'),
        ],
        {
          keepCase: true,
          longs: String,
          enums: String,
          defaults: true,
          oneofs: true,
        }
      );

      // Load gRPC packages
      const lnrpcProto: any = grpc.loadPackageDefinition(packageDefinition);
      this.lnrpc = lnrpcProto.lnrpc;
      this.invoicesrpc = lnrpcProto.invoicesrpc;
      this.routerrpc = lnrpcProto.routerrpc;

      // Read macaroon and TLS certificate
      const macaroon = fs.readFileSync(this.macaroonPath).toString('hex');
      const sslCreds = grpc.credentials.createSsl(fs.readFileSync(this.tlsCertPath));

      // Create metadata with macaroon
      const metadata = new grpc.Metadata();
      metadata.add('macaroon', macaroon);
      const macaroonCreds = grpc.credentials.createFromMetadataGenerator((params, callback) => {
        callback(null, metadata);
      });

      // Combine credentials
      const credentials = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);

      // Create clients
      this.client = new this.lnrpc.Lightning(this.host, credentials);
      this.invoicesClient = new this.invoicesrpc.Invoices(this.host, credentials);
      this.routerClient = new this.routerrpc.Router(this.host, credentials);

      // Verify connection
      await this.getInfo();
      this.isConnected = true;
      console.log('Successfully connected to LND node');
    } catch (error) {
      console.error('Failed to connect to LND:', error);
      this.isConnected = false;
      throw error;
    }
  }

  /**
   * Check if required files exist
   */
  private async checkFiles(): Promise<void> {
    const accessAsync = promisify(fs.access);
    
    try {
      await accessAsync(this.macaroonPath, fs.constants.R_OK);
    } catch (error) {
      throw new Error(`Cannot read macaroon file at ${this.macaroonPath}. Make sure LND is properly set up.`);
    }

    try {
      await accessAsync(this.tlsCertPath, fs.constants.R_OK);
    } catch (error) {
      throw new Error(`Cannot read TLS certificate at ${this.tlsCertPath}. Make sure LND is properly set up.`);
    }
  }

  /**
   * Get LND node info
   */
  async getInfo(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.getInfo({}, (err: Error | null, response: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  /**
   * Create a new invoice
   */
  async createInvoice(value: number, memo: string = '', expiry: number = 3600): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.addInvoice(
        {
          value: value.toString(),
          memo,
          expiry,
        },
        (err: Error | null, response: any) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(response);
        }
      );
    });
  }

  /**
   * Pay an invoice
   */
  async payInvoice(paymentRequest: string, amount?: number): Promise<any> {
    return new Promise((resolve, reject) => {
      const request: any = { payment_request: paymentRequest };
      if (amount) {
        request.amt = amount.toString();
      }

      this.client.sendPaymentSync(request, (err: Error | null, response: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  /**
   * Get wallet balance
   */
  async getWalletBalance(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.walletBalance({}, (err: Error | null, response: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  /**
   * Get channel balance
   */
  async getChannelBalance(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.channelBalance({}, (err: Error | null, response: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  /**
   * Get list of transactions
   */
  async getTransactions(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client.getTransactions({}, (err: Error | null, response: any) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(response);
      });
    });
  }

  /**
   * Close connection
   */
  close(): void {
    if (this.client) {
      grpc.closeClient(this.client);
    }
    if (this.invoicesClient) {
      grpc.closeClient(this.invoicesClient);
    }
    if (this.routerClient) {
      grpc.closeClient(this.routerClient);
    }
    this.isConnected = false;
  }
}

// Export default instance
const lndConnector = new LndConnector();
export default lndConnector; 