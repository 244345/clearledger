# ClearLedger

**Invoice finance infrastructure, built for Stellar.**

ClearLedger is an open-source project exploring how Stellar and Soroban can make invoice finance more transparent and programmable. It brings business onboarding, invoice state, liquidity pool accounting, and settlement coordination into one developer-ready stack: a web application, TypeScript SDK and CLI, Go indexer/API, and Soroban contracts.

[Open the testnet app](https://clearledger-three.vercel.app) · [Read the docs](docs/README.md) · [Explore the contracts](https://github.com/Stellar-Clear/clearledger-contracts) · [View contract deployments](https://github.com/Stellar-Clear/clearledger-contracts#deployed-contracts-stellar-testnet)

## The workflow

1. **Onboard participants.** Register SME issuers and trade buyers through the participant registry.
2. **Create invoice records.** Issuers record invoice terms and progress through explicit on-chain lifecycle states.
3. **Coordinate liquidity.** USDC pool contracts account for liquidity, invoice funding, LP shares, and repayment flows.
4. **Follow activity.** The Go indexer consumes Soroban events for API access and application views.

The protocol records submitted transaction state. It does not independently verify commercial documents, guarantee that an invoice will be funded, or guarantee repayment or returns.

## Project map

| Path | What lives here |
| --- | --- |
| `apps/web/` | Next.js application and public product experience |
| `packages/sdk/`, `packages/sdk-react/` | TypeScript contract clients and React hooks |
| `packages/cli/` | Developer command-line tools |
| `indexer/` | Go Soroban event indexer and HTTP API |
| `examples/` | SDK and integration examples |
| `docs/` | Protocol, user, and developer documentation |

Soroban contract source and deployment details live in the [companion contracts repository](https://github.com/Stellar-Clear/clearledger-contracts).

## Run locally

Requirements: Node.js 20+, pnpm 9+, and Docker for the complete local stack. For wallet interactions, install [Freighter](https://www.freighter.app/) and select Stellar Testnet.

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

The web app starts at `http://localhost:3000`. For the web app, Go indexer, and PostgreSQL together:

```bash
cp .env.docker.example .env.docker
docker compose --env-file .env.docker up --build
```

The hosted app is a testnet web deployment. The Go API/indexer must be run separately; configure `NEXT_PUBLIC_API_BASE_URL` for the API endpoint when using API-backed features. For the complete variable reference, see [environment configuration](docs/developer-guide/environment-variables.md).

## Development

From the repository root, the main checks are `pnpm build`, `pnpm lint`, `pnpm typecheck`, and `pnpm test`. Run Go checks from `indexer/` with `go test ./...` and `go vet ./...`.

Start with the [local setup guide](docs/developer-guide/local-setup.md), [architecture overview](docs/ARCHITECTURE.md), and [contribution guide](docs/contributing/how-to-contribute.md). For protocol details, see [how it works](docs/introduction/how-it-works.md), the [invoice lifecycle](docs/protocol/invoice-lifecycle.md), and the [economic model](docs/protocol/economic-model.md).

## Network and security status

ClearLedger is an experimental Stellar Testnet prototype, not a production financial service. The contracts have not been formally audited, and testnet assets have no promised redemption value. The current deployment is not suitable for real funds. Review the [contract limitations](https://github.com/Stellar-Clear/clearledger-contracts/blob/main/docs/LIMITATIONS.md) and [security policy](https://github.com/Stellar-Clear/clearledger-contracts/blob/main/SECURITY.md) before integrating.

Use testnet wallets and assets only. Never put private keys or recovery phrases in environment files or source control.
