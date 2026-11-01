// Host de WordPress del que salen el catálogo, las imágenes y la fuente de
// marca. Es el mismo origen que sirve la Store API, así que mover el CMS de
// host (hoy staging, mañana cms) es cambiar NEXT_PUBLIC_WC_STORE_URL en Vercel
// y nada más: ni una ruta queda escrita a mano en el código.
export const CMS = (
  process.env.NEXT_PUBLIC_WC_STORE_URL || "https://cms.lafab.com.co"
).replace(/\/$/, "");

export const UPLOADS = `${CMS}/wp-content/uploads`;

// Imagen que se usa al compartir cuando la página no tiene una propia. Vive
// aquí para que las rutas que declaran su propio openGraph puedan reponerla:
// en Next un openGraph propio REEMPLAZA al del layout, no se fusiona, así que
// declarar solo el título deja la página sin foto al pegarla en un chat.
export const OG_IMAGE = `${UPLOADS}/2026/10/lafab-muebles-a-la-medida-medellin-og.jpg`;
