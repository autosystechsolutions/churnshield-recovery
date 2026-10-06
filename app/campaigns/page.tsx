"use client";

import { useState } from "react";
import {
  Clock,
  ExternalLink,
  Eye,
  Mail,
  Save,
  Send,
  Sparkles,
  Zap,
} from "lucide-react";

export default function DunningCampaigns() {
  const [activeEmail, setActiveEmail] = useState<number>(1);
  const [email1Subject, setEmail1Subject] = useState("Quick update regarding your Acme Analytics subscription");
  const [email2Subject, setEmail2Subject] = useState("Your subscription is paused — please update your payment method");
  const [senderName, setSenderName] = useState("Alex from Acme Analytics");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="border-b border-white/10 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400">
            <Mail size={15} /> Dunning Recovery Sequences
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Automated Customer Dunning Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl leading-relaxed">
            High-converting, empathetic email workflows with embedded 1-click magic payment links. Zero password login required for your customers to update their card.
          </p>
        </div>

        <button
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-400 text-black font-extrabold text-xs transition hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] self-start"
        >
          <Save size={14} />
          <span>{saved ? "Saved to Mail Engine ✓" : "Save Sequences"}</span>
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Sequence Steps */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-white/40 mb-2">
            Automated Cadence Pipeline
          </div>

          {[
            {
              id: 1,
              title: "Step 1: Gentle Heads-Up Notice",
              timing: "Immediately upon 1st card decline (Day 0)",
              subject: email1Subject,
              desc: "Polite, friction-free notification assuming an accidental bank glitch.",
            },
            {
              id: 2,
              title: "Step 2: Service Continuation Notice",
              timing: "3 days after initial failure (Day 3)",
              subject: email2Subject,
              desc: "Highlights account benefits and direct 1-click card update button.",
            },
            {
              id: 3,
              title: "Step 3: Final Grace Period Notice",
              timing: "7 days after failure (Day 7)",
              subject: "Final Notice: Account deactivation in 48 hours",
              desc: "Creates respectful urgency before Stripe cancels the subscription.",
            },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveEmail(item.id)}
              className={`p-4 rounded-2xl border transition cursor-pointer space-y-2 ${
                activeEmail === item.id
                  ? "border-emerald-500/50 bg-emerald-500/10 text-white shadow-md ring-1 ring-emerald-500/30"
                  : "border-white/10 bg-surface text-white/70 hover:bg-white/[.04]"
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{item.title}</span>
                <span className="font-mono text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {item.timing.split(" ")[0]}
                </span>
              </div>
              <div className="text-[11px] font-mono text-white/50 truncate">
                Subj: {item.subject}
              </div>
              <p className="text-[11px] text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Right: Live Visual Email Mockup */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-white/60">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <Eye size={14} className="text-emerald-400" /> Live Customer Email Preview
            </span>
            <span className="text-[11px] font-mono text-white/40">HTML Template / Responsive</span>
          </div>

          <div className="rounded-3xl border border-white/15 bg-white text-black p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Email Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 text-xs text-gray-500">
              <div>
                <strong>From:</strong> {senderName} &lt;billing@acme.com&gt;
              </div>
              <div>
                <strong>To:</strong> Customer &lt;alex@subscriber.com&gt;
              </div>
            </div>

            {/* Subject */}
            <div className="text-base sm:text-lg font-bold text-gray-900">
              {activeEmail === 1 ? email1Subject : activeEmail === 2 ? email2Subject : "Final Notice: Account deactivation in 48 hours"}
            </div>

            {/* Body */}
            <div className="text-xs sm:text-sm text-gray-700 space-y-3 leading-relaxed">
              <p>Hi Alex,</p>
              {activeEmail === 1 ? (
                <p>
                  We tried processing your recent renewal for <strong>Acme Analytics Pro ($199.00/mo)</strong>, but your bank declined the charge due to a temporary card hold.
                </p>
              ) : activeEmail === 2 ? (
                <p>
                  We noticed your card on file is still declining. Your team has active analytics pipelines running on our servers—we want to ensure you don&apos;t lose access.
                </p>
              ) : (
                <p>
                  This is our final notice before your subscription is scheduled for cancellation in 48 hours. Please update your billing method below to prevent account deactivation.
                </p>
              )}
              <p>
                No login is needed. You can securely update your card or pay via Apple Pay with one click using your personalized magic link below:
              </p>
            </div>

            {/* CTA Button */}
            <div className="py-2">
              <a
                href="/pay/demo_token_8849"
                className="inline-block px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow-md hover:bg-emerald-700 transition"
              >
                Update Payment Method Securely &rarr;
              </a>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-100 pt-4 text-[10px] text-gray-400 leading-relaxed">
              Questions? Reply directly to this email to speak with your dedicated billing account executive.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
