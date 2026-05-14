"use client";

import { FormEvent, useState } from "react";

export default function SupportPage() {
  const [contactStatus, setContactStatus] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState("");

  async function sendContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    setContactStatus(response.ok ? "Message sent." : "Unable to send message.");
  }

  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    setNewsletterStatus(response.ok ? "Subscribed successfully." : "Subscription failed.");
  }

  return (
    <div className="mx-auto grid w-full max-w-4xl gap-4 p-4 md:grid-cols-2">
      <form onSubmit={sendContact} className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
        <h1 className="text-xl font-bold">Contact Support</h1>
        <input name="name" className="field" placeholder="Your name" required />
        <input name="email" type="email" className="field" placeholder="Email" required />
        <textarea name="message" className="field min-h-28" placeholder="Message" required />
        <button className="btn-primary" type="submit">Send</button>
        {contactStatus ? <p className="text-sm text-zinc-600">{contactStatus}</p> : null}
      </form>

      <form onSubmit={subscribe} className="space-y-3 rounded-xl border border-zinc-200 bg-white p-4">
        <h2 className="text-xl font-bold">Newsletter Subscription</h2>
        <input name="email" type="email" className="field" placeholder="Email" required />
        <button className="btn-primary" type="submit">Subscribe</button>
        {newsletterStatus ? <p className="text-sm text-zinc-600">{newsletterStatus}</p> : null}
      </form>
    </div>
  );
}
