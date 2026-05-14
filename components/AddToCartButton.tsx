"use client";

import { useStore } from "@/lib/store";

export function AddToCartButton({ productId }: { productId: string }) {
  const addToCart = useStore((s) => s.addToCart);

  return (
    <button onClick={() => addToCart(productId)} className="rounded-md bg-black px-4 py-2 text-white">
      Add to Cart
    </button>
  );
}
