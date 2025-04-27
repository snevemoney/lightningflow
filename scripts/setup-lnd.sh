#!/bin/bash

# Lightning Platform - LND Setup Script
# ---------------------------------------

echo "🔍 Checking system requirements..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
else
    echo "✅ Docker is installed."
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
else
    echo "✅ Docker Compose is installed."
fi

# Check disk space (at least 10GB free)
FREE_SPACE=$(df -h . | awk 'NR==2 {print $4}' | sed 's/Gi//')
if [[ $FREE_SPACE -lt 10 ]]; then
    echo "⚠️ Warning: Less than 10GB of free space available. LND may not function properly."
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
else
    echo "✅ Sufficient disk space available."
fi

# Create LND data directory if it doesn't exist
mkdir -p lnd-data
echo "✅ LND data directory created."

# Start LND using Docker Compose
echo "🚀 Starting LND in Neutrino mode (testnet)..."
docker-compose -f docker-compose.lnd.yml up -d

# Wait for LND to start
echo "⏳ Waiting for LND to start..."
sleep 5

# Check if LND is running
if docker ps | grep -q "lightning-platform-lnd"; then
    echo "✅ LND is running."
else
    echo "❌ LND failed to start. Check the logs with 'docker logs lightning-platform-lnd'."
    exit 1
fi

echo "🔐 Creating a new LND wallet (or connecting to existing one)..."
echo "⚠️ Important: Save the seed phrase securely! It's your only way to recover funds."
echo "⚠️ Note: This is running on testnet - do not send real Bitcoin to this wallet."

# Instructions for creating or unlocking a wallet
echo
echo "To create a new wallet, run:"
echo "docker exec -it lightning-platform-lnd lncli --network=testnet create"
echo
echo "To unlock an existing wallet, run:"
echo "docker exec -it lightning-platform-lnd lncli --network=testnet unlock"
echo
echo "Once your wallet is ready, get your connection info with:"
echo "docker exec -it lightning-platform-lnd lncli --network=testnet getinfo"
echo
echo "📝 For more commands, refer to the LND documentation: https://github.com/lightningnetwork/lnd"
echo
echo "🔎 To check LND logs, run:"
echo "docker logs -f lightning-platform-lnd"

echo
echo "✨ LND setup complete! Your Lightning node is running in Neutrino mode on testnet."
echo "🌐 REST API is available at: https://localhost:8080"
echo "🔌 gRPC API is available at: localhost:10009" 