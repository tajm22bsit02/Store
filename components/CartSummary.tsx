import { currency } from "@/lib/utils";

type Props = {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
};

export function CartSummary({ subtotal, tax, shipping, total }: Props) {
  return (
    <aside className="rounded-xl border border-zinc-200 bg-white p-4">
      <h3 className="mb-3 text-lg font-semibold">Order Summary</h3>
      <div className="space-y-1 text-sm">
        <p className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></p>
        <p className="flex justify-between"><span>Tax</span><span>{currency(tax)}</span></p>
        <p className="flex justify-between"><span>Shipping</span><span>{currency(shipping)}</span></p>
      </div>
      <p className="mt-3 flex justify-between border-t pt-3 font-bold">
        <span>Total</span>
        <span>{currency(total)}</span>
      </p>
    </aside>
  );
}
