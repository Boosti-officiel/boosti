import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const stripe = new Stripe(process.env.STRIPE_SK!, { apiVersion: "2024-06-20" });
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://boosti.vercel.app"}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://boosti.vercel.app"}/cancel`,
    });
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "stripe_error" }, { status: 500 });
  }
}
