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
  titular: string;
  bajada: string;
  imagen: string;
  slug: string;
  alt: string;
};

/**
 * Banners panorámicos de la campaña.
 *
 * Vienen limpios, sin texto quemado: el titular y el botón los pone la web
 * encima. Por eso están compuestos con el lado izquierdo en penumbra y el
 * mueble a la derecha, que es justo donde no estorba.
 *
 * Son los que rotan en el banner principal de la portada.
 */
export const BANNERS = [
  {
    slug: "sofa-vittorio",
    imagen: `${UPLOADS}/2026/11/ban-sofa-vittorio-1920x839-1.webp`,
    alt: "Sofá Vittorio en cuero, en una sala de noche",
  },
  {
    slug: "alcoba-kenia",
    imagen: `${UPLOADS}/2026/11/ban-alcoba-kenia-1920x798-1.webp`,
    alt: "Alcoba Kenia con luz indirecta sobre el cabecero",
  },
  {
    slug: "sofa-latina",
    imagen: `${UPLOADS}/2026/11/ban-sofa-latina-1920x839-1.webp`,
    alt: "Sofá Latina en lino claro, en una sala de noche",
  },
  {
    slug: "sofa-luton",
    imagen: `${UPLOADS}/2026/11/ban-sofa-luton-1920x841-1.webp`,
    alt: "Sofá Luton en cuero coñac, en una sala de noche",
  },
];

/**
 * Las piezas que hizo Mauricio, una por producto.
 *
 * Solo van las seis que llevan nombre de producto al pie y no tienen versión
 * duplicada. Del Luton y del San Diego hay varias variantes de trabajo y
 * ninguna está confirmada, así que quedan fuera hasta que él diga cuál.
 * Del Vittorio va la de cuero, que es la que mandó.
 */
export const PIEZAS: Pieza[] = [
  {
    titular: "Grandes momentos",
    bajada: "comienzan en casa",
    imagen: `${UPLOADS}/2026/11/bf-sofa-latina-1080x1350-1.webp`,
    slug: "sofa-latina",
    alt: "Sofá Latina en una sala con luz de atardecer",
  },
  {
    titular: "Grandes momentos",
    bajada: "comienzan en casa",
    imagen: `${UPLOADS}/2026/11/bf-sofa-vittorio-1080x1350-1.webp`,
    slug: "sofa-vittorio",
    alt: "Sofá Vittorio en cuero, en una sala con vista a la montaña",
  },
  {
    titular: "Grandes momentos",
    bajada: "comienzan en casa",
    imagen: `${UPLOADS}/2026/11/bf-alcoba-kenia-1080x1350-1.webp`,
    slug: "alcoba-kenia",
    alt: "Alcoba Kenia con cabecero en madera y luz indirecta",
  },
  {
    titular: "Grandes momentos",
    bajada: "comienzan en casa",
    imagen: `${UPLOADS}/2026/11/bf-alcoba-varsovia-1080x1350-1.webp`,
    slug: "alcoba-varsovia",
    alt: "Alcoba Varsovia con pared de listones de madera",
  },
  {
    titular: "Grandes momentos",
    bajada: "comienzan en casa",
    imagen: `${UPLOADS}/2026/11/bf-alcoba-luau-1080x1350-1.webp`,
    slug: "alcoba-luau",
    alt: "Alcoba Luau en madera natural",
  },
  {
    titular: "Grandes momentos",
    bajada: "comienzan en casa",
    imagen: `${UPLOADS}/2026/11/bf-alcoba-gales-1080x1350-1.webp`,
    slug: "alcoba-gales",
    alt: "Alcoba Gales con cabecero tapizado y vista al exterior",
  },
];

export const BF_FAQ = [
  {
    q: "¿Hasta cuándo va el Black Friday de LaFab?",
    a: `Hasta el ${PROMO_FIN_TEXTO}. Queremos que lo estrenes este año, así que lo que encargues dentro de la campaña lo entregamos antes de que termine el año, sin que esperes más.`,
  },
  {
    q: "¿Qué productos entran en la campaña?",
    a: "Trece sofás y cuatro alcobas: Varsovia, Luau, Kenia y Gales. Son los que ves en esta selección, y cada uno muestra su precio de campaña en su ficha.",
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
