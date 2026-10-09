import type { Metadata } from "next";
import AnalyticsClient from "./AnalyticsClient";

export const metadata: Metadata = {
  title: "Analytics | ClearLedger",
  description:
    "Review available protocol activity and pool metrics from ClearLedger’s Stellar testnet deployment.",
};

export default function AnalyticsPage() {
  return <AnalyticsClient />;
}
