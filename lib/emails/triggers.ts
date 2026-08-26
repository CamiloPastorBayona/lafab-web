// Qué correo se dispara en cada momento del pedido.
//
// El estado de WooCommerce manda. El mapa por defecto cubre los estados nativos
// y los personalizados que usa LaFab; se puede sobrescribir sin tocar código con
// WC_STATUS_EMAILS, un JSON de {estado: plantilla}.

import { markRecovered } from "@/lib/abandonedCarts";
import { kvSetHas, kvSetAdd } from "@/lib/kv";
import { GOOGLE_REVIEW_URL } from "@/lib/content";
import { orderEmailData, type WooOrder } from "./orders";
import { sendTemplate, scheduleTemplate, cancelScheduled, type SendOutcome } from "./send";
import type { TemplateName } from "./templates";

const DAY = 24 * 60 * 60 * 1000;

/** estado del pedido → plantilla que se envía al entrar en ese estado. */
const DEFAULT_STATUS_EMAILS: Record<string, TemplateName> = {
  // Nativos de WooCommerce.
  pending: "pago-pendiente",
  "on-hold": "pago-pendiente",
  failed: "pago-pendiente",
  processing: "pedido-recibido",
  completed: "va-en-camino",
  // Personalizados del taller (si existen con otro slug, usar WC_STATUS_EMAILS).
  "en-produccion": "en-produccion",
  produccion: "en-produccion",
  enviado: "va-en-camino",
  shipped: "va-en-camino",
};

/** Estados que significan "el cliente ya tiene el mueble en casa". */
const DEFAULT_DELIVERED = ["completed", "entregado", "delivered"];

/** Estados en los que hay que cancelar los correos ya programados. */
const CANCELLED = ["cancelled", "refunded", "failed", "trash"];

function statusEmails(): Record<string, TemplateName> {
  const raw = process.env.WC_STATUS_EMAILS;
  if (!raw) return DEFAULT_STATUS_EMAILS;
  try {
    return { ...DEFAULT_STATUS_EMAILS, ...JSON.parse(raw) };
  } catch {
    console.error("[triggers] WC_STATUS_EMAILS no es JSON válido; se ignora");
    return DEFAULT_STATUS_EMAILS;
  }
}

const deliveredStatuses = () =>
  (process.env.WC_DELIVERED_STATUSES || DEFAULT_DELIVERED.join(","))
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);

const hours = (name: string, fallback: number) => {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
};

export type TriggerResult = {
  status: string;
  immediate?: { template: TemplateName; outcome: SendOutcome };
  scheduled: string[];
  cancelled: string[];
  skipped?: string;
};

/**
 * Procesa un pedido según su estado: envía el correo que corresponde, programa
 * los diferidos y cancela lo que ya no aplica.
 */
export async function handleOrderStatus(
  order: WooOrder,
  site: string
): Promise<TriggerResult> {
  const status = String(order.status || "").toLowerCase().replace(/^wc-/, "");
  const email = order.billing?.email?.trim();
  const result: TriggerResult = { status, scheduled: [], cancelled: [] };

  if (!email) {
    result.skipped = "el pedido no trae correo de facturación";
    return result;
  }

  const data = orderEmailData(order, {
    site,
    payment: `${site}/checkout`,
    review: process.env.REVIEW_URL || GOOGLE_REVIEW_URL,
  });

  // Un pedido existente cierra el recordatorio de carrito abandonado.
  await markRecovered(email);

  if (CANCELLED.includes(status)) {
    for (const t of ["cuidado", "resena", "bienvenida"] as const) {
      await cancelScheduled(`${t}:${order.id}`);
      result.cancelled.push(t);
    }
    // Un pedido fallido sí merece el recordatorio de pago.
    if (status !== "failed") return result;
  }

  const template = statusEmails()[status];
  if (template) {
    result.immediate = {
      template,
      outcome: await sendTemplate({
        template,
        to: email,
        vars: data.vars,
        blocks: data.blocks,
        dedupeKey: `${template}:${order.id}`,
      }),
    };
  }

  // Bienvenida: solo la primera vez que vemos a este cliente, y con un día de
  // margen para no llegar junto con la confirmación del pedido.
  const known = await kvSetHas("lafab:customers", email.toLowerCase());
  if (!known) {
    await kvSetAdd("lafab:customers", email.toLowerCase());
    await scheduleTemplate(
      {
        template: "bienvenida",
        to: email,
        vars: data.vars,
        dedupeKey: `bienvenida:${email.toLowerCase()}`,
      },
      hours("WELCOME_DELAY_HOURS", 24) * 60 * 60 * 1000
    );
    result.scheduled.push("bienvenida");
  }

  // Tras la entrega: guía de cuidado y, más tarde, solicitud de reseña.
  if (deliveredStatuses().includes(status)) {
    await scheduleTemplate(
      {
        template: "cuidado",
        to: email,
        vars: data.vars,
        blocks: data.blocks,
        dedupeKey: `cuidado:${order.id}`,
      },
      hours("CARE_DELAY_HOURS", 48) * 60 * 60 * 1000
    );
    await scheduleTemplate(
      {
        template: "resena",
        to: email,
        vars: data.vars,
        blocks: data.blocks,
        dedupeKey: `resena:${order.id}`,
      },
      hours("REVIEW_DELAY_HOURS", 24 * 10) * 60 * 60 * 1000
    );
    result.scheduled.push("cuidado", "resena");
  }

  return result;
}

export { DEFAULT_STATUS_EMAILS, DAY };
