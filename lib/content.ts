// Contenido real de LaFab (reseñas de Google, espacios, FAQ, showroom).
// Centralizado para reutilizar en varias páginas.

export const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola%20LaFab,%20quiero%20cotizar%20un%20mueble";

export const GOOGLE_REVIEW_URL = "https://g.page/r/Ccmjjrs-RurKEB0/review";

export const SHOWROOM = {
  address: "Cl. 64 #44-74, Barrio La Esmeralda",
  city: "Itagüí, Antioquia",
  hours: [
    { day: "Lunes a sábado", time: "10:00 a.m. – 6:30 p.m." },
    { day: "Domingos", time: "10:00 a.m. – 5:00 p.m." },
    { day: "Puentes festivos", time: "Cerrado domingo y lunes" },
  ],
  mapsQuery: "La+Fabrica+de+Muebles+Itagui+Calle+64+44-74",
};

// Reseñas reales de Google, verificadas el 05/10/2026 directamente en el Perfil
// de Empresa (lafabricamedellin@gmail.com): 4.9 ★ sobre 38 opiniones.
// `date` es la fecha de publicación con precisión de mes (YYYY-MM), que es la
// precisión que entrega Google para las reseñas recientes ("hace N semanas").
// Los textos conservan el contenido original; solo se corrigieron tildes y
// puntuación. Si se agregan reseñas nuevas, se toman del mismo perfil.
export type Review = {
  name: string;
  rating: number;
  text: string;
  /** Fecha de publicación en Google (ISO: YYYY-MM o YYYY-MM-DD). */
  date?: string;
};

export const REVIEWS: Review[] = [
  {
    name: "Juan David Rodríguez",
    rating: 5,
    date: "2026-09",
    text:
      "Muy satisfecho por haber escogido a LaFab para la fabricación de los muebles de mi apartamento. Hubo una excelente sinergia entre mis diseños y el acompañamiento de su equipo de diseño para llegar al resultado final. ¡Muchas gracias!",
  },
  {
    name: "María Isabel Castaño Maya",
    rating: 5,
    date: "2026-09",
    text:
      "Los conocí virtualmente y decidí confiar. Desde la atención por redes hasta la entrega todo estuvo perfecto: muy organizados, atentos y cumplidos.",
  },
  {
    name: "Yolanda Botina",
    rating: 5,
    date: "2026-09",
    text:
      "Recibimos nuestro sofá elaborado a la medida: un trabajo impecable, con materiales y diseño de alta calidad. Muy recomendado, agradezco por este bello trabajo.",
  },
  {
    name: "Andrés Rendón Dederle",
    rating: 5,
    date: "2026-09",
    text:
      "Compramos comedor, sala y cama, y debo decir que se ve la calidad de los materiales y la terminación de los productos. Los tiempos de entrega fueron los acordados y quedamos muy satisfechos con la atención.",
  },
  {
    name: "Edgar Zuleta",
    rating: 5,
    date: "2026-08",
    text:
      "Valió la pena esperar la fabricación de mi mueble. Desde que llegué a LaFab la atención fue increíble; probamos varios sofás y logré conseguir el ideal para mi apartamento.",
  },
  {
    name: "Estefanía López Estrada",
    rating: 5,
    date: "2026-08",
    text:
      "El servicio es buenísimo: te mantienen enterado del proceso, súper puntuales con la entrega, los diseños son preciosos y te recomiendan de acuerdo con tus necesidades. ¡Recomendado mil veces y aprobado por mi perrita, que ya lo estrenó!",
  },
  {
    name: "Lucía Vélez",
    rating: 5,
    date: "2026-06",
    text:
      "Quedé muy agradecida, llenaron mi expectativa con mi alcoba. Muy feliz, excelente cumplimiento, acabados sensacionales y excelente servicio. ¡Dios los bendiga!",
  },
  {
    name: "Paulina Pérez Navaz",
    rating: 5,
    date: "2026-05",
    text:
      "Amé mi sala. Súper recomendado, todo gracias a María por su acompañamiento y asesoría. Les doy un 10 en todo, ¡los mejores!",
  },
  {
    name: "María Angélica Vergara Polo",
    rating: 5,
    date: "2026-05",
    text:
      "Excelente calidad del sofá: muy cómodo, elegante y con acabados muy bien elaborados. Quedé muy satisfecha con la compra y con el resultado final.",
  },
  {
    name: "Julián Ramírez",
    rating: 5,
    date: "2026-04",
    text:
      "Mi esposa y yo compramos una mesa y quedamos realmente impresionados. La calidad es excepcional y las sillas son increíblemente cómodas. Se ve que es un producto fino, bien hecho y duradero.",
  },
  {
    name: "Kris O.",
    rating: 5,
    date: "2026-04",
    text:
      "Compré un sofá en LaFab y tuve una experiencia excelente de principio a fin. Carolina fue muy atenta y conocedora: me explicó las dimensiones en detalle y me ayudó a evitar comprar un sofá que no habría encajado en mi espacio. La calidad es excepcional.",
  },
  {
    name: "Eder Durán",
    rating: 5,
    date: "2025-11",
    text:
      "Excelente servicio, siempre muy atentos a las sugerencias; nos mantuvieron al tanto de los tiempos y todo excelente con la instalación. Mandamos a hacer varios muebles y con todos nos fue muy bien.",
  },
];

