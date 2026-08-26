// Correo de carrito abandonado: rellena la plantilla probada de
// emails/carrito-abandonado.html con los ítems reales del cliente.
// El diseño no se toca aquí; solo se generan las filas del resumen.

import type { AbandonedCart, AbandonedCartItem } from "@/lib/abandonedCarts";
import { render } from "./templates";

// lib/cart.tsx es un módulo "use client": no se puede invocar desde el servidor.
const money = (n: number) => `$ ${Math.round(n).toLocaleString("es-CO")}`;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Filas del resumen, con los mismos estilos en línea que trae la plantilla. */
function itemRows(items: AbandonedCartItem[]): string {
  return items
    .map(
      (it) => `<tr>
                  <td style="padding:14px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515;"><strong style="font-weight:700;">${esc(it.name)}</strong><br><span style="font-size:12px; color:#8a887f;">Cantidad: ${it.qty}</span></td>
                  <td align="right" valign="top" style="padding:14px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515; white-space:nowrap;">${money(it.price * it.qty)}</td>
                </tr>`
    )
    .join("\n                ");
}

/**
 * Totales. El envío no se conoce hasta que el cliente elige departamento, así
 * que el carrito abandonado muestra solo el subtotal y lo dice explícitamente.
 */
function totalRows(subtotal: number): string {
  return `<tr><td style="padding:8px 0 0 0; font-size:13px; color:#8a887f;">Subtotal</td><td align="right" style="padding:8px 0 0 0; font-size:13px; color:#42403c;">${money(subtotal)}</td></tr>
                <tr><td style="padding:6px 0; font-size:13px; color:#8a887f;">Envío</td><td align="right" style="padding:6px 0; font-size:13px; color:#42403c;">Se calcula al finalizar</td></tr>
                <tr><td style="padding:10px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">Total</td><td align="right" style="padding:10px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">${money(subtotal)}</td></tr>`;
}

export type AbandonedCartUrls = {
  recover: string;
  unsubscribe: string;
  site: string;
  whatsapp: string;
};

export function renderAbandonedCart(cart: AbandonedCart, urls: AbandonedCartUrls) {
  const firstName = (cart.name || "").trim().split(" ")[0];

  // Sin nombre el saludo quedaría como "Hola ,": se reemplaza el bloque entero.
  const greeting = firstName
    ? undefined
    : '<p style="margin:0 0 16px 0;">Hola,</p>';

  return render("carrito-abandonado", {
    vars: {
      customer_name: firstName,
      cart_url: urls.recover,
      unsubscribe_url: urls.unsubscribe,
      shop_url: `${urls.site}/shop`,
    },
    blocks: {
      items: itemRows(cart.items),
      totals: totalRows(cart.subtotal),
      ...(greeting ? { greeting } : {}),
    },
  });
}
