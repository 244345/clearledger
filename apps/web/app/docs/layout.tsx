import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guides | ClearLedger",
  description:
    "Guides for SMEs, trade buyers and liquidity providers using ClearLedger's Stellar testnet invoice finance prototype.",
};

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
