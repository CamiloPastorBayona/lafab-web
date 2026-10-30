// Eventos de e-commerce para GA4 + Meta Pixel. Solo cliente.
// Se llaman desde componentes "use client"; si los scripts aún no cargaron,
// gtag/fbq no existen y simplemente no se dispara (sin errores).

type Trackable = { id: number | string; name: string; price: number };
type LineItem = { id: number | string; name: string; price: number; qty: number };

const CUR = "COP";

function gtag(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.(...args);
}
function fbq(...args: unknown[]) {
  if (typeof window === "undefined") return;
  (window as unknown as { fbq?: (...a: unknown[]) => void }).fbq?.(...args);
}

export function trackViewItem(p: Trackable) {
  gtag("event", "view_item", {
    currency: CUR,
    value: p.price,
    items: [{ item_id: String(p.id), item_name: p.name, price: p.price, quantity: 1 }],
  });
  fbq("track", "ViewContent", {
    content_ids: [String(p.id)],
    content_name: p.name,
    content_type: "product",
    value: p.price,
    currency: CUR,
  });
}

export function trackAddToCart(p: Trackable, qty = 1) {
  const value = p.price * qty;
  gtag("event", "add_to_cart", {
    currency: CUR,
    value,
    items: [{ item_id: String(p.id), item_name: p.name, price: p.price, quantity: qty }],
  });
  fbq("track", "AddToCart", {
    content_ids: [String(p.id)],
    content_name: p.name,
    content_type: "product",
    value,
    currency: CUR,
  });
}

export function trackBeginCheckout(items: LineItem[], value: number) {
  gtag("event", "begin_checkout", {
    currency: CUR,
    value,
    items: items.map((i) => ({
      item_id: String(i.id),
      item_name: i.name,
      price: i.price,
      quantity: i.qty,
    })),
  });
  fbq("track", "InitiateCheckout", {
    content_ids: items.map((i) => String(i.id)),
    content_type: "product",
    num_items: items.reduce((s, i) => s + i.qty, 0),
    value,
    currency: CUR,
  });
}

// La compra es el único evento que de verdad importa para la pauta: sin él,
// Meta no puede optimizar por ventas ni se puede medir el retorno. Se dispara
// en /gracias con lo que el checkout dejó guardado antes de irse a Bold.
export function trackPurchase(pedido: string, items: LineItem[], value: number) {
  gtag("event", "purchase", {
    transaction_id: pedido,
    currency: CUR,
    value,
    items: items.map((i) => ({
      item_id: String(i.id),
      item_name: i.name,
      price: i.price,
      quantity: i.qty,
    })),
  });
  fbq("track", "Purchase", {
    content_ids: items.map((i) => String(i.id)),
    content_type: "product",
    num_items: items.reduce((s, i) => s + i.qty, 0),
    value,
    currency: CUR,
  });
}

// Lo que el checkout guarda justo antes de mandar al cliente a pagar.
export const CLAVE_COMPRA = "lafab_compra";
export type CompraPendiente = { pedido: string; items: LineItem[]; total: number };

export function guardaCompra(c: CompraPendiente) {
  try {
    sessionStorage.setItem(CLAVE_COMPRA, JSON.stringify(c));
  } catch {
    // Navegación privada o almacenamiento bloqueado: se pierde el evento,
    // nunca la venta.
  }
}

// Devuelve la compra guardada una sola vez: así recargar /gracias no cuenta
// la venta dos veces.
export function tomaCompra(): CompraPendiente | null {
  try {
    const crudo = sessionStorage.getItem(CLAVE_COMPRA);
    if (!crudo) return null;
    sessionStorage.removeItem(CLAVE_COMPRA);
    const c = JSON.parse(crudo) as CompraPendiente;
    return c && Array.isArray(c.items) ? c : null;
  } catch {
    return null;
  }
}

export function trackContact(source = "whatsapp") {
  gtag("event", "generate_lead", { method: source });
  fbq("track", "Contact");
}
