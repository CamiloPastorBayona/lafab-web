import { MetadataRoute } from "next";
import { getProducts } from "@/lib/woocommerce";

const SITE = "https://lafab.com.co";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/shop",
    "/sofas",
    "/comedores",
    "/camas",
    "/poltronas",
    "/san-diego",
    "/espacios",
    "/proyectos",
    "/nosotros",
    "/showrooms",
    "/preguntas-frecuentes",
    "/contacto",
    "/terminos-y-condiciones",
    "/politica-de-datos",
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts({ per_page: 100 });
  } catch {
    /* si el backend no responde, devolvemos al menos las páginas estáticas */
  }

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/producto/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticEntries, ...productEntries];
}
