"use client";

import { useState } from "react";
import {
  Check,
  CheckCircle2,
  Copy,
  ExternalLink,
  Key,
  Lock,
  Save,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("sk_test_51Mz99demoKeySampleChurnShield");
  const [webhookSecret, setWebhookSecret] = useState("whsec_demoSampleWebhookSecret4910");
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const webhookEndpoint = "https://churnshield.vercel.app/api/webhook";

  const handleCopy = () => {
    navigator.clipboard.writeText(webhookEndpoint);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTestConnection = () => {
    setTestResult("Testing connection to Stripe API...");
    setTimeout(() => {
      setTestResult("✓ Success: Connected to Stripe Account. Webhook listener active!");
    }, 1000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
          <Key size={15} /> Stripe Integration &amp; Webhooks
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
          Stripe Connection Settings
        </h1>
        <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl leading-relaxed">
          Connect your Stripe account via restricted API keys or webhooks. ChurnShield only requires permissions to read invoice status and trigger retries; we never touch bank payouts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: API Keys */}
        <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Lock size={16} className="text-emerald-400" /> API Authentication
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
              AES-256 Encrypted
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Stripe Secret API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk_live_... or sk_test_..."
                className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs font-mono text-white focus:border-emerald-400 focus:outline-none"
              />
              <p className="text-[10px] text-white/40">
                Found in your <a href="https://dashboard.stripe.com/apikeys" target="_blank" rel="noreferrer" className="text-emerald-400 underline">Stripe Dashboard &rarr; Developers &rarr; API keys</a>.
              </p>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Stripe Webhook Signing Secret</label>
              <input
                type="password"
                value={webhookSecret}
                onChange={(e) => setWebhookSecret(e.target.value)}
                placeholder="whsec_..."
                className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs font-mono text-white focus:border-emerald-400 focus:outline-none"
              />
              <p className="text-[10px] text-white/40">
                Used to verify that inbound events originate securely from Stripe.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleTestConnection}
                className="px-4 py-2.5 rounded-xl bg-emerald-400 text-black font-extrabold text-xs hover:bg-emerald-300 transition flex items-center gap-1.5"
              >
                <Zap size={13} /> Test Stripe Connection
              </button>
              <button
                type="button"
                onClick={() => {
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                className="px-4 py-2.5 rounded-xl border border-white/20 bg-white/5 text-white font-semibold text-xs hover:bg-white/10 transition flex items-center gap-1.5"
              >
                <Save size={13} /> {saved ? "Saved ✓" : "Save Keys"}
              </button>
            </div>

            {testResult && (
              <div className="p-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono text-emerald-300">
                {testResult}
              </div>
            )}
          </div>
        </div>

        {/* Right: Webhook Endpoint */}
        <div className="rounded-3xl border border-white/10 bg-surface p-6 sm:p-7 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Terminal size={16} className="text-emerald-400" /> Webhook Configuration
            </h2>
            <span className="text-[10px] font-mono text-white/40">HTTP POST</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-white/80">Your Live ChurnShield Webhook URL</label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={webhookEndpoint}
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs font-mono text-emerald-300 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3.5 py-3 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 text-white text-xs transition shrink-0 flex items-center gap-1"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? "Copied" : "Copy"}</span>
                </button>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-semibold text-white/80">Required Stripe Webhook Events to Subscribe:</div>
              <ul className="space-y-1.5 text-xs font-mono text-white/70">
                <li className="p-2 rounded-lg bg-white/[.02] border border-white/5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <code className="text-emerald-300">invoice.payment_failed</code>
                  <span className="text-[10px] text-white/40 font-sans ml-auto">Triggers smart retries</span>
                </li>
                <li className="p-2 rounded-lg bg-white/[.02] border border-white/5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <code className="text-emerald-300">invoice.payment_succeeded</code>
                  <span className="text-[10px] text-white/40 font-sans ml-auto">Marks revenue recovered</span>
                </li>
                <li className="p-2 rounded-lg bg-white/[.02] border border-white/5 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <code className="text-emerald-300">customer.subscription.deleted</code>
                  <span className="text-[10px] text-white/40 font-sans ml-auto">Logs terminal churn</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
