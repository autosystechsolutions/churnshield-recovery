-- ChurnShield: Supabase Database Schema
-- Run in Supabase SQL Editor to initialize full database support

-- 1. Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_subscription_id TEXT UNIQUE NOT NULL,
    stripe_customer_id TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    plan_name TEXT NOT NULL,
    amount_cents INTEGER NOT NULL,
    currency TEXT DEFAULT 'usd',
    status TEXT DEFAULT 'active', -- active, past_due, canceled
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Failed Invoices Table
CREATE TABLE IF NOT EXISTS public.failed_invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stripe_invoice_id TEXT UNIQUE NOT NULL,
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    amount_due_cents INTEGER NOT NULL,
    decline_code TEXT NOT NULL,
    decline_reason TEXT,
    retry_count INTEGER DEFAULT 0,
    max_retries INTEGER DEFAULT 4,
    next_retry_at TIMESTAMPTZ,
    status TEXT DEFAULT 'scheduled', -- scheduled, recovered, failed, abandoned
    magic_token TEXT UNIQUE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    recovered_at TIMESTAMPTZ
);

-- 3. Retry Audit Events
CREATE TABLE IF NOT EXISTS public.retry_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES public.failed_invoices(id) ON DELETE CASCADE,
    attempt_number INTEGER NOT NULL,
    response_code TEXT,
    success BOOLEAN DEFAULT FALSE,
    executed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Dunning Email Logs
CREATE TABLE IF NOT EXISTS public.dunning_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID REFERENCES public.failed_invoices(id) ON DELETE CASCADE,
    email_step INTEGER NOT NULL, -- 1, 2, 3
    recipient_email TEXT NOT NULL,
    sent_at TIMESTAMPTZ DEFAULT NOW(),
    opened_at TIMESTAMPTZ,
    clicked_magic_link_at TIMESTAMPTZ
);

-- Row Level Security (RLS)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.failed_invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.retry_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dunning_logs ENABLE ROW LEVEL SECURITY;
