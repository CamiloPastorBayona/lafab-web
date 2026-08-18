// Contenido real de LaFab (reseñas de Google, espacios, FAQ, showroom).
// Centralizado para reutilizar en varias páginas.

export const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola%20LaFab,%20quiero%20cotizar%20un%20mueble";

export const GOOGLE_REVIEW_URL = "https://g.page/r/Ccmjjrs-RurKEB0/review";

export const SHOWROOM = {
  address: "Cl. 64 #44-74, Barrio La Esmeralda",
  city: "Itagüí, Antioquia",
  hours: [
    { day: "Lunes a Sábado", time: "10:00 a.m. – 6:30 p.m." },
    { day: "Domingos", time: "10:00 a.m. – 5:00 p.m." },
    { day: "Festivos", time: "En puentes festivos no abrimos domingo ni lunes" },
  ],
  mapsQuery: "La+Fabrica+de+Muebles+Itagui+Calle+64+44-74",
};

// Reseñas reales de Google (4.9★ · 29 reseñas)
export const REVIEWS = [
  {
    name: "María Angélica Vergara",
    rating: 5,
    text:
      "Quedé muy agradecida, llenaron mi expectativa con mi alcoba. Muy feliz, excelente cumplimiento, acabados sensacionales y excelente servicio. ¡Dios los bendiga!",
  },
  {
    name: "Lucía Vélez",
    rating: 5,
    text:
      "Amé mi sala. Súper recomendado, todo gracias a María por su acompañamiento y asesoría. Les doy un 10 en todo, ¡los mejores!",
  },
  {
    name: "Paulina Pérez",
    rating: 5,
    text:
      "Excelente servicio, siempre muy atentos a las sugerencias y nos mantuvieron al tanto de los tiempos. Mandamos a hacer varios muebles y con todos nos fue muy bien.",
  },
  {
    name: "Eder Durán",
    rating: 5,
    text:
      "Me encantó el trabajo, me dieron una muy buena asesoría e hicieron realidad lo que tenía en mente. Totalmente recomendados. ¡Muchas gracias!",
  },
  {
    name: "María Estefany Chavarría",
    rating: 5,
    text:
      "Mi esposa y yo compramos una mesa y quedamos realmente impresionados. La calidad es excepcional. Muy recomendados.",
  },
];

export const REVIEWS_SUMMARY = { rating: 4.9, count: 29 };

// Espacios (categorías principales de la tienda)
export const SPACES = [
  {
    name: "Asientos",
    slug: "asientos",
    catId: 102,
    description:
      "Sofás lineales, angulares y poltronas diseñados para tu sala.",
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
    a: "Envíos gratis en Medellín y su área metropolitana. Hacemos despacho a las principales ciudades capitales del país; el costo se confirma según el destino al momento de la compra.",
  },
  {
    q: "¿Qué métodos de pago aceptan?",
    a: "Pago 100% seguro en línea con Bold (tarjetas de crédito/débito y PSE) o por transferencia bancaria. Todos los precios incluyen IVA.",
  },
  {
    q: "¿Los muebles tienen garantía?",
    a: "Sí. Ofrecemos garantía por defectos de fabricación y atención postventa. Consulta los detalles en nuestra Póliza de Garantía.",
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
