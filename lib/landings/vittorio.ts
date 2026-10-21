// Landing del Sofá Vittorio (id 11915). Mismo molde que las demás: hereda lo
// de marca del San Diego y cambia lo del modelo. Los textos vienen del Excel
// de producto del 19/10/2026.
//
// OJO — FOTOS PENDIENTES: igual que el Luton, hoy solo hay una imagen en la
// tienda y es el arte del post de Instagram. Hasta que lleguen las fotos
// reales la página no debe promocionarse.
import { SANDIEGO_LANDING, type Landing } from "@/lib/sandiego";
import { STORE_URL } from "@/lib/woocommerce";

const U = `${STORE_URL}/wp-content/uploads/2026/10`;

const FOTO = {
  principal: `${U}/sofa-vittorio.webp`,
};

export const VITTORIO: Landing = {
  ...SANDIEGO_LANDING,

  productId: 11915,
  slug: "sofa-vittorio",
  name: "Sofá Vittorio",
  tagline: "Inspiración italiana, elaboración artesanal",
  price: 5100000,
  regularPrice: 5800000,
  hero: FOTO.principal,
  configImage: FOTO.principal,

  medidas: ["190 cm", "210 cm", "240 cm"],

  configColors: {
    mon: SANDIEGO_LANDING.configColors.mon.map((c) => ({ ...c, img: FOTO.principal })),
    milan: SANDIEGO_LANDING.configColors.milan.map((c) => ({ ...c, img: FOTO.principal })),
  },

  lifestyle: [
    { img: FOTO.principal, title: "Recibir visitas", text: "Una pieza que marca el espacio." },
    { img: FOTO.principal, title: "Compartir en familia", text: "El punto de encuentro de todos." },
    { img: FOTO.principal, title: "Descansar", text: "Amplitud suficiente para estirarse." },
    { img: FOTO.principal, title: "Ver películas", text: "El plan perfecto para quedarse en casa." },
  ],

  vistas: [
    { img: FOTO.principal, label: "Frontal" },
    { img: FOTO.principal, label: "Diagonal" },
    { img: FOTO.principal, label: "Lateral" },
    { img: FOTO.principal, label: "Posterior" },
  ],

  bondades: [
    { img: FOTO.principal, n: "01", title: "Silueta baja", sub: "de inspiración italiana." },
    { img: FOTO.principal, n: "02", title: "Confección", sub: "con costuras a la vista." },
    { img: FOTO.principal, n: "03", title: "Roble", sub: "en la base completa." },
  ],

  specsImage: FOTO.principal,

  specsTop: [
    { key: "Largo", val: "Disponible en 190 cm · 210 cm · 240 cm" },
    { key: "Fondo", val: "100 cm" },
    { key: "Altura", val: "70 cm de alto total · silueta baja" },
    { key: "Base", val: "Base completa en madera de roble" },
    { key: "Estructura", val: "Pino inmunizado y roble natural · ensambles reforzados" },
    {
      key: "Confort",
      val: "Cojines de asiento amplios y espaldares sueltos · espumas Croydon® + Penta® certificadas",
    },
    { key: "Tapizado", val: "Telas y colores a elegir, o cuero" },
  ],

  specsBottom: SANDIEGO_LANDING.specsBottom,

  specs: [
    { label: "Largo", value: "190 · 210 · 240 cm" },
    { label: "Fondo", value: "100 cm" },
    { label: "Altura", value: "70 cm" },
    { label: "Base", value: "Base completa en madera de roble" },
    { label: "Estructura", value: "Pino inmunizado y roble natural" },
    {
      label: "Confort",
      value: "Espumas Croydon® + Penta® certificadas · cojines de espaldar sueltos",
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
    { n: "01", title: "Elige la medida", text: "1.90, 2.10 o 2.40 m de largo." },
    { n: "02", title: "Elige el material", text: "Tela o cuero." },
    ...SANDIEGO_LANDING.compra.slice(2),
  ],

  faq: [
    {
      q: "¿Cuánto tarda la fabricación y la entrega?",
      a: "Cada Sofá Vittorio se fabrica bajo pedido, especialmente para ti. El tiempo de entrega es de 30 días calendario o antes: seleccionamos materiales, construimos la estructura y realizamos el tapizado con altos estándares. Te mantenemos informado hasta la entrega.",
    },
    {
      q: "¿Se fabrica en otras medidas?",
      a: "No. El Vittorio se fabrica únicamente en 1.90 m, 2.10 m y 2.40 m de largo, porque son las medidas que conservan las proporciones de su diseño.",
    },
    ...SANDIEGO_LANDING.faq.slice(1).map((f) => ({
      ...f,
      a: f.a.replace(/Sofá San Diego/g, "Sofá Vittorio"),
    })),
  ],
};
