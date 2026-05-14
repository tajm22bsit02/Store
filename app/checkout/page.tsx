"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CartSummary } from "@/components/CartSummary";
import { generateInvoiceText } from "@/lib/invoice";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { getCartTotals } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, currentUser, placeOrder } = useStore((s) => ({
    cart: s.cart,
    currentUser: s.currentUser,
    placeOrder: s.placeOrder,
  }));
  const [email, setEmail] = useState(currentUser?.email ?? "user@store.com");
  const [message, setMessage] = useState("");

  const items = useMemo(
    () =>
      cart
        .map((entry) => {
          const product = products.find((p) => p.id === entry.productId);
          if (!product) return null;
          return {
            productId: product.id,
            quantity: entry.quantity,
            unitAmount: product.price,
            name: product.name,
          };
        })
        .filter((item): item is NonNullable<typeof item> => Boolean(item)),
    [cart]
  );

  const totals = getCartTotals(items.map((item) => ({ price: item.unitAmount, quantity: item.quantity })));

  async function handlePay(event: FormEvent) {
    event.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, email }),
      });

      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload.error ?? "Checkout failed");
      }

      const order = placeOrder();
      if (!order) throw new Error("Please login and add products before checkout.");

      const invoice = generateInvoiceText({
        orderId: order.id,
        email,
        items: items.map((item) => ({ name: item.name, price: item.unitAmount, quantity: item.quantity })),
        total: totals.total,
      });

      const blob = new Blob([invoice], { type: "text/plain;charset=utf-8" });
      const anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(blob);
      anchor.download = `${order.id}-invoice.txt`;
      anchor.click();
      URL.revokeObjectURL(anchor.href);

      router.push(`/order-confirmation?orderId=${order.id}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to process payment.");
    }
  }

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4 p-4 lg:grid-cols-[1fr_320px]">
      <form onSubmit={handlePay} className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
        <h1 className="text-2xl font-bold">Secure Checkout</h1>
        <p className="text-sm text-zinc-600">Stripe integration is enabled when STRIPE_SECRET_KEY is configured.</p>
        <label className="block text-sm font-medium">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded border px-3 py-2" required />
        <button type="submit" className="rounded-md bg-black px-4 py-2 text-white">
          Pay now
        </button>
        {message ? <p className="text-sm text-red-600">{message}</p> : null}
      </form>
      <CartSummary {...totals} />
    </div>
  );
}
