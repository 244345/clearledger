"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  BookOpen,
  Check,
  ChevronRight,
  CircleHelp,
  FileCheck2,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { SkeletonShimmer } from "@/components/shared/SkeletonLoader";
import { usePool } from "@/hooks/usePool";
import { useStats } from "@/hooks/useStats";

const LpYieldCalculator = dynamic(
  () =>
    import("@/components/shared/LpYieldCalculator").then(
      (module) => module.LpYieldCalculator,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-5 rounded-xl border border-white/10 bg-[#102536] p-6">
        <SkeletonShimmer className="h-4 w-36" />
        <SkeletonShimmer className="h-12 w-full" />
        <SkeletonShimmer className="h-28 w-full" />
      </div>
    ),
  },
);

const DiscountCalculator = dynamic(
  () =>
    import("@/components/shared/DiscountCalculator").then(
      (module) => module.DiscountCalculator,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <SkeletonShimmer className="h-10 w-full" />
      </div>
    ),
  },
);

const steps = [
  {
    number: "01",
    icon: BadgeCheck,
    title: "Participants register",
    body: "SMEs and buyers register with the on-chain registry before participating in invoice activity.",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Invoice terms are reviewed",
    body: "The SME records the invoice and completes the required assessment before listing it for financing.",
  },
  {
    number: "03",
    icon: Banknote,
    title: "Liquidity funds an invoice",
    body: "A liquidity provider can fund an eligible listed invoice at its stated discount, subject to available pool liquidity.",
  },
  {
    number: "04",
    icon: Check,
    title: "The buyer confirms and repays",
    body: "The buyer confirms delivery and repays the obligation. The contracts update invoice and pool state according to protocol rules.",
  },
];

