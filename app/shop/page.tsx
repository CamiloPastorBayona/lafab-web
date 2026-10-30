import { Metadata } from "next";
import { getProducts } from "@/lib/woocommerce";
import ShopBrowser from "@/components/ShopBrowser";
import PageHeader from "@/components/PageHeader";
import { UPLOADS } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tienda de muebles a la medida",
  description:
    "Explora sofás, comedores, alcobas y poltronas fabricados a la medida por LaFab en Medellín. Filtra por categoría y encuentra tu mueble ideal.",
};

// Si el CMS tropieza durante el build —pasa: es hosting compartido y Vercel le
// dispara muchas peticiones a la vez—, la página se arma vacía en vez de tumbar
// el despliegue entero. A los pocos minutos ISR la vuelve a pedir y se llena.
export default async function ShopPage() {
  const products = await getProducts({ per_page: 100, orderby: "date" }).catch(
    (e) => {
      console.error("[lafab] tienda sin productos en el build:", e);
      return [];
    }
  );

  return (
    <>
      <PageHeader
        eyebrow="Tienda"
        title="Muebles que transforman tu espacio"
        subtitle="Cada pieza, diseñada y fabricada a la medida en nuestro taller de Itagüí."
        image={`${UPLOADS}/2026/07/3.webp`}
      />

      {/* Catálogo */}
      <div className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        <ShopBrowser products={products} />
      </div>
    </>
  );
}
