import { Metadata } from "next";
import { CATEGORIES } from "@/lib/categories";
import CategoryPage from "@/components/CategoryPage";
import { getProducts } from "@/lib/woocommerce";

export const revalidate = 300;
const cfg = CATEGORIES.poltronas;

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

// Si el CMS tropieza durante el build —pasa: es hosting compartido y Vercel le
// dispara muchas peticiones a la vez—, la página se arma vacía en vez de tumbar
// el despliegue entero. A los pocos minutos ISR la vuelve a pedir y se llena.
export default async function Page() {
  let products = await getProducts({ category: cfg.catId, per_page: 100 }).catch(
    (e) => {
      console.error("[lafab] categoría sin productos en el build:", cfg.catId, e);
      return [];
    }
  );
  if (cfg.excludeCatId) {
    products = products.filter(
      (p) => !p.categories.some((c) => c.id === cfg.excludeCatId)
    );
  }
  products = products.filter((p) => p.images?.[0]);
  return <CategoryPage cfg={cfg} products={products} />;
}
