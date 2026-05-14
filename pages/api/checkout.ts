import type { NextApiRequest, NextApiResponse } from "next";
import { checkoutSchema } from "@/lib/validators";
import { stripe } from "@/lib/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const payload = checkoutSchema.parse(req.body);

    if (!stripe) {
      return res.status(200).json({ mode: "mock", message: "Stripe key not configured", payload });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: payload.email,
      line_items: payload.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: Math.round(item.unitAmount * 100),
        },
      })),
      success_url: `${req.headers.origin ?? "http://localhost:3000"}/order-confirmation`,
      cancel_url: `${req.headers.origin ?? "http://localhost:3000"}/checkout`,
    });

    return res.status(200).json({ mode: "stripe", sessionId: session.id });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : "Invalid checkout payload" });
  }
}
