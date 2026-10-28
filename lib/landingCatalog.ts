// Trae del CMS las variaciones del producto que protagoniza una landing, para
// que el configurador ofrezca los materiales, colores, medidas y precios reales
// en vez de una lista escrita a mano.

import { getProductBySlug, getVariations } from "@/lib/woocommerce";
import type { LandingCatalog } from "@/components/LandingCatalogContext";

export async function getLandingCatalog(
  slug: string
): Promise<LandingCatalog | null> {
  try {
    const product = await getProductBySlug(slug);
    if (!product) return null;
    const variations = await getVariations(product);
    if (!variations.length) return null;
    return { variations, productImage: product.images?.[0]?.src ?? "" };
  } catch (e) {
    // Si el CMS falla, la landing se muestra igual con su contenido estático.
    console.error("[lafab] catálogo de la landing", slug, e);
    return null;
  }
}
