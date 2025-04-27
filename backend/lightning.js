// backend/lightning.js
import fs from 'fs';
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

// Load environment variables
const LND_GRPC_HOST = process.env.LND_GRPC_HOST || 'localhost:10009';
const LND_MACAROON_PATH = process.env.LND_MACAROON_PATH || path.join(process.cwd(), 'lnd-data/data/chain/bitcoin/testnet/admin.macaroon');
const LND_TLS_CERT_PATH = process.env.LND_TLS_CERT_PATH || path.join(process.cwd(), 'lnd-data/tls.cert');

// Proto file for LND (make sure you have lnrpc.proto or download it)
const PROTO_PATH = path.resolve('backend', 'proto', 'rpc.proto');

// Load the LND gRPC definitions
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const lnrpc = grpc.loadPackageDefinition(packageDefinition).lnrpc;

// Read TLS cert and macaroon
const macaroon = fs.readFileSync(LND_MACAROON_PATH).toString('hex');
const tlsCert = fs.readFileSync(LND_TLS_CERT_PATH);

// Create SSL credentials and metadata
const sslCreds = grpc.credentials.createSsl(tlsCert);
const macaroonCreds = grpc.credentials.createFromMetadataGenerator((args, callback) => {
  const metadata = new grpc.Metadata();
  metadata.add('macaroon', macaroon);
  callback(null, metadata);
});
const creds = grpc.credentials.combineChannelCredentials(sslCreds, macaroonCreds);

// Create Lightning client
const lightning = new lnrpc.Lightning(LND_GRPC_HOST, creds);

// Export useful functions
export async function getInfo() {
  return new Promise((resolve, reject) => {
    lightning.getInfo({}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

export async function createInvoice(amount, memo = '') {
  return new Promise((resolve, reject) => {
    const request = {
      memo,
      value: amount, // in satoshis
    };
    lightning.addInvoice(request, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

export async function payInvoice(paymentRequest) {
  return new Promise((resolve, reject) => {
    const request = {
      payment_request: paymentRequest,
    };
    lightning.sendPaymentSync(request, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
}

export async function getBalance() {
  return new Promise((resolve, reject) => {
    lightning.walletBalance({}, (err, response) => {
      if (err) {
        reject(err);
      } else {
        resolve(response);
      }
    });
  });
} 