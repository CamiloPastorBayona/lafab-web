import { MetadataRoute } from "next";
import { yaLanzamos } from "@/lib/lanzamiento";

// Se evalúa en cada petición: antes de abrir cierra el sitio a los buscadores
// y a la hora del lanzamiento lo abre solo, sin redesplegar.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  if (!yaLanzamos()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://lafab.com.co/sitemap.xml",
    host: "https://lafab.com.co",
  };
}
