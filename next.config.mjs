// Host del CMS (WordPress). Una sola variable manda: cambiarla en Vercel mueve
// el catálogo, las imágenes y la fuente de marca de host sin tocar código.
const CMS = (
  process.env.NEXT_PUBLIC_WC_STORE_URL || "https://staging.lafab.com.co"
).replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value: "autoplay=(self)",
          },
        ],
      },
      {
        // La fuente propia se sirve por rewrite desde WordPress: sin esta
        // cabecera el navegador la volvía a pedir en cada página.
        source: "/fonts/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  // Proxy de la fuente propia (morality) para servirla desde nuestro dominio y
  // evitar el bloqueo CORS del servidor de WordPress (no envía Access-Control-Allow-Origin).
  async rewrites() {
    return [
      {
        source: "/fonts/morality.woff2",
        destination:
          `${CMS}/wp-content/uploads/useanyfont/6316Morality.woff2`,
      },
      {
        source: "/fonts/morality.woff",
        destination:
          `${CMS}/wp-content/uploads/useanyfont/6316Morality.woff`,
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
      {
        protocol: "https",
        hostname: "lafab.com.co",
      },
      {
        protocol: "https",
        hostname: new URL(CMS).hostname,
      },
      {
        protocol: "https",
        hostname: "cms.lafab.com.co",
      },
    ],
  },
};

export default nextConfig;
