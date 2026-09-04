/** @type {import('next').NextConfig} */

// Los dominios no se escriben a mano en ningún lado: aquí se leen del entorno,
// igual que en lib/site.ts (este archivo es .mjs y no puede importar el .ts).
const clean = (u) => (u || "").replace(/\/$/, "");
const CMS_URL = clean(process.env.NEXT_PUBLIC_WC_STORE_URL) || "https://staging.lafab.com.co";
const MEDIA_URL = clean(process.env.NEXT_PUBLIC_WP_MEDIA_URL) || CMS_URL;

const mediaHost = new URL(MEDIA_URL).hostname;
const cmsHost = new URL(CMS_URL).hostname;

// URLs del WordPress viejo → rutas del frontend nuevo. Salieron del sitemap de
// Rank Math del sitio vivo (85 URLs), no de suposiciones. Sin esto, el día del
// cutover cada enlace indexado en Google cae en un 404.
const LEGACY_REDIRECTS = [
  // Comercio
  ["/cart", "/carrito"],
  ["/finalizar-compra", "/checkout"],
  // Contenido
  ["/escribenos", "/contacto"],
  ["/politica-de-tratamiento-y-proteccion-de-datos-personales", "/politica-de-datos"],
  ["/poliza-de-garantia", "/terminos-y-condiciones"],
  ["/landing-san-diego", "/san-diego"],
  ["/landing-page", "/"],
  ["/proximamente", "/"],
  ["/descubre", "/shop"],
  ["/itagui", "/showrooms"],
  // Páginas de servicio que hoy no tienen equivalente propio: van a Espacios,
  // que es la sección que cuenta ese trabajo a la medida.
  ["/intervencion-de-espacios-exclusivos", "/espacios"],
  ["/lo-que-ofrecemos", "/espacios"],
  ["/muebles-de-bano", "/espacios"],
  ["/closets", "/espacios"],
  ["/cocinas", "/espacios"],
  ["/muebles-de-tv", "/espacios"],
  ["/sofas-modulares", "/sofas"],
];

const nextConfig = {
  // Las plantillas de correo se leen con fs en tiempo de ejecución; sin esto
  // Vercel no las empaqueta en la función y el cron falla con ENOENT.
  outputFileTracingIncludes: {
    "/api/cron/emails": ["./emails/**"],
    "/api/webhooks/woocommerce": ["./emails/**"],
    "/api/emails/send": ["./emails/**"],
    "/api/dev/email-preview": ["./emails/**"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [{ key: "Permissions-Policy", value: "autoplay=(self)" }],
      },
    ];
  },

  async redirects() {
    return [
      // statusCode 301 en vez de permanent:true (que emite 308). Google trata
      // ambos igual, pero 301 es lo que esperan Search Console y las auditorías.
      ...LEGACY_REDIRECTS.map(([source, destination]) => ({
        source,
        destination,
        statusCode: 301,
      })),
      // Los 9 proyectos del portafolio viejo no tienen página propia todavía.
      { source: "/proyecto/:slug", destination: "/proyectos", statusCode: 301 },
      // Archivos de categoría de WooCommerce.
      { source: "/categoria-producto/:slug*", destination: "/shop", statusCode: 301 },
      { source: "/product-category/:slug*", destination: "/shop", statusCode: 301 },
      // Restos del constructor de páginas y de los feeds de WordPress.
      { source: "/elementskit-content/:path*", destination: "/", statusCode: 301 },
      { source: "/feed", destination: "/", statusCode: 301 },
      { source: "/comment-feed", destination: "/", statusCode: 301 },
      // Tras el cutover el administrador de WordPress vive en otro host.
      { source: "/wp-admin/:path*", destination: `${CMS_URL}/wp-admin/:path*`, permanent: false },
      { source: "/wp-login.php", destination: `${CMS_URL}/wp-login.php`, permanent: false },
    ];
  },

  async rewrites() {
    return [
      // Proxy de la fuente propia (morality) para servirla desde nuestro dominio
      // y evitar el bloqueo CORS de WordPress (no envía Access-Control-Allow-Origin).
      {
        source: "/fonts/morality.woff2",
        destination: `${MEDIA_URL}/wp-content/uploads/useanyfont/6316Morality.woff2`,
      },
      {
        source: "/fonts/morality.woff",
        destination: `${MEDIA_URL}/wp-content/uploads/useanyfont/6316Morality.woff`,
      },
      // Red de seguridad del cutover: los correos ya enviados y los enlaces
      // viejos apuntan a lafab.com.co/wp-content/*. Cuando ese dominio sea
      // Vercel, esta regla los reenvía al WordPress en su host nuevo en vez de
      // devolver 404. El código nuevo ya no la necesita: usa MEDIA_URL directo.
      {
        source: "/wp-content/:path*",
        destination: `${MEDIA_URL}/wp-content/:path*`,
      },
    ];
  },

  images: {
    // El host (LiteSpeed) corta la conexión del optimizador de Next (ECONNRESET),
    // así que servimos las imágenes directo desde WordPress (ya vienen en .webp y
    // redimensionadas). Cuando movamos las imágenes a un CDN podremos reactivar
    // la optimización quitando esta línea.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: mediaHost },
      { protocol: "https", hostname: cmsHost },
      { protocol: "https", hostname: "lafab.com.co" },
      { protocol: "https", hostname: "staging.lafab.com.co" },
      { protocol: "https", hostname: "cms.lafab.com.co" },
    ],
  },
};

export default nextConfig;
