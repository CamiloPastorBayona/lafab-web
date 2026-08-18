import { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce";
import ShopBrowser from "@/components/ShopBrowser";
import PageHeader from "@/components/PageHeader";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tienda de muebles a la medida",
  description:
    "Explora sofás, comedores, camas y closets fabricados a la medida por LaFab en Medellín. Filtra por categoría y encuentra tu mueble ideal.",
};

export default async function ShopPage() {
  const products = await getProducts({ per_page: 100, orderby: "date" });

  return (
    <>
      <PageHeader
        eyebrow="Tienda"
        title="Muebles que transforman tu espacio"
        subtitle="Cada pieza, diseñada y fabricada a la medida en nuestro taller de Itagüí."
        image="https://lafab.com.co/wp-content/uploads/2026/07/3.webp"
      />

      {/* Catálogo */}
      <div className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        <ShopBrowser products={products} />
      </div>
    </>
  );
}
