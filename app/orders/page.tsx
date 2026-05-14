"use client";

import { demoOrders } from "@/lib/data";
import { useStore } from "@/lib/store";
import { currency } from "@/lib/utils";

export default function OrdersPage() {
  const { user, orders } = useStore((s) => ({ user: s.currentUser, orders: s.orders }));
  const mergedOrders = user ? [...orders.filter((order) => order.userId === user.id), ...demoOrders.filter((order) => order.userId === user.id)] : [];

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Order History & Tracking</h1>
      {!user ? <p className="rounded bg-white p-4">Login to see your orders.</p> : null}
      {mergedOrders.map((order) => (
        <article key={order.id} className="rounded-xl border border-zinc-200 bg-white p-4">
          <div className="flex flex-wrap justify-between gap-2">
            <h2 className="font-semibold">Order {order.id}</h2>
            <span className="text-sm">{order.createdAt}</span>
          </div>
          <p className="text-sm text-zinc-600">Status: {order.status}</p>
          <p className="font-medium">Total: {currency(order.total)}</p>
        </article>
      ))}
      {user && mergedOrders.length === 0 ? <p className="rounded bg-white p-4">No orders yet.</p> : null}
    </div>
  );
}
