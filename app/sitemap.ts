import { MetadataRoute } from "next";
import { getProducts } from "@/lib/woocommerce";
import { ARTICLES } from "@/lib/blog";
import { LANDING_BY_SLUG } from "@/lib/landings";

const SITE = "https://lafab.com.co";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/shop",
    "/sofas",
    "/sofas-lineales",
    "/sofas-en-l",
    "/comedores",
    "/alcobas",
    "/poltronas",
    // Las landings salen del mismo mapa que usa la ficha de producto, así no se
    // vuelve a olvidar ninguna: /luton estuvo fuera del sitemap desde que se
    // publicó.
    ...Object.values(LANDING_BY_SLUG),
    "/espacios",
    "/proyectos",
    "/nosotros",
    "/showrooms",
    "/blog",
    "/preguntas-frecuentes",
    "/contacto",
    "/terminos-y-condiciones",
    "/politica-de-datos",
  ];

  const blogEntries: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

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

  return [...staticEntries, ...blogEntries, ...productEntries];
}
