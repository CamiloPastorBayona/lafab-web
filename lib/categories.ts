// Configuración de las páginas de categoría (SEO + contenido).
const U = "https://lafab.com.co/wp-content/uploads";

export type CategoryConfig = {
  slug: string;
  catId: number;
  excludeCatId?: number;
  eyebrow: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  image: string;
  intro: string[];
  faq: { q: string; a: string }[];
  subcategories?: { label: string; href: string }[];
};

export const CATEGORIES: Record<string, CategoryConfig> = {
  sofas: {
    slug: "sofas",
    catId: 102, // Asientos (incluye lineales y angulares)
    excludeCatId: 103, // excluye Poltronas
    eyebrow: "Sofás",
    h1: "Sofás a la medida en Medellín",
    metaTitle: "Sofás a la medida en Medellín",
    metaDescription:
      "Sofás a la medida en Medellín: lineales y en L, con telas antifluido y pet friendly. Fabricación propia y envío a todo el país. ¡Cotiza el tuyo!",
    keywords: [
      "sofás a la medida Medellín",
      "sofás en L Medellín",
      "sofás angulares Medellín",
      "sofá pet friendly Medellín",
    ],
    image: `${U}/2026/07/3.webp`,
    intro: [
      "En LaFab diseñamos y fabricamos sofás a la medida en Medellín, con fabricación propia en nuestro taller de Itagüí. Cada sofá se adapta a tu espacio: eliges las medidas, la tela y el color para lograr la comodidad y el estilo que buscas.",
      "Trabajamos sofás lineales y en L (angulares) con telas antifluido y opciones pet friendly, espumas certificadas y estructuras en madera inmunizada para que duren años. El envío está incluido en Medellín y su área metropolitana, y despachamos a las principales ciudades del país.",
    ],
    faq: [
      { q: "¿Puedo elegir la medida del sofá?", a: "Sí. Fabricamos cada sofá a la medida: adaptamos el largo, la profundidad y la configuración a tu sala." },
      { q: "¿Qué telas manejan?", a: "Telas seleccionadas por su resistencia y fácil mantenimiento, con opciones antifluido y pet friendly, ideales para hogares con mascotas." },
      { q: "¿Cuánto tarda la fabricación?", a: "Depende del modelo y las especificaciones; te confirmamos el plazo exacto al momento de la cotización y te mantenemos informado." },
      { q: "¿Hacen envíos?", a: "Sí: envío incluido en Medellín y área metropolitana, y despacho a ciudades capitales del país." },
    ],
    subcategories: [
      { label: "Sofás lineales", href: "/sofas-lineales" },
      { label: "Sofás en L (angulares)", href: "/sofas-en-l" },
    ],
  },

  "sofas-lineales": {
    slug: "sofas-lineales",
    catId: 105, // Sofás Lineales
    eyebrow: "Sofás lineales",
    h1: "Sofás lineales a la medida en Medellín",
    metaTitle: "Sofás lineales a la medida en Medellín",
    metaDescription:
      "Sofás lineales a la medida en Medellín: el clásico que funciona en cualquier sala. Telas antifluido y pet friendly, fabricación propia. ¡Cotiza el tuyo!",
    keywords: [
      "sofás lineales Medellín",
      "sofá lineal a la medida",
      "sofá de 3 puestos Medellín",
    ],
    image: `${U}/2026/07/3.webp`,
    intro: [
      "Fabricamos sofás lineales a la medida en Medellín, ese clásico que le sienta bien a cualquier sala. Un solo cuerpo, líneas limpias y toda la comodidad, con las dimensiones exactas de tu espacio.",
      "Eliges el largo, la tela y el color. Trabajamos telas antifluido y pet friendly, espumas de buena densidad y estructuras en madera para que el sofá dure. Fabricación propia en nuestro taller de Itagüí y envío incluido en Medellín.",
    ],
    faq: [
      { q: "¿De cuántos puestos hacen los sofás lineales?", a: "Los fabricamos a la medida: desde dos puestos hasta el largo que necesites para tu sala." },
      { q: "¿Qué telas puedo elegir?", a: "Telas antifluido y pet friendly, fáciles de limpiar, en varios colores." },
      { q: "¿Cuánto tarda la fabricación?", a: "Depende del modelo; te confirmamos el plazo exacto al cotizar." },
      { q: "¿Incluye envío?", a: "Envío incluido en Medellín y área metropolitana; también despachamos a otras ciudades." },
    ],
    subcategories: [
      { label: "Ver todos los sofás", href: "/sofas" },
      { label: "Sofás en L (angulares)", href: "/sofas-en-l" },
    ],
  },

  "sofas-en-l": {
    slug: "sofas-en-l",
    catId: 118, // Sofás Angulares
    eyebrow: "Sofás en L",
    h1: "Sofás en L (angulares) a la medida en Medellín",
    metaTitle: "Sofás en L y angulares a la medida en Medellín",
    metaDescription:
      "Sofás en L y angulares a la medida en Medellín: aprovechan la esquina y suman puestos. Telas antifluido y pet friendly, fabricación propia. ¡Cotízalo!",
    keywords: [
      "sofás en L Medellín",
      "sofás angulares Medellín",
      "sofá en L a la medida",
    ],
    image: `${U}/2026/07/6.webp`,
    intro: [
      "Fabricamos sofás en L (angulares) a la medida en Medellín, ideales para aprovechar la esquina y sumar puestos sin ocupar de más. Perfectos para familias y para las tardes de película en casa.",
      "Los adaptamos al lado que necesites (izquierdo o derecho) y a las dimensiones de tu sala. Telas antifluido y pet friendly, espumas de calidad y estructura en madera. Fabricación propia en Itagüí y envío incluido en Medellín.",
    ],
    faq: [
      { q: "¿El sofá en L viene con la esquina a la izquierda o a la derecha?", a: "Como quieras: lo fabricamos a la medida con la esquina del lado que mejor se acomode a tu sala." },
      { q: "¿Cuántos puestos tiene un sofá en L?", a: "Depende de la medida que elijas; al ser a la medida, ajustamos el largo de cada lado." },
      { q: "¿Qué telas manejan?", a: "Telas antifluido y pet friendly, resistentes y fáciles de limpiar, en varios tonos." },
      { q: "¿Hacen envíos?", a: "Envío incluido en Medellín y área metropolitana; despacho a ciudades capitales del país." },
    ],
    subcategories: [
      { label: "Ver todos los sofás", href: "/sofas" },
      { label: "Sofás lineales", href: "/sofas-lineales" },
    ],
  },

  comedores: {
    slug: "comedores",
    catId: 154, // Comedor
    eyebrow: "Comedores",
    h1: "Comedores de madera en Medellín",
    metaTitle: "Comedores de madera a la medida en Medellín",
    metaDescription:
      "Comedores de madera a la medida en Medellín: 4, 6 y más puestos, diseño atemporal y fabricación propia. Envío a todo el país. ¡Cotiza el tuyo!",
    keywords: [
      "comedores de madera Medellín",
      "mesa de comedor 6 puestos",
      "comedor a la medida Medellín",
    ],
    image: `${U}/2025/01/WITTEN-1.jpg`,
    intro: [
      "Fabricamos comedores de madera a la medida en Medellín, pensados para reunir a los tuyos alrededor de una buena mesa. Diseño propio, maderas cálidas y acabados impecables que aportan calidez a tu espacio.",
      "Disponibles en distintos puestos (4, 6 y más), con la posibilidad de elegir medidas y color para que combinen perfecto con tu comedor. Fabricación propia en nuestro taller de Itagüí y envío incluido en Medellín y el área metropolitana.",
    ],
    faq: [
      { q: "¿De cuántos puestos fabrican los comedores?", a: "Fabricamos comedores de 4, 6 y más puestos, ajustando la medida a tu espacio." },
      { q: "¿En qué materiales trabajan?", a: "Maderas seleccionadas con acabados de calidad; puedes elegir el color para que combine con tu ambiente." },
      { q: "¿Puedo pedir una medida especial?", a: "Sí, todo se fabrica a la medida. Cuéntanos el espacio disponible y lo adaptamos." },
      { q: "¿Incluye envío?", a: "El envío está incluido en Medellín y área metropolitana; a otras ciudades capitales también despachamos." },
    ],
  },

  camas: {
    slug: "camas",
    catId: 95, // Dormitorio (incluye Camas)
    eyebrow: "Camas",
    h1: "Camas tapizadas a la medida en Medellín",
    metaTitle: "Camas tapizadas a la medida en Medellín",
    metaDescription:
      "Camas tapizadas a la medida en Medellín: matrimonial y king, con estructura en madera y acabados de calidad. Fabricación propia y envío nacional.",
    keywords: [
      "camas tapizadas Medellín",
      "cama matrimonial a la medida",
      "cama king a la medida Medellín",
    ],
    image: `${U}/2025/05/VASSUE.jpg`,
    intro: [
      "Fabricamos camas tapizadas a la medida en Medellín para convertir tu alcoba en un verdadero refugio. Diseño propio, estructura en madera inmunizada y tapizados cómodos y resistentes.",
      "Elige el tamaño (matrimonial, queen o king), la tela y el color. Todo se fabrica en nuestro taller de Itagüí, con envío incluido en Medellín y su área metropolitana y despacho a otras ciudades del país.",
    ],
    faq: [
      { q: "¿Qué tamaños de cama manejan?", a: "Fabricamos camas matrimoniales, queen y king, y adaptamos medidas especiales si lo necesitas." },
      { q: "¿La estructura es resistente?", a: "Sí: estructura en madera de pino inmunizado y ensambles reforzados para larga durabilidad." },
      { q: "¿Puedo elegir la tela y el color?", a: "Claro. Personalizas el tapizado y el color para que combine con tu alcoba." },
      { q: "¿Hacen envíos fuera de Medellín?", a: "Sí, despachamos a las principales ciudades del país; en Medellín y área metropolitana el envío está incluido." },
    ],
  },

  poltronas: {
    slug: "poltronas",
    catId: 103, // Poltronas
    eyebrow: "Poltronas",
    h1: "Poltronas a la medida en Medellín",
    metaTitle: "Poltronas a la medida en Medellín",
    metaDescription:
      "Poltronas a la medida en Medellín: cómodas, elegantes y en la tela que elijas. Fabricación propia en Itagüí y envío a todo el país.",
    keywords: [
      "poltronas Medellín",
      "poltrona a la medida",
      "poltrona decorativa Medellín",
    ],
    image: `${U}/2026/07/2.webp`,
    intro: [
      "Fabricamos poltronas a la medida en Medellín: ese rincón cómodo y con estilo que le hace falta a tu sala o alcoba. Diseño propio y tapizados de calidad, en la tela y el color que prefieras.",
      "Cada poltrona se fabrica en nuestro taller de Itagüí con materiales seleccionados y acabados impecables. Envío incluido en Medellín y el área metropolitana, y despacho a otras ciudades del país.",
    ],
    faq: [
      { q: "¿Puedo elegir la tela de la poltrona?", a: "Sí, personalizas tela y color; tenemos opciones resistentes y fáciles de limpiar." },
      { q: "¿Son cómodas para leer o descansar?", a: "Están diseñadas para el uso diario, con espumas de calidad que ofrecen buen soporte y confort." },
      { q: "¿Se fabrican a la medida?", a: "Todas nuestras piezas son de fabricación propia y a la medida de lo que necesites." },
      { q: "¿Incluyen envío?", a: "El envío está incluido en Medellín y área metropolitana; también despachamos a ciudades capitales." },
    ],
  },
};
