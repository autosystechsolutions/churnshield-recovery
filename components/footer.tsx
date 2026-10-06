import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080B10] py-10 mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>ChurnShield &copy; {new Date().getFullYear()} — Enterprise Failed Payment &amp; Involuntary Churn Recovery</span>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <Link href="/pricing" className="hover:text-white transition">Pricing</Link>
          <Link href="/retries" className="hover:text-white transition">Retry Rules</Link>
          <Link href="/settings" className="hover:text-white transition">API &amp; Webhooks</Link>
          <span className="text-emerald-400">SOC 2 Type II &amp; PCI DSS Level 1 Compliant</span>
        </div>
      </div>
    </footer>
  );
}
