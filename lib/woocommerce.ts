// WooCommerce Store API client (public, read-only — no auth needed for catalog).
// Docs: https://developer.woocommerce.com/docs/apis/store-api/

const STORE_URL =
  process.env.NEXT_PUBLIC_WC_STORE_URL?.replace(/\/$/, "") ||
  "https://lafab.com.co";

const API = `${STORE_URL}/wp-json/wc/store/v1`;

// ---- Types (shaped from the real Store API response) ----
export interface WCPrices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: null | { min_amount: string; max_amount: string };
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface WCImage {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  thumbnail_srcset: string;
  thumbnail_sizes: string;
  name: string;
  alt: string;
}

export interface WCCategory {
  id: number;
  name: string;
  slug: string;
  link?: string;
  count?: number;
  image?: WCImage | null;
}

export interface WCProduct {
  id: number;
  name: string;
  slug: string;
  parent: number;
  type: string;
  permalink: string;
  short_description: string;
  description: string;
  on_sale: boolean;
  prices: WCPrices;
  price_html: string;
  average_rating: string;
  review_count: number;
  images: WCImage[];
  categories: WCCategory[];
  attributes: unknown[];
  variations: unknown[];
  has_options: boolean;
  is_purchasable: boolean;
  is_in_stock: boolean;
}

// ---- Price formatting ----
// COP has currency_minor_unit = 0 and prices arrive as integer-strings ("3400000").
export function money(amount: string | number, prices: WCPrices): string {
  const minor = prices.currency_minor_unit ?? 0;
  const raw = typeof amount === "string" ? parseInt(amount, 10) : amount;
  const value = minor > 0 ? raw / Math.pow(10, minor) : raw;

  const [intPart, decPart = ""] = value.toFixed(minor).split(".");
  const withThousands = intPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    prices.currency_thousand_separator || "."
  );
  const body =
    minor > 0
      ? `${withThousands}${prices.currency_decimal_separator}${decPart}`
      : withThousands;

  return `${prices.currency_prefix}${body}${prices.currency_suffix}`.trim();
}

// ---- Fetch helpers ----
// Cache on the server and revalidate periodically (ISR). Adjust as needed.
const REVALIDATE = 300; // seconds

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    next: { revalidate: REVALIDATE },
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Store API ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

export async function getProducts(params: {
  per_page?: number;
  page?: number;
  category?: number | string;
  orderby?: string;
  order?: "asc" | "desc";
  search?: string;
} = {}): Promise<WCProduct[]> {
  const q = new URLSearchParams();
  q.set("per_page", String(params.per_page ?? 24));
  if (params.page) q.set("page", String(params.page));
  if (params.category) q.set("category", String(params.category));
  if (params.orderby) q.set("orderby", params.orderby);
  if (params.order) q.set("order", params.order);
  if (params.search) q.set("search", params.search);
  return get<WCProduct[]>(`/products?${q.toString()}`);
}

export async function getProductBySlug(
  slug: string
): Promise<WCProduct | null> {
  const list = await get<WCProduct[]>(
    `/products?slug=${encodeURIComponent(slug)}`
  );
  return list[0] ?? null;
}

export async function getProductById(id: number): Promise<WCProduct> {
  return get<WCProduct>(`/products/${id}`);
}

export async function getCategories(): Promise<WCCategory[]> {
  return get<WCCategory[]>(`/products/categories?per_page=100`);
}

// Hybrid checkout: hand off to WooCommerce native add-to-cart, which lands the
// customer in the WordPress cart/checkout where Bold Pagos completes payment.
export function addToCartUrl(productId: number, quantity = 1): string {
  return `${STORE_URL}/carrito/?add-to-cart=${productId}&quantity=${quantity}`;
}

export { STORE_URL };
