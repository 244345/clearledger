import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help and FAQs | ClearLedger",
  description:
    "Learn how ClearLedger's Stellar testnet prototype handles invoice records, participant profiles, liquidity and repayment.",
};

export default function HelpLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
