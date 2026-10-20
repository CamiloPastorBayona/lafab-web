// Landing del Sofá Luton (id 11912). Como la del Latina, parte de la del San
// Diego y cambia solo lo propio del modelo. Los textos salen del Excel de
// producto del 19/10/2026, no están inventados.
//
// OJO — FOTOS PENDIENTES: hoy el Luton tiene una sola imagen en la tienda, y
// es el arte del post de Instagram. Mientras no lleguen las fotos reales
// (frontal, diagonal, lateral, posterior, ambientadas y detalle) todas las
// secciones apuntan a la misma, así que la página no debe promocionarse
// todavía. Al reemplazar FOTO basta con llenar las claves que faltan.
import { SANDIEGO_LANDING, type Landing } from "@/lib/sandiego";
import { STORE_URL } from "@/lib/woocommerce";

const U = `${STORE_URL}/wp-content/uploads/2026/10`;

const FOTO = {
  principal: `${U}/sofa-luton.webp`,
};

export const LUTON: Landing = {
  ...SANDIEGO_LANDING,

  productId: 11912,
  slug: "sofa-luton",
  name: "Sofá Luton",
  tagline: "Líneas contemporáneas y volúmenes generosos",
  price: 4000000,
  regularPrice: 4300000,
  hero: FOTO.principal,
  configImage: FOTO.principal,

  medidas: ["180 cm", "200 cm"],

  configColors: {
    mon: SANDIEGO_LANDING.configColors.mon.map((c) => ({ ...c, img: FOTO.principal })),
    milan: SANDIEGO_LANDING.configColors.milan.map((c) => ({ ...c, img: FOTO.principal })),
  },

  lifestyle: [
    { img: FOTO.principal, title: "Compartir en familia", text: "El punto de encuentro de todos." },
    { img: FOTO.principal, title: "Ver películas", text: "El plan perfecto para quedarse en casa." },
    { img: FOTO.principal, title: "Descansar", text: "Tu rincón para recargar energías." },
    { img: FOTO.principal, title: "Recibir visitas", text: "Siempre listo para una buena charla." },
  ],

  vistas: [
    { img: FOTO.principal, label: "Frontal" },
    { img: FOTO.principal, label: "Diagonal" },
    { img: FOTO.principal, label: "Lateral" },
    { img: FOTO.principal, label: "Posterior" },
  ],

  bondades: [
    { img: FOTO.principal, n: "01", title: "Diseño", sub: "contemporáneo y sencillo." },
    { img: FOTO.principal, n: "02", title: "Madera", sub: "de roble en la base." },
    { img: FOTO.principal, n: "03", title: "Confort", sub: "en cojines amplios." },
  ],

  specsImage: FOTO.principal,

  specsTop: [
    { key: "Largo", val: "Disponible en 180 cm · 200 cm" },
    { key: "Fondo", val: "95 cm" },
    { key: "Altura", val: "85 cm de alto total" },
    { key: "Base", val: "Base en madera de roble con patas visibles que elevan el sofá del piso" },
    { key: "Estructura", val: "Pino inmunizado y roble natural · ensambles reforzados" },
    {
      key: "Confort",
      val: "Cojines amplios en asiento y espaldar · espumas Croydon® + Penta® certificadas de alta densidad",
    },
    { key: "Tapizado", val: "Telas y colores a elegir, o cuero 100% natural" },
  ],

  specsBottom: SANDIEGO_LANDING.specsBottom,

  specs: [
    { label: "Largo", value: "180 · 200 cm" },
    { label: "Fondo", value: "95 cm" },
    { label: "Altura", value: "85 cm" },
    { label: "Base", value: "Madera de roble con patas visibles" },
    { label: "Estructura", value: "Pino inmunizado y roble natural" },
    {
      label: "Confort",
      value: "Espumas Croydon® + Penta® certificadas · cojines amplios en asiento y espaldar",
    },
    { label: "Telas", value: "Microfibra Mon (Pet Friendly) y Chenil Milan (Antifluido)" },
    { label: "Cuero", value: "Disponible en cuero 100% natural (precio diferente)" },
    { label: "Colores", value: "Marfil, Beige, Avellana, Plata y Gris" },
    { label: "Garantía", value: "3 años en estructura · 1 año por desajustes" },
    { label: "Entrega", value: "30 días calendario o antes" },
    {
      label: "Envíos",
      value: "Medellín y área metropolitana: incluido · Otras ciudades capitales: $200.000",
    },
  ],

  compra: [
    { n: "01", title: "Elige la medida", text: "A tu espacio, de 1.80 o 2.00 m." },
    { n: "02", title: "Elige el material", text: "Tela o cuero 100% natural." },
    ...SANDIEGO_LANDING.compra.slice(2),
  ],

  faq: [
    {
      q: "¿Cuánto tarda la fabricación y la entrega?",
      a: "Cada Sofá Luton se fabrica bajo pedido, especialmente para ti. El tiempo de entrega es de 30 días calendario o antes: seleccionamos materiales, construimos la estructura y realizamos el tapizado con altos estándares. Te mantenemos informado hasta la entrega.",
    },
    ...SANDIEGO_LANDING.faq.slice(1).map((f) => ({
      ...f,
      a: f.a.replace(/Sofá San Diego/g, "Sofá Luton"),
    })),
  ],
};
