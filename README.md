# ClearLedger

**Invoice finance infrastructure for businesses, trade buyers and liquidity providers.**

ClearLedger is an open-source Stellar testnet prototype that coordinates the key steps of invoice finance in one on-chain workflow. SMEs record trade invoices, buyers confirm delivery and settle obligations, and liquidity providers can review invoice terms before supplying USDC to a shared pool.

## What the protocol does

- Registers SME issuers and trade buyers, with protocol verification required before gated actions.
- Records invoice terms and lifecycle changes, including listing, financing, delivery confirmation and repayment.
- Coordinates pool accounting and invoice settlement through Soroban contracts for registry, invoice, pool and escrow functions.
- Provides a web application, TypeScript SDKs and CLI, Go event indexer/API, and integration examples.

The protocol records transaction state; it does not verify off-chain commercial documents by itself or guarantee that an invoice will be funded or repaid.

## Project status

This repository is a public testnet prototype, not a production financial service. The contracts have not been formally audited. Testnet assets have no promised redemption value. Invoice defaults, limited withdrawal liquidity, software defects and smart contract failures can result in loss. Do not use real funds.

## Run locally

Requirements: Node.js 20+, pnpm 9+, Docker, and Freighter configured for Stellar Testnet.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The web app runs at `http://localhost:3000`. To run the web app, indexer and PostgreSQL together:

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up --build
```

Use testnet wallets and assets only. Keep private keys and recovery phrases out of environment files and source control.

## Repository layout

- `apps/web/` — Next.js application
- `packages/sdk/`, `packages/sdk-react/` — TypeScript contract clients and React hooks
- `packages/cli/` — command-line interface
- `indexer/` — Go Soroban event indexer and HTTP API
- `examples/` — SDK and integration examples
- `docs/` — protocol, user and developer documentation

Soroban contract source is maintained in the companion contracts repository.

## Development and contribution

See [local setup](docs/developer-guide/local-setup.md), [architecture](docs/ARCHITECTURE.md), and [contribution guidance](docs/contributing/how-to-contribute.md). Core checks include `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm test`; run Go checks from `indexer/` with `go test ./...` and `go vet ./...`.
