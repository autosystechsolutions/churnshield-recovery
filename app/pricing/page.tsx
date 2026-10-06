"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Check,
  DollarSign,
  HelpCircle,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

export default function PricingPage() {
  const [mrr, setMrr] = useState<number>(30000); // $30k MRR
  const [churnRate, setChurnRate] = useState<number>(8.5); // 8.5% involuntary churn

  // Math
  const monthlyLost = (mrr * (churnRate / 100));
  const monthlyRecovered = monthlyLost * 0.684; // 68.4% recovery rate
  const annualRecovered = monthlyRecovered * 12;
  const annualCost = 49 * 12; // Starter plan
  const netAnnualGain = annualRecovered - annualCost;
  const roiMultiple = Math.round(annualRecovered / annualCost);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-xs font-semibold">
          <Sparkles size={13} /> Pure Revenue Expansion — Pays for Itself on Day 1
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Transparent, ROI-Guaranteed Pricing
        </h1>
        <p className="text-xs sm:text-base text-white/60 leading-relaxed">
          Unlike competitors who take a 10-15% cut of your hard-earned revenue or charge $500/mo enterprise fees, ChurnShield charges a flat monthly rate with unlimited retries.
        </p>
      </div>

      {/* Interactive ROI Calculator */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-surface to-surface p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Interactive Revenue Recovery Calculator
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
              Calculate How Much Lost MRR You Will Recover
            </h2>
          </div>
          <div className="text-xs font-mono text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1.5 rounded-lg self-start">
            Industry Benchmark: 68.4% Recovery Rate
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          {/* Sliders */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">Your Current Monthly Recurring Revenue (MRR):</span>
                <span className="font-mono text-emerald-300 font-bold">${mrr.toLocaleString()} / mo</span>
              </div>
              <input
                type="range"
                min={5000}
                max={200000}
                step={5000}
                value={mrr}
                onChange={(e) => setMrr(parseInt(e.target.value))}
                className="w-full h-2 accent-[#10B981] bg-white/20 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>$5,000 / mo</span>
                <span>$100,000 / mo</span>
                <span>$200,000 / mo</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-white">Estimated Involuntary Churn Rate (Expired/Failed Cards):</span>
                <span className="font-mono text-amber-300 font-bold">{churnRate}% of MRR</span>
              </div>
              <input
                type="range"
                min={3.0}
                max={15.0}
                step={0.5}
                value={churnRate}
                onChange={(e) => setChurnRate(parseFloat(e.target.value))}
                className="w-full h-2 accent-[#fbbf24] bg-white/20 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>3.0% (Low)</span>
                <span>8.5% (SaaS Average)</span>
                <span>15.0% (High Volatility)</span>
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="text-[11px] text-white/50">Currently Lost to Churn:</div>
                <div className="text-lg font-bold text-red-400 font-mono">
                  -${monthlyLost.toLocaleString("en-US", { maximumFractionDigits: 0 })} / mo
                </div>
              </div>
              <div>
                <div className="text-[11px] text-white/50">Monthly Recovered Cash:</div>
                <div className="text-lg font-bold text-emerald-400 font-mono">
                  +${monthlyRecovered.toLocaleString("en-US", { maximumFractionDigits: 0 })} / mo
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-semibold text-white/80">Estimated Extra Annual Revenue Recovered:</div>
              <div className="text-3xl sm:text-4xl font-extrabold text-emerald-300 font-mono">
                +${annualRecovered.toLocaleString("en-US", { maximumFractionDigits: 0 })} / yr
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-mono text-white/60">
              <span>ChurnShield Plan: <strong>$49 / mo</strong></span>
              <span className="text-emerald-400 font-bold">Estimated ROI: {roiMultiple}x Return</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Plan 1 */}
        <div className="rounded-3xl border border-white/10 bg-surface p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Starter</h3>
              <p className="text-xs text-white/60">For early-stage SaaS &amp; boot-strappers ($3k - $25k MRR).</p>
            </div>
            <div className="text-3xl font-extrabold text-white">
              $49 <span className="text-xs text-white/50 font-normal">/ month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Up to $5,000 / mo recovered volume</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Algorithmic smart retries engine</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 1-Click magic link payment portal</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Automated 3-step dunning emails</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Live Stripe webhook integration</li>
            </ul>
          </div>
          <Link
            href="/settings"
            className="w-full py-3 rounded-xl border border-white/20 bg-white/5 text-center text-xs font-bold text-white hover:bg-white/10 transition"
          >
            Start 14-Day Free Trial
          </Link>
        </div>

        {/* Plan 2: Popular */}
        <div className="rounded-3xl border-2 border-emerald-500 bg-surface p-7 space-y-6 flex flex-col justify-between relative shadow-[0_0_30px_rgba(16,185,129,0.15)]">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold text-[10px] uppercase tracking-wider">
            Most Popular
          </div>
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Growth</h3>
              <p className="text-xs text-white/60">For growing subscription businesses ($25k - $100k MRR).</p>
            </div>
            <div className="text-3xl font-extrabold text-white">
              $99 <span className="text-xs text-white/50 font-normal">/ month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Up to $25,000 / mo recovered volume</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Custom branding &amp; logo on portals</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Pre-dunning 14-day expiry alerts</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Apple Pay &amp; Google Pay 1-click update</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Slack &amp; Discord recovery alerts</li>
            </ul>
          </div>
          <Link
            href="/settings"
            className="w-full py-3 rounded-xl bg-emerald-400 text-center text-xs font-extrabold text-black hover:bg-emerald-300 transition shadow-lg"
          >
            Start 14-Day Free Trial
          </Link>
        </div>

        {/* Plan 3 */}
        <div className="rounded-3xl border border-white/10 bg-surface p-7 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white">Scale</h3>
              <p className="text-xs text-white/60">For high-volume SaaS ($100k+ MRR).</p>
            </div>
            <div className="text-3xl font-extrabold text-white">
              $199 <span className="text-xs text-white/50 font-normal">/ month</span>
            </div>
            <ul className="space-y-2.5 text-xs text-white/70">
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Unlimited recovered volume</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Custom domain (e.g. billing.yourdomain.com)</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> SMS dunning with Twilio integration</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Multi-currency recovery optimization</li>
              <li className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Priority 24/7 dedicated support</li>
            </ul>
          </div>
          <Link
            href="/settings"
            className="w-full py-3 rounded-xl border border-white/20 bg-white/5 text-center text-xs font-bold text-white hover:bg-white/10 transition"
          >
            Start 14-Day Free Trial
          </Link>
        </div>
      </div>
    </div>
  );
}
