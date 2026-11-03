// Contenido de la página de campaña. Separado de lib/promo.ts, que solo lleva
// fechas y la lista de productos: esto es texto que se reescribe cada año.

import { UPLOADS } from "@/lib/cms";
import { PROMO_FIN_TEXTO } from "@/lib/promo";

/**
 * Piezas gráficas de la campaña, en horizontal.
 *
 * Mauricio las entregó verticales (formato de historia). Aquí van las
 * versiones anchas: una vertical recortada a 1600x700 pierde el titular o
 * pierde el sofá, y en escritorio ocupa toda la franja.
 *
 * Mientras las definitivas no estén cargadas en el CMS, `imagen` apunta a la
 * foto de catálogo del mismo sofá, que ya está en los tamaños correctos. Se
 * reemplaza la URL y listo: ni el componente ni la página se tocan.
 */
export type Pieza = {
  id: string;
  titular: string;
  bajada: string;
  imagen: string;
  /** Producto al que lleva la pieza, o null si lleva a WhatsApp. */
  slug: string | null;
  alt: string;
};

/**
 * Pieza panorámica de la campaña: la franja de la portada y la cabecera de
 * /black-friday usan la misma.
 *
 * Tiene que ser propia y no una de las verticales recortada. La franja es muy
 * ancha y baja, el texto y la cuenta regresiva van encima por la izquierda, y
 * una vertical recortada a ese alto pierde el sofá o pierde el cielo. Además
 * se sirve detrás de un degradado oscuro, así que el interés visual debe estar
 * a la derecha y el tercio izquierdo despejado.
 */
export const PORTADA = {
  imagen: `${UPLOADS}/2026/07/3.webp`,
  alt: "Sala amoblada por LaFab con luz cálida de noche",
};

/**
 * Las tres tarjetas de la sección, en el formato vertical en que Mauricio las
 * entregó. Las dos primeras llevan a su ficha; la tercera no tiene producto,
 * así que lleva a WhatsApp, que es lo que él pidió.
 */
export const PIEZAS: Pieza[] = [
  {
    id: "latina",
    titular: "Grandes momentos",
    bajada: "comienzan en casa",
    imagen: `${UPLOADS}/2026/07/3.webp`,
    slug: "sofa-latina",
    alt: "Sofá Latina en una sala con luz cálida",
  },
  {
    id: "vittorio",
    titular: "Grandes momentos",
    bajada: "comienzan en casa",
    imagen: `${UPLOADS}/2026/07/6.webp`,
    slug: "sofa-vittorio",
    alt: "Sofá Vittorio en cuero, en una sala con vista a la ciudad",
  },
  {
    id: "estrena",
    titular: "Para que lo estrenes este año",
    bajada: "Diseño, confort y estilo para tu hogar",
    imagen: `${UPLOADS}/2026/07/4.webp`,
    slug: null,
    alt: "Sala amoblada por LaFab",
  },
];

export const BF_FAQ = [
  {
    q: "¿Hasta cuándo va el Black Friday de LaFab?",
    a: `Hasta el ${PROMO_FIN_TEXTO}. Nos adelantamos al viernes negro a propósito: fabricar un mueble a la medida toma entre 20 y 40 días, así que lo que se encargue después de esa fecha ya no alcanza a entregarse este año.`,
  },
  {
    q: "¿Qué productos entran en la campaña?",
    a: "Trece sofás y tres alcobas: Varsovia, Luau y Kenia. Son los que ves en esta página; cada uno muestra su precio de campaña en su ficha.",
  },
  {
    q: "¿Los muebles de la campaña también se hacen a la medida?",
    a: "Sí. Son las mismas piezas de siempre, con las mismas opciones de medida, tela y color. Lo único que cambia es el precio durante estos días.",
  },
  {
    q: "¿Cuándo me lo entregan si compro ahora?",
    a: "Entre 20 y 40 días calendario según la referencia y lo que personalices. Si compras dentro de la campaña, alcanza para que lo estrenes este año.",
  },
  {
    q: "¿El envío tiene costo?",
    a: "En Medellín y el área metropolitana está incluido. A otras ciudades del país tiene un costo adicional de $200.000, que se ve en el checkout antes de pagar.",
  },
  {
    q: "¿Puedo pedir asesoría antes de comprar?",
    a: "Claro. Escríbenos por WhatsApp con el mueble que te interesa y te ayudamos con medidas, telas y tiempos. También puedes venir al showroom en Itagüí a sentarte en ellos.",
  },
];
