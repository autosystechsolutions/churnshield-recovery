"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  ExternalLink,
  Filter,
  Mail,
  Play,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Zap,
} from "lucide-react";

interface FailedPaymentRecord {
  id: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  amount: number;
  declineCode: "insufficient_funds" | "expired_card" | "card_velocity_exceeded" | "do_not_honor";
  status: "recovered" | "scheduled" | "dunning_sent" | "failed";
  retryScheduledFor: string;
  magicToken: string;
  timestamp: string;
}

const initialPayments: FailedPaymentRecord[] = [
  {
    id: "inv_98412",
    customerName: "Aura Metrics Inc.",
    customerEmail: "billing@aurametrics.io",
    planName: "Enterprise Tier ($499/mo)",
    amount: 499.0,
    declineCode: "insufficient_funds",
    status: "recovered",
    retryScheduledFor: "Recovered at Payday Window",
    magicToken: "demo_token_8849",
    timestamp: "12 mins ago",
  },
  {
    id: "inv_98413",
    customerName: "Voxel Labs",
    customerEmail: "alex@voxellabs.ai",
    planName: "Pro Annual ($1,200/yr)",
    amount: 1200.0,
    declineCode: "expired_card",
    status: "dunning_sent",
    retryScheduledFor: "Magic Link Sent via Email/SMS",
    magicToken: "demo_token_8849",
    timestamp: "45 mins ago",
  },
  {
    id: "inv_98414",
    customerName: "HyperScale Media",
    customerEmail: "finance@hyperscalemedia.com",
    planName: "Growth Tier ($199/mo)",
    amount: 199.0,
    declineCode: "card_velocity_exceeded",
    status: "scheduled",
    retryScheduledFor: "Today at 02:45 PM (6h cooldown)",
    magicToken: "demo_token_8849",
    timestamp: "1 hour ago",
  },
  {
    id: "inv_98415",
    customerName: "SaaSify Studio",
    customerEmail: "founders@saasifystudio.co",
    planName: "Starter Tier ($79/mo)",
    amount: 79.0,
    declineCode: "do_not_honor",
    status: "scheduled",
    retryScheduledFor: "Tomorrow at 10:15 AM (Banking window)",
    magicToken: "demo_token_8849",
    timestamp: "3 hours ago",
  },
  {
    id: "inv_98416",
    customerName: "CloudPulse Tech",
    customerEmail: "accounts@cloudpulse.dev",
    planName: "Enterprise Tier ($750/mo)",
    amount: 750.0,
    declineCode: "insufficient_funds",
    status: "recovered",
    retryScheduledFor: "Recovered successfully",
    magicToken: "demo_token_8849",
    timestamp: "Yesterday",
  },
];