export default function HomeClient() {
  const { stats, isStatsLoading } = usePool();
  const {
    stats: protocolStats,
    isLoading: isProtocolStatsLoading,
    error: protocolStatsError,
  } = useStats();

  const formatUsdc = (amount: bigint | undefined) => {
    if (amount === undefined) return null;
    const value = Number(amount) / 10_000_000;
    return value.toLocaleString("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    });
  };

  const marketStats = [
    {
      label: "Pool deposits",
      value: formatUsdc(stats?.totalDeposits),
      suffix: "USDC",
      loading: isStatsLoading,
    },
    {
      label: "Invoices recorded",
      value: protocolStats?.total_invoices.toLocaleString("en-US") ?? null,
      suffix: "",
      loading: isProtocolStatsLoading,
    },
    {
      label: "Issuer profiles",
      value: protocolStats?.registered_issuers.toLocaleString("en-US") ?? null,
      suffix: "issuers",
      loading: isProtocolStatsLoading,
    },
  ];
  const hasProtocolConfig = Boolean(
    process.env.NEXT_PUBLIC_POOL_CONTRACT_ID &&
      process.env.NEXT_PUBLIC_INVOICE_CONTRACT_ID &&
      process.env.NEXT_PUBLIC_REGISTRY_CONTRACT_ID,
  );

  const contractUrl = process.env.NEXT_PUBLIC_POOL_CONTRACT_ID
    ? `https://stellar.expert/explorer/testnet/contract/${process.env.NEXT_PUBLIC_POOL_CONTRACT_ID}`
    : "https://stellar.expert/explorer/testnet";

  return (
    <div className="min-h-screen bg-[#f5f7f8] text-[#132b3b] selection:bg-[#b9e2d7] selection:text-[#102536]">
      <div className="flex items-center justify-center gap-2 border-b border-white/10 bg-[#0c1d2a] px-4 py-2 text-[11px] font-medium text-[#c3d0d8]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#63c2a6]" />
        Stellar testnet · Public preview
      </div>
      <header className="border-b border-[#dce4e7] bg-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-5 px-5 sm:px-8 lg:px-10">
          <Link href="/" aria-label="ClearLedger home" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#173c49] text-[#bce1d5]">
              <Landmark className="h-[18px] w-[18px]" />
            </span>
            <span className="text-[17px] font-semibold tracking-[-0.04em] text-[#173445]">ClearLedger</span>
          </Link>
          <nav aria-label="Main navigation" className="hidden items-center gap-8 text-sm font-medium text-[#526975] lg:flex">
            <a href="#sme" className="transition hover:text-[#173c49]">For SMEs</a>
            <a href="#how-it-works" className="transition hover:text-[#173c49]">How it works</a>
            <a href="#liquidity" className="transition hover:text-[#173c49]">Liquidity</a>
            <Link href="/marketplace" className="transition hover:text-[#173c49]">Marketplace</Link>
            <Link href="/docs" className="transition hover:text-[#173c49]">Documentation</Link>
          </nav>
          <Link href="/sme" className="inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-md bg-[#173c49] px-3 text-sm font-semibold text-white transition hover:bg-[#245363] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#387e6e] focus-visible:ring-offset-2 sm:gap-2 sm:px-4">
            <span className="sm:hidden">Launch app</span>
            <span className="hidden sm:inline">Open platform</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main id="main-content">
        <section className="overflow-hidden bg-[#f2f5f2] text-[#173445]">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_.92fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
            <div className="min-w-0 max-w-2xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c9dcd3] bg-white/70 px-3.5 py-2 text-xs font-medium text-[#356b5d]">
                <span className="h-2 w-2 rounded-full bg-[#438b73]" />
                Trade finance infrastructure · Stellar testnet
              </div>
              <h1 className="max-w-[13ch] text-[2.65rem] font-semibold leading-[1.06] tracking-[-0.05em] sm:text-5xl lg:text-[4rem]">
                Working capital for trade, structured around the invoice.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-7 text-[#536975] sm:text-lg sm:leading-8">
                ClearLedger connects SMEs awaiting payment with their business buyers and
                USDC liquidity providers. It records invoice terms, delivery
                confirmation, funding and repayment in one on-chain flow on Stellar.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/sme"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#173c49] px-5 text-sm font-semibold text-white transition hover:bg-[#245363] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#387e6e] focus-visible:ring-offset-2"
                >
                  Explore the SME workspace <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="#liquidity"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-[#b9c9c9] bg-white/70 px-5 text-sm font-semibold text-[#244a57] transition hover:border-[#7da99d] hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#387e6e]"
                >
                  Review liquidity opportunities <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <p className="mt-5 max-w-lg text-xs leading-5 text-[#71838d]">
                Public testnet preview. Participation depends on verification, invoice
                assessment and available pool liquidity. Capital is at risk; returns
                are variable and not guaranteed.
              </p>
            </div>

            <div className="min-w-0 rounded-2xl border border-[#d9e2df] bg-white p-5 shadow-[0_20px_60px_-36px_rgba(23,52,69,.28)] sm:p-7">
              <div className="flex items-center justify-between gap-4 border-b border-[#e7edeb] pb-4">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#538577]">Illustrative invoice</p>
                  <p className="mt-1 text-sm font-semibold text-[#173445]">How the invoice terms fit together</p>
                </div>
                <span className="rounded-full bg-[#edf4f0] px-3 py-1.5 text-[11px] font-medium text-[#356b5d]">USDC</span>
              </div>
              <div className="py-6">
                <p className="text-xs font-medium text-[#71838d]">INVOICE AMOUNT</p>
                <p className="mt-2 font-mono text-4xl font-semibold tracking-[-0.04em] text-[#173445] sm:text-5xl">50,000<span className="ml-2 text-base font-medium tracking-normal text-[#71838d]">USDC</span></p>
              </div>
              <div className="space-y-3 border-y border-[#e7edeb] py-4 text-sm">
                <div className="flex justify-between gap-4 text-[#617581]"><span>Illustrative discount</span><span className="font-mono font-medium text-[#173445]">2% · 1,000 USDC</span></div>
                <div className="flex justify-between gap-4 text-[#617581]"><span>Indicative proceeds</span><span className="font-mono font-semibold text-[#246b5c]">49,000 USDC</span></div>
              </div>
              <div className="mt-5 flex items-center gap-2 text-xs leading-5 text-[#71838d]">
                <ShieldCheck className="h-4 w-4 shrink-0 text-[#438b73]" />
                Example only. Eligibility, discount and funding depend on assessment and available liquidity.
              </div>
              <div className="mt-6 grid grid-cols-4 gap-2">
                {[
                  ["01", "Verify"],
                  ["02", "Assess"],
                  ["03", "Fund"],
                  ["04", "Settle"],
                ].map(([number, label], index) => (
                  <div key={number} className="min-w-0 border-t-2 border-[#dce7e2] pt-2 first:border-[#438b73]">
                    <p className={`font-mono text-[10px] ${index === 0 ? "text-[#438b73]" : "text-[#8295a1]"}`}>{number}</p>
                    <p className="mt-1 truncate text-[11px] font-medium text-[#536975]">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {hasProtocolConfig && (
          <section aria-label="Protocol activity" className="border-b border-[#dce4e7] bg-white">
            <div className="mx-auto grid max-w-7xl divide-y divide-[#e8edef] px-5 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-8 lg:px-10">
              {marketStats.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-4 py-5 sm:block sm:px-8 sm:py-6 first:sm:pl-0 last:sm:pr-0">
                  <p className="text-xs font-medium uppercase tracking-[0.12em] text-[#687b87]">{item.label}</p>
                  {item.loading ? (
                    <SkeletonShimmer className="h-7 w-24" />
                  ) : item.value ? (
                    <p className="mt-2 font-mono text-2xl font-semibold tracking-tight text-[#173445]">
                      {item.value}<span className="ml-2 text-xs font-sans font-medium text-[#687b87]">{item.suffix}</span>
                    </p>
                  ) : (
                    <p className="mt-2 text-sm font-medium text-[#687b87]">Data unavailable</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div className="max-w-md">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#387e6e]">The ClearLedger approach</p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#163244] sm:text-4xl">One trade. Three participants. A shared record.</h2>
              <p className="mt-5 text-sm leading-7 text-[#536975]">
                SMEs can request working capital against unpaid invoices. Buyers confirm
                delivery and repay. Liquidity providers review the terms before
                choosing whether to supply USDC. ClearLedger coordinates these
                roles through a shared, on-chain invoice lifecycle.
              </p>
              <Link href="/docs" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#246b5c] hover:text-[#174e43]">
                Read how the protocol works <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { icon: ShieldCheck, title: "For SMEs", body: "Record an invoice, submit it for assessment and review the discount and expected proceeds before listing." },
                { icon: FileCheck2, title: "For trade buyers", body: "Confirm delivery against the invoice and settle the obligation when it is due." },
                { icon: Wallet, title: "For liquidity providers", body: "Review invoice terms, pool utilization and your proportional position before supplying USDC." },
                { icon: LockKeyhole, title: "Protocol controls", body: "Registry, invoice, pool and escrow contracts coordinate verification, lifecycle state and settlement." },
              ].map(({ icon: Icon, title, body }) => (
                <article key={title} className="rounded-xl border border-[#dce5e7] bg-white p-5 sm:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9f3ef] text-[#287560]"><Icon className="h-5 w-5" /></div>
                  <h3 className="mt-4 text-sm font-semibold text-[#173445]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#617581]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="border-y border-[#dce4e7] bg-[#edf2f2]">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#387e6e]">How it works</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#163244] sm:text-4xl">A trade moves through clear, recorded steps</h2>
              <p className="mt-4 text-sm leading-7 text-[#536975]">The protocol records key actions so participants can follow an invoice from onboarding through repayment.</p>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map(({ number, icon: Icon, title, body }) => (
                <article key={number} className="relative rounded-xl border border-[#d8e2e4] bg-white p-5 sm:p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-semibold text-[#538577]">{number}</span>
                    <Icon className="h-5 w-5 text-[#538577]" />
                  </div>
                  <h3 className="mt-7 text-base font-semibold text-[#173445]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#617581]">{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="liquidity" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-start lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#387e6e]">For liquidity providers</p>
            <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.03em] text-[#163244] sm:text-4xl">Review invoice terms and pool mechanics before supplying capital.</h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-[#536975]">
              Pool shares represent a proportional position in pool value. Invoice
              discounts may contribute to pool returns when obligations are repaid.
              Utilization affects available withdrawals, and losses are possible.
              Review the contract mechanics before supplying capital.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-[#435b68]">
              {["See pool activity and utilization", "Preview shares for a deposit", "Review invoice terms in the marketplace"].map((item) => (
                <li key={item} className="flex items-start gap-2.5"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#287560]" />{item}</li>
              ))}
            </ul>
            <Link href="/lp" className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-md bg-[#173c49] px-4 text-sm font-semibold text-white transition hover:bg-[#245363]">
              Explore liquidity <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-[#dce5e7] bg-white p-4 shadow-sm sm:p-6">
            <ErrorBoundary context="LpYieldCalculator"><LpYieldCalculator /></ErrorBoundary>
            <p className="mt-4 text-xs leading-5 text-[#71838d]">Illustrative estimate only. Actual outcomes depend on pool utilization, invoice performance, fees and protocol conditions. This is not a guaranteed rate or investment advice.</p>
          </div>
        </section>

        <section id="sme" className="bg-[#102536] text-white">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-10 lg:py-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a9d9c8]">For SMEs</p>
              <h2 className="mt-4 max-w-md text-3xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">See the costs and proceeds before you list.</h2>
              <p className="mt-4 max-w-md text-sm leading-7 text-[#c3d0d8]">Use the financing calculator to model an illustrative discount and compare estimated proceeds with the invoice amount. Final terms depend on the invoice assessment and pool availability.</p>
              <Link href="/sme" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#bce1d5] hover:text-white">Start with SME tools <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="rounded-xl border border-white/10 bg-white p-3 text-[#163244] sm:p-5">
              <ErrorBoundary context="DiscountCalculator"><DiscountCalculator /></ErrorBoundary>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#387e6e]">Protocol activity and contract rules</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-[#163244]">Follow the activity. Inspect the contracts.</h2>
              <p className="mt-4 text-sm leading-7 text-[#536975]">ClearLedger is built on Stellar Soroban. Contract state records protocol actions; the indexer organizes that activity for the app. This testnet preview is experimental and is not a live financing offer.</p>
              {protocolStatsError && <p className="mt-4 text-xs text-[#71838d]">Live protocol statistics are temporarily unavailable.</p>}
              <a href={contractUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#246b5c] hover:text-[#174e43]">View on Stellar Expert <ArrowUpRight className="h-4 w-4" /></a>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { icon: BadgeCheck, title: "Registry", body: "Business profiles and verification status" },
                { icon: FileCheck2, title: "Invoice", body: "Terms, lifecycle and repayment rules" },
                { icon: LockKeyhole, title: "Pool & escrow", body: "Liquidity accounting and fund custody" },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="rounded-xl border border-[#dce5e7] bg-white p-5">
                  <Icon className="h-5 w-5 text-[#287560]" />
                  <h3 className="mt-5 text-sm font-semibold text-[#173445]">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#617581]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-[#dce4e7] bg-white">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
            <div className="flex items-start gap-3">
              <CircleHelp className="mt-0.5 h-5 w-5 shrink-0 text-[#387e6e]" />
              <div>
                <h2 className="text-sm font-semibold text-[#173445]">New to ClearLedger?</h2>
                <p className="mt-1 text-sm text-[#617581]">Understand participant roles, invoice stages, contract flows and testnet requirements.</p>
              </div>
            </div>
            <Link href="/docs" className="inline-flex min-h-11 items-center gap-2 self-start rounded-md border border-[#cbd9dc] px-4 text-sm font-semibold text-[#244a57] transition hover:border-[#7da99d] hover:bg-[#f5f8f7] md:self-auto">
              <BookOpen className="h-4 w-4" /> Read the docs <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-[#0c1d2a] text-[#c3d0d8]">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-sm font-semibold tracking-tight text-white">ClearLedger</p>
            <p className="mt-1 text-xs text-[#9eb1bd]">Invoice finance infrastructure for Stellar.</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs">
            <Link href="/marketplace" className="hover:text-white">Marketplace</Link>
            <Link href="/lp" className="hover:text-white">Liquidity</Link>
            <Link href="/docs" className="hover:text-white">Documentation</Link>
            <Link href="/help" className="hover:text-white">Help</Link>
          </div>
          <p className="text-xs text-[#8295a1]">Testnet preview · © 2026 ClearLedger</p>
        </div>
      </footer>
    </div>
  );
}
