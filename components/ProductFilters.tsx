"use client";

import { SortOption } from "@/lib/utils";

type Props = {
  query: string;
  category: string;
  minRating: number;
  sortBy: SortOption;
  priceRange: [number, number];
  onChange: (field: string, value: string | number) => void;
};

export function ProductFilters({ query, category, minRating, sortBy, priceRange, onChange }: Props) {
  return (
    <section className="grid gap-3 rounded-xl border border-zinc-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
      <input
        value={query}
        onChange={(e) => onChange("query", e.target.value)}
        placeholder="Search by keyword"
        className="rounded-md border px-3 py-2"
      />
      <select
        value={category}
        onChange={(e) => onChange("category", e.target.value)}
        className="rounded-md border px-3 py-2"
      >
        <option>All</option>
        <option>Sneakers</option>
        <option>Streetwear</option>
        <option>Accessories</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => onChange("sortBy", e.target.value)}
        className="rounded-md border px-3 py-2"
      >
        <option value="popularity">Most Popular</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="newest">Newest</option>
      </select>
      <input
        type="number"
        min={1}
        max={5}
        value={minRating}
        onChange={(e) => onChange("minRating", Number(e.target.value))}
        className="rounded-md border px-3 py-2"
        placeholder="Min rating"
      />
      <div className="flex gap-2">
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => onChange("priceMin", Number(e.target.value))}
          className="w-1/2 rounded-md border px-3 py-2"
          placeholder="Min"
        />
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => onChange("priceMax", Number(e.target.value))}
          className="w-1/2 rounded-md border px-3 py-2"
          placeholder="Max"
        />
      </div>
    </section>
  );
}
