import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile | ClearLedger",
  description:
    "Manage your ClearLedger profile, verification status, and wallet settings.",
};

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
