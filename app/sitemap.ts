import { MetadataRoute } from "next";
import { getProducts } from "@/lib/woocommerce";
import { ARTICLES } from "@/lib/blog";
import { LANDING_PATHS } from "@/lib/landings";
import { SITE_URL } from "@/lib/site";

const SITE = SITE_URL;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    "",
    "/shop",
    "/sofas",
    "/sofas-lineales",
    "/sofas-en-l",
    "/comedores",
    "/camas",
    "/poltronas",
    "/espacios",
    "/proyectos",
    "/nosotros",
    "/showrooms",
    "/blog",
    "/preguntas-frecuentes",
    "/contacto",
    "/terminos-y-condiciones",
    "/politica-de-datos",
    ...LANDING_PATHS,
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
