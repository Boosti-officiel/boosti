import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature") || "";
  const secret = process.env.STRIPE_WEBHOOK_SECRET!;
  const stripe = new Stripe(process.env.STRIPE_SK!, { apiVersion: "2024-06-20" });

  const buf = await req.arrayBuffer();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(Buffer.from(buf), sig, secret);
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // TODO: brancher Supabase ici
  switch (event.type) {
    case "checkout.session.completed":
      console.log("✅ subscription created", event.data.object.id);
      break;
    case "customer.subscription.deleted":
      console.log("🧹 subscription cancelled", (event.data.object as any)?.id);
      break;
    default:
      console.log("Unhandled event", event.type);
  }
  return NextResponse.json({ received: true });
}
