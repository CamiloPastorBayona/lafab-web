// Contenido de la landing del Sofá San Diego (producto insignia, id 11113).
const U = "https://lafab.com.co/wp-content/uploads";

// Imagen real de textura de cada tela/color (ej: mon-tela-beige.webp)
export const swatchImg = (telaKey: string, colorName: string) =>
  `${U}/2026/06/${telaKey}-tela-${colorName.toLowerCase()}.webp`;

export const SANDIEGO = {
  productId: 11113,
  slug: "sofa-san-diego",
  name: "Sofá San Diego",
  tagline: "Confort superior para disfrutar todos los días",
  price: 3400000,
  regularPrice: 3800000,
  hero: `${U}/2026/06/SANDIEGO.webp`,
  configImage: `${U}/2026/07/01-Mon-Marfil.webp`,

  heroBadges: [
    { label: "Confort superior", icon: "sofa" },
    { label: "Diseño atemporal", icon: "gem" },
    { label: "Fabricación propia", icon: "factory" },
    { label: "Materiales seleccionados", icon: "layers" },
    { label: "Opción Pet Friendly", icon: "paw" },
    { label: "Garantía", icon: "shield" },
    { label: "Respaldo", icon: "award" },
  ],

  aqua: {
    eyebrow: "Tecnología AquaFobiak®",
    title: "Los líquidos resbalan. La tela queda intacta.",
    text: "Café, vino, jugo o salsa: los líquidos permanecen en la superficie durante unos instantes, permitiendo retirarlos fácilmente antes de que sean absorbidos.",
    note: "Siempre se recomienda limpiar inmediatamente para conservar el tratamiento protector.",
    badges: ["Repele líquidos", "Fácil limpieza", "Pet friendly"],
    img: `${U}/2026/06/milan-tela-marfil.webp`,
    caption: "Tela antifluidos",
  },

  lifestyle: [
    {
      img: `${U}/2026/07/pelicula.webp`,
      title: "Ver películas",
      text: "El plan perfecto para quedarse en casa.",
    },
    {
      img: `${U}/2026/07/3.webp`,
      title: "Compartir en familia",
      text: "El punto de encuentro de todos.",
    },
    {
      img: `${U}/2026/07/2.webp`,
      title: "Descansar",
      text: "Tu rincón para recargar energías.",
    },
    {
      img: `${U}/2026/07/4.webp`,
      title: "Recibir visitas",
      text: "Siempre listo para una buena charla.",
    },
  ],

  medidas: ["170 cm", "180 cm", "190 cm", "200 cm"],

  // Colores del configurador: cada color muestra su propia foto del sofá.
  configColors: {
    mon: [
      { name: "Marfil", img: `${U}/2026/07/01-Mon-Marfil.webp`, swatch: `${U}/2026/06/mon-tela-beige.webp` },
      { name: "Avellana", img: `${U}/2026/07/02-Mon-Avellana.webp`, swatch: `${U}/2026/06/mon-tela-avellana.webp` },
      { name: "Plata", img: `${U}/2026/07/03-Mon-Plata.webp`, swatch: `${U}/2026/06/mon-tela-plata.webp` },
      { name: "Gris", img: `${U}/2026/07/04-Mon-Gris.webp`, swatch: `${U}/2026/06/mon-tela-gris.webp` },
    ],
    milan: [
      { name: "Marfil", img: `${U}/2026/07/Chenil-01-Marfil.webp`, swatch: `${U}/2026/06/milan-tela-marfil.webp` },
      { name: "Beige", img: `${U}/2026/07/Chenil-02-Beige.webp`, swatch: `${U}/2026/06/milan-tela-beige.webp` },
      { name: "Avellana", img: `${U}/2026/07/Chenil-03-Avellana.webp`, swatch: `${U}/2026/06/milan-tela-avellana.webp` },
      { name: "Plata", img: `${U}/2026/07/01-Mon-Marfil.webp`, swatch: `${U}/2026/06/milan-tela-plata.webp` },
    ],
  } as Record<string, { name: string; img: string; swatch: string }[]>,

  telas: [
    {
      key: "mon",
      name: "Microfibra Mon",
      short: "Pet Friendly · Soft Velvet",
      tag: "Más elegida",
      desc: "Tacto suave tipo soft velvet y aspecto elegante. Repele líquidos y resiste el uso diario, ideal para hogares con mascotas.",
      features: [
        { text: "Ideal para mascotas y niños", icon: "paw" },
        { text: "Fácil de limpiar", icon: "sparkles" },
        { text: "Conserva su apariencia más tiempo", icon: "refresh" },
        { text: "Textura suave y agradable", icon: "leaf" },
        { text: "Más resistente", icon: "shield" },
      ],
      colors: [
        { name: "Beige", hex: "#D8C6AC" },
        { name: "Avellana", hex: "#A9885E" },
        { name: "Plata", hex: "#B9BBBE" },
        { name: "Gris", hex: "#7C7F83" },
      ],
      spec: "Soft velvet · 100% poliéster · Ancho 145 cm · Teñido y estampado",
    },
    {
      key: "milan",
      name: "Chenil Milan",
      short: "Cálida · Antifluido",
      tag: "Antifluido",
      desc: "Textura cálida y acogedora, con backing acolchado y tratamiento antifluido. Fácil de limpiar y amigable con las mascotas.",
      features: [
        { text: "Antifluidos", icon: "droplet" },
        { text: "Fácil de limpiar", icon: "sparkles" },
        { text: "Conserva su apariencia por más tiempo", icon: "refresh" },
        { text: "Textura cálida y agradable", icon: "leaf" },
        { text: "Aspecto textil", icon: "layers" },
      ],
      colors: [
        { name: "Marfil", hex: "#EDE6D6" },
        { name: "Beige", hex: "#D8C6AC" },
        { name: "Avellana", hex: "#A9885E" },
        { name: "Plata", hex: "#B9BBBE" },
      ],
      spec: "Chenil · 100% poliéster · Ancho 145 cm · Peso 350 g/m²",
    },
  ],

  compra: [
    { n: "01", title: "Elige la medida", text: "A tu espacio, de 1.70 a 2.00 m." },
    { n: "02", title: "Elige el material", text: "Microfibra Mon o Chenil Milan." },
    { n: "03", title: "Escoge el color", text: "Varias tonalidades disponibles." },
    { n: "04", title: "Indica tu ciudad", text: "Calculamos tu envío." },
    { n: "05", title: "Paga en línea", text: "Rápido y seguro." },
    { n: "06", title: "Recíbelo en casa", text: "Lo llevamos hasta tu sala." },
  ],

  bondades: [
    { img: `${U}/2026/06/imagen1.webp`, n: "01", title: "Diseño", sub: "que permanece vigente." },
    { img: `${U}/2026/06/iamgen2.webp`, n: "02", title: "Confort", sub: "que invita a quedarse." },
    { img: `${U}/2026/06/imagen3.webp`, n: "03", title: "Calidad", sub: "que perdura." },
  ],

  vistas: [
    { img: `${U}/2026/07/5.webp`, label: "Frontal" },
    { img: `${U}/2026/07/1.webp`, label: "Diagonal" },
    { img: `${U}/2026/07/6.webp`, label: "Lateral" },
    { img: `${U}/2026/07/7.webp`, label: "Posterior" },
  ],

  taller: [
    { img: `${U}/2026/06/taller5.webp`, n: "01", title: "Corte", text: "Cada pieza se corta con precisión." },
    { img: `${U}/2026/06/taller2-1.webp`, n: "02", title: "Costura", text: "Costuras reforzadas para durar años." },
    { img: `${U}/2026/06/taller1-1.webp`, n: "03", title: "Esqueletería", text: "Madera estructural cuidadosamente ensamblada." },
    { img: `${U}/2026/06/taller4-1.webp`, n: "04", title: "Ensamble", text: "Cada unión se revisa manualmente." },
    { img: `${U}/2026/06/taller3-1.webp`, n: "05", title: "Tapicería", text: "Acabado artesanal realizado por expertos." },
  ],

  specs: [
    { label: "Largo", value: "170 · 180 · 190 · 200 cm" },
    { label: "Fondo", value: "100 cm" },
    { label: "Altura", value: "90 cm con cojines · 78 cm espaldar sin cojines" },
    { label: "Brazos", value: "Ancho 21 cm · Fondo 96 cm · Alto 62 cm" },
    { label: "Patas", value: "Roble macizo · 20 × 20 cm · alto 5 cm · acabado natural" },
    { label: "Estructura", value: "Pino inmunizado y roble natural · ensambles reforzados" },
    {
      label: "Confort",
      value:
        "Espumas Croydon® + Penta® certificadas · espaldares en fibra siliconada de alta recuperación",
    },
    { label: "Telas", value: "Microfibra Mon (Pet Friendly) y Chenil Milan (Antifluido)" },
    {
      label: "Tecnología",
      value: "Antifluidos AquaFobiak® · +25.000 ciclos Martindale · OEKO-TEX® Standard 100",
    },
    { label: "Colores", value: "Marfil, Beige, Avellana, Plata y Gris" },
    { label: "Garantía", value: "3 años en estructura · 1 año por desajustes" },
    { label: "Envíos", value: "Nacional a ciudades capitales y local: incluido" },
  ],

  whyLafab: [
    "Más de 12 años fabricando",
    "Taller propio",
    "Diseños exclusivos",
    "Garantía estructural",
    "Materiales certificados",
    "Envíos nacionales",
    "Atención postventa",
  ],

  tallerChips: [
    "Taller propio",
    "Fabricación colombiana",
    "Showroom en Itagüí",
    "Garantía escrita",
    "Atención postventa",
  ],

  fichaChips: [
    "Fabricación propia",
    "Garantía 3 años",
    "Envíos nacionales",
    "Pago seguro",
    "100% personalizable",
    "Espuma certificada",
  ],

  garantiaNote:
    "La garantía cubre defectos de fabricación bajo condiciones normales de uso. No cubre mal uso, humedad, exposición prolongada al sol, limpiezas inadecuadas, modificaciones por terceros ni desgaste natural. Tela y espumas: según condiciones del proveedor, gestionadas por LaFab con diagnóstico previo.",

  seals: [
    { t: "IVA incluido", s: "en el precio", icon: "tag" },
    { t: "Garantía", s: "por fabricación", icon: "shieldCheck" },
    { t: "Pago seguro", s: "100% protegido", icon: "lock" },
    { t: "Envío", s: "a domicilio", icon: "truck" },
    { t: "Fabricación propia", s: "taller LaFab", icon: "factory" },
    { t: "Atención postventa", s: "siempre contigo", icon: "headset" },
  ],

  faq: [
    {
      q: "¿Cuánto tarda?",
      a: "Cada Sofá San Diego se fabrica bajo pedido, especialmente para ti. El proceso toma entre 15 y 20 días hábiles: seleccionamos materiales, construimos la estructura y realizamos el tapizado con altos estándares. Te mantenemos informado hasta la entrega.",
    },
    {
      q: "¿Envían a mi ciudad?",
      a: "Sí, enviamos a todo el país. Medellín y área metropolitana: envío incluido. Ciudades capitales: envío incluido. Municipios no capitales pueden tener un costo adicional según ubicación, que te informamos antes de despachar.",
    },
    {
      q: "¿Cómo viene empacado?",
      a: "Cada sofá se envuelve en varias capas de Vinilpex de alta resistencia para proteger el tapizado y, durante el transporte, se cubre con cobijas de protección. Aplica en entregas locales y nacionales.",
    },
    {
      q: "¿La tela es amigable con mascotas?",
      a: "Sí. Microfibra Mon (suave, antifluidos y Pet Friendly) y Chenil Milan (más textura, también antifluidos). Ninguna tela es indestructible: uñas o mordidas pueden generar desgaste, por lo que recomendamos un cuidado adecuado.",
    },
    {
      q: "¿Cómo funciona la garantía?",
      a: "3 años en la estructura y 1 año en desajustes, patas y costuras, siempre que no haya daños por mascotas, accidentes, modificaciones de terceros o uso inadecuado. Telas y espumas se evalúan técnicamente con el proveedor. Recibirás por correo el documento completo de garantía.",
    },
    {
      q: "¿Puedo verlo antes de comprar?",
      a: "Sí. Visítanos en nuestro showroom en Itagüí, Calle 64 #44-74, cerca de la estación Envigado del Metro. Si estás en otra ciudad, agenda una videollamada y te mostramos el producto, las telas y los acabados. Escríbenos al +57 305 460 2395.",
    },
  ],
};
