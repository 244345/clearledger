import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings | ClearLedger",
  description: "Manage local display preferences and wallet settings in ClearLedger.",
};

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
