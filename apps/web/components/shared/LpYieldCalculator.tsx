"use client";

import React, { useState } from "react";
import { AmountInput } from "./AmountInput";

const AVG_DISCOUNT_RATE = 2.0;
const AVG_MATURITY_DAYS = 60;

export function LpYieldCalculator() {
  const [deposit, setDeposit] = useState("10000");
  const [utilization, setUtilization] = useState(75);

  const parsedDeposit = parseFloat(deposit) || 0;

  const annualYieldPct =
    (utilization / 100) *
    (AVG_DISCOUNT_RATE / 100) *
    (365 / AVG_MATURITY_DAYS) *
    100;

  const monthlyEarnings = (parsedDeposit * (annualYieldPct / 100)) / 12;

  return (
    <div className="space-y-5 rounded-xl border border-white/10 bg-[#102536] p-5 text-white sm:p-6">
      <h3 className="flex items-center justify-between border-b border-white/10 pb-3 text-sm font-semibold tracking-tight">
        <span>Liquidity estimate</span>
        <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#a9d9c8]">Illustrative</span>
      </h3>

      <div className="space-y-4">
        <AmountInput
          value={deposit}
          onChange={setDeposit}
          asset="USDC"
          label="Deposit Amount (USDC)"
          placeholder="10,000"
        />

        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-[#b5c4cc]">Assumed pool utilization</span>
            <span className="font-semibold text-[#bce1d5]">{utilization}%</span>
          </div>
          <input
            id="lp-yield-utilization"
            type="range"
            min="10"
            max="100"
            step="1"
            value={utilization}
            onChange={(e) => setUtilization(parseInt(e.target.value))}
            className="w-full accent-[#a9d9c8] bg-slate-900 h-1.5 rounded"
            aria-label="Pool Utilization"
            aria-valuenow={utilization}
            aria-valuemin={10}
            aria-valuemax={100}
          />
          <div className="flex justify-between text-[10px] text-[#8295a1]">
            <span>10%</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-[#0c1d2a] p-4">
        <div className="flex justify-between items-center">
          <span className="text-xs text-[#b5c4cc]">
            Illustrative annualized yield
          </span>
          <span className="text-2xl font-semibold font-mono text-[#bce1d5]">
            {annualYieldPct.toFixed(2)}%
          </span>
        </div>
        <div className="mt-3 flex justify-between items-center border-t border-white/10 pt-3">
          <span className="text-xs text-[#b5c4cc]">
            Estimated monthly earnings
          </span>
          <span className="text-sm font-semibold font-mono text-white">
            {monthlyEarnings.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}{" "}
            USDC
          </span>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3 text-xs leading-5 text-[#b5c4cc]">
        Model assumes a 2% invoice discount and 60-day average maturity. It is
        a simplified estimate, not a quote or forecast; actual outcomes vary
        with pool activity, repayments, fees and losses.
      </div>
    </div>
  );
}
