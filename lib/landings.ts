// Rutas que usan el header "inteligente" de producto (plantilla de landing).
// Las futuras landings de producto se agregan aquí para reutilizar el diseño.
//
// Ojo: aquí van solo rutas y slugs, sin importar los datos de cada landing.
// Este archivo lo carga el Header, que viaja en todas las páginas, y no tiene
// por qué arrastrar el contenido de las landings.
export const LANDING_PATHS = ["/san-diego", "/latina"];

export const isLandingPath = (path: string) =>
  LANDING_PATHS.some((l) => path === l || path.startsWith(`${l}/`));

// Slug del producto en WooCommerce → ruta de su landing.
export const LANDING_BY_SLUG: Record<string, string> = {
  "sofa-san-diego": "/san-diego",
  "sofa-latina": "/latina",
};

export const landingFor = (slug: string): string | null =>
  LANDING_BY_SLUG[slug] ?? null;
