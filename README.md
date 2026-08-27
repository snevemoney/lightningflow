<!-- HYGIENE: paste at top of README.md -->
# lightningflow (GH stub)

> **Status:** SUPERSEDED  
> **Lane:** Legacy  
> **Role:** Tiny unfinished monorepo stub.  
> **This is NOT:** the live parked LightningFlow on evenslouis.ca  
> **Canonical home:** Superseded by n8n-cursor apps/lightningflow

---


# Lightning Platform

A professional Lightning Network platform for managing Bitcoin payments, wallets, and AI agents.

## Project Structure

```
/apps
  /admin            → Admin dashboard (cookie gate; fail-closed without ADMIN_ACCESS_TOKEN)
/packages
  /lightning-core   → Lightning Network integration layer
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables (no sample secrets are provided):
```bash
cp apps/admin/.env.example apps/admin/.env.local
```

Set `ADMIN_ACCESS_TOKEN` to a value you generate. The admin UI denies access if it is missing or empty.

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
