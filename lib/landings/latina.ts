// Landing del Sofá Latina (id 10318). Parte de la del San Diego, que es la de
// referencia, y cambia solo lo propio del modelo: fotos, precios, medidas,
// ficha técnica y preguntas. Lo de marca —telas, taller, pasos de compra,
// sellos— se hereda para que las cuatro landings no se desincronicen.
import { SANDIEGO_LANDING, type Landing } from "@/lib/sandiego";
import { STORE_URL } from "@/lib/woocommerce";

const U = `${STORE_URL}/wp-content/uploads/2026/10`;

const FOTO = {
  ambientado: `${U}/sofa-latina-ambientado.webp`,
  ambientado2: `${U}/sofa-latina-ambientado-2.webp`,
  ambientado3: `${U}/sofa-latina-ambientado-3.webp`,
  ambientado4: `${U}/sofa-latina-ambientado-4.webp`,
  frontal: `${U}/sofa-latina-frontal.webp`,
  diagonal: `${U}/sofa-latina-diagonal.webp`,
  lateral: `${U}/sofa-latina-lateral.webp`,
  posterior: `${U}/sofa-latina-posterior.webp`,
  estudio: `${U}/sofa-latina-blanco.webp`,
};

export const LATINA: Landing = {
  ...SANDIEGO_LANDING,

  productId: 10318,
  slug: "sofa-latina",
  name: "Sofá Latina",
  tagline: "Líneas limpias y la calidez de la madera",
  price: 3490000,
  regularPrice: 3990000,
  hero: FOTO.ambientado,
  configImage: FOTO.estudio,

  medidas: ["180 cm", "190 cm", "200 cm"],

  // Pendiente: fotos del Latina en cada color. Mientras tanto todas las
  // opciones muestran la foto de estudio para no inventar un color que no es.
  configColors: {
    mon: SANDIEGO_LANDING.configColors.mon.map((c) => ({ ...c, img: FOTO.estudio })),
    milan: SANDIEGO_LANDING.configColors.milan.map((c) => ({ ...c, img: FOTO.estudio })),
  },

  lifestyle: [
    { img: FOTO.ambientado, title: "Compartir en familia", text: "El punto de encuentro de todos." },
    { img: FOTO.ambientado2, title: "Ver películas", text: "El plan perfecto para quedarse en casa." },
    { img: FOTO.ambientado3, title: "Descansar", text: "Tu rincón para recargar energías." },
    { img: FOTO.ambientado4, title: "Recibir visitas", text: "Siempre listo para una buena charla." },
  ],

  vistas: [
    { img: FOTO.frontal, label: "Frontal" },
    { img: FOTO.diagonal, label: "Diagonal" },
    { img: FOTO.lateral, label: "Lateral" },
    { img: FOTO.posterior, label: "Posterior" },
  ],

  bondades: [
    { img: FOTO.ambientado2, n: "01", title: "Diseño", sub: "limpio y atemporal." },
    { img: FOTO.ambientado3, n: "02", title: "Madera", sub: "que le da calidez." },
    { img: FOTO.ambientado4, n: "03", title: "Confort", sub: "que invita a quedarse." },
  ],

  specsImage: FOTO.estudio,

  specsTop: [
    { key: "Largo", val: "Disponible en 180 cm · 190 cm · 200 cm" },
    { key: "Fondo", val: "85 cm" },
    { key: "Altura", val: "85 cm de alto total" },
    { key: "Base", val: "Base continua en madera de roble que enmarca la parte inferior" },
    { key: "Patas", val: "Madera de roble · acabado natural" },
    { key: "Estructura", val: "Pino inmunizado y roble natural · ensambles reforzados" },
    {
      key: "Confort",
      val: "Espumas Croydon® + Penta® certificadas · espaldares sueltos en fibra siliconada de alta recuperación",
    },
  ],

  specsBottom: SANDIEGO_LANDING.specsBottom,

  specs: [
    { label: "Largo", value: "180 · 190 · 200 cm" },
    { label: "Fondo", value: "85 cm" },
    { label: "Altura", value: "85 cm" },
    { label: "Patas", value: "Base en madera de roble" },
    { label: "Estructura", value: "Pino inmunizado y roble natural" },
    {
      label: "Confort",
      value:
        "Espumas Croydon® + Penta® certificadas · espaldares en fibra siliconada de alta recuperación",
    },
    { label: "Telas", value: "Microfibra Mon (Pet Friendly) y Chenil Milan (Antifluido)" },
    { label: "Colores", value: "Marfil, Beige, Avellana, Plata y Gris" },
    { label: "Garantía", value: "3 años en estructura · 1 año por desajustes" },
    { label: "Entrega", value: "30 días calendario o antes" },
    {
      label: "Envíos",
      value: "Medellín y área metropolitana: incluido · Otras ciudades capitales: $200.000",
    },
  ],

  compra: [
    { n: "01", title: "Elige la medida", text: "A tu espacio, de 1.80 a 2.00 m." },
    ...SANDIEGO_LANDING.compra.slice(1),
  ],

  faq: [
    {
      q: "¿Cuánto tarda la fabricación y la entrega?",
      a: "Cada Sofá Latina se fabrica bajo pedido, especialmente para ti. El tiempo de entrega es de 30 días calendario o antes: seleccionamos materiales, construimos la estructura y realizamos el tapizado con altos estándares. Te mantenemos informado hasta la entrega.",
    },
    ...SANDIEGO_LANDING.faq.slice(1).map((f) => ({
      ...f,
      a: f.a.replace(/Sofá San Diego/g, "Sofá Latina"),
    })),
  ],
};
