export type ProductCategory = "Sneakers" | "Streetwear" | "Accessories";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  rating: number;
  popularity: number;
  inventory: number;
  createdAt: string;
  reviews: { id: string; author: string; rating: number; comment: string }[];
};

export type Address = {
  fullName: string;
  line1: string;
  city: string;
  country: string;
  postalCode: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  password?: string;
  address?: Address;
};

export type Order = {
  id: string;
  userId: string;
  productIds: string[];
  total: number;
  status: "Processing" | "Shipped" | "Delivered";
  createdAt: string;
};
