import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { getProducts } from "@/lib/woocommerce";
import { WHATSAPP } from "@/lib/content";
import WpImage from "@/components/WpImage";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Algunos de los muebles a la medida que hemos fabricado en LaFab: sofás, camas, comedores y más, diseñados para espacios reales.",
};

export default async function ProyectosPage() {
  const products = (await getProducts({ per_page: 12, orderby: "date" })).filter(
    (p) => p.images?.[0]
  );

  return (
    <>
      <PageHeader
        eyebrow="Proyectos"
        title="Muebles que ya viven en otros hogares"
        subtitle="Una muestra de las piezas que hemos diseñado y fabricado a la medida."
      />

      <section className="mx-auto max-w-site px-4 py-14 md:px-6">
        <div className="columns-2 gap-4 md:columns-3 md:gap-6 [&>a]:mb-4 md:[&>a]:mb-6">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/producto/${p.slug}`}
              className="group relative block break-inside-avoid overflow-hidden rounded-2xl"
            >
              <WpImage
                src={p.images[0].thumbnail || p.images[0].src}
                srcSet={p.images[0].thumbnail_srcset}
                sizes="(max-width: 768px) 50vw, 33vw"
                alt={p.images[0].alt || p.name}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                <span className="p-5 text-lg font-semibold text-white">
                  {p.name}
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-cream p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold text-ink">
            El próximo proyecto puede ser el tuyo
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-ink/60">
            Cuéntanos qué mueble tienes en mente y lo hacemos realidad.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Empezar mi proyecto
          </a>
        </div>
      </section>
    </>
  );
}
