# How It Works

ClearLedger coordinates invoice finance across registry, invoice, pool and escrow contracts on Stellar Soroban. The current application is a testnet prototype.

### 1. Register participants

An SME issuer and its buyer register profiles in the registry. Registration records a profile; a designated protocol administrator must separately mark it verified before gated actions are available.

### 2. Create and assess an invoice

The SME records the buyer, face value and due date. The invoice is submitted for the required assessment before it can be listed. Contract state tracks the invoice and its lifecycle.

### 3. List for financing

The SME sets a discount in basis points (200 bps = 2%) and lists the invoice. Listing does not guarantee that it will be funded.

### 4. Fund when eligible

A listed invoice may be funded from its configured pool if it satisfies the protocol rules and liquidity is available. The pool calculates the financing amount from the face value and discount. Escrow coordinates the transfer to the SME.

### 5. Confirm delivery

After goods or services are delivered, the issuer marks the invoice as shipped. The issuer and buyer record the required delivery confirmations before repayment.

### 6. Repay

The buyer repays the invoice face value in USDC. The contracts update invoice and pool state according to protocol rules. The discount may contribute to pool returns, but repayment and returns are not guaranteed.

### Default risk

If an invoice is not repaid, the pool may lose the funded amount. See [default risk](../protocol/economic-model.md#default-risk) for the contract accounting and examples. The contracts have not been formally audited; use testnet assets only.
