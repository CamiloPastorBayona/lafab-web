// Campaña de Black Friday: barra superior, sello en los productos y la página
// /black-friday.
//
// Todo lo que cambia entre una campaña y la siguiente vive aquí.
//
// Ojo con las fechas: van con el desfase de Colombia (-05:00) escrito a mano.
// Sin eso, "14 de noviembre" se interpretaría en UTC y la campaña se apagaría
// a las 7 de la tarde, hora de Medellín.
//
// Por qué termina antes del Black Friday de verdad (27 de noviembre): fabricar
// toma de 20 a 40 días, así que lo que se compre después del 15 de noviembre
// ya no llega para diciembre. De ahí el "NOS ADELANTAMOS" de las piezas.

export const PROMO = {
  activa: true,

  etiqueta: "Black Friday",
  gancho: "Nos adelantamos, para que lo estrenes este año",
  cta: "Ver la selección",
  href: "/black-friday",

  inicio: "2026-11-03T00:00:00-05:00",
  fin: "2026-11-14T23:59:59-05:00",

  /**
   * Los productos de la campaña, por slug.
   *
   * Es una lista y no un umbral de descuento a propósito: todo el catálogo
   * tiene alguna rebaja (del 5% al 20%), y las tres alcobas que entran están
   * al 11%, así que ningún porcentaje separa la selección del resto. Esta es
   * la lista que confirmó Mauricio: los sofás de la campaña más Varsovia,
   * Luau y Kenia.
   */
  productos: [
    "sofa-ankora",
    "sofa-bari",
    "sofa-ginebra",
    "sofa-italia",
    "sofa-latina",
    "sofa-luton",
    "sofa-milan",
    "sofa-new-york",
    "sofa-piamonte",
    "sofa-san-diego",
    "sofa-sevilla",
    "sofa-turin",
    "sofa-vittorio",
    "alcoba-varsovia",
    "alcoba-luau",
    "alcoba-kenia",
  ] as string[],
} as const;

export const PROMO_INICIO_MS = Date.parse(PROMO.inicio);
export const PROMO_FIN_MS = Date.parse(PROMO.fin);

const EN_CAMPANA = new Set<string>(PROMO.productos);

/** ¿La campaña está corriendo ahora mismo? */
export function promoVigente(ahora: number = Date.now()): boolean {
  return PROMO.activa && ahora >= PROMO_INICIO_MS && ahora <= PROMO_FIN_MS;
}

/** ¿Este producto entra en la campaña? */
export function enPromo(slug: string | null | undefined): boolean {
  return !!slug && EN_CAMPANA.has(slug);
}

/** Lo que queda para que termine, ya partido para pintarlo. */
export function restante(ahora: number = Date.now()) {
  const ms = Math.max(0, PROMO_FIN_MS - ahora);
  const total = Math.floor(ms / 1000);
  return {
    dias: Math.floor(total / 86400),
    horas: Math.floor((total % 86400) / 3600),
    minutos: Math.floor((total % 3600) / 60),
    segundos: total % 60,
    terminado: ms === 0,
  };
}

/** La fecha de cierre, escrita como la lee un cliente. */
export const PROMO_FIN_TEXTO = new Date(PROMO_FIN_MS).toLocaleDateString(
  "es-CO",
  { day: "numeric", month: "long", timeZone: "America/Bogota" }
);
