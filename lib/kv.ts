// Acceso a Vercel KV / Upstash Redis por su API REST (solo fetch, sin SDK).
//
// Si no hay credenciales — dev local o un preview sin KV — cae a estructuras en
// memoria ancladas a globalThis. Ese modo sirve para probar: en Vercel cada
// invocación puede caer en una instancia distinta y no persiste nada.
//
//   KV_REST_API_URL / KV_REST_API_TOKEN → los inyecta Vercel al conectar KV.

const KV_URL = process.env.KV_REST_API_URL?.replace(/\/$/, "");
const KV_TOKEN = process.env.KV_REST_API_TOKEN;

export const kvReady = () => Boolean(KV_URL && KV_TOKEN);

async function redis<T = unknown>(command: (string | number)[]): Promise<T | null> {
  if (!kvReady()) return null;
  try {
    const r = await fetch(KV_URL!, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KV_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });
    if (!r.ok) {
      console.error(`[kv] ${command[0]} → ${r.status}`);
      return null;
    }
    const data = (await r.json().catch(() => null)) as { result?: T } | null;
    return data?.result ?? null;
  } catch (e) {
    console.error(`[kv] ${command[0]} falló:`, e instanceof Error ? e.message : e);
    return null;
  }
}

// --- Respaldo en memoria ----------------------------------------------------

type Mem = {
  values: Map<string, string>;
  sets: Map<string, Set<string>>;
  zsets: Map<string, Map<string, number>>;
};
const g = globalThis as typeof globalThis & { __lafabKv?: Mem };
const mem: Mem = (g.__lafabKv ??= {
  values: new Map(),
  sets: new Map(),
  zsets: new Map(),
});

const set = (name: string) => {
  const s = mem.sets.get(name) ?? new Set<string>();
  mem.sets.set(name, s);
  return s;
};
const zset = (name: string) => {
  const z = mem.zsets.get(name) ?? new Map<string, number>();
  mem.zsets.set(name, z);
  return z;
};

// --- API --------------------------------------------------------------------

export async function kvGet<T>(key: string): Promise<T | null> {
  const raw = kvReady() ? await redis<string>(["GET", key]) : mem.values.get(key) ?? null;
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function kvSet(key: string, value: unknown, ttlSeconds?: number): Promise<void> {
  const raw = JSON.stringify(value);
  if (!kvReady()) {
    mem.values.set(key, raw);
    return;
  }
  await redis(ttlSeconds ? ["SET", key, raw, "EX", ttlSeconds] : ["SET", key, raw]);
}

export async function kvDel(key: string): Promise<void> {
  if (!kvReady()) {
    mem.values.delete(key);
    return;
  }
  await redis(["DEL", key]);
}

/**
 * Escribe solo si la clave no existía. Devuelve true si ganó la carrera; es la
 * base de la idempotencia: dos webhooks iguales, un solo correo.
 */
export async function kvSetOnce(key: string, ttlSeconds: number): Promise<boolean> {
  if (!kvReady()) {
    if (mem.values.has(key)) return false;
    mem.values.set(key, "1");
    return true;
  }
  const r = await redis<string | null>(["SET", key, "1", "NX", "EX", ttlSeconds]);
  return r === "OK";
}

export async function kvSetAdd(name: string, member: string): Promise<void> {
  if (!kvReady()) {
    set(name).add(member);
    return;
  }
  await redis(["SADD", name, member]);
}

export async function kvSetHas(name: string, member: string): Promise<boolean> {
  if (!kvReady()) return set(name).has(member);
  return (await redis<number>(["SISMEMBER", name, member])) === 1;
}

export async function kvZAdd(name: string, score: number, member: string): Promise<void> {
  if (!kvReady()) {
    zset(name).set(member, score);
    return;
  }
  await redis(["ZADD", name, score, member]);
}

export async function kvZRangeByScore(
  name: string,
  min: number,
  max: number
): Promise<string[]> {
  if (!kvReady()) {
    return [...zset(name).entries()]
      .filter(([, score]) => score >= min && score <= max)
      .sort((a, b) => a[1] - b[1])
      .map(([member]) => member);
  }
  return (await redis<string[]>(["ZRANGEBYSCORE", name, min, max])) || [];
}

export async function kvZRem(name: string, member: string): Promise<void> {
  if (!kvReady()) {
    zset(name).delete(member);
    return;
  }
  await redis(["ZREM", name, member]);
}

export async function kvZRemRangeByScore(
  name: string,
  min: number,
  max: number
): Promise<void> {
  if (!kvReady()) {
    const z = zset(name);
    for (const [member, score] of z) if (score >= min && score <= max) z.delete(member);
    return;
  }
  await redis(["ZREMRANGEBYSCORE", name, min, max]);
}
