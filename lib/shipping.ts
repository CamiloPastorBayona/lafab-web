// Política de envío de LaFab, centralizada en un solo lugar.
//
// El modelo de presentación es el de la landing del Sofá San Diego: se muestra
// el PRECIO BASE del mueble (con el envío incluido para Medellín y su área
// metropolitana) y, por separado y de forma explícita, el COSTO ADICIONAL para
// las demás ciudades del país. Así el cliente nunca se encuentra con un cobro
// sorpresa en el checkout y el valor que ve coincide con el que se liquida.
//
// Cualquier cambio de tarifa se hace aquí y se propaga a toda la tienda:
// fichas de producto, configuradores, categorías, carrito, checkout y FAQ.

export const cop = (n: number) => "$" + n.toLocaleString("es-CO");

/** Costo adicional de envío a ciudades capitales distintas de Medellín. */
export const SHIPPING_NATIONAL_COST = 200000;

export type ShippingZone = {
  /** Etiqueta larga, para selectores. */
  label: string;
  /** Etiqueta corta, para textos en línea. */
  short: string;
  /** Costo adicional sobre el precio del mueble. */
  cost: number;
};

export const SHIPPING_ZONES: ShippingZone[] = [
  {
    label: "Medellín · Área metropolitana",
    short: "Medellín y área metropolitana",
    cost: 0,
  },
  {
    label: "Nacional · ciudad capital",
    short: "Otras ciudades capitales",
    cost: SHIPPING_NATIONAL_COST,
  },
];

/** Zona por defecto (la que define el precio base que se publica). */
export const SHIPPING_BASE_ZONE = SHIPPING_ZONES[0];

/** Franja de confianza / sellos. */
export const SHIPPING_BADGE = "Envío incluido en Medellín";

/** Línea corta bajo el precio, en fichas y configuradores. */
export const SHIPPING_INLINE = `Envío incluido en Medellín · +${cop(
  SHIPPING_NATIONAL_COST
)} a otras ciudades`;

/** Nota ampliada, para FAQ, carrito y checkout. */
export const SHIPPING_NOTE = `El envío está incluido en el precio para Medellín y su área metropolitana. A las demás ciudades capitales del país se suma un costo de ${cop(
  SHIPPING_NATIONAL_COST
)}. En municipios que no son capitales el valor puede variar según la ubicación y se informa antes de despachar.`;

/** Costo adicional de una zona, ya formateado ("incluido" o "+$200.000"). */
export const shippingCostLabel = (cost: number) =>
  cost > 0 ? `+${cop(cost)}` : "incluido";
