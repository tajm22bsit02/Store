"use client";

import { useMemo, useState } from "react";
import { ProductFilters } from "@/components/ProductFilters";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/data";
import { filterAndSortProducts, SortOption } from "@/lib/utils";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [minRating, setMinRating] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("popularity");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const visibleProducts = useMemo(
    () => filterAndSortProducts(products, query, category, priceRange, minRating, sortBy),
    [query, category, priceRange, minRating, sortBy]
  );

  const updateFilter = (field: string, value: string | number) => {
    if (field === "query") setQuery(String(value));
    if (field === "category") setCategory(String(value));
    if (field === "minRating") setMinRating(Number(value));
    if (field === "sortBy") setSortBy(value as SortOption);
    if (field === "priceMin") setPriceRange(([, max]) => [Number(value), max]);
    if (field === "priceMax") setPriceRange(([min]) => [min, Number(value)]);
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 p-4">
      <section className="rounded-2xl bg-black p-6 text-white">
        <h1 className="text-3xl font-bold">Modern E-Commerce Store</h1>
        <p className="mt-2 text-zinc-200">
          Discover trending products, filter by category, and shop with secure checkout.
        </p>
      </section>

      <ProductFilters
        query={query}
        category={category}
        minRating={minRating}
        sortBy={sortBy}
        priceRange={priceRange}
        onChange={updateFilter}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {visibleProducts.length === 0 ? (
        <p className="rounded-md bg-white p-4 text-center text-zinc-600">No products match your filters.</p>
      ) : null}
    </div>
  );
}
