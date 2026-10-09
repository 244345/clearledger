# What Is ClearLedger?

ClearLedger is an open-source invoice finance prototype built on Stellar Soroban. It coordinates SMEs, their trade buyers and liquidity providers around an invoice’s recorded terms and lifecycle.

An SME records an invoice and proposes a discount for early financing. After the required profile and invoice checks, the invoice can be listed for funding. A liquidity provider may fund it from a shared USDC pool if the protocol rules and available liquidity allow. The buyer confirms delivery and repays the invoice at maturity; the contracts update invoice and pool state.

The registry, invoice, pool and escrow contracts define the on-chain workflow. The web app and indexer provide interfaces and activity views; they do not independently verify the underlying commercial documents.

## Scope and limitations

ClearLedger is not a bank, lender, payment service or credit bureau. It does not guarantee invoice eligibility, funding, repayment or returns. Defaults, limited withdrawal liquidity, software defects and smart contract failures can result in losses. The current deployment is an experimental Stellar testnet prototype, and the contracts have not been formally audited. Do not use real funds.
