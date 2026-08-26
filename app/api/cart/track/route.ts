// Captura del carrito para el recordatorio de carrito abandonado.
// Lo llama el checkout cuando el cliente ya escribió su correo, y de nuevo
// (con recovered:true) cuando el pedido se crea, para cancelar el envío.

import { NextRequest, NextResponse } from "next/server";
import {
  trackCart,
  markRecovered,
  type AbandonedCartItem,
} from "@/lib/abandonedCarts";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MAX_ITEMS = 50;

type Body = {
  email?: string;
  name?: string;
  items?: unknown;
  subtotal?: unknown;
  recovered?: boolean;
};

/** Nos quedamos solo con lo que sabemos usar: el cuerpo viene del navegador. */
function sanitizeItems(input: unknown): AbandonedCartItem[] {
  if (!Array.isArray(input)) return [];
  return input.slice(0, MAX_ITEMS).flatMap((raw) => {
    if (!raw || typeof raw !== "object") return [];
    const it = raw as Record<string, unknown>;
    const id = Number(it.id);
    const qty = Number(it.qty);
    const price = Number(it.price);
    if (!Number.isFinite(id) || !Number.isFinite(qty) || qty <= 0) return [];
    return [
      {
        id,
        name: String(it.name ?? "").slice(0, 200),
        slug: String(it.slug ?? "").slice(0, 200),
        image: String(it.image ?? "").slice(0, 500),
        price: Number.isFinite(price) ? price : 0,
        qty: Math.min(qty, 99),
      },
    ];
  });
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const email = String(body.email || "").trim();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "correo inválido" }, { status: 400 });
  }

  if (body.recovered) {
    await markRecovered(email);
    return NextResponse.json({ ok: true, recovered: true });
  }

  const items = sanitizeItems(body.items);
  if (items.length === 0) {
    return NextResponse.json({ ok: false, error: "carrito vacío" }, { status: 400 });
  }

  const subtotal = Number(body.subtotal);
  const cart = await trackCart({
    email,
    name: body.name ? String(body.name).slice(0, 120) : undefined,
    items,
    subtotal: Number.isFinite(subtotal)
      ? subtotal
      : items.reduce((s, i) => s + i.price * i.qty, 0),
  });

  // cart === null cuando el cliente se dio de baja: respondemos ok igual, sin
  // filtrar esa información al navegador.
  return NextResponse.json({ ok: true, tracked: Boolean(cart) });
}
