import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marketplace | ClearLedger",
  description:
    "Review invoices listed for financing and their stated terms in ClearLedger’s Stellar testnet marketplace. Funding is subject to protocol rules and available liquidity.",
};

export default function MarketplaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
