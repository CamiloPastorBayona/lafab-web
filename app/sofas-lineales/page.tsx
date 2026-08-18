import { Metadata } from "next";
import { CATEGORIES } from "@/lib/categories";
import CategoryPage from "@/components/CategoryPage";
import { getProducts } from "@/lib/woocommerce";

export const revalidate = 300;
const cfg = CATEGORIES["sofas-lineales"];

export const metadata: Metadata = {
  title: cfg.metaTitle,
  description: cfg.metaDescription,
  keywords: cfg.keywords,
  alternates: { canonical: `/${cfg.slug}` },
  openGraph: {
    title: `${cfg.metaTitle} | LaFab`,
    description: cfg.metaDescription,
    images: [cfg.image],
    type: "website",
    locale: "es_CO",
  },
};

export default async function Page() {
  let products = await getProducts({ category: cfg.catId, per_page: 100 });
  if (cfg.excludeCatId) {
    products = products.filter(
      (p) => !p.categories.some((c) => c.id === cfg.excludeCatId)
    );
  }
  products = products.filter((p) => p.images?.[0]);
  return <CategoryPage cfg={cfg} products={products} />;
}
