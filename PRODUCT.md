# Product

## Register

Registration creates a public on-chain SME issuer or buyer profile. New profiles start unverified; the registry administrator must verify an address before it can use gated protocol actions. Registration is not identity verification or commercial due diligence.

**SME (Issuer) flow:**

1. Install the [Freighter](https://freighter.app) browser extension and switch it to Testnet.
2. Visit the app and click **Connect Wallet** — Freighter handles the SEP-10 authentication challenge automatically.
3. On first connection the app detects an unverified address and surfaces an onboarding prompt. Click **Register as SME**, enter test profile metadata and sign the `register_issuer` transaction with Freighter. Registration stores profile data publicly on-chain; a registry administrator must verify the profile separately.

**Buyer flow:**

The SME shares the app with the intended buyer. The buyer connects a Stellar wallet and registers a `register_buyer` profile. The profile must be verified before gated actions are available.

**Liquidity Provider (LP) flow:**

Liquidity providers connect a Stellar wallet to deposit USDC into the pool and receive LP shares. Deposited funds may be used to finance eligible invoices and can be subject to withdrawal limits.

**Profile verification:**

The registry contract stores a `Profile` struct with `role` (`Issuer` or `Buyer`), a `verified` flag, `registered_at` timestamp, and arbitrary `metadata`. The admin can revoke verification by setting `verified = false`; revoked addresses cannot participate in new gated invoice transactions. Profile metadata is public and must not contain sensitive information.

## Users

- **SMEs:** Businesses seeking to understand whether a recorded invoice can be listed for financing, what discount is proposed and what proceeds would result if it is funded.
- **Liquidity providers:** Participants who review invoice terms, pool utilization, withdrawal constraints and risk before supplying USDC. Returns are variable and losses are possible.
- **Trade buyers:** Counterparties who confirm delivery and repay invoices according to the recorded terms.

## Product Purpose

ClearLedger is an experimental trade finance protocol on Stellar Soroban. It coordinates invoice records, buyer confirmations, shared USDC pool funding and repayment settlement. The project is a testnet prototype and does not guarantee financing or repayment.

## Brand and presentation

- **Financial clarity:** State the product’s role, network, current development stage and risks plainly.
- **Calm and professional:** Use restrained typography, a clear information hierarchy and consistent actions.
- **Evidence over hype:** Show live protocol data only when available; do not use fabricated metrics, customer logos, testimonials or guarantees.

## Anti-references

- **Playful DeFi dashboards**: Pastel colors, rounded bubble graphics, cartoonish illustrations.
- **Saturated SaaS templates**: Cream backgrounds, tiny tracked uppercase eyebrows, generic card lists.
- **Low-contrast text**: Hard-to-read gray text.

## Design Principles

1. **Financial precision:** Use monospaced type for amounts, addresses and transaction identifiers.
2. **Clear state:** Explain each invoice status and what action is available next.
3. **Risk visibility:** Keep discounts, repayment conditions, liquidity limits and testnet status close to relevant actions.
4. **Accessible workflows:** Keep the SME and buyer actions usable on mobile.

## Accessibility & Inclusion

- Body text meets WCAG AA/AAA standards against `#080c10` void background.
- Direct copy buttons for all cryptographic strings.
- Reduced motion fallback (instant swaps, zero parallax or long drifts).
