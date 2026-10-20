// Rutas que usan el header "inteligente" de producto (plantilla de landing).
// Las futuras landings de producto se agregan aquí para reutilizar el diseño.
//
// Ojo: aquí van solo rutas y slugs, sin importar los datos de cada landing.
// Este archivo lo carga el Header, que viaja en todas las páginas, y no tiene
// por qué arrastrar el contenido de las landings.
export const LANDING_PATHS = ["/san-diego", "/latina", "/luton", "/vittorio"];

export const isLandingPath = (path: string) =>
  LANDING_PATHS.some((l) => path === l || path.startsWith(`${l}/`));

// Slug del producto en WooCommerce → ruta de su landing.
export const LANDING_BY_SLUG: Record<string, string> = {
  "sofa-san-diego": "/san-diego",
  "sofa-latina": "/latina",
  // Luton y Vittorio quedan fuera a propósito: sus landings ya existen y los
  // datos son reales, pero todavía tienen una sola foto. Este mapa es el que
  // pone en la ficha de producto el banner "Vive la experiencia completa",
  // así que mandar tráfico allá antes de tener fotos sería un mal negocio.
  // Cuando lleguen, se descomentan estas dos líneas y listo.
  // "sofa-luton": "/luton",
  // "sofa-vittorio": "/vittorio",
};

export const landingFor = (slug: string): string | null =>
  LANDING_BY_SLUG[slug] ?? null;
