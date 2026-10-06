"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CreditCard,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sliders,
  Sparkles,
  Zap,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Overview", icon: Activity },
    { href: "/retries", label: "Smart Retries", icon: RefreshCw },
    { href: "/campaigns", label: "Dunning Emails", icon: Mail },
    { href: "/pay/demo_token_8849", label: "Payment Portal", icon: CreditCard },
    { href: "/pricing", label: "Pricing & ROI", icon: Sparkles },
    { href: "/settings", label: "Stripe Setup", icon: Sliders },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080B10]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-black font-extrabold shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <ShieldCheck size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <div className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1.5">
              <span>ChurnShield</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                PRO
              </span>
            </div>
            <div className="text-[10px] text-white/50 -mt-0.5">Stripe Involuntary Churn Recovery</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-white/[.03] p-1 rounded-xl border border-white/5">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? "bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 shadow-sm"
                    : "text-white/70 hover:text-white hover:bg-white/[.04]"
                }`}
              >
                <Icon size={13} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/settings"
            className="flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/20 shadow-sm"
          >
            <Zap size={13} />
            <span>Connect Stripe</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
