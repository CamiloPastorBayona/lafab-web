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

export function trackContact(source = "whatsapp") {
  gtag("event", "generate_lead", { method: source });
  fbq("track", "Contact");
}
