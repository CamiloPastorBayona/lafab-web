import { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tienda de muebles a la medida",
  description:
    "Explora sofás, comedores, camas y closets fabricados a la medida por LaFab en Medellín. Envío a todo el país.",
};

export default async function ShopPage() {
  const products = await getProducts({ per_page: 48, orderby: "date" });

  return (
    <div className="mx-auto max-w-site px-4 py-14 md:px-6">
      <header className="mb-10">
        <p className="text-sm font-medium uppercase tracking-wide text-gold-dark">
          Tienda
        </p>
        <h1 className="mt-1 text-3xl font-semibold text-ink md:text-4xl">
          Todos nuestros muebles
        </h1>
      </header>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-ink/50">No hay productos disponibles.</p>
      )}
    </div>
  );
}
