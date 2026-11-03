// Campaña promocional del sitio: barra superior y sello en los productos.
//
// Todo lo que cambia entre una campaña y la siguiente vive aquí. Para el Black
// Friday del 27 de noviembre basta con cambiar `etiqueta`, `inicio` y `fin`:
// ni la barra ni los sellos se tocan.
//
// Ojo con las fechas: van con el desfase de Colombia (-05:00) escrito a mano.
// Sin eso, "14 de noviembre" se interpretaría en UTC y la promoción se
// apagaría a las 7 de la tarde, hora de Medellín.

export const PROMO = {
  activa: true,

  /** Nombre corto de la campaña. Sale en la barra y en el sello. */
  etiqueta: "Semana LaFab",

  /** La promesa concreta. El número vende más que la palabra "promoción". */
  gancho: "Hasta 20% de descuento en sofás",

  cta: "Ver la selección",
  href: "/sofas-lineales",

  inicio: "2026-11-03T00:00:00-05:00",
  fin: "2026-11-14T23:59:59-05:00",

  /**
   * Descuento mínimo para considerar que un producto entra en la campaña.
   * Todo el catálogo tiene algún descuento (del 5% al 20%), así que sin un
   * umbral el sello no distinguiría nada: lo llevarían los 53 productos.
   */
  umbralDescuento: 20,
} as const;

export const PROMO_INICIO_MS = Date.parse(PROMO.inicio);
export const PROMO_FIN_MS = Date.parse(PROMO.fin);

/** ¿La campaña está corriendo ahora mismo? */
export function promoVigente(ahora: number = Date.now()): boolean {
  return PROMO.activa && ahora >= PROMO_INICIO_MS && ahora <= PROMO_FIN_MS;
}

/** ¿Este descuento califica para llevar el sello de la campaña? */
export function enPromo(pct: number | null | undefined): boolean {
  return pct != null && pct >= PROMO.umbralDescuento;
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
