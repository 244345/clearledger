import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CircleHelp,
  Droplets,
  FileText,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/shared/Navbar";
import { TopStatusBar } from "@/components/shared/TopStatusBar";

const guides = [
  {
    href: "/sme",
    icon: Building2,
    title: "For SMEs",
    description:
      "Register a business profile, prepare an invoice and review its financing terms.",
    action: "Open SME workspace",
  },
  {
    href: "/marketplace",
    icon: FileText,
    title: "For trade buyers",
    description:
      "Review invoices addressed to your business, confirm delivery and repay due obligations.",
    action: "Open invoice marketplace",
  },
  {
    href: "/lp",
    icon: Droplets,
    title: "For liquidity providers",
    description:
      "Review pool activity, deposit and withdrawal mechanics, and the risks of supplying USDC.",
    action: "Review liquidity",
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopStatusBar />
      <Navbar />
      <main id="main-content" className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            ClearLedger guide
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
            Understand the invoice finance workflow.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            ClearLedger coordinates SMEs, their trade buyers and liquidity providers around a shared invoice record. Start with the guide for your role, then review the protocol steps and testnet limitations before connecting a wallet. Profile metadata is public on-chain data; use test data only.
          </p>
          <div className="mt-7 inline-flex items-center gap-2 rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-sm text-amber-200">
            <ShieldCheck className="h-4 w-4 shrink-0" />
            Stellar Testnet preview · Experimental, not for real funds
          </div>
        </div>

        <section aria-labelledby="participant-guides" className="mt-12">
          <h2 id="participant-guides" className="text-lg font-semibold">
            Choose your role
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {guides.map(({ href, icon: Icon, title, description, action }) => (
              <article key={href} className="flex h-full flex-col rounded-xl border border-border bg-card p-5 sm:p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-base font-semibold">{title}</h3>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
                <Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                  {action} <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-4 border-t border-border pt-8 sm:grid-cols-2">
          <div>
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <BookOpen className="h-4 w-4 text-primary" /> How the protocol works
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Participants register, invoices are assessed and listed, available pool liquidity may fund an eligible invoice, and the buyer confirms delivery and repays. Contract state records these actions on Stellar.
            </p>
          </div>
          <div>
            <h2 className="flex items-center gap-2 text-base font-semibold">
              <CircleHelp className="h-4 w-4 text-primary" /> Questions and risks
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Read common questions about wallets, invoice records, pool returns, defaults and withdrawal liquidity before taking part.
            </p>
            <Link href="/help" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              Read help and FAQs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
