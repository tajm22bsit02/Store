"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const { user, updateAddress, logout } = useStore((s) => ({
    user: s.currentUser,
    updateAddress: s.updateAddress,
    logout: s.logout,
  }));

  const [form, setForm] = useState({
    fullName: user?.address?.fullName ?? user?.name ?? "",
    line1: user?.address?.line1 ?? "",
    city: user?.address?.city ?? "",
    country: user?.address?.country ?? "",
    postalCode: user?.address?.postalCode ?? "",
  });
  const [message, setMessage] = useState("");

  if (!user) {
    return <div className="mx-auto mt-8 w-full max-w-lg rounded-xl bg-white p-6">Please login to manage profile.</div>;
  }

  async function submitAddress(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/auth/address", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await response.json();
    if (!response.ok) {
      setMessage(data.error ?? "Could not save address.");
      return;
    }

    updateAddress(form);
    setMessage("Address updated.");
  }

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 p-4">
      <section className="rounded-xl border border-zinc-200 bg-white p-4">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-sm text-zinc-600">{user.name} · {user.email} · {user.role}</p>
        <button onClick={logout} className="mt-3 rounded border px-3 py-1 text-sm">Logout</button>
      </section>

      <form onSubmit={submitAddress} className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-2">
        <h2 className="sm:col-span-2 text-lg font-semibold">Address Management</h2>
        {Object.entries(form).map(([key, value]) => (
          <input
            key={key}
            value={value}
            onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))}
            className="field"
            placeholder={key}
            required
          />
        ))}
        <button className="btn-primary sm:col-span-2" type="submit">Save Address</button>
        {message ? <p className="sm:col-span-2 text-sm text-zinc-600">{message}</p> : null}
      </form>
    </div>
  );
}
