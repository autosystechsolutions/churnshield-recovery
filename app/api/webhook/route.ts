import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const rawBody = await request.text();
    let event;

    try {
      event = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
    }

    const eventType = event.type || "unknown";

    switch (eventType) {
      case "invoice.payment_failed": {
        const invoice = event.data?.object;
        const customerId = invoice?.customer;
        const amountDue = (invoice?.amount_due || 0) / 100;
        const declineCode = invoice?.last_finalization_error?.code || "insufficient_funds";

        console.log(`[CHURNSHIELD] Invoice payment failed for customer ${customerId}: $${amountDue}. Decline: ${declineCode}`);
        
        // Algorithmic retry logic here:
        // Schedule next retry timestamp based on declineCode
        return NextResponse.json({
          status: "processed",
          action: "smart_retry_scheduled",
          invoiceId: invoice?.id,
          declineCode,
          retryWindowHours: declineCode === "card_velocity_exceeded" ? 6 : 48,
        });
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data?.object;
        const amountPaid = (invoice?.amount_paid || 0) / 100;

        console.log(`[CHURNSHIELD] Revenue recovered! Invoice ${invoice?.id}: $${amountPaid}`);

        return NextResponse.json({
          status: "processed",
          action: "revenue_recovered",
          invoiceId: invoice?.id,
          amountPaid,
        });
      }

      case "customer.subscription.deleted": {
        console.log(`[CHURNSHIELD] Subscription cancelled for customer ${event.data?.object?.customer}`);
        return NextResponse.json({ status: "processed", action: "logged_churn" });
      }

      default:
        return NextResponse.json({ status: "ignored", eventType });
    }
  } catch (error: any) {
    console.error("[CHURNSHIELD] Webhook error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
