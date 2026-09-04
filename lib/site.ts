// Dominios del proyecto, en un solo lugar.
//
// Hoy WordPress vive en el dominio raíz y sirve además todas las imágenes y la
// fuente propia. En el cutover el raíz pasa a Vercel, así que ningún dominio
// puede quedar escrito a mano en el código: todo sale de aquí.
//
// Las tres variables llevan prefijo NEXT_PUBLIC_ porque también se usan en
// componentes de cliente (Header, Footer, Hero).
//
//   NEXT_PUBLIC_SITE_URL       - dónde vive este frontend (canónicas, sitemap, correos).
//   NEXT_PUBLIC_WC_STORE_URL   - backend WooCommerce que consumen las APIs.
//   NEXT_PUBLIC_WP_MEDIA_URL   - de dónde se sirven /wp-content/*. Si no se
//                                define, usa el backend de WooCommerce.

const clean = (url: string) => url.replace(/\/$/, "");

/** URL pública de este frontend. */
export const SITE_URL = clean(process.env.NEXT_PUBLIC_SITE_URL || "https://lafab.com.co");

/** Backend WooCommerce (WordPress). */
export const CMS_URL = clean(
  process.env.NEXT_PUBLIC_WC_STORE_URL || "https://staging.lafab.com.co"
);

/**
 * Host de las imágenes de WordPress. Se separa del CMS a propósito: cuando la
 * biblioteca de medios se mueva a un CDN, se cambia solo esta variable.
 */
export const MEDIA_URL = clean(process.env.NEXT_PUBLIC_WP_MEDIA_URL || CMS_URL);

/** Base de la biblioteca de medios: reemplaza al viejo lafab.com.co/wp-content. */
export const UPLOADS = `${MEDIA_URL}/wp-content/uploads`;

/** Ruta absoluta dentro del sitio. */
export const siteUrl = (path = "") => `${SITE_URL}${path}`;
