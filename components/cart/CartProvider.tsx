// components/cart/CartProvider.tsx
"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = {
  id: string; // unique key (productId__size)
  name: string;
  price: number;
  image?: string;
  qty: number;
  size?: string;
};

type CartState = Record<string, CartItem>;

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  add: (item: { id: string; name: string; price: number; image?: string; size?: string }, qty?: number) => void;
  remove: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "softodev_cart_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartState>({});

  // load
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as CartState;
      if (parsed && typeof parsed === "object") setCart(parsed);
    } catch {
      // ignore
    }
  }, []);

  // save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  const items = useMemo(() => Object.values(cart), [cart]);
  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, x) => s + x.price * x.qty, 0), [items]);

  const add: CartContextValue["add"] = (item, qty = 1) => {
    const safeQty = Math.max(1, Math.floor(qty));
    setCart((prev) => {
      const cur = prev[item.id];
      const nextQty = (cur?.qty ?? 0) + safeQty;
      return {
        ...prev,
        [item.id]: {
          id: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          size: item.size,
          qty: nextQty,
        },
      };
    });
  };

  const remove: CartContextValue["remove"] = (id) => {
    setCart((prev) => {
      if (!prev[id]) return prev;
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  const inc: CartContextValue["inc"] = (id) => {
    setCart((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      return { ...prev, [id]: { ...cur, qty: cur.qty + 1 } };
    });
  };

  const dec: CartContextValue["dec"] = (id) => {
    setCart((prev) => {
      const cur = prev[id];
      if (!cur) return prev;
      const nextQty = cur.qty - 1;
      if (nextQty <= 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...cur, qty: nextQty } };
    });
  };

  const clear = () => setCart({});

  const value: CartContextValue = useMemo(
    () => ({ items, count, total, add, remove, inc, dec, clear }),
    [items, count, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
