import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { products } from "@/lib/data";
import { currency } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);

  if (!product) return notFound();

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-6 p-4 md:grid-cols-2">
      <Image src={product.image} alt={product.name} width={900} height={700} className="h-full rounded-xl object-cover" />
      <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-zinc-600">{product.description}</p>
        <p className="text-xl font-semibold">{currency(product.price)}</p>
        <p className="text-sm">Category: {product.category}</p>
        <p className="text-sm">Rating: {product.rating} / 5</p>
        <p className="text-sm">In stock: {product.inventory}</p>
        <AddToCartButton productId={product.id} />

        <div>
          <h2 className="mb-2 text-lg font-semibold">Product Reviews</h2>
          <ul className="space-y-2 text-sm">
            {product.reviews.map((review) => (
              <li key={review.id} className="rounded-md border border-zinc-200 p-2">
                <p className="font-medium">{review.author} · ⭐ {review.rating}</p>
                <p className="text-zinc-600">{review.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
