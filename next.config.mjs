// Host del CMS (WordPress). Una sola variable manda: cambiarla en Vercel mueve
// el catálogo, las imágenes y la fuente de marca de host sin tocar código.
const CMS = (
  process.env.NEXT_PUBLIC_WC_STORE_URL || "https://cms.lafab.com.co"
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
        // La fuente propia vive en public/fonts: con esta cabecera el navegador
        // no la vuelve a pedir en cada página.
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
  // La fuente de marca se sirve desde public/fonts: es del front, no del CMS.
  // Antes venía por rewrite desde WordPress y eso ataba la tipografía de todo
  // el sitio a un plugin (Use Any Font) y a que ese host siguiera en pie.
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
