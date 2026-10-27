// Landing del Sofá Luton (id 11912). Como la del Latina, parte de la del San
// Diego y cambia solo lo propio del modelo. Los textos salen del Excel de
// producto del 19/10/2026, no están inventados.
//
// Fotos propias del Luton (27/10/2026): frontal, diagonal, lateral, posterior,
// detalle del cuero y ambientadas. Sustituyen al arte del post de Instagram que
// se usaba en todas las secciones mientras no hubo fotos reales.
//
// OJO — las telas del configurador siguen siendo las del San Diego (Microfibra
// Mon y Chenil Milan), porque los nombres y texturas están fijos en
// SanDiegoConfigurator. El Luton se vende en Microfibra Pompeya, Lino Zajari y
// Cuero: para corregirlo hay que volver ese componente configurable por landing.
import { SANDIEGO_LANDING, type Landing } from "@/lib/sandiego";
import { STORE_URL } from "@/lib/woocommerce";

const U = `${STORE_URL}/wp-content/uploads/2026/10`;

const FOTO = {
  hero: `${U}/sofa-luton-moderna-con-sofa-de-cuero-y-vistas-montanosas-lafab-medellin.webp`,
  frontal: `${U}/sofa-luton-de-cuero-bajo-el-sol-lafab-medellin.webp`,
  diagonal: `${U}/sofa-luton-de-cuero-bajo-luz-dorada-2-lafab-medellin.webp`,
  lateral: `${U}/sofa-luton-de-cuero-bajo-luz-dorada-lafab-medellin.webp`,
  posterior: `${U}/sofa-luton-de-cuero-caramelo-al-sol-lafab-medellin.webp`,
  detalle: `${U}/sofa-luton-de-cuero-marron-en-primer-plano-lafab-medellin.webp`,
  patas: `${U}/sofa-luton-de-cuero-junto-a-ventanales-luminosos-lafab-medellin.webp`,
  salaAmplia: `${U}/sofa-luton-minimalista-con-sofa-de-cuero-caramelo-lafab-medellin.webp`,
  ventanal: `${U}/sofa-luton-moderno-banado-por-el-sol-lafab-medellin.webp`,
  luzSuave: `${U}/sofa-luton-acogedor-con-sofa-de-cuero-caramelo-lafab-medellin.webp`,
  salaCompleta: `${U}/sofa-luton-calido-con-sofa-de-cuero-caramelo-lafab-medellin.webp`,
  limpia: `${U}/sofa-luton-de-cuero-caramelo-en-sala-luminosa-lafab-medellin.webp`,
  specs: `${U}/sofa-luton-de-cuero-caramelo-en-interior-clasico-moderno-lafab-medellin.webp`,
  config: `${U}/sofa-luton-de-cuero-en-sala-luminosa-lafab-medellin.webp`,
};

export const LUTON: Landing = {
  ...SANDIEGO_LANDING,

  productId: 11912,
  slug: "sofa-luton",
  name: "Sofá Luton",
  tagline: "Líneas contemporáneas y volúmenes generosos",
  price: 4000000,
  regularPrice: 4300000,
  hero: FOTO.hero,
  configImage: FOTO.config,

  medidas: ["180 cm", "200 cm"],

  configColors: {
    mon: SANDIEGO_LANDING.configColors.mon.map((c) => ({ ...c, img: FOTO.config })),
    milan: SANDIEGO_LANDING.configColors.milan.map((c) => ({ ...c, img: FOTO.config })),
  },

  lifestyle: [
    { img: FOTO.salaAmplia, title: "Compartir en familia", text: "El punto de encuentro de todos." },
    { img: FOTO.ventanal, title: "Ver películas", text: "El plan perfecto para quedarse en casa." },
    { img: FOTO.luzSuave, title: "Descansar", text: "Tu rincón para recargar energías." },
    { img: FOTO.salaCompleta, title: "Recibir visitas", text: "Siempre listo para una buena charla." },
  ],

  vistas: [
    { img: FOTO.frontal, label: "Frontal" },
    { img: FOTO.diagonal, label: "Diagonal" },
    { img: FOTO.lateral, label: "Lateral" },
    { img: FOTO.posterior, label: "Posterior" },
  ],

  bondades: [
    { img: FOTO.limpia, n: "01", title: "Diseño", sub: "contemporáneo y sencillo." },
    { img: FOTO.patas, n: "02", title: "Madera", sub: "de roble en la base." },
    { img: FOTO.detalle, n: "03", title: "Confort", sub: "en cojines amplios." },
  ],

  specsImage: FOTO.specs,

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
