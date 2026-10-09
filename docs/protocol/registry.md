# Registry

The registry contract stores SME issuer and trade buyer profiles and controls whether an address can use gated protocol actions. Profile registration and verification are separate steps: registering a profile does not establish the participant’s legal identity or verify its business claims.

## What registration does

An issuer or buyer authorizes a transaction to create a profile. A designated registry administrator can later mark that profile verified or revoke verification. Other protocol contracts check the registry state before allowing relevant invoice, funding or repayment actions.

The registry is not a KYC service, identity provider or commercial due diligence process.

## Profile data

A profile contains an address, role, verification flag, registration timestamp and optional metadata. Newly registered profiles start unverified; the administrator must explicitly verify them. Metadata is stored on-chain and publicly readable. Anyone may copy it, and it cannot be treated as confidential. Do not submit tax identifiers, personal contact details or confidential business information to the testnet application.

## Revocation

The administrator can revoke a profile by setting `verified = false`. A revoked address cannot participate in new gated invoice transactions. Existing invoices in flight are not affected.
