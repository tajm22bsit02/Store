"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/lib/types";
import { currency } from "@/lib/utils";
import { useStore } from "@/lib/store";

type Props = { product: Product };

export function ProductCard({ product }: Props) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm">
      <Link href={`/products/${product.id}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={350}
          className="h-48 w-full rounded-lg object-cover"
        />
      </Link>
      <div className="mt-3 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold">{product.name}</h3>
          <span className="text-sm text-zinc-500">⭐ {product.rating}</span>
        </div>
        <p className="line-clamp-2 text-sm text-zinc-600">{product.description}</p>
        <p className="font-bold">{currency(product.price)}</p>
        <div className="flex gap-2">
          <button
            onClick={() => addToCart(product.id)}
            className="flex-1 rounded-md bg-black px-3 py-2 text-sm text-white"
          >
            Add to Cart
          </button>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="rounded-md border px-3 py-2 text-sm"
          >
            {wishlist.includes(product.id) ? "♥" : "♡"}
          </button>
        </div>
      </div>
    </article>
  );
}
