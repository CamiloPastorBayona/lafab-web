// Persistencia de carritos abandonados sobre lib/kv.

import { createHash } from "crypto";
import {
  kvGet,
  kvSet,
  kvSetAdd,
  kvSetHas,
  kvZAdd,
  kvZRangeByScore,
  kvZRemRangeByScore,
} from "./kv";

export type AbandonedCartItem = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: number;
  qty: number;
};

export type AbandonedCart = {
  id: string;
  email: string;
  name?: string;
  items: AbandonedCartItem[];
  subtotal: number;
  /** Última vez que el cliente tocó el carrito (ms). */
  updatedAt: number;
  /** Cuándo se envió el recordatorio (ms), si ya se envió. */
  remindedAt?: number;
  /** Se completó la compra: ya no se le escribe. */
  recovered?: boolean;
  /** El cliente pidió no recibir estos recordatorios. */
  optedOut?: boolean;
};

const INDEX_KEY = "lafab:ac:index";
const OPTOUT_KEY = "lafab:ac:optout";
const key = (id: string) => `lafab:ac:${id}`;

/** 30 días: pasado ese tiempo el carrito ya no sirve para nada. */
const TTL_SECONDS = 60 * 60 * 24 * 30;

/** Id estable y no adivinable por correo: un cliente = un registro. */
export function cartIdFor(email: string): string {
  const salt = process.env.CART_ID_SECRET || "lafab-dev";
  return createHash("sha256")
    .update(`${salt}:${email.trim().toLowerCase()}`)
    .digest("hex")
    .slice(0, 24);
}

export const normalizeEmail = (email: string) => email.trim().toLowerCase();

export async function getCart(id: string): Promise<AbandonedCart | null> {
  return kvGet<AbandonedCart>(key(id));
}

async function putCart(cart: AbandonedCart): Promise<void> {
  await kvSet(key(cart.id), cart, TTL_SECONDS);
  await kvZAdd(INDEX_KEY, cart.updatedAt, cart.id);
}

export async function isOptedOut(email: string): Promise<boolean> {
  return kvSetHas(OPTOUT_KEY, normalizeEmail(email));
}

export async function optOut(id: string): Promise<boolean> {
  const cart = await getCart(id);
  if (!cart) return false;
  await kvSetAdd(OPTOUT_KEY, normalizeEmail(cart.email));
  await putCart({ ...cart, optedOut: true });
  return true;
}

/**
 * Guarda o actualiza el carrito de un cliente. Cada actualización reinicia el
 * reloj del recordatorio (el cliente sigue activo) y limpia un envío previo,
 * salvo que ya haya comprado o se haya dado de baja.
 */
export async function trackCart(input: {
  email: string;
  name?: string;
  items: AbandonedCartItem[];
  subtotal: number;
}): Promise<AbandonedCart | null> {
  const email = normalizeEmail(input.email);
  if (await isOptedOut(email)) return null;

  const id = cartIdFor(email);
  const previous = await getCart(id);
  if (previous?.optedOut) return null;

  const cart: AbandonedCart = {
    id,
    email,
    name: input.name || previous?.name,
    items: input.items,
    subtotal: input.subtotal,
    updatedAt: Date.now(),
    recovered: false,
    remindedAt: undefined,
  };
  await putCart(cart);
  return cart;
}

/** Marca el carrito como comprado para que el cron ya no lo tome. */
export async function markRecovered(email: string): Promise<void> {
  const cart = await getCart(cartIdFor(normalizeEmail(email)));
  if (!cart) return;
  await putCart({ ...cart, recovered: true, updatedAt: Date.now() });
}

export async function markReminded(cart: AbandonedCart): Promise<void> {
  await putCart({ ...cart, remindedAt: Date.now() });
}

/**
 * Carritos con la última actividad dentro de la ventana [maxAgeMs, minAgeMs]
 * atrás. La cota superior evita escribirle a alguien que abandonó hace semanas.
 */
export async function findAbandoned(
  minAgeMs: number,
  maxAgeMs: number
): Promise<AbandonedCart[]> {
  const now = Date.now();
  const from = now - maxAgeMs;
  const to = now - minAgeMs;

  const ids = await kvZRangeByScore(INDEX_KEY, from, to);
  // Los ids más viejos que la ventana ya no vuelven a usarse.
  await kvZRemRangeByScore(INDEX_KEY, 0, from - 1);

  const carts = await Promise.all(ids.map((id) => getCart(id)));
  return carts.filter(
    (c): c is AbandonedCart =>
      Boolean(c) && !c!.recovered && !c!.optedOut && !c!.remindedAt && c!.items.length > 0
  );
}
