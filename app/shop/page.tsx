import { Metadata } from "next";
import Link from "next/link";
import { getProducts, type WCProduct } from "@/lib/woocommerce";
import ShopBrowser from "@/components/ShopBrowser";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import PiezasCampana from "@/components/PiezasCampana";
import { PROMO, PROMO_FIN_TEXTO, promoVigente } from "@/lib/promo";
import { UPLOADS } from "@/lib/cms";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Tienda de muebles a la medida",
  description:
    "Explora sofás, comedores, alcobas y poltronas fabricados a la medida por LaFab en Medellín. Filtra por categoría y encuentra tu mueble ideal.",
};

// Si el CMS tropieza durante el build -pasa: es hosting compartido y Vercel le
// dispara muchas peticiones a la vez-, la página se arma vacía en vez de tumbar
// el despliegue entero. A los pocos minutos ISR la vuelve a pedir y se llena.
export default async function ShopPage() {
  const products = await getProducts({ per_page: 100, orderby: "date" }).catch(
    (e) => {
      console.error("[lafab] tienda sin productos en el build:", e);
      return [];
    }
  );

  // La campaña se evalúa aquí, en el servidor, igual que en la portada. La
  // página se revalida cada 5 minutos, así que aparece y desaparece sola.
  const campana = promoVigente();
  const enCampana = campana
    ? PROMO.productos
        .map((slug) => products.find((p) => p.slug === slug))
        .filter((p): p is WCProduct => Boolean(p))
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Tienda"
        title="Muebles que transforman tu espacio"
        subtitle="Cada pieza, diseñada y fabricada a la medida en nuestro taller de Itagüí."
        image={`${UPLOADS}/2026/07/3.webp`}
      />

      {/* La campaña, arriba del catálogo. Son las mismas piezas de la portada:
          quien llega directo a la tienda las ve sin tener que volver al inicio. */}
      {enCampana.length > 0 && (
        <section id="black-friday" className="scroll-mt-24 bg-cream py-14 md:py-16">
          <div className="mx-auto max-w-site px-4 md:px-6">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
                Black Friday
              </p>
              <h2 className="mt-3 font-morality text-3xl font-light text-ink md:text-4xl">
                Para estrenar este año
              </h2>
              <p className="mt-3 max-w-xl text-ink/60">
                Precio de campaña hasta el {PROMO_FIN_TEXTO}. Lo que encargues
                dentro de la campaña lo entregamos antes de que termine el año.
              </p>
            </Reveal>

            <div className="mt-9">
              <PiezasCampana productos={enCampana} />
            </div>

            <Reveal>
              <Link
                href="/#seleccion"
                className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                Ver los {enCampana.length} muebles en campaña
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* Catálogo */}
      <div className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        <ShopBrowser products={products} />
      </div>
    </>
  );
}
