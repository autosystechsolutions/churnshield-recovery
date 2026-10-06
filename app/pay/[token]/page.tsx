"use client";

import { useState } from "react";
import {
  CheckCircle2,
  CreditCard,
  Lock,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

export default function PaymentUpdatePortal({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-white/15 bg-surface p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
        {/* Top Company Badge */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 font-bold">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="text-sm font-bold text-white">Acme Analytics Pro</div>
              <div className="text-[10px] text-white/50">Subscription Billing Portal</div>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 flex items-center gap-1">
            <Lock size={10} /> Secure 256-Bit TLS
          </span>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <div className="mx-auto h-16 w-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
              <CheckCircle2 size={32} />
            </div>
            <h2 className="text-xl font-bold text-white">Payment Method Updated!</h2>
            <p className="text-xs text-white/70 max-w-xs mx-auto leading-relaxed">
              Your new card has been authorized and the pending invoice for <strong>$199.00</strong> was successfully processed. Your account is 100% active.
            </p>
            <div className="p-3 rounded-xl bg-white/5 text-[11px] font-mono text-white/50">
              Receipt sent to your registered billing email.
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-xl font-extrabold text-white">Update Payment Method</h2>
              <p className="text-xs text-white/60 mt-1 leading-relaxed">
                Your last recurring subscription charge of <strong>$199.00</strong> was declined by your bank. Update your details below to resume uninterrupted access.
              </p>
            </div>

            {/* Express Checkout Button */}
            <div>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitting(true);
                  setTimeout(() => {
                    setIsSubmitting(false);
                    setIsSuccess(true);
                  }, 1000);
                }}
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-white text-black font-extrabold text-xs flex items-center justify-center gap-2 hover:bg-white/90 transition shadow-lg"
              >
                <span> Pay with Apple Pay</span>
              </button>
              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10" />
                </div>
                <span className="relative bg-surface px-2 text-[10px] uppercase tracking-wider text-white/40">
                  Or pay with credit / debit card
                </span>
              </div>
            </div>

            {/* Credit Card Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-white/70">Cardholder Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Vance"
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white focus:border-emerald-400 focus:outline-none placeholder:text-white/20"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-medium text-white/70 flex items-center justify-between">
                  <span>Card Number</span>
                  <span className="flex items-center gap-1 text-[10px] text-white/40">
                    <CreditCard size={11} /> Visa, Mastercard, Amex
                  </span>
                </label>
                <input
                  type="text"
                  required
                  maxLength={19}
                  placeholder="4242 •••• •••• 4242"
                  value={cardNumber}
                  onChange={(e) => {
                    // Simple card formatting
                    const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                    setCardNumber(v.replace(/(\d{4})/g, "$1 ").trim());
                  }}
                  className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none placeholder:text-white/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-white/70">Expiration</label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
                      setExpiry(v);
                    }}
                    className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none placeholder:text-white/20"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-medium text-white/70">CVC / CVV</label>
                  <input
                    type="password"
                    required
                    maxLength={4}
                    placeholder="•••"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className="w-full rounded-xl border border-white/15 bg-black/60 p-3 text-xs text-white font-mono focus:border-emerald-400 focus:outline-none placeholder:text-white/20"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-400 text-black font-extrabold text-xs transition hover:bg-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] mt-2 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <span>Authorizing Card with Stripe...</span>
                ) : (
                  <>
                    <Lock size={12} />
                    <span>Pay $199.00 &amp; Update Subscription</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center text-[10px] text-white/40 pt-2 flex items-center justify-center gap-3">
              <span>PCI-DSS Level 1 Compliant</span>
              <span>&middot;</span>
              <span>Direct Bank Encryption</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
