import type { Metadata } from "next";
import "./globals.css";
import "@/styles/forms.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "StoreHub",
  description: "Production-ready demo e-commerce website built with Next.js + TypeScript",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-zinc-50 text-zinc-950">
        <Header />
        <main className="flex min-h-[calc(100vh-73px)] flex-col">{children}</main>
      </body>
    </html>
  );
}
