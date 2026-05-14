"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function LoginPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const [email, setEmail] = useState("user@store.com");
  const [password, setPassword] = useState("user123");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "Invalid login credentials.");
      return;
    }

    login(data.user);
    router.push("/");
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Login</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="field" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="field" required />
        <button type="submit" className="btn-primary w-full">Sign in</button>
      </form>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <p className="mt-3 text-sm">
        No account? <Link href="/auth/register" className="font-medium underline">Create one</Link>
      </p>
    </div>
  );
}
