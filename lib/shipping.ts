// Política de envío de LaFab, centralizada en un solo lugar.
//
// El modelo de presentación es el de la landing del Sofá San Diego: se muestra
// el PRECIO BASE del mueble (con el envío incluido para Medellín y su área
// metropolitana) y, por separado y de forma explícita, el COSTO ADICIONAL para
// las demás ciudades del país. Así el cliente nunca se encuentra con un cobro
// sorpresa en el checkout y el valor que ve coincide con el que se liquida.
//
// EL ENVÍO SE COBRA POR MUEBLE, NO POR PEDIDO. La transportadora cobra por
// volumen: tres sofás a Bogotá son tres fletes, no uno. La tienda cobraba un
// solo flete por pedido y la diferencia la ponía LaFab de su bolsillo.
//
// Y no todos los muebles cuestan lo mismo de llevar: un sofá en L y un comedor
// ocupan bastante más camión que una poltrona. Esos dos van con tarifa alta.
//
// Esto tiene que coincidir exactamente con WooCommerce, que es quien liquida
// de verdad: zona "Resto del país" → método "Envío a tu ciudad" → coste base 0,
// clase de envío "Voluminoso" a `350000 * [qty]` y sin clase a `200000 * [qty]`,
// con tipo de cálculo "Por clase". Si cambia una tarifa, cambian las dos.

export const cop = (n: number) => "$" + n.toLocaleString("es-CO");

/** Flete por mueble a ciudades distintas de Medellín y su área metropolitana. */
export const SHIPPING_NATIONAL_COST = 200000;

/** Flete por mueble de los que ocupan más camión: sofás en L y comedores. */
export const SHIPPING_VOLUMINOSO_COST = 350000;

// Se decide por el slug y no por la categoría porque el carrito solo guarda
// slug, nombre, precio y cantidad; pedirle la categoría obligaría a tocar todos
// los puntos donde se agrega un mueble. Comprobado contra el catálogo completo:
// los 20 productos de las categorías "Sofás en L" y "Comedores" empiezan por
// estos prefijos, y ningún otro producto lo hace. Un producto nuevo tiene que
// respetar esa convención, que es la misma que usa WooCommerce para asignarle
// la clase de envío.
const PREFIJOS_VOLUMINOSOS = ["sofa-en-l-", "comedor-"];

export const esVoluminoso = (slug: string) =>
  PREFIJOS_VOLUMINOSOS.some((p) => slug.startsWith(p));

/** Lo que cuesta llevar UNA unidad de este mueble fuera del área metropolitana. */
export const envioUnitario = (slug: string) =>
  esVoluminoso(slug) ? SHIPPING_VOLUMINOSO_COST : SHIPPING_NATIONAL_COST;

/** Envío de un carrito completo a otra ciudad: la suma mueble por mueble. */
export const envioNacional = (items: { slug: string; qty: number }[]) =>
  items.reduce((total, i) => total + envioUnitario(i.slug) * i.qty, 0);

export type ShippingZone = {
  /** Etiqueta larga, para selectores. */
  label: string;
  /** Etiqueta corta, para textos en línea. */
  short: string;
  /** Costo adicional sobre el precio del mueble. */
  cost: number;
};

/** Las dos zonas, con el flete que corresponde a este mueble. */
export const zonasEnvio = (slug?: string): ShippingZone[] => [
  {
    label: "Medellín · Área metropolitana",
    short: "Medellín y área metropolitana",
    cost: 0,
  },
  {
    label: "Otra ciudad capital del país",
    short: "Otras ciudades capitales",
    cost: slug ? envioUnitario(slug) : SHIPPING_NATIONAL_COST,
  },
];

/** Zonas genéricas, para cuando no hay un mueble concreto de por medio. */
export const SHIPPING_ZONES = zonasEnvio();

/** Zona por defecto (la que define el precio base que se publica). */
export const SHIPPING_BASE_ZONE = SHIPPING_ZONES[0];

/** Franja de confianza / sellos. */
export const SHIPPING_BADGE = "Envío incluido en Medellín";

/** Línea corta bajo el precio, en fichas y configuradores. */
export const shippingInline = (slug?: string) =>
  `Envío incluido en Medellín · +${cop(
    slug ? envioUnitario(slug) : SHIPPING_NATIONAL_COST
  )} por mueble a otras ciudades`;

export const SHIPPING_INLINE = shippingInline();

/** Nota ampliada, para FAQ, carrito y checkout. */
export const SHIPPING_NOTE = `El envío está incluido en el precio para Medellín y su área metropolitana. A las demás ciudades capitales del país se suma ${cop(
  SHIPPING_NATIONAL_COST
)} por mueble, y ${cop(
  SHIPPING_VOLUMINOSO_COST
)} por mueble en sofás en L y comedores, que ocupan más espacio en el camión. En municipios que no son capitales el valor puede variar según la ubicación y se informa antes de enviar.`;

/** Costo adicional de una zona, ya formateado ("incluido" o "+$200.000"). */
export const shippingCostLabel = (cost: number) =>
  cost > 0 ? `+${cop(cost)}` : "incluido";
