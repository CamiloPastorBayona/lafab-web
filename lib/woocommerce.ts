// WooCommerce Store API client (public, read-only — no auth needed for catalog).
// Docs: https://developer.woocommerce.com/docs/apis/store-api/

// Origen del WordPress que sirve el catálogo. lafab.com.co ya no sirve de
// respaldo: desde el cutover ese dominio es el front en Vercel.
const STORE_URL =
  process.env.NEXT_PUBLIC_WC_STORE_URL?.replace(/\/$/, "") ||
  "https://cms.lafab.com.co";

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
  /** Referencia interna (LF-SOF-LATINA). La Store API ya la devuelve. */
  sku?: string;
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
  dimensions: { length: string; width: string; height: string };
  formatted_dimensions: string;
}

// Atributo del producto (forma real de la Store API para productos variables).
export interface WCProductAttribute {
  id: number;
  name: string;
  taxonomy: string | null;
  has_variations: boolean;
  terms: { id: number; name: string; slug: string }[];
}

// Referencia de variación dentro del producto padre.
export interface WCVariationRef {
  id: number;
  attributes: { name: string; value: string }[];
}

// Variación resuelta (con precio) lista para el selector.
export interface WCVariation {
  id: number;
  prices: WCPrices;
  on_sale: boolean;
  is_in_stock: boolean;
  image?: string;
  attributes: { name: string; value: string }[];
}

// ---- Price formatting ----
// COP has currency_minor_unit = 0 and prices arrive as integer-strings ("3400000").
// Mientras Mauricio no confirme los precios, hay productos cargados en la tienda
// sin precio. Mostrar "$0" sería peor que no mostrar nada, así que la ficha y la
// tarjeta dicen que el precio está por confirmar.
export const PRECIO_PENDIENTE = "Precio por confirmar";

/**
 * Porcentaje de descuento redondeado, o null si no hay oferta real.
 * Se calcula, no se escribe a mano: si mañana una promoción es del 15% el
 * cartel lo dice solo.
 */
export function descuento(prices: WCPrices): number | null {
  const reg = parseInt(prices.regular_price || "", 10);
  const ofe = parseInt(prices.sale_price || "", 10);
  if (!reg || !ofe || ofe >= reg) return null;
  const pct = Math.round(((reg - ofe) / reg) * 100);
  return pct > 0 ? pct : null;
}

export function tienePrecio(prices: WCPrices): boolean {
  const n = (v?: string | null) => (v ? parseInt(v, 10) : 0);
  return n(prices.price) > 0 || n(prices.price_range?.min_amount) > 0;
}

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

// Basic Auth opcional (solo servidor). Úsalo para leer un staging protegido con
// usuario/contraseña sin exponerlo al público: define WC_STORE_BASIC_AUTH="user:pass"
// como variable de entorno en Vercel (NO uses el prefijo NEXT_PUBLIC_, debe ser secreta).
const BASIC_AUTH = process.env.WC_STORE_BASIC_AUTH;

function authHeaders(): Record<string, string> {
  const h: Record<string, string> = { Accept: "application/json" };
  if (BASIC_AUTH) {
    const token =
      typeof Buffer !== "undefined"
        ? Buffer.from(BASIC_AUTH).toString("base64")
        : btoa(BASIC_AUTH);
    h.Authorization = `Basic ${token}`;
  }
  return h;
}

const dormir = (ms: number) => new Promise((r) => setTimeout(r, ms));

// El CMS a veces responde 5xx o corta la conexión cuando le llegan muchas
// peticiones seguidas (por ejemplo al regenerar varias fichas a la vez). Sin
// reintentos, una ficha se renderizaba con la mitad de las telas disponibles.
async function get<T>(path: string, intentos = 4): Promise<T> {
  let ultimo: unknown;
  for (let i = 0; i < intentos; i++) {
    try {
      const res = await fetch(`${API}${path}`, {
        next: { revalidate: REVALIDATE },
        headers: authHeaders(),
      });
      if (res.ok) return (await res.json()) as T;
      // 4xx que no sea 429 es un error real: no se reintenta.
      if (res.status < 500 && res.status !== 429) {
        throw new Error(`Store API ${res.status} for ${path}`);
      }
      ultimo = new Error(`Store API ${res.status} for ${path}`);
    } catch (e) {
      ultimo = e;
      if (e instanceof Error && /Store API 4/.test(e.message)) throw e;
    }
    if (i < intentos - 1) await dormir(400 * Math.pow(2, i));
  }
  throw ultimo instanceof Error ? ultimo : new Error(`Store API falló: ${path}`);
}

