// Momento exacto del lanzamiento público de la tienda nueva:
// lunes 26 de octubre de 2026, 8:00 a. m. hora de Colombia.
// Colombia no cambia de hora, así que el desfase es siempre -05:00.
export const LANZAMIENTO_MS = Date.parse("2026-10-26T08:00:00-05:00");

// La cuenta regresiva se muestra durante los 3 días previos.
export const VENTANA_MS = 3 * 24 * 60 * 60 * 1000;
export const INICIO_MS = LANZAMIENTO_MS - VENTANA_MS;

/** true desde el instante del lanzamiento en adelante. */
export function yaLanzamos(ahora: number = Date.now()): boolean {
  return ahora >= LANZAMIENTO_MS;
}

// El equipo entra al sitio real antes de tiempo con ?ver=lafab en cualquier
// URL; queda una cookie y no hay que repetirlo.
export const COOKIE_PREVIA = "lf_previa";
export const CLAVE_PREVIA = "lafab";
