# Understanding the Discount

The discount is the difference between the invoice face value and the amount proposed for financing. The SME sets a discount when listing an invoice; a listed invoice may still remain unfunded if liquidity is unavailable or the invoice does not meet protocol rules.

```text
funded_amount = face_value × (1 − discount_bps / 10,000)
discount_amount = face_value × discount_bps / 10,000
```

For example, a 2% discount (200 basis points) on a 5,000 USDC invoice gives an indicative financing amount of 4,900 USDC and a discount amount of 100 USDC. The buyer’s repayment obligation remains the invoice face value, subject to the invoice terms and contract flow.

## Choosing terms

Compare the discount with the financing amount you would receive and your buyer’s due date. A higher discount reduces proceeds and may be more attractive to funders; it does not guarantee funding. ClearLedger does not recommend a rate or guarantee how quickly an invoice will be funded.

Use the calculator as an illustration, then review the exact on-screen transaction details before authorizing a listing. This is a testnet prototype, not a live financing offer.
