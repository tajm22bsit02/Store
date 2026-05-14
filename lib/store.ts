"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { products } from "./data";
import { Address, Order, User } from "./types";
import { getCartTotals } from "./utils";

type CartItem = { productId: string; quantity: number };

type StoreState = {
  cart: CartItem[];
  wishlist: string[];
  currentUser: User | null;
  orders: Order[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  setCartQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  login: (user: User) => void;
  logout: () => void;
  updateAddress: (address: Address) => void;
  placeOrder: () => Order | null;
};

const fallbackStorage = {
  getItem: () => null,
  setItem: () => undefined,
  removeItem: () => undefined,
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      currentUser: null,
      orders: [],
      addToCart: (productId) =>
        set((state) => {
          const existing = state.cart.find((item) => item.productId === productId);
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
              ),
            };
          }
          return { cart: [...state.cart, { productId, quantity: 1 }] };
        }),
      removeFromCart: (productId) =>
        set((state) => ({ cart: state.cart.filter((item) => item.productId !== productId) })),
      setCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart
            .map((item) => (item.productId === productId ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0),
        })),
      toggleWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(productId)
            ? state.wishlist.filter((id) => id !== productId)
            : [...state.wishlist, productId],
        })),
      login: (user) => set({ currentUser: user }),
      logout: () => set({ currentUser: null }),
      updateAddress: (address) =>
        set((state) =>
          state.currentUser ? { currentUser: { ...state.currentUser, address } } : state
        ),
      placeOrder: () => {
        const state = get();
        if (!state.currentUser || state.cart.length === 0) return null;

        const items = state.cart.map((item) => {
          const product = products.find((p) => p.id === item.productId);
          return { quantity: item.quantity, price: product?.price ?? 0 };
        });

        const order: Order = {
          id: `o-${Date.now()}`,
          userId: state.currentUser.id,
          productIds: state.cart.map((item) => item.productId),
          total: getCartTotals(items).total,
          status: "Processing",
          createdAt: new Date().toISOString().slice(0, 10),
        };

        set({ orders: [order, ...state.orders], cart: [] });
        return order;
      },
    }),
    {
      name: "store-state",
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? fallbackStorage : window.localStorage
      ),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        currentUser: state.currentUser,
        orders: state.orders,
      }),
    }
  )
);
