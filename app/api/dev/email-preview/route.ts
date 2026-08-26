// Vista previa de las plantillas de /emails. Solo en desarrollo: en producción
// responde 404. Sin ?tpl= lista las nueve con enlace a cada una.
//
// Usa los mismos mapeadores que el webhook y el cron, así que lo que se ve aquí
// es exactamente lo que recibe el cliente.
//   /api/dev/email-preview?tpl=pedido-recibido
//   …&text=1     versión en texto plano que acompaña al HTML
//   …&name=      para revisar el saludo sin nombre

import { NextRequest, NextResponse } from "next/server";
import { renderAbandonedCart } from "@/lib/emails/abandonedCart";
import { orderEmailData, type WooOrder } from "@/lib/emails/orders";
import { render, TEMPLATES, type TemplateName } from "@/lib/emails/templates";
import { WHATSAPP, GOOGLE_REVIEW_URL } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEMO_ORDER: WooOrder = {
  id: 11842,
  number: "11842",
  status: "processing",
  currency: "COP",
  total: "5150000",
  shipping_total: "0",
  billing: { first_name: "Ana", last_name: "Restrepo", email: "cliente@ejemplo.com" },
  shipping: {
    first_name: "Ana",
    last_name: "Restrepo",
    address_1: "Cra. 45 #10-20",
    address_2: "Apto 502",
    city: "Medellín",
    state: "CO-ANT",
    postcode: "050021",
  },
  line_items: [
    {
      name: "Sofá San Diego",
      quantity: 1,
      total: "3400000",
      meta_data: [
        { display_key: "Tela", display_value: "Milán Marfil" },
        { display_key: "Puestos", display_value: "3" },
        { key: "_reduced_stock", value: "1" },
      ],
    },
    { name: "Poltrona Haru", quantity: 2, total: "1750000", meta_data: [] },
  ],
};

const DEMO_CART = {
  id: "0".repeat(24),
  email: "cliente@ejemplo.com",
  name: "Ana Restrepo",
  subtotal: 5_150_000,
  updatedAt: 0,
  items: [
    {
      id: 11113,
      name: "Sofá San Diego · 3 puestos · Tela Milán Marfil",
      slug: "sofa-san-diego",
      image: "",
      price: 3_400_000,
      qty: 1,
    },
    { id: 11120, name: "Poltrona Haru", slug: "poltrona-haru", image: "", price: 875_000, qty: 2 },
  ],
};

const DEMO_QUOTE = `<tr><td style="padding:12px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515;"><strong>Sofá a la medida · 3.20 m</strong><br><span style="font-size:12px; color:#8a887f;">Tela a elección · estructura en madera</span></td><td align="right" valign="top" style="padding:12px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515; white-space:nowrap;">$ 4.200.000</td></tr><tr><td style="padding:14px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">Total estimado</td><td align="right" style="padding:14px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">$ 4.200.000</td></tr>`;

function index(site: string) {
  const links = TEMPLATES.map(
    (t) =>
      `<li style="margin:6px 0;"><a href="${site}/api/dev/email-preview?tpl=${t}">${t}</a>
       · <a href="${site}/api/dev/email-preview?tpl=${t}&text=1" style="color:#8a887f;font-size:13px;">texto</a></li>`
  ).join("");
  return new NextResponse(
    `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>Plantillas de correo</title></head>
<body style="font-family:Arial,Helvetica,sans-serif;background:#efece6;margin:0;padding:48px 24px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;padding:32px;">
<h1 style="font-size:20px;margin:0 0 4px;">Plantillas de correo</h1>
<p style="color:#8a887f;font-size:14px;margin:0 0 20px;">Renderizadas con los mismos mapeadores que usan el webhook y el cron.</p>
<ul style="padding-left:18px;line-height:1.6;">${links}</ul>
</div></body></html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new NextResponse("Not found", { status: 404 });
  }

  const site = req.nextUrl.origin;
  const tpl = req.nextUrl.searchParams.get("tpl");
  const asText = req.nextUrl.searchParams.get("text") === "1";
  const name = req.nextUrl.searchParams.get("name");

  if (!tpl) return index(site);
  if (!TEMPLATES.includes(tpl as TemplateName)) {
    return NextResponse.json(
      { error: "Plantilla desconocida", disponibles: TEMPLATES },
      { status: 404 }
    );
  }

  let result;
  if (tpl === "carrito-abandonado") {
    result = renderAbandonedCart(
      { ...DEMO_CART, name: name ?? DEMO_CART.name },
      {
        recover: `${site}/recuperar/${DEMO_CART.id}`,
        unsubscribe: `${site}/api/cart/baja?id=${DEMO_CART.id}`,
        site,
        whatsapp: WHATSAPP,
      }
    );
  } else {
    const order: WooOrder = {
      ...DEMO_ORDER,
      billing: { ...DEMO_ORDER.billing, first_name: name ?? DEMO_ORDER.billing?.first_name },
    };
    const data = orderEmailData(order, {
      site,
      review: process.env.REVIEW_URL || GOOGLE_REVIEW_URL,
    });
    result = render(tpl as TemplateName, {
      vars: data.vars,
      blocks: { ...data.blocks, ...(tpl === "cotizacion" ? { quote: DEMO_QUOTE } : {}) },
    });
  }

  if (asText) {
    return new NextResponse(`Asunto: ${result.subject}\n\n${result.text}`, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return new NextResponse(result.html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
