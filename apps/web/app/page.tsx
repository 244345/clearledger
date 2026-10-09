import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "ClearLedger | Invoice Finance for Trade",
  description:
    "ClearLedger coordinates SMEs, their buyers and USDC liquidity providers through an on-chain invoice lifecycle on Stellar.",
};

export default function Home() {
  return <HomeClient />;
}