export default function Dashboard() {
  const [payments, setPayments] = useState<FailedPaymentRecord[]>(initialPayments);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationLog, setSimulationLog] = useState<string | null>(null);

  const totalRecovered = payments
    .filter((p) => p.status === "recovered")
    .reduce((sum, p) => sum + p.amount, 26950);

  const totalAtRisk = payments.reduce((sum, p) => sum + p.amount, 14200);

  // Trigger Live Stripe Webhook Simulation
  const handleSimulateWebhook = () => {
    setIsSimulating(true);
    setSimulationLog("Simulating Stripe webhook 'invoice.payment_failed' (customer: Acme AI Corp, $299.00)...");

    setTimeout(() => {
      const newRecord: FailedPaymentRecord = {
        id: `inv_${Math.floor(10000 + Math.random() * 90000)}`,
        customerName: "Acme AI Corp",
        customerEmail: "billing@acmeai.com",
        planName: "Growth Tier ($299/mo)",
        amount: 299.0,
        declineCode: "insufficient_funds",
        status: "scheduled",
        retryScheduledFor: "Payday window scheduled in 48h",
        magicToken: "demo_token_8849",
        timestamp: "Just now",
      };

      setPayments([newRecord, ...payments]);
      setSimulationLog(
        "✓ Webhook received & parsed. ChurnShield scheduled optimal retry & sent 1-click magic link!"
      );
      setIsSimulating(false);
    }, 1200);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner & Value Proposition */}
      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-surface to-surface p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300">
            <Sparkles size={13} />
            <span>Active Protection: Live Stripe Webhook Connected</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Passive Involuntary Churn Recovery
          </h1>
          <p className="text-xs sm:text-sm text-white/70 max-w-2xl leading-relaxed">
            Stop losing 10-15% of your MRR to credit card expires, bank friction, and temporary card holds.
            ChurnShield recovers failed payments algorithmically with zero customer annoyance.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 z-10 shrink-0">
          <button
            onClick={handleSimulateWebhook}
            disabled={isSimulating}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 text-xs sm:text-sm font-extrabold text-black transition hover:bg-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.35)]"
          >
            <Zap size={16} />
            <span>{isSimulating ? "Processing Webhook..." : "Simulate Failed Payment"}</span>
          </button>
          <Link
            href="/pay/demo_token_8849"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-xs sm:text-sm font-semibold text-white transition hover:bg-white/10"
          >
            <ExternalLink size={14} />
            <span>Test Customer Card Portal</span>
          </Link>
        </div>
      </div>

      {simulationLog && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-mono text-emerald-300 flex items-center justify-between animate-in fade-in">
          <span>{simulationLog}</span>
          <button onClick={() => setSimulationLog(null)} className="text-white/50 hover:text-white">✕</button>
        </div>
      )}

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Stat 1 */}
        <div className="rounded-2xl border border-white/10 bg-surface-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Total Recovered Revenue</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <DollarSign size={16} />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            ${totalRecovered.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
            <TrendingUp size={13} />
            <span>+34.2% recovered vs previous month</span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="rounded-2xl border border-white/10 bg-surface-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Recovery Success Rate</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <ShieldCheck size={16} />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">68.4%</div>
          <div className="text-xs text-white/50">
            vs. 21.0% industry default retries
          </div>
        </div>

        {/* Stat 3 */}
        <div className="rounded-2xl border border-white/10 bg-surface-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>MRR Protected &amp; At Risk</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <AlertTriangle size={16} />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white">
            ${totalAtRisk.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-xs text-amber-300 font-medium">
            38 active subscriptions currently in dunning
          </div>
        </div>

        {/* Stat 4 */}
        <div className="rounded-2xl border border-white/10 bg-surface-card p-5 space-y-2">
          <div className="flex items-center justify-between text-xs text-white/50">
            <span>Customer ROI Multiple</span>
            <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Sparkles size={16} />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-300">58.1x ROI</div>
          <div className="text-xs text-white/50">
            Based on $49/mo plan vs $2,840 recovered
          </div>
        </div>
      </div>

      {/* Algorithmic Dunning Workflow Diagram */}
      <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
            <RefreshCw size={14} /> ChurnShield Recovery Flow
          </div>
          <span className="text-[11px] font-mono text-white/40">Zero-Code Webhook Hook</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl border border-white/10 bg-white/[.02] space-y-2">
            <div className="text-xs font-mono font-bold text-red-400 flex items-center gap-1.5">
              <span>01.</span> Payment Fails
            </div>
            <div className="text-xs text-white/70 leading-relaxed">
              Stripe fires <code className="text-white bg-black/40 px-1 py-0.5 rounded">invoice.payment_failed</code>. ChurnShield intercepts the failure code.
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-white/[.02] space-y-2">
            <div className="text-xs font-mono font-bold text-amber-300 flex items-center gap-1.5">
              <span>02.</span> Smart Retry Scheduling
            </div>
            <div className="text-xs text-white/70 leading-relaxed">
              Analyzes reason. Insufficient funds retried on paydays; temporary network flags retried 6h later.
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-white/10 bg-white/[.02] space-y-2">
            <div className="text-xs font-mono font-bold text-blue-300 flex items-center gap-1.5">
              <span>03.</span> 1-Click Magic Link
            </div>
            <div className="text-xs text-white/70 leading-relaxed">
              Customer receives a password-free, authenticated card update link with Apple Pay &amp; Google Pay.
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[.05] space-y-2">
            <div className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1.5">
              <span>04.</span> Revenue Recovered ✓
            </div>
            <div className="text-xs text-white/70 leading-relaxed">
              Payment succeeds, Stripe updates subscription to active, and churn is eliminated.
            </div>
          </div>
        </div>
      </div>

      {/* Live Failed Payments & Recoveries Stream */}
      <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-7 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-bold text-white">Live Payment Recovery Activity</h2>
            <p className="text-xs text-white/60 mt-0.5">
              Recent subscription invoice declines handled by ChurnShield smart retries.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/retries"
              className="px-3 py-1.5 rounded-lg border border-white/10 text-xs font-medium text-white/80 hover:text-white hover:bg-white/5 transition"
            >
              Configure Retry Rules →
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead className="border-b border-white/10 text-[11px] uppercase tracking-wider text-white/40">
              <tr>
                <th className="py-3 px-3">Customer / Account</th>
                <th className="py-3 px-3">Subscription</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Decline Reason</th>
                <th className="py-3 px-3">Recovery Status</th>
                <th className="py-3 px-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {payments.map((p) => (
                <tr key={p.id} className="hover:bg-white/[.02] transition">
                  <td className="py-3.5 px-3">
                    <div className="font-semibold font-sans text-white">{p.customerName}</div>
                    <div className="text-[10px] text-white/40">{p.customerEmail}</div>
                  </td>
                  <td className="py-3.5 px-3 font-sans text-white/70">{p.planName}</td>
                  <td className="py-3.5 px-3 font-bold text-white">${p.amount.toFixed(2)}</td>
                  <td className="py-3.5 px-3">
                    <span className="text-[11px] px-2 py-0.5 rounded bg-white/5 text-amber-300 border border-white/10">
                      {p.declineCode.replace(/_/g, " ")}
                    </span>
                  </td>
                  <td className="py-3.5 px-3">
                    {p.status === "recovered" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/20 text-[10px]">
                        <CheckCircle2 size={12} /> RECOVERED
                      </span>
                    ) : p.status === "scheduled" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 font-semibold border border-blue-500/20 text-[10px]">
                        <Clock size={12} /> {p.retryScheduledFor}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 font-semibold border border-amber-500/20 text-[10px]">
                        <Mail size={12} /> DUNNING SENT
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-3">
                    <Link
                      href={`/pay/${p.magicToken}`}
                      className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] text-white/70 hover:text-white transition inline-flex items-center gap-1"
                    >
                      <CreditCard size={11} /> Card Link
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
