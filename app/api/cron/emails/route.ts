// Cron de correos. Hace dos cosas en la misma pasada para no gastar dos
// entradas de cron (el plan Hobby de Vercel permite muy pocas):
//   1. Recordatorio de carrito abandonado.
//   2. Cola de correos diferidos (bienvenida, guía de cuidado, reseña).
//
// Variables de entorno:
//   CRON_SECRET                    - Vercel lo manda en Authorization: Bearer.
//   ABANDONED_CART_DELAY_HOURS     - horas de espera antes de escribir (def. 5).
//   ABANDONED_CART_MAX_AGE_HOURS   - no escribir a carritos más viejos (def. 72).
//   ABANDONED_CART_MAX_PER_RUN     - tope de correos por ejecución (def. 50).
//   MAIL_QUEUE_MAX_PER_RUN         - tope de diferidos por ejecución (def. 50).

import { NextRequest, NextResponse } from "next/server";
import { findAbandoned, markReminded } from "@/lib/abandonedCarts";
import { renderAbandonedCart } from "@/lib/emails/abandonedCart";
import { runQueue } from "@/lib/emails/send";
import { sendMail } from "@/lib/mailer";
import { WHATSAPP } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const HOUR = 60 * 60 * 1000;

// Se acepta 0: sirve para probar sin espera y, en los topes, como interruptor.
const num = (v: string | undefined, fallback: number) => {
  const n = Number(v);
  return v !== undefined && v !== "" && Number.isFinite(n) && n >= 0 ? n : fallback;
};

const SITE = SITE_URL;

function authorized(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false; // sin secreto configurado, el endpoint queda cerrado
  return req.headers.get("authorization") === `Bearer ${secret}`;
}

async function abandonedCarts() {
  const delay = num(process.env.ABANDONED_CART_DELAY_HOURS, 5) * HOUR;
  const maxAge = num(process.env.ABANDONED_CART_MAX_AGE_HOURS, 72) * HOUR;
  const limit = num(process.env.ABANDONED_CART_MAX_PER_RUN, 50);

  const carts = (await findAbandoned(delay, maxAge)).slice(0, limit);
  let sent = 0;
  const errors: string[] = [];

  for (const cart of carts) {
    const unsubscribe = `${SITE}/api/cart/baja?id=${cart.id}`;
    const { subject, html, text } = renderAbandonedCart(cart, {
      recover: `${SITE}/recuperar/${cart.id}`,
      unsubscribe,
      site: SITE,
      whatsapp: WHATSAPP,
    });

    const result = await sendMail({
      to: cart.email,
      subject,
      html,
      text,
      unsubscribeUrl: unsubscribe,
      tag: "carrito-abandonado",
    });

    if (result.ok) {
      // Se marca solo tras un envío exitoso: un fallo se reintenta en la
      // siguiente corrida, mientras el carrito siga dentro de la ventana.
      await markReminded(cart);
      sent += 1;
    } else {
      errors.push(result.error || "error desconocido");
    }
  }

  return { candidates: carts.length, sent, errors };
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const carts = await abandonedCarts();
  const queue = await runQueue(num(process.env.MAIL_QUEUE_MAX_PER_RUN, 50));

  return NextResponse.json({
    ok: true,
    carritoAbandonado: {
      candidatos: carts.candidates,
      enviados: carts.sent,
      fallidos: carts.errors.length,
      errores: carts.errors.slice(0, 5),
    },
    diferidos: {
      vencidos: queue.due,
      enviados: queue.sent,
      duplicados: queue.duplicates,
      errores: queue.errors.slice(0, 5),
    },
  });
}
