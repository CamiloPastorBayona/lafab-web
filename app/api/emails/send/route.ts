// Envío manual de una plantilla. Es el disparador de los correos que no tienen
// un evento automático — la cotización a la medida la escribe una persona — y
// el que se usa para las pruebas de entrega.
//
// Protegido con EMAILS_ADMIN_TOKEN (cabecera Authorization: Bearer <token>).
//
//   POST /api/emails/send
//   { "template": "cotizacion", "to": "cliente@x.com",
//     "vars": { "customer_name": "Ana" },
//     "quote": { "items": [{ "name": "Sofá a la medida · 3.20 m",
//                            "detail": "Tela a elección", "price": 4200000 }],
//                "total": 4200000 } }

import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { sendTemplate } from "@/lib/emails/send";
import { TEMPLATES, type TemplateName } from "@/lib/emails/templates";
import { GOOGLE_REVIEW_URL } from "@/lib/content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://lafab.com.co").replace(/\/$/, "");

const esc = (s: string) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (n: number) => `$ ${Math.round(n).toLocaleString("es-CO")}`;

function authorized(req: NextRequest): boolean {
  const token = process.env.EMAILS_ADMIN_TOKEN;
  if (!token) return false;
  const received = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || "";
  const a = Buffer.from(token);
  const b = Buffer.from(received);
  return a.length === b.length && timingSafeEqual(a, b);
}

type QuoteItem = { name?: string; detail?: string; price?: number | string };

/** Filas del detalle de la cotización, con los estilos de la plantilla. */
function quoteBlock(items: QuoteItem[], total?: number): string {
  const rows = items
    .map((it) => {
      const price =
        typeof it.price === "number" ? money(it.price) : esc(String(it.price ?? "Incluido"));
      return `<tr><td style="padding:12px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515;"><strong>${esc(it.name || "Ítem")}</strong>${
        it.detail
          ? `<br><span style="font-size:12px; color:#8a887f;">${esc(it.detail)}</span>`
          : ""
      }</td><td align="right" valign="top" style="padding:12px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515; white-space:nowrap;">${price}</td></tr>`;
    })
    .join("");

  const sum =
    total ??
    items.reduce((s, it) => s + (typeof it.price === "number" ? it.price : 0), 0);

  return `${rows}<tr><td style="padding:14px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">Total estimado</td><td align="right" style="padding:14px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">${money(sum)}</td></tr>`;
}

export async function POST(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false, error: "no autorizado" }, { status: 401 });
  }

  let body: {
    template?: string;
    to?: string;
    vars?: Record<string, string>;
    blocks?: Record<string, string>;
    quote?: { items?: QuoteItem[]; total?: number };
    dedupeKey?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "cuerpo inválido" }, { status: 400 });
  }

  const template = String(body.template || "");
  if (!TEMPLATES.includes(template as TemplateName)) {
    return NextResponse.json(
      { ok: false, error: "plantilla desconocida", disponibles: TEMPLATES },
      { status: 400 }
    );
  }

  const to = String(body.to || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(to)) {
    return NextResponse.json({ ok: false, error: "correo inválido" }, { status: 400 });
  }

  const blocks = { ...(body.blocks || {}) };
  if (body.quote?.items?.length) {
    blocks.quote = quoteBlock(body.quote.items, body.quote.total);
  }
  // Sin nombre el saludo de las plantillas quedaría como "Hola ,".
  if (!body.vars?.customer_name && !blocks.greeting) {
    blocks.greeting = '<p style="margin:0 0 16px 0;">Hola,</p>';
  }

  const outcome = await sendTemplate({
    template: template as TemplateName,
    to,
    vars: {
      shop_url: `${SITE}/shop`,
      cart_url: `${SITE}/carrito`,
      payment_url: `${SITE}/checkout`,
      review_url: process.env.REVIEW_URL || GOOGLE_REVIEW_URL,
      ...(body.vars || {}),
    },
    blocks,
    dedupeKey: body.dedupeKey,
  });

  const status = outcome.status === "error" ? 502 : 200;
  return NextResponse.json({ ok: outcome.status !== "error", template, to, ...outcome }, { status });
}
