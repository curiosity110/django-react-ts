import type { ApiItemResponse, ApiListResponse, Product } from "@/lib/types";

const DEFAULT_API_URL = "http://localhost:8000";

function buildUrl(path: string) {
  const base = process.env.NEXT_PUBLIC_API_URL || DEFAULT_API_URL;
  return `${base.replace(/\/$/, "")}${path}`;
}

async function fetchJson<T>(path: string): Promise<ApiItemResponse<T>> {
  try {
    const res = await fetch(buildUrl(path), {
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 30 }
    });

    if (!res.ok) {
      return {
        data: null,
        error: res.status === 404 ? "Resource not found." : "The server responded with an error.",
        status: res.status
      };
    }

    const data = (await res.json()) as T;
    return { data, error: null, status: res.status };
  } catch (error) {
    console.warn("Failed to fetch", error);
    return {
      data: null,
      error: "We could not reach the server. Please check your connection and try again."
    };
  }
}

export async function getProducts(): Promise<ApiListResponse<Product>> {
  const result = await fetchJson<Product[]>("/api/products/");
  return {
    data: result.data ?? [],
    error: result.error
  };
}

export async function getProduct(slug: string): Promise<ApiItemResponse<Product>> {
  return fetchJson<Product>(`/api/products/${slug}/`);
}

export async function createOrder(payload: {
  customer_name: string;
  phone: string;
  address: string;
  note?: string;
  items: { product: string; quantity: number }[];
}): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch(buildUrl("/api/orders/"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const body = await res.text();
      return {
        ok: false,
        error: body || "The server was unable to create the order."
      };
    }

    return { ok: true };
  } catch (error) {
    console.error("Order submission failed", error);
    return {
      ok: false,
      error: "We could not reach the server. Please try again."
    };
  }
}
