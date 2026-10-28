// Host del CMS (WordPress). Una sola variable manda: cambiarla en Vercel mueve
// el catálogo, las imágenes y la fuente de marca de host sin tocar código.
const CMS = (
  process.env.NEXT_PUBLIC_WC_STORE_URL || "https://cms.lafab.com.co"
).replace(/\/$/, "");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // La categoría se llamaba "camas" antes de unificar el término en "alcobas".
  // Google todavía tiene indexadas las URLs del sitio anterior de WordPress.
  // Sin estas reglas, quien llegue desde una búsqueda cae en un 404 y se pierde
  // el posicionamiento que ya teníamos. Comprobadas una por una contra lo que
  // hay hoy en el índice de Google (site:lafab.com.co).
  async redirects() {
    const alcobas = [
      ["cama-tapizada-aba", "alcoba-abba"],
      ["cama-tapizada-atenea", "alcoba-atenea"],
      ["cama-tapizada-barbados", "alcoba-barbados"],
      ["cama-de-madera-kenia", "alcoba-kenia"],
      ["cama-de-madera-luau", "alcoba-luau"],
      ["cama-mixta-lucca-2", "alcoba-lucca"],
      ["cama-de-madera-santa-rosa", "alcoba-santa-rosa"],
      ["cama-de-madera-varsovia", "alcoba-varsovia"],
    ].map(([viejo, nuevo]) => ({
      source: `/producto/${viejo}`,
      destination: `/producto/${nuevo}`,
      permanent: true,
    }));

    return [
      { source: "/camas", destination: "/alcobas", permanent: true },

      // Fichas de alcoba que antes se llamaban "cama".
      ...alcobas,
      // Red de seguridad para las que no alcanzamos a ver en el índice.
      { source: "/producto/cama-de-madera-:resto", destination: "/producto/alcoba-:resto", permanent: true },
      { source: "/producto/cama-tapizada-:resto", destination: "/producto/alcoba-:resto", permanent: true },
      { source: "/producto/cama-mixta-:resto", destination: "/producto/alcoba-:resto", permanent: true },

      // Secciones del sitio anterior que ya no existen con ese nombre.
      { source: "/escribenos", destination: "/contacto", permanent: true },
      { source: "/itagui", destination: "/showrooms", permanent: true },
      { source: "/descubre", destination: "/", permanent: true },
      { source: "/tienda", destination: "/shop", permanent: true },
      { source: "/productos", destination: "/shop", permanent: true },
      { source: "/finalizar-compra", destination: "/checkout", permanent: true },
      { source: "/mi-cuenta", destination: "/shop", permanent: true },

      // Closets y cocinas eran líneas del sitio viejo. Hoy lo más cercano que
      // tenemos es la galería de proyectos, donde sí hay cocina y vestidor.
      { source: "/closets", destination: "/proyectos", permanent: true },
      { source: "/cocinas", destination: "/proyectos", permanent: true },
    ];
  },

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
