import { Order, Product, User } from "./types";

export const products: Product[] = [
  {
    id: "p-001",
    name: "Apex Runner",
    description: "Performance sneaker with breathable mesh upper.",
    price: 129,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    category: "Sneakers",
    rating: 4.8,
    popularity: 97,
    inventory: 32,
    createdAt: "2026-03-10",
    reviews: [
      { id: "r1", author: "Sana", rating: 5, comment: "Great comfort." },
      { id: "r2", author: "Ali", rating: 4, comment: "Looks premium." },
    ],
  },
  {
    id: "p-002",
    name: "Urban Drift Hoodie",
    description: "Heavyweight hoodie with soft fleece lining.",
    price: 79,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    category: "Streetwear",
    rating: 4.5,
    popularity: 88,
    inventory: 45,
    createdAt: "2026-02-18",
    reviews: [{ id: "r3", author: "Hina", rating: 5, comment: "Warm and stylish." }],
  },
  {
    id: "p-003",
    name: "Summit Crossbody",
    description: "Compact everyday carry bag with weather-resistant shell.",
    price: 49,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
    category: "Accessories",
    rating: 4.3,
    popularity: 72,
    inventory: 61,
    createdAt: "2026-04-21",
    reviews: [{ id: "r4", author: "Hamza", rating: 4, comment: "Very practical." }],
  },
  {
    id: "p-004",
    name: "Nova Court",
    description: "Retro-inspired low-top sneaker for daily wear.",
    price: 99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=800&q=80",
    category: "Sneakers",
    rating: 4.7,
    popularity: 92,
    inventory: 27,
    createdAt: "2026-05-02",
    reviews: [{ id: "r5", author: "Ayesha", rating: 5, comment: "My favorite pair." }],
  },
];

export const demoUsers: User[] = [
  {
    id: "u-001",
    name: "Admin User",
    email: "admin@store.com",
    role: "admin",
    password: "admin123",
  },
  {
    id: "u-002",
    name: "Demo Customer",
    email: "user@store.com",
    role: "customer",
    password: "user123",
  },
];

export const demoOrders: Order[] = [
  {
    id: "o-1001",
    userId: "u-002",
    productIds: ["p-001", "p-003"],
    total: 178,
    status: "Shipped",
    createdAt: "2026-05-01",
  },
  {
    id: "o-1002",
    userId: "u-002",
    productIds: ["p-002"],
    total: 79,
    status: "Delivered",
    createdAt: "2026-05-11",
  },
];