/** Formatea una fecha ISO de reseña como "mayo de 2026". */
export function reviewDateLabel(iso?: string): string {
  if (!iso) return "";
  const [y, m] = iso.split("-");
  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ];
  const name = months[Number(m) - 1];
  return name ? `${name} de ${y}` : y;
}

export const REVIEWS_SUMMARY = { rating: 4.9, count: 38 };

// Espacios (categorías principales de la tienda)
export const SPACES = [
  {
    name: "Sofás",
    slug: "sofas",
    catId: 102,
    description:
      "Sofás lineales y sofás en L diseñados para tu sala.",
    href: "/sofas",
    image: "https://lafab.com.co/wp-content/uploads/2026/07/3-825x1024.webp",
  },
  {
    name: "Dormitorio",
    slug: "dormitorio",
    catId: 95,
    description: "Camas tapizadas y muebles que hacen de tu alcoba un refugio.",
    href: "/camas",
    image: "https://lafab.com.co/wp-content/uploads/2025/05/VASSUE-1024x768.jpg",
  },
  {
    name: "Comedor",
    slug: "comedor",
    catId: 154,
    description:
      "Mesas de comedor en maderas cálidas para reunir a los tuyos.",
    href: "/comedores",
    image: "https://lafab.com.co/wp-content/uploads/2025/01/WITTEN-1-1024x578.jpg",
  },
];

// Preguntas frecuentes (contenido real)
export const FAQS = [
  {
    q: "¿Los muebles son hechos a la medida?",
    a: "Sí. Diseñamos y fabricamos cada pieza a la medida de tu espacio, con fabricación propia en nuestro taller de Itagüí. Adaptamos dimensiones, telas y acabados a lo que necesitas.",
  },
  {
    q: "¿Cuánto tarda la fabricación y la entrega?",
    a: "Los tiempos dependen del producto y de las especificaciones que elijas. Te confirmamos el plazo exacto al momento de la cotización, y te mantenemos informado durante todo el proceso.",
  },
  {
    q: "¿Cómo funcionan los envíos y cuánto cuestan?",
    a: "En Medellín y su área metropolitana el envío está incluido en el precio. A las demás ciudades capitales del país el envío tiene un costo adicional de $200.000, que se suma al precio del mueble. En municipios que no son capitales el valor puede variar según la ubicación y se informa antes de despachar.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Pago 100% seguro en línea con Bold: tarjetas de crédito y débito o PSE. Si prefieres transferencia bancaria, escríbenos por WhatsApp y la coordinamos. Todos los precios incluyen IVA.",
  },
  {
    q: "¿Los muebles tienen garantía?",
    a: "Sí: 3 años en la estructura y 1 año por desajustes, además de atención postventa. Consulta los detalles en nuestra Póliza de garantía.",
  },
  {
    q: "¿Puedo elegir la tela, el color y las medidas?",
    a: "Claro. Personalizas materiales, acabados, colores y dimensiones para que el mueble se ajuste perfecto a tu espacio y tu estilo.",
  },
  {
    q: "¿Tienen showroom para ver los muebles?",
    a: "Sí, en Itagüí (Cl. 64 #44-74, Barrio La Esmeralda). Puedes agendar tu visita para tocar las telas, probar los muebles y recibir asesoría personalizada.",
  },
  {
    q: "¿Puedo devolver el producto si cambio de opinión?",
    a: "Al tratarse de productos fabricados de forma personalizada, y conforme al artículo 47 de la Ley 1480 de 2011, no aplica el derecho de retracto por cambio de opinión, salvo la garantía legal por defectos de fabricación.",
  },
];
