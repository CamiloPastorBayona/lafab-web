import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Mientras el frontend viva en *.vercel.app va en noindex, igual que el <meta>
// de app/layout.tsx, para no competir con el WordPress vivo. En el cutover se
// pone NEXT_PUBLIC_ALLOW_INDEX=true y este archivo abre el sitio de una vez.
const INDEXABLE = process.env.NEXT_PUBLIC_ALLOW_INDEX === "true";

export default function robots(): MetadataRoute.Robots {
  if (!INDEXABLE) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Enlaces personales que llegan por correo: no deben indexarse.
      disallow: ["/recuperar/", "/api/", "/gracias", "/checkout", "/carrito"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
