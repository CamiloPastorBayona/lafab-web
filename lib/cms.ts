// Host de WordPress del que salen el catálogo, las imágenes y la fuente de
// marca. Es el mismo origen que sirve la Store API, así que mover el CMS de
// host (hoy staging, mañana cms) es cambiar NEXT_PUBLIC_WC_STORE_URL en Vercel
// y nada más: ni una ruta queda escrita a mano en el código.
export const CMS = (
  process.env.NEXT_PUBLIC_WC_STORE_URL || "https://staging.lafab.com.co"
).replace(/\/$/, "");

export const UPLOADS = `${CMS}/wp-content/uploads`;
