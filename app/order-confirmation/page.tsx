import Link from "next/link";

export default async function OrderConfirmationPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="mx-auto my-8 w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-6 text-center">
      <h1 className="text-3xl font-bold">Order Confirmed</h1>
      <p className="mt-3 text-zinc-600">Your payment was successful and invoice was generated.</p>
      <p className="mt-2 text-sm">Order ID: {params.orderId ?? "N/A"}</p>
      <Link href="/orders" className="mt-5 inline-block rounded bg-black px-4 py-2 text-white">
        Track Order
      </Link>
    </div>
  );
}
