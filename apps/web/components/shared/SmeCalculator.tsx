"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Sparkles } from "lucide-react";
import { AnimatedValue } from "./DiscountCalculator";

/**
 * Derived SME figures, memoized on their actual inputs so an unrelated state
 * change does not recompute them or restart the
 * `AnimatedValue` loops bound to them (#662).
 */
export function useSmeDerivedValues(faceValue: number, discountRate: number) {
  return useMemo(() => {
    const discountPaid = faceValue * (discountRate / 100);
    return { discountPaid, fundedAmount: faceValue - discountPaid };
  }, [faceValue, discountRate]);
}

export function SmeCalculator() {
  const [faceValue, setFaceValue] = useState<number>(50000);
  const [discountRate, setDiscountRate] = useState<number>(2.0);

  const { discountPaid, fundedAmount } = useSmeDerivedValues(
    faceValue,
    discountRate,
  );

  const handleFaceValueChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFaceValue(parseInt(e.target.value));
    },
    [],
  );

  const handleDiscountRateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDiscountRate(parseFloat(e.target.value));
    },
    [],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Inputs Column */}
      <div className="space-y-6">
        <h3 className="text-xs font-bold font-mono text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          Configure Invoice parameters
        </h3>

        {/* Slider 1: Face Value */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Invoice Face Value</span>
            <span className="text-primary font-bold">
              {faceValue.toLocaleString()} USDC
            </span>
          </div>
          <input
            id="discount-sme-face-value"
            type="range"
            min="1000"
            max="500000"
            step="1000"
            value={faceValue}
            onChange={handleFaceValueChange}
            className="w-full accent-primary bg-slate-900 h-1.5 rounded"
            aria-label="Invoice Face Value"
            aria-valuenow={faceValue}
            aria-valuemin={1000}
            aria-valuemax={500000}
          />
          <div className="flex justify-between text-[10px] text-slate-600 font-mono">
            <span>$1K USDC</span>
            <span>$500K USDC</span>
          </div>
        </div>

        {/* Slider 2: Discount Rate */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Financing Discount Rate</span>
            <span className="text-primary font-bold">
              {discountRate.toFixed(1)}% ({Math.round(discountRate * 100)} bps)
            </span>
          </div>
          <input
            id="discount-sme-discount-rate"
            type="range"
            min="0.5"
            max="5.0"
            step="0.1"
            value={discountRate}
            onChange={handleDiscountRateChange}
            className="w-full accent-primary bg-slate-900 h-1.5 rounded"
            aria-label="Financing Discount Rate"
            aria-valuenow={discountRate}
            aria-valuemin={0.5}
            aria-valuemax={5.0}
          />
          <div className="flex justify-between text-[10px] text-slate-600 font-mono">
            <span>0.5% (50 bps)</span>
            <span>5.0% (500 bps)</span>
          </div>
        </div>
      </div>

      {/* Outputs Column */}
      <div className="space-y-4">
        <div className="rounded-lg border border-primary/20 bg-[#080c10] p-4">
          <p className="text-[10px] font-bold font-mono uppercase tracking-wider text-primary">Illustrative financing amount</p>
          <p className="mt-3 font-mono text-2xl font-semibold text-white"><AnimatedValue value={fundedAmount} suffix=" USDC" /></p>
          <p className="mt-2 text-xs leading-5 text-slate-400">Calculated as invoice face value less the selected discount. Actual eligibility, approved terms, timing and funding depend on verification, underwriting and pool liquidity.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border bg-[#080c10] p-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Illustrative discount</p>
            <p className="mt-2 font-mono text-base font-semibold text-white"><AnimatedValue value={discountPaid} suffix=" USDC" /></p>
          </div>
          <div className="rounded-lg border border-border bg-[#080c10] p-4">
            <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Buyer obligation</p>
            <p className="mt-2 font-mono text-base font-semibold text-white">{faceValue.toLocaleString()} USDC</p>
          </div>
        </div>
        <p className="text-[10px] leading-5 text-slate-500">Example only. The discount is not necessarily the LP’s net return; protocol fees, early repayment and invoice performance affect realized outcomes.</p>
      </div>
    </div>
  );
}
