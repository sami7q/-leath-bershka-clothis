import type { Lang } from "./siteConfig";

export type ApiCategory = {
  id: number;
  slug: string;
  label: { en: string; ar: string };
};

export type ApiProduct = {
  id: string;
  type: "clothes" | "shoes";
  name: { en: string; ar: string };
  description: { en: string; ar: string };
  priceFull: number;
  oldPrice: number | null;
  badge: { en: string; ar: string } | null;
  image: string | null;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    // مهم: في dev نخليها no-store حتى تشوف تحديثات الادمن مباشرة
    cache: "no-store",
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${txt || res.statusText}`);
  }
  return res.json();
}

export function getCategories() {
  return apiFetch<ApiCategory[]>("/api/v1/categories/");
}

export function getProducts(params?: { category?: string; type?: "clothes" | "shoes" }) {
  const qs = new URLSearchParams();
  if (params?.category) qs.set("category", params.category);
  if (params?.type) qs.set("type", params.type);
  const q = qs.toString();
  return apiFetch<ApiProduct[]>(`/api/v1/products/${q ? `?${q}` : ""}`);
}
