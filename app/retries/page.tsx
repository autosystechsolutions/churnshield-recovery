"use client";

import { useState } from "react";
import {
  Calendar,
  Clock,
  HelpCircle,
  RefreshCw,
  Save,
  ShieldCheck,
  Sliders,
  Zap,
} from "lucide-react";

export default function SmartRetries() {
  const [paydayEnabled, setPaydayEnabled] = useState(true);
  const [velocityCooloffHours, setVelocityCooloffHours] = useState(6);
  const [maxRetryCount, setMaxRetryCount] = useState(4);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <RefreshCw size={15} /> Algorithmic Retry Rules Engine
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Smart Card Retry Scheduling
        </h1>
        <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl leading-relaxed">
          Standard Stripe retries retry cards blindly at midnight or after fixed 3-day intervals, leading to immediate secondary declines. ChurnShield analyzes the card decline code and dynamically schedules retries to maximize recovery success.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Rule 1: Payday Scheduling */}
        <div className="rounded-3xl border border-white/10 bg-surface p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Calendar size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Payday &amp; Liquidity Window Matching</h3>
                <div className="text-[11px] text-white/50">For code: <code className="text-emerald-300">insufficient_funds</code></div>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={paydayEnabled}
                onChange={(e) => setPaydayEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </label>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            When a card fails with insufficient funds, retrying the next morning has an 82% failure rate. ChurnShield retries on common direct-deposit dates (1st, 15th, or Friday mornings) where recovery probability jumps to 74%.
          </p>
        </div>

        {/* Rule 2: Card Velocity & Fraud Hold Cooldown */}
        <div className="rounded-3xl border border-white/10 bg-surface p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Clock size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Temporary Card Velocity Cooldown</h3>
              <div className="text-[11px] text-white/50">For code: <code className="text-blue-300">card_velocity_exceeded</code></div>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Triggered when a customer makes multiple online purchases in a short window. Card network security freezes the card temporarily for 4-8 hours.
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-white/80">Cooldown wait before retry:</span>
            <select
              value={velocityCooloffHours}
              onChange={(e) => setVelocityCooloffHours(parseInt(e.target.value))}
              className="bg-black/60 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value={4}>4 Hours</option>
              <option value={6}>6 Hours (Recommended)</option>
              <option value={12}>12 Hours</option>
              <option value={24}>24 Hours</option>
            </select>
          </div>
        </div>

        {/* Rule 3: Maximum Retry Budget */}
        <div className="rounded-3xl border border-white/10 bg-surface p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Sliders size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Maximum Retry Attempts</h3>
              <div className="text-[11px] text-white/50">Preventing card network spam fees</div>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Visa and Mastercard charge penalty fees for more than 4 retries on a single invoice. ChurnShield automatically enforces an optimal 4-retry cap.
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-white/80">Max retries per invoice:</span>
            <select
              value={maxRetryCount}
              onChange={(e) => setMaxRetryCount(parseInt(e.target.value))}
              className="bg-black/60 border border-white/20 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-emerald-400"
            >
              <option value={3}>3 Attempts</option>
              <option value={4}>4 Attempts (Standard)</option>
              <option value={5}>5 Attempts</option>
            </select>
          </div>
        </div>

        {/* Rule 4: Expired Card Handling */}
        <div className="rounded-3xl border border-white/10 bg-surface p-6 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Zap size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Expired Card Bypass</h3>
              <div className="text-[11px] text-white/50">For code: <code className="text-amber-300">expired_card</code></div>
            </div>
          </div>
          <p className="text-xs text-white/70 leading-relaxed">
            Zero retries are attempted on hard expired cards (retries will always fail). ChurnShield immediately generates a 1-click magic link card update request via SMS and email.
          </p>
          <div className="pt-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 p-2.5 rounded-xl border border-emerald-500/20">
            ✓ Pre-dunning active: Notifies customers 14 days before card expiry month.
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end pt-4 border-t border-white/10">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-400 text-black font-extrabold text-xs transition hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <Save size={14} />
          <span>{saved ? "Saved to Stripe & Engine ✓" : "Save Retry Rules"}</span>
        </button>
      </div>
    </div>
  );
}
