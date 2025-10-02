"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from "react";
import type { Product } from "@/lib/types";

const STORAGE_KEY = "shop-cart-v1";

type CartItem = {
  id: string;
  slug: string;
  title: string;
  price_cents: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  hydrated: boolean;
};

type CartAction =
  | { type: "hydrate"; payload: CartItem[] }
  | { type: "add"; payload: { product: Product; quantity: number } }
  | { type: "update"; payload: { id: string; quantity: number } }
  | { type: "remove"; payload: { id: string } }
  | { type: "clear" };

const initialState: CartState = {
  items: [],
  hydrated: false
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "hydrate":
      return {
        items: action.payload,
        hydrated: true
      };
    case "add": {
      const { product, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      const nextItems = existing
        ? state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [
            ...state.items,
            {
              id: product.id,
              slug: product.slug,
              title: product.title,
              price_cents: product.price_cents,
              quantity
            }
          ];
      return { ...state, items: nextItems };
    }
    case "update": {
      const { id, quantity } = action.payload;
      const nextItems = state.items
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
        )
        .filter((item) => item.quantity > 0);
      return { ...state, items: nextItems };
    }
    case "remove":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id)
      };
    case "clear":
      return { ...state, items: [] };
    default:
      return state;
  }
}

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  addItem: (product: Product, quantity?: number) => void;
  updateItem: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as CartItem[];
        dispatch({ type: "hydrate", payload: parsed });
        return;
      } catch (error) {
        console.warn("Failed to parse cart from storage", error);
      }
    }
    dispatch({ type: "hydrate", payload: [] });
  }, []);

  useEffect(() => {
    if (!state.hydrated) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items, state.hydrated]);

  const addItem = useCallback(
    (product: Product, quantity = 1) => {
      dispatch({ type: "add", payload: { product, quantity } });
    },
    [dispatch]
  );

  const updateItem = useCallback((id: string, quantity: number) => {
    dispatch({ type: "update", payload: { id, quantity } });
  }, []);

  const removeItem = useCallback((id: string) => {
    dispatch({ type: "remove", payload: { id } });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const totalCents = useMemo(
    () => state.items.reduce((acc, item) => acc + item.price_cents * item.quantity, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      hydrated: state.hydrated,
      addItem,
      updateItem,
      removeItem,
      clear,
      totalCents
    }),
    [state.items, state.hydrated, addItem, updateItem, removeItem, clear, totalCents]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}

export type { CartItem };
