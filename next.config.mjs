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
    ];
  },
  // Proxy de la fuente propia (morality) para servirla desde nuestro dominio y
  // evitar el bloqueo CORS del servidor de WordPress (no envía Access-Control-Allow-Origin).
  async rewrites() {
    return [
      {
        source: "/fonts/morality.woff2",
        destination:
          "https://lafab.com.co/wp-content/uploads/useanyfont/6316Morality.woff2",
      },
      {
        source: "/fonts/morality.woff",
        destination:
          "https://lafab.com.co/wp-content/uploads/useanyfont/6316Morality.woff",
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
        hostname: "staging.lafab.com.co",
      },
      {
        protocol: "https",
        hostname: "cms.lafab.com.co",
      },
    ],
  },
};

export default nextConfig;
