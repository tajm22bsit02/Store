import { Product } from "./types";

export type SortOption = "popularity" | "priceAsc" | "priceDesc" | "newest";

export function filterAndSortProducts(
  products: Product[],
  query: string,
  category: string,
  priceRange: [number, number],
  minRating: number,
  sortBy: SortOption
) {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = products.filter((product) => {
    const queryMatch =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery) ||
      product.description.toLowerCase().includes(normalizedQuery);

    const categoryMatch = category === "All" || product.category === category;
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const ratingMatch = product.rating >= minRating;

    return queryMatch && categoryMatch && priceMatch && ratingMatch;
  });

  return filtered.sort((a, b) => {
    if (sortBy === "priceAsc") return a.price - b.price;
    if (sortBy === "priceDesc") return b.price - a.price;
    if (sortBy === "newest") return +new Date(b.createdAt) - +new Date(a.createdAt);
    return b.popularity - a.popularity;
  });
}

export function getCartTotals(items: { price: number; quantity: number }[]) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 150 || subtotal === 0 ? 0 : 12;
  const tax = Number((subtotal * 0.1).toFixed(2));
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
}

export function currency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}
