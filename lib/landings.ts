// Mapa de landings de producto: slug de WooCommerce -> landing propia.
// Al agregar una landing nueva basta con registrarla aquí: el botón en la
// página de producto, el header "inteligente" y el sitemap se actualizan solos.
export type ProductLanding = {
  /** Ruta de la landing (sin slash final). */
  path: string;
  /** Texto del botón que se muestra en la página de producto. */
  cta: string;
};

export const PRODUCT_LANDINGS: Record<string, ProductLanding> = {
  "sofa-san-diego": {
    path: "/san-diego",
    cta: "Vive la experiencia completa del Sofá San Diego",
  },
};

/** Devuelve la landing de un producto, o null si no tiene. */
export const getProductLanding = (slug?: string | null): ProductLanding | null =>
  (slug && PRODUCT_LANDINGS[slug]) || null;

/** Rutas que usan el header de landing (sin el header global). */
export const LANDING_PATHS = Object.values(PRODUCT_LANDINGS).map((l) => l.path);

export const isLandingPath = (path: string) =>
  LANDING_PATHS.some((l) => path === l || path.startsWith(`${l}/`));
