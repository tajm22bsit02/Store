"use client";

import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { useStore } from "@/lib/store";

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist);
  const selected = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Wishlist</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {selected.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {selected.length === 0 ? <p className="text-zinc-600">No items in wishlist yet.</p> : null}
    </div>
  );
}
