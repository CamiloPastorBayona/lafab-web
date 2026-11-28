// Aviso de temporada: cuánto se está tardando hoy una entrega.
//
// En noviembre y diciembre la agenda del taller se copa y lo que se encarga ya
// no alcanza a salir en el año. Decirlo tarde, cuando el cliente ya pagó, es la
// forma más cara de perder a un cliente: pagó siete millones esperando su sala
// para diciembre y se entera después. Por eso el aviso va en los tres sitios
// donde se decide la compra, no solo en una franja que se va con el scroll.
//
// El plazo publicado es exigible: el Estatuto del Consumidor obliga a informar
// el tiempo de entrega antes de cerrar la transacción. Por eso el texto promete
// el comienzo de la ventana, no un día exacto.
//
// Para apagarlo en enero basta con poner `activa: false`, o dejar que pase la
// fecha de `hasta`: el aviso se apaga solo.

export const TEMPORADA = {
  activa: true,

  // Desfase de Colombia escrito a mano, igual que en la campaña: sin él la
  // fecha se interpreta en UTC y el aviso se apagaría a las 7 de la tarde.
  hasta: "2027-01-09T23:59:59-05:00",

  etiqueta: "Entregas",

  // Franja superior. Corta, porque compite con el header.
  franja: "Alta demanda: lo que encargues hoy se entrega a partir de la segunda semana de enero",

  // Ficha de producto, debajo del precio.
  ficha: "Por la demanda de fin de año, este mueble se entrega a partir de la segunda semana de enero.",

  // Checkout, justo antes de pagar. Es el último momento para enterarse.
  checkout:
    "Tu pedido entra a la agenda del taller y se entrega a partir de la segunda semana de enero. Te confirmamos la fecha exacta cuando empiece la fabricación.",
} as const;

export const TEMPORADA_FIN_MS = Date.parse(TEMPORADA.hasta);

export function temporadaVigente(ahora: number = Date.now()): boolean {
  return TEMPORADA.activa && ahora <= TEMPORADA_FIN_MS;
}
