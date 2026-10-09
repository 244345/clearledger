# Getting Started as an SME

ClearLedger is an experimental Stellar Testnet prototype for exploring an invoice-finance workflow. It does not promise financing or repayment. Use testnet assets only.

You will need:

1. A Stellar-compatible wallet such as [Freighter](https://freighter.app).
2. Testnet XLM to authorize network transactions. Stellar’s [Friendbot](https://friendbot.stellar.org) can fund test accounts.
3. Testnet USDC if your test scenario includes invoice repayment; use the testnet asset shown in the app.

## Connect and register

Open the local app, switch Freighter to **Testnet**, then connect your wallet. Register an SME issuer profile from **Profile**. A designated protocol administrator must separately verify the profile before gated actions are available.

Profile metadata is written to the public Stellar ledger. For this testnet preview, use test data and do not enter real tax identifiers, personal contact details or confidential business information.

## Add a buyer and prepare an invoice

Your buyer needs a registered and verified buyer profile. In the SME workspace, create an invoice with the buyer’s wallet address, face value and due date. Review the proposed discount and other terms before listing it. Listing does not guarantee that the pool will fund the invoice.

See [Create and list an invoice](create-your-first-invoice.md) for the detailed flow and limitations.
