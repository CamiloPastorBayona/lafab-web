"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number; // entero en COP (sin decimales)
  qty: number;
};

type CartContextType = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);
const STORAGE_KEY = "lafab_cart";

export function formatCOP(n: number): string {
  return `$ ${Math.round(n).toLocaleString("es-CO")}`;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar de localStorage al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* noop */
    }
    setHydrated(true);
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* noop */
    }
  }, [items, hydrated]);

  const add: CartContextType["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [...prev, { ...item, qty }];
    });
    setOpen(true);
  };

  const remove: CartContextType["remove"] = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const setQty: CartContextType["setQty"] = (id, qty) =>
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );

  const clear = () => setItems([]);

  const count = useMemo(
    () => items.reduce((s, i) => s + i.qty, 0),
    [items]
  );
  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.qty, 0),
    [items]
  );

  const value: CartContextType = {
    items,
    count,
    subtotal,
    add,
    remove,
    setQty,
    clear,
    isOpen,
    openCart: () => setOpen(true),
    closeCart: () => setOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
  return ctx;
}
