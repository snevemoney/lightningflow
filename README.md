# Lightning Platform

A professional Lightning Network platform for managing Bitcoin payments, wallets, and AI agents.

## Project Structure

```
/apps
  /web              → Frontend for clients (LN dashboards, QR tips)
  /admin            → Admin dashboard for node management
  /partner-portal   → Partner portal for liquidity providers
/packages
  /lightning-core   → Lightning Network integration layer
  /auth            → Authentication and authorization
  /agents          → AI agents for automation
  /ui              → Shared UI components
/scripts           → Utility scripts
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

3. Start development server:
```bash
pnpm dev
```

## Core Features

- 💼 Modular codebase (Node + Dashboard + AI Agents)
- 🧠 Smart UX for clients, employees, and partners
- ⚡ Real-time Bitcoin infrastructure
- 🧩 Extensible plugin system

## Development

- Uses TypeScript for type safety
- Monorepo managed with Turborepo
- Package management with pnpm
- Component library built with ShadcnUI

## License

Private - All rights reserved 