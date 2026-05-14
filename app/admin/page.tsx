"use client";

import { useMemo, useState } from "react";
import { demoOrders, demoUsers, products as baseProducts } from "@/lib/data";
import { Product } from "@/lib/types";
import { currency } from "@/lib/utils";

export default function AdminPage() {
  const [adminProducts, setAdminProducts] = useState<Product[]>(baseProducts);
  const [newProductName, setNewProductName] = useState("Limited Drop Tee");

  const totalSales = useMemo(() => demoOrders.reduce((sum, order) => sum + order.total, 0), []);

  function removeProduct(id: string) {
    setAdminProducts((prev) => prev.filter((product) => product.id !== id));
  }

  function addProduct() {
    const product: Product = {
      id: `p-${Date.now()}`,
      name: newProductName,
      description: "Admin-created item",
      price: 59,
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      category: "Streetwear",
      rating: 4,
      popularity: 60,
      inventory: 10,
      createdAt: new Date().toISOString().slice(0, 10),
      reviews: [],
    };
    setAdminProducts((prev) => [product, ...prev]);
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-4 p-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white p-4 shadow-sm">Products: {adminProducts.length}</div>
        <div className="rounded-xl bg-white p-4 shadow-sm">Orders: {demoOrders.length}</div>
        <div className="rounded-xl bg-white p-4 shadow-sm">Users: {demoUsers.length}</div>
        <div className="rounded-xl bg-white p-4 shadow-sm">Sales: {currency(totalSales)}</div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Product Management</h2>
        <div className="mb-3 flex gap-2">
          <input value={newProductName} onChange={(e) => setNewProductName(e.target.value)} className="field" />
          <button onClick={addProduct} className="btn-primary">Create Product</button>
        </div>
        <div className="space-y-2">
          {adminProducts.map((product) => (
            <div key={product.id} className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-200 p-2 text-sm">
              <span>{product.name} · Inventory {product.inventory}</span>
              <button onClick={() => removeProduct(product.id)} className="rounded border px-2 py-1">Delete</button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">Order Management & Tracking</h2>
        {demoOrders.map((order) => (
          <p key={order.id} className="text-sm">{order.id} · {order.status} · {currency(order.total)}</p>
        ))}
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="mb-2 text-lg font-semibold">User Management</h2>
        {demoUsers.map((user) => (
          <p key={user.id} className="text-sm">{user.name} · {user.email} · {user.role}</p>
        ))}
      </section>
    </div>
  );
}
