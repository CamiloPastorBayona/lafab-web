// Landing del Sofá Vittorio (id 11915). Mismo molde que las demás: hereda lo
// de marca del San Diego y cambia lo del modelo. Los textos vienen del Excel
// de producto del 19/10/2026.
//
// Fotos del Vittorio (04/11/2026). Son ocho, todas en 4:5, y se reparten por
// las catorce posiciones de la plantilla. No hay una por posición como en el
// Luton: faltan las 16:9 de portada, las 4:3 de ambiente y las 3:2 de detalle,
// así que estas entran recortadas por el contenedor. Cuando lleguen las
// definitivas se cambian las URLs de aquí y nada más.
//
// Ninguna se repite dos veces seguidas dentro de la misma sección, que era lo
// que hacía evidente que todas eran la misma foto.
import { SANDIEGO_LANDING, type Landing } from "@/lib/sandiego";
import { STORE_URL } from "@/lib/woocommerce";

const U10 = `${STORE_URL}/wp-content/uploads/2026/10`;
const U11 = `${STORE_URL}/wp-content/uploads/2026/11`;

const FOTO = {
  // Frontal sobre tapete, con el sofá entero y aire alrededor.
  tapete: `${U10}/sofa-vittorio-de-cuero-en-sala-minimalista-lafab-medellin.webp`,
  // Frontal limpia, sin nada más en el encuadre.
  frontal: `${U10}/sofa-vittorio-modular-marron-en-sala-minimalista-lafab-medellin.webp`,
  // Tres cuartos.
  diagonal: `${U10}/sofa-vittorio-de-cuero-marron-en-sala-minimalista-lafab-medellin.webp`,
  // De perfil: se ve la silueta baja y las costuras del brazo.
  perfil: `${U10}/sofa-vittorio-de-cuero-taupe-en-perfil-lafab-medellin.webp`,
  // Tres cuartos desde atrás.
  posterior: `${U10}/sofa-vittorio-modular-marron-en-espacio-minimalista-lafab-medellin.webp`,
  // La única con la sala montada: cuadro, lámpara y mesa de centro.
  ambiente: `${U11}/sofa-vittorio-en-cuero-chocolate-en-una-sala-beige-lafab-medellin.webp`,
  // Frontal con la luz entrando en diagonal.
  luz: `${U11}/sofa-vittorio-en-cuero-marron-con-luz-diagonal-lafab-medellin.webp`,
  // Esquina en primer plano, buena para detalle.
  esquina: `${U11}/sofa-vittorio-en-vista-lateral-sobre-piso-beige-lafab-medellin.webp`,
};

export const VITTORIO: Landing = {
  ...SANDIEGO_LANDING,

  productId: 11915,
  slug: "sofa-vittorio",
  name: "Sofá Vittorio",
  tagline: "Inspiración italiana, elaboración artesanal",
  price: 5240000,
  regularPrice: 6550000,
  hero: FOTO.ambiente,
  configImage: FOTO.tapete,

  medidas: ["190 cm", "210 cm", "240 cm"],

  // Mismas claves que el San Diego (las telas reales del CMS), pero con la
  // foto de este modelo. Si se hiciera por nombre fijo, al renombrar una tela
  // la landing se quedaba sin fotos, que fue justo lo que pasó.
  configColors: Object.fromEntries(
    Object.entries(SANDIEGO_LANDING.configColors).map(([tela, colores]) => [
      tela,
      colores.map((c) => ({ ...c, img: FOTO.tapete })),
    ])
  ) as typeof SANDIEGO_LANDING.configColors,

  lifestyle: [
    { img: FOTO.esquina, title: "Recibir visitas", text: "Una pieza que marca el espacio." },
    { img: FOTO.ambiente, title: "Compartir en familia", text: "El punto de encuentro de todos." },
    { img: FOTO.tapete, title: "Descansar", text: "Amplitud suficiente para estirarse." },
    { img: FOTO.luz, title: "Ver películas", text: "El plan perfecto para quedarse en casa." },
  ],

  vistas: [
    { img: FOTO.frontal, label: "Frontal" },
    { img: FOTO.diagonal, label: "Diagonal" },
    { img: FOTO.perfil, label: "Lateral" },
    { img: FOTO.posterior, label: "Posterior" },
  ],

  bondades: [
    { img: FOTO.esquina, n: "01", title: "Silueta baja", sub: "de inspiración italiana." },
    { img: FOTO.perfil, n: "02", title: "Confección", sub: "con costuras a la vista." },
    { img: FOTO.frontal, n: "03", title: "Roble", sub: "en la base completa." },
  ],

  specsImage: FOTO.luz,

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
