// Envío de plantillas con idempotencia y cola de diferidos.
//
// Idempotencia: WooCommerce reintenta los webhooks y puede mandar el mismo
// cambio de estado dos veces. Cada envío lleva una clave (p. ej.
// "pedido-recibido:11842") que se reserva en KV antes de enviar; si ya estaba
// reservada, no se envía nada.

import { kvSetOnce, kvGet, kvSet, kvDel, kvZAdd, kvZRangeByScore, kvZRem } from "@/lib/kv";
import { sendMail } from "@/lib/mailer";
import { render, type TemplateName } from "./templates";

const DEDUPE_TTL = 60 * 60 * 24 * 60; // 60 días
const QUEUE_KEY = "lafab:mail:queue";
const jobKey = (id: string) => `lafab:mail:job:${id}`;

export type SendInput = {
  template: TemplateName;
  to: string;
  vars?: Record<string, string>;
  blocks?: Record<string, string>;
  /** Clave de idempotencia. Sin ella el correo se envía siempre. */
  dedupeKey?: string;
  unsubscribeUrl?: string;
};

export type SendOutcome =
  | { status: "sent"; id?: string }
  | { status: "duplicate" }
  | { status: "error"; error: string };

export async function sendTemplate(input: SendInput): Promise<SendOutcome> {
  if (input.dedupeKey) {
    const first = await kvSetOnce(`lafab:mail:sent:${input.dedupeKey}`, DEDUPE_TTL);
    if (!first) return { status: "duplicate" };
  }

  const { subject, html, text } = render(input.template, {
    vars: input.vars,
    blocks: input.blocks,
  });

  const result = await sendMail({
    to: input.to,
    subject,
    html,
    text,
    unsubscribeUrl: input.unsubscribeUrl,
    tag: input.template,
  });

  if (!result.ok) {
    // Se libera la clave para que el reintento del webhook sí pueda enviar.
    if (input.dedupeKey) await kvDel(`lafab:mail:sent:${input.dedupeKey}`);
    return { status: "error", error: result.error || "error desconocido" };
  }
  return { status: "sent", id: result.id };
}

// --- Cola de correos diferidos ----------------------------------------------

export type QueuedJob = SendInput & { id: string; dueAt: number };

/** Programa un correo para dentro de `delayMs`. La idempotencia se aplica al enviarlo. */
export async function scheduleTemplate(
  input: SendInput & { dedupeKey: string },
  delayMs: number
): Promise<void> {
  const dueAt = Date.now() + delayMs;
  // El id de la cola es la propia clave de idempotencia: reprogramar el mismo
  // correo lo reemplaza en vez de duplicarlo.
  const id = input.dedupeKey;
  const job: QueuedJob = { ...input, id, dueAt };
  await kvSet(jobKey(id), job, DEDUPE_TTL);
  await kvZAdd(QUEUE_KEY, dueAt, id);
}

/** Cancela un diferido que ya no aplica (p. ej. un pedido cancelado). */
export async function cancelScheduled(dedupeKey: string): Promise<void> {
  await kvZRem(QUEUE_KEY, dedupeKey);
  await kvDel(jobKey(dedupeKey));
}

/** Envía todo lo que ya venció. Lo llama el cron. */
export async function runQueue(limit: number): Promise<{
  due: number;
  sent: number;
  duplicates: number;
  errors: string[];
}> {
  const ids = (await kvZRangeByScore(QUEUE_KEY, 0, Date.now())).slice(0, limit);
  let sent = 0;
  let duplicates = 0;
  const errors: string[] = [];

  for (const id of ids) {
    const job = await kvGet<QueuedJob>(jobKey(id));
    if (!job) {
      await kvZRem(QUEUE_KEY, id);
      continue;
    }

    const outcome = await sendTemplate(job);
    if (outcome.status === "error") {
      // Se deja en la cola: el próximo cron lo reintenta.
      errors.push(`${job.template}: ${outcome.error}`);
      continue;
    }
    if (outcome.status === "duplicate") duplicates += 1;
    else sent += 1;

    await kvZRem(QUEUE_KEY, id);
    await kvDel(jobKey(id));
  }

  return { due: ids.length, sent, duplicates, errors };
}
