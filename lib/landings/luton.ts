// Landing del Sofá Luton (id 11912). Como la del Latina, parte de la del San
// Diego y cambia solo lo propio del modelo. Los textos salen del Excel de
// producto del 19/10/2026, no están inventados.
//
// Fotos propias del Luton (27/10/2026). Cada una se produjo con la forma que
// pide su posición, igual que en la landing del San Diego y que los espacios
// del Portal (lafab-portal.vercel.app → Producto → Fotos y vistas):
//
//   Portada            16:9  (1672×941)   · 1 foto
//   Vistas             4:5   (1122×1402)  · 4 fotos, producto solo, mismo fondo
//   Ficha técnica      4:5   (1122×1402)  · 1 foto
//   Ambientes          4:3   (1448×1086)  · 4 fotos, el sofá en uso
//   Diseño y confort   3:2   (1536×1024)  · 2 fotos de detalle
//
// Pendiente: falta la tercera foto 3:2 para "Calidad"; mientras tanto esa
// posición usa una 4:3, que entra algo recortada.
import { SANDIEGO_LANDING, type Landing } from "@/lib/sandiego";
import { STORE_URL } from "@/lib/woocommerce";

const U = `${STORE_URL}/wp-content/uploads/2026/10`;

// 16:9 — portada a pantalla completa
const PORTADA = `${U}/sofa-luton-minimalista-con-sofa-de-cuero-caramelo-lafab-medellin.webp`;

// 4:5 — el producto solo, mismo fondo y misma luz
const VISTA = {
  frontal: `${U}/sofa-luton-de-cuero-caramelo-en-interior-clasico-moderno-lafab-medellin.webp`,
  diagonal: `${U}/sofa-luton-de-cuero-caramelo-en-sala-luminosa-lafab-medellin.webp`,
  lateral: `${U}/sofa-luton-de-cuero-bajo-el-sol-lafab-medellin.webp`,
  posterior: `${U}/sofa-luton-de-cuero-bajo-luz-dorada-lafab-medellin.webp`,
  ficha: `${U}/sofa-luton-calido-con-sofa-de-cuero-caramelo-lafab-medellin.webp`,
};

// 4:3 — el sofá en uso en un espacio real
const AMBIENTE = {
  peliculas: `${U}/sofa-luton-moderno-banado-por-el-sol-lafab-medellin.webp`,
  familia: `${U}/sofa-luton-de-cuero-en-sala-luminosa-lafab-medellin.webp`,
  descansar: `${U}/sofa-luton-de-cuero-junto-a-ventanales-luminosos-lafab-medellin.webp`,
  visitas: `${U}/sofa-luton-acogedor-con-sofa-de-cuero-caramelo-lafab-medellin.webp`,
  config: `${U}/sofa-luton-de-cuero-bajo-luz-dorada-2-lafab-medellin.webp`,
};

// 3:2 — detalle
const DETALLE = {
  diseno: `${U}/sofa-luton-de-cuero-bajo-luz-calida-lafab-medellin.webp`,
  confort: `${U}/sofa-luton-de-cuero-marron-en-primer-plano-lafab-medellin.webp`,
  calidad: `${U}/sofa-luton-de-cuero-caramelo-al-sol-lafab-medellin.webp`, // 4:3 provisional
};

export const LUTON: Landing = {
  ...SANDIEGO_LANDING,

  productId: 11912,
  slug: "sofa-luton",
  name: "Sofá Luton",
  tagline: "Líneas contemporáneas y volúmenes generosos",
  price: 4580000,
  regularPrice: 5725000,
  hero: PORTADA,
  configImage: AMBIENTE.config,

  medidas: ["180 cm", "200 cm"],

  // Mismas claves que el San Diego (las telas reales del CMS), pero con la
  // foto de este modelo. Si se hiciera por nombre fijo, al renombrar una tela
  // la landing se quedaba sin fotos, que fue justo lo que pasó.
  configColors: Object.fromEntries(
    Object.entries(SANDIEGO_LANDING.configColors).map(([tela, colores]) => [
      tela,
      colores.map((c) => ({ ...c, img: AMBIENTE.config })),
    ])
  ) as typeof SANDIEGO_LANDING.configColors,

  lifestyle: [
    { img: AMBIENTE.peliculas, title: "Ver películas", text: "El plan perfecto para quedarse en casa." },
    { img: AMBIENTE.familia, title: "Compartir en familia", text: "El punto de encuentro de todos." },
    { img: AMBIENTE.descansar, title: "Descansar", text: "Tu rincón para recargar energías." },
    { img: AMBIENTE.visitas, title: "Recibir visitas", text: "Siempre listo para una buena charla." },
  ],

  vistas: [
    { img: VISTA.frontal, label: "Frontal" },
    { img: VISTA.diagonal, label: "Diagonal" },
    { img: VISTA.lateral, label: "Lateral" },
    { img: VISTA.posterior, label: "Posterior" },
  ],

  bondades: [
    { img: DETALLE.diseno, n: "01", title: "Diseño", sub: "contemporáneo y sencillo." },
    { img: DETALLE.confort, n: "02", title: "Confort", sub: "en cojines amplios." },
    { img: DETALLE.calidad, n: "03", title: "Calidad", sub: "en cuero y madera de roble." },
  ],

  specsImage: VISTA.ficha,

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
    { key: "Tapizado", val: "Telas y colores a elegir, o cuero" },
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
    { label: "Cuero", value: "Disponible en cuero (precio diferente)" },
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
    { n: "02", title: "Elige el material", text: "Tela o cuero." },
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
