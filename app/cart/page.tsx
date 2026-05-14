"use client";

import Link from "next/link";
import { CartSummary } from "@/components/CartSummary";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { currency, getCartTotals } from "@/lib/utils";

export default function CartPage() {
  const { cart, removeFromCart, setCartQuantity } = useStore((s) => ({
    cart: s.cart,
    removeFromCart: s.removeFromCart,
    setCartQuantity: s.setCartQuantity,
  }));

  const rows = cart.map((item) => ({
    item,
    product: products.find((product) => product.id === item.productId),
  }));

  const totals = getCartTotals(
    rows.map(({ item, product }) => ({
      quantity: item.quantity,
      price: product?.price ?? 0,
    }))
  );

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-4 p-4 lg:grid-cols-[1fr_320px]">
      <section className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        {rows.length === 0 ? (
          <p className="text-zinc-600">Your cart is empty.</p>
        ) : (
          rows.map(({ item, product }) => (
            <article key={item.productId} className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-3">
              <div>
                <h2 className="font-semibold">{product?.name ?? "Unknown Product"}</h2>
                <p className="text-sm text-zinc-600">{currency(product?.price ?? 0)}</p>
              </div>
              <input
                type="number"
                min={1}
                value={item.quantity}
                onChange={(e) => setCartQuantity(item.productId, Number(e.target.value))}
                className="w-20 rounded border px-2 py-1"
              />
              <button onClick={() => removeFromCart(item.productId)} className="rounded border px-3 py-1 text-sm">
                Remove
              </button>
            </article>
          ))
        )}
      </section>

      <div className="space-y-3">
        <CartSummary {...totals} />
        <Link href="/checkout" className="block rounded-md bg-black px-4 py-2 text-center text-white">
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
