# Lightning Node Setup for Lightning Platform

This guide helps you set up a Lightning Network node for your Lightning Platform project. The setup uses LND (Lightning Network Daemon) in Neutrino mode, which is lightweight and doesn't require a full Bitcoin node.

## 🔍 Prerequisites Check

Before proceeding, ensure your system meets the following requirements:

✅ **Node.js**: v14 or higher (detected: v20.19.0)  
✅ **Docker**: Latest version (detected: v28.0.4)  
✅ **Disk Space**: At least 10GB free space (detected: 247GB available)  
✅ **Memory**: At least 2GB RAM  

## 🚀 Quick Setup

Follow these steps to set up your Lightning node:

1. Run the setup script to start LND in Docker:

```bash
./scripts/setup-lnd.sh
```

2. Create a new wallet or unlock an existing one:

```bash
# Create a new wallet
docker exec -it lightning-platform-lnd lncli --network=testnet create

# OR unlock an existing wallet
docker exec -it lightning-platform-lnd lncli --network=testnet unlock
```

3. Verify your node is running:

```bash
docker exec -it lightning-platform-lnd lncli --network=testnet getinfo
```

## 🔌 Integrating with Your Application

The Lightning Platform codebase already includes a connector utility at `packages/lightning-core/src/lnd-connector.ts`. This provides an easy way to interact with your LND node.

### Example Usage

```typescript
import lndConnector from '@lightning-platform/core/lnd-connector';

// Connect to LND
await lndConnector.connect();

// Get node info
const info = await lndConnector.getInfo();
console.log('Node pubkey:', info.identity_pubkey);

// Create invoice (100,000 satoshis)
const invoice = await lndConnector.createInvoice(100000, 'Payment for services');
console.log('Invoice:', invoice.payment_request);

// Get wallet balance
const balance = await lndConnector.getWalletBalance();
console.log('Balance:', balance.total_balance);
```

## 🪙 Getting Testnet Coins

Since this setup uses the Bitcoin testnet, you'll need testnet coins to experiment:

1. Get a testnet Bitcoin address:

```bash
docker exec -it lightning-platform-lnd lncli --network=testnet newaddress p2wkh
```

2. Visit a testnet faucet to receive coins:
   - https://bitcoinfaucet.uo1.net/
   - https://testnet-faucet.mempool.co/

3. Once you have testnet bitcoins, open a channel with a well-connected node:

```bash
# Find a node to connect to
docker exec -it lightning-platform-lnd lncli --network=testnet describegraph | jq '.nodes[0]'

# Connect to a node
docker exec -it lightning-platform-lnd lncli --network=testnet connect <NODE_PUBKEY>@<NODE_IP>:<PORT>

# Open a channel (fund with 500,000 satoshis)
docker exec -it lightning-platform-lnd lncli --network=testnet openchannel <NODE_PUBKEY> 500000
```

## 🛠️ Maintenance Commands

Here are some helpful commands for managing your LND node:

```bash
# Stop LND
docker-compose -f docker-compose.lnd.yml down

# Start LND
docker-compose -f docker-compose.lnd.yml up -d

# Check LND logs
docker logs -f lightning-platform-lnd

# Backup your wallet (important!)
docker exec -it lightning-platform-lnd lncli --network=testnet exportchanbackup --all
```

## 🚨 Important Security Notes

1. **Testnet Only**: This setup is intended for development and testing. Do not use it for mainnet without proper security considerations.

2. **Backup Your Seed**: When creating a wallet, you'll receive a 24-word seed phrase. This is the ONLY way to recover your funds if something goes wrong. Store it securely!

3. **Backup Channel States**: Regularly back up your channel.backup file to prevent fund loss.

4. **Node Privacy**: The current setup exposes LND APIs on all interfaces. For production, restrict access to specific IPs.

## 📚 Moving to Production

When you're ready to move to production (mainnet), consider these changes:

1. Update the Docker Compose configuration to use mainnet:
   - Change `--bitcoin.testnet` to `--bitcoin.mainnet`
   - Remove `--neutrino.connect=faucet.lightning.community`
   - Add proper mainnet neutrino servers or consider running a full Bitcoin node

2. Enhance security:
   - Use proper TLS certificates
   - Restrict API access to specific IPs
   - Use a more secure wallet mechanism
   - Enable proper authentication for APIs

3. Use a dedicated server with:
   - Regular backups
   - Monitoring system
   - High uptime
   - Sufficient disk space (1TB+ for full node)

## 📝 Troubleshooting

If you encounter issues:

1. **Cannot connect to LND**:
   - Check if Docker containers are running
   - Verify port mappings are correct
   - Ensure firewall isn't blocking connections

2. **Wallet locked error**:
   - Unlock the wallet with `lncli unlock`

3. **Cannot open channels**:
   - Ensure you have enough testnet bitcoins
   - Check if your node is synced (`getinfo` should show `synced_to_chain: true`)

## 🔄 Upgrading LND

To upgrade LND in the future:

1. Stop the current LND container
2. Update the Docker image version in docker-compose.lnd.yml
3. Start LND again
4. Unlock your wallet

Note: Always back up your wallet and channel.backup file before upgrading! 