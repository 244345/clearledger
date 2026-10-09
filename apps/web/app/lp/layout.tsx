import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liquidity | ClearLedger",
  description:
    "Review pool mechanics and listed invoice terms on ClearLedger’s Stellar testnet. Deposits carry liquidity, repayment and smart contract risks; returns are not guaranteed.",
};

export default function LpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
