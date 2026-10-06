# ChurnShield — Stripe Involuntary Churn Recovery Micro-SaaS

> Automatically recover 68%+ of failed subscription payments on Stripe using algorithmic card retries, pre-dunning expiration alerts, and 1-click passwordless payment update portals.

## 🚀 Key Features

1. **Algorithmic Smart Retries**:
   - Matches decline reasons (`insufficient_funds` retried on 1st/15th payday windows; `card_velocity_exceeded` retried after a 6-hour cooldown).
   - Prevents card network spam penalties.
2. **1-Click Magic-Link Card Updater (`/pay/[token]`)**:
   - Zero password login required for your customers.
   - Apple Pay, Google Pay, and clean credit card input.
3. **Automated Dunning Sequences (`/campaigns`)**:
   - 3-step empathetic recovery emails.
4. **Interactive ROI Calculator (`/pricing`)**:
   - Real-time calculation proving 50x+ ROI for subscription businesses.
5. **Direct Stripe Webhook Integration (`/api/webhook`)**:
   - Plug in your Stripe webhook secret and automate recovery in under 2 minutes.

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Payments**: Stripe API & Webhooks
- **Deployment**: Vercel ready

## 🏃 Getting Started

```bash
# Run locally
npm run dev
# or
next dev
```
