import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import WpImage from "@/components/WpImage";
import { SPACES, WHATSAPP } from "@/lib/content";
import { getProducts, WCProduct } from "@/lib/woocommerce";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Compra por espacios",
  description:
    "Explora los muebles a la medida de LaFab por espacio: sala, dormitorio y comedor. Diseño propio y fabricación en Itagüí.",
};

export default async function EspaciosPage() {
  const spaces = await Promise.all(
    SPACES.map(async (s) => ({
      ...s,
      products: (await getProducts({ category: s.catId, per_page: 4 })).filter(
        (p) => p.images?.[0]
      ) as WCProduct[],
    }))
  );

  return (
    <>
      <PageHeader
        eyebrow="Compra por espacios"
        title="Un mueble para cada rincón"
        subtitle="Encuentra la pieza perfecta según el espacio que quieres transformar. Diseño propio, fabricación a la medida."
        image="https://lafab.com.co/wp-content/uploads/2026/07/1.webp"
      />

      <div className="mx-auto max-w-site px-4 py-14 md:px-6 md:py-20">
        {spaces.map((s, i) => (
          <section key={s.slug} className={i > 0 ? "mt-20" : ""}>
            <Reveal>
              <div className="grid items-center gap-6 md:grid-cols-2 md:gap-10">
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-2xl ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <WpImage
                    src={s.image}
                    alt={s.name}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-dark">
                    Espacio {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 text-3xl font-light text-ink md:text-4xl">
                    {s.name}
                  </h2>
                  <p className="mt-3 max-w-md text-ink/70">{s.description}</p>
                  <Link
                    href={s.href}
                    className="mt-6 inline-block rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                  >
                    Ver todo en {s.name}
                  </Link>
                </div>
              </div>
            </Reveal>

            {s.products.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                {s.products.map((p, j) => (
                  <Reveal key={p.id} delay={(j % 4) * 90}>
                    <ProductCard product={p} />
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        ))}

        <Reveal>
          <div className="mt-20 rounded-3xl bg-cream p-8 text-center md:p-14">
            <h2 className="text-2xl font-light text-ink md:text-3xl">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-ink/60">
              Fabricamos a la medida. Cuéntanos qué necesitas y lo diseñamos
              contigo, del boceto al mueble terminado.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-ink px-8 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              Cotizar a la medida
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
