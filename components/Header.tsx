"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export function Header() {
  const cartCount = useStore((s) => s.cart.reduce((sum, item) => sum + item.quantity, 0));
  const wishlistCount = useStore((s) => s.wishlist.length);
  const user = useStore((s) => s.currentUser);

  return (
    <header className="border-b border-zinc-200 bg-white/90 backdrop-blur sticky top-0 z-20">
      <nav className="mx-auto flex max-w-6xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          StoreHub
        </Link>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <Link href="/">Products</Link>
          <Link href="/wishlist">Wishlist ({wishlistCount})</Link>
          <Link href="/cart">Cart ({cartCount})</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/support">Support</Link>
          <Link href="/admin">Admin</Link>
          {user ? <Link href="/profile">{user.name}</Link> : <Link href="/auth/login">Login</Link>}
        </div>
      </nav>
    </header>
  );
}
