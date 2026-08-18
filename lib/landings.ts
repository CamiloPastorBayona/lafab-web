// Rutas que usan el header "inteligente" de producto (plantilla de landing).
// Las futuras landings de producto se agregan aquí para reutilizar el diseño.
export const LANDING_PATHS = ["/san-diego"];

export const isLandingPath = (path: string) =>
  LANDING_PATHS.some((l) => path === l || path.startsWith(`${l}/`));
