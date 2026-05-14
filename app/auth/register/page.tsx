"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";

export default function RegisterPage() {
  const router = useRouter();
  const login = useStore((s) => s.login);
  const [name, setName] = useState("New User");
  const [email, setEmail] = useState("new@store.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error ?? "Registration failed");
      return;
    }

    login(data.user);
    router.push("/profile");
  }

  return (
    <div className="mx-auto mt-8 w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">Create Account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <input value={name} onChange={(e) => setName(e.target.value)} className="field" placeholder="Full name" required />
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="field" placeholder="Email" required />
        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" className="field" placeholder="Password" required />
        <button type="submit" className="btn-primary w-full">Register</button>
      </form>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      <p className="mt-3 text-sm">
        Already have an account? <Link href="/auth/login" className="font-medium underline">Login</Link>
      </p>
    </div>
  );
}
