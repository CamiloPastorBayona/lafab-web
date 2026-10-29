// Límites de las pasarelas de pago.
//
// Bold no procesa transacciones por encima de diez millones: su plugin devuelve
// null en vez de un resultado y WooCommerce revienta con un error de PHP que el
// cliente veía en crudo en la página de pago ("Ha habido un error crítico en
// esta web"). Como una alcoba en cuero o una sala completa pasan de ese tope
// con facilidad, el checkout lo detecta antes de llamar a Bold.
//
// Por decisión de Mauricio y Camilo, una compra así no se cierra en línea: se
// atiende por WhatsApp, donde se verifica al cliente antes de recibir el
// dinero. Mover millones por un formulario sin verificar a quien paga es un
// riesgo para las dos partes.
//
// Comprobado contra la tienda: $9.900.000 pasa, $10.200.000 revienta.
export const TOPE_BOLD = 10_000_000;

export const superaTopeBold = (total: number) => total > TOPE_BOLD;

/** Los errores del backend llegan a veces como HTML (la página de error de
 *  WordPress). Al cliente nunca se le muestran etiquetas. */
export function mensajeLimpio(texto: string, respaldo: string): string {
  const plano = texto
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!plano) return respaldo;
  // Un error interno del servidor no le dice nada a quien está comprando.
  if (/error crítico|critical error|internal server error/i.test(plano)) {
    return respaldo;
  }
  return plano;
}
