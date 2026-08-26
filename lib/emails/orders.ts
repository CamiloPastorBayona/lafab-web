// Traduce un pedido de WooCommerce a las variables y bloques que esperan las
// plantillas de /emails. El diseño vive en el HTML; aquí solo van los datos.

import type { TemplateName } from "./templates";

// lib/cart.tsx es un módulo "use client": no se puede invocar desde el servidor.
const money = (n: number) => `$ ${Math.round(n).toLocaleString("es-CO")}`;

const esc = (s: string) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

/** Forma mínima del pedido que envía el webhook de WooCommerce (REST v3). */
export type WooOrder = {
  id: number;
  number?: string;
  status: string;
  currency?: string;
  total?: string;
  shipping_total?: string;
  billing?: {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
  };
  shipping?: {
    first_name?: string;
    last_name?: string;
    address_1?: string;
    address_2?: string;
    city?: string;
    state?: string;
    postcode?: string;
  };
  line_items?: {
    name?: string;
    quantity?: number;
    total?: string;
    meta_data?: { key?: string; display_key?: string; value?: unknown; display_value?: unknown }[];
  }[];
};

/** Las variaciones (tela, puestos…) llegan como meta_data del ítem. */
function itemVariant(item: NonNullable<WooOrder["line_items"]>[number]): string {
  const parts = (item.meta_data || [])
    .filter((m) => {
      const k = String(m.display_key ?? m.key ?? "");
      // Las claves internas de WooCommerce empiezan por "_".
      return k && !k.startsWith("_");
    })
    .map((m) => {
      const k = String(m.display_key ?? m.key ?? "").trim();
      const v = String(m.display_value ?? m.value ?? "").trim();
      // "Puestos: 3" en vez de un "3" suelto que no dice nada.
      return v && k ? `${k}: ${v}` : v;
    })
    .filter(Boolean);
  return parts.join(" · ");
}

function itemRows(order: WooOrder): string {
  const items = order.line_items || [];
  if (items.length === 0) return "";
  return items
    .map((it) => {
      const variant = itemVariant(it);
      return `<tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515;"><strong style="font-weight:700;">${esc(it.name || "Producto")}</strong>${
                    variant
                      ? `<br><span style="font-size:12px; color:#8a887f;">${esc(variant)}</span>`
                      : ""
                  }<br><span style="font-size:12px; color:#8a887f;">Cantidad: ${Number(it.quantity) || 1}</span></td>
                  <td align="right" valign="top" style="padding:14px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515; white-space:nowrap;">${money(Number(it.total) || 0)}</td>
                </tr>`;
    })
    .join("\n                ");
}

function totalRows(order: WooOrder): string {
  const total = Number(order.total) || 0;
  const shipping = Number(order.shipping_total) || 0;
  const subtotal = total - shipping;
  const envio = shipping > 0 ? money(shipping) : "Gratis";
  return `<tr><td style="padding:8px 0 0 0; font-size:13px; color:#8a887f;">Subtotal</td><td align="right" style="padding:8px 0 0 0; font-size:13px; color:#42403c;">${money(subtotal)}</td></tr>
                <tr><td style="padding:6px 0; font-size:13px; color:#8a887f;">Envío</td><td align="right" style="padding:6px 0; font-size:13px; color:#42403c;">${envio}</td></tr>
                <tr><td style="padding:10px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">Total</td><td align="right" style="padding:10px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">${money(total)}</td></tr>`;
}

function addressBlock(order: WooOrder): string {
  const s = order.shipping || {};
  const b = order.billing || {};
  const nombre = `${s.first_name || b.first_name || ""} ${s.last_name || b.last_name || ""}`.trim();
  const calle = [s.address_1, s.address_2].filter(Boolean).join(", ");
  const ciudad = [s.city, s.state?.replace(/^CO-/, ""), s.postcode].filter(Boolean).join(", ");
  return [nombre, calle, ciudad]
    .filter(Boolean)
    .map(esc)
    .join("<br>");
}

export type OrderEmailUrls = {
  site: string;
  payment?: string;
  review: string;
};

/** Variables y bloques para cualquiera de las plantillas de pedido. */
export function orderEmailData(order: WooOrder, urls: OrderEmailUrls) {
  const firstName = (order.billing?.first_name || "").trim();
  const address = addressBlock(order);
  const items = itemRows(order);

  return {
    vars: {
      customer_name: firstName,
      order_number: `#${order.number || order.id}`,
      shop_url: `${urls.site}/shop`,
      cart_url: `${urls.site}/carrito`,
      payment_url: urls.payment || `${urls.site}/checkout`,
      review_url: urls.review,
    },
    blocks: {
      // Sin nombre el saludo quedaría como "Hola ,".
      ...(firstName ? {} : { greeting: '<p style="margin:0 0 16px 0;">Hola,</p>' }),
      ...(items ? { items } : {}),
      totals: totalRows(order),
      ...(address ? { address } : {}),
    },
  };
}

/** Correos que dependen de un pedido concreto. */
export const ORDER_TEMPLATES: TemplateName[] = [
  "pedido-recibido",
  "en-produccion",
  "va-en-camino",
  "pago-pendiente",
  "resena",
  "cuidado",
];