/** Ejecuta las tareas de a `limite` a la vez, en vez de todas de golpe. */
async function enTandas<T>(
  tareas: (() => Promise<T>)[],
  limite = 5
): Promise<T[]> {
  const out: T[] = new Array(tareas.length);
  let i = 0;
  const obrero = async () => {
    while (i < tareas.length) {
      const n = i++;
      out[n] = await tareas[n]();
    }
  };
  await Promise.all(Array.from({ length: Math.min(limite, tareas.length) }, obrero));
  return out;
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
  // WooCommerce le pone a algunas variaciones el mismo slug del padre y la
  // Store API las devuelve primero. Si se toma list[0] a ciegas, la ficha se
  // renderiza como producto simple (sin selector ni precio por variación).
  // Nos quedamos siempre con el producto padre.
  return list.find((p) => p.type !== "variation" && !p.parent) ?? null;
}

export async function getProductById(id: number): Promise<WCProduct> {
  return get<WCProduct>(`/products/${id}`);
}

export async function getCategories(): Promise<WCCategory[]> {
  return get<WCCategory[]>(`/products/categories?per_page=100`);
}

// Resuelve las variaciones (con precio) de un producto variable. El padre trae
// solo id + atributos por variación; el precio se obtiene consultando cada
// variación como producto. Se cachea en el servidor (ISR).
export async function getVariations(product: WCProduct): Promise<WCVariation[]> {
  if (product.type !== "variable") return [];
  const refs = (product.variations as WCVariationRef[]) ?? [];
  // Se resuelven de a pocas y con reintentos. Antes iban las 27 de golpe y las
  // que fallaban se descartaban en silencio: la ficha quedaba con la mitad de
  // los colores o sin una de las medidas, de forma intermitente.
  const resolved = await enTandas(
    refs.map((ref) => async () => {
      try {
        const vp = await get<WCProduct>(`/products/${ref.id}`);
        return {
          id: ref.id,
          prices: vp.prices,
          on_sale: vp.on_sale,
          is_in_stock: vp.is_in_stock,
          image: vp.images?.[0]?.src,
          attributes: ref.attributes,
        } as WCVariation;
      } catch (e) {
        console.error(`[lafab] no se pudo leer la variación ${ref.id}`, e);
        return null;
      }
    }),
    5
  );
  return resolved.filter((v): v is WCVariation => v !== null);
}

// ---- Ficha de producto (ACF, endpoint propio /wp-json/lafab/v1) ----
export interface WCProductExtra {
  destacados: string[];
  medidas: { etiqueta: string; valor: string }[];
  materiales: string;
  tiempo_fabricacion: string;
  garantia: string;
  cuidados: string;
  faqs: { pregunta: string; respuesta: string }[];
  looks: { url: string; alt: string; srcset: string }[];
}

// Trae la ficha enriquecida (medidas, materiales, garantía, looks, FAQs…) que el
// equipo edita con ACF en WordPress. Devuelve null si no hay datos o falla.
export async function getProductExtra(
  id: number
): Promise<WCProductExtra | null> {
  try {
    const res = await fetch(
      `${STORE_URL}/wp-json/lafab/v1/product-extra?id=${id}`,
      { next: { revalidate: REVALIDATE }, headers: authHeaders() }
    );
    if (!res.ok) return null;
    return (await res.json()) as WCProductExtra;
  } catch {
    return null;
  }
}

// ¿La ficha trae algún dato para mostrar?
export function hasExtraContent(e: WCProductExtra | null): boolean {
  if (!e) return false;
  return Boolean(
    e.destacados?.length ||
      e.medidas?.length ||
      e.materiales ||
      e.tiempo_fabricacion ||
      e.garantia ||
      e.cuidados ||
      e.faqs?.length ||
      e.looks?.length
  );
}

// Hybrid checkout: hand off to WooCommerce native add-to-cart, which lands the
// customer in the WordPress cart/checkout where Bold Pagos completes payment.
export function addToCartUrl(productId: number, quantity = 1): string {
  return `${STORE_URL}/carrito/?add-to-cart=${productId}&quantity=${quantity}`;
}

export { STORE_URL };
