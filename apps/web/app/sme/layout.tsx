import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SME Financing | ClearLedger",
  description:
    "Prepare trade invoices and review potential financing terms in ClearLedger’s Stellar testnet preview.",
};

export default function SmeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
