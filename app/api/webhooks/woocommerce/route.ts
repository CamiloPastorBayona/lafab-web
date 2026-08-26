// Webhook de WooCommerce: es lo que hace que los correos salgan solos.
//
// Configuración en WordPress → WooCommerce → Ajustes → Avanzado → Webhooks:
//   Tema:    Pedido actualizado  (y otro con "Pedido creado")
//   URL:     https://<frontend>/api/webhooks/woocommerce
//   Secreto: el mismo valor de WC_WEBHOOK_SECRET
//   Versión: WP REST API v3
//
// WooCommerce firma el cuerpo con HMAC-SHA256 en base64 y lo manda en la
// cabecera x-wc-webhook-signature. Sin firma válida no se procesa nada.

import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { handleOrderStatus } from "@/lib/emails/triggers";
import type { WooOrder } from "@/lib/emails/orders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://lafab.com.co").replace(/\/$/, "");

function signatureValid(rawBody: string, received: string | null): boolean {
  const secret = process.env.WC_WEBHOOK_SECRET;
  if (!secret || !received) return false;
  const expected = createHmac("sha256", secret).update(rawBody, "utf8").digest("base64");
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  // timingSafeEqual exige la misma longitud.
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(req: NextRequest) {
  const raw = await req.text();

  if (!process.env.WC_WEBHOOK_SECRET) {
    console.error("[webhook] WC_WEBHOOK_SECRET no configurado");
    return NextResponse.json({ ok: false }, { status: 503 });
  }

  if (!signatureValid(raw, req.headers.get("x-wc-webhook-signature"))) {
    return NextResponse.json({ ok: false, error: "firma inválida" }, { status: 401 });
  }

  let payload: WooOrder & { webhook_id?: number };
  try {
    payload = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, error: "cuerpo inválido" }, { status: 400 });
  }

  // Al crear el webhook, WooCommerce manda un ping sin pedido.
  if (!payload.id || payload.webhook_id) {
    return NextResponse.json({ ok: true, ping: true });
  }

  const topic = req.headers.get("x-wc-webhook-topic") || "";
  if (topic && !topic.startsWith("order.")) {
    return NextResponse.json({ ok: true, ignored: topic });
  }

  try {
    const result = await handleOrderStatus(payload, SITE);
    console.info(
      `[webhook] pedido ${payload.id} (${result.status}) → ` +
        `${result.immediate?.template ?? "sin correo inmediato"} ` +
        `[${result.immediate?.outcome.status ?? "-"}]` +
        (result.scheduled.length ? ` · programados: ${result.scheduled.join(", ")}` : "")
    );
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    // Devolvemos 500 a propósito: WooCommerce reintenta y la idempotencia
    // impide que un reintento duplique un correo ya enviado.
    console.error("[webhook] error procesando el pedido", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
