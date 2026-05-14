import { currency } from "./utils";

type InvoiceInput = {
  orderId: string;
  email: string;
  items: { name: string; price: number; quantity: number }[];
  total: number;
};

export function generateInvoiceText({ orderId, email, items, total }: InvoiceInput) {
  const rows = items
    .map((item) => `${item.name} x${item.quantity} - ${currency(item.price * item.quantity)}`)
    .join("\n");

  return `Invoice #${orderId}\nCustomer: ${email}\n\n${rows}\n\nGrand Total: ${currency(total)}\nThank you for your purchase.`;
}
