import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { getProducts } from "@/lib/woocommerce";
import { WHATSAPP } from "@/lib/content";
import WpImage from "@/components/WpImage";
import Ico from "@/components/LandingIcons";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Muebles a la medida que hemos diseñado y fabricado en LaFab: sofás, camas, comedores y más, pensados para espacios reales.",
};

const HIGHLIGHTS = [
  { icon: "gem", t: "Diseño personalizado", s: "Cada pieza se piensa para un espacio y un cliente." },
  { icon: "factory", t: "Fabricación propia", s: "Del corte a la tapicería, todo en nuestro taller." },
  { icon: "truck", t: "Entrega e instalación", s: "Llevamos e instalamos tu mueble donde lo necesites." },
];

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
        image="https://lafab.com.co/wp-content/uploads/2026/07/4.webp"
      />

      {/* Intro con propósito */}
      <section className="mx-auto max-w-site px-4 pt-14 md:px-6 md:pt-20">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-dark">
              Hecho a la medida
            </p>
            <h2 className="mt-2 text-3xl font-light text-ink md:text-4xl">
              Cada proyecto empieza con una idea
            </h2>
            <p className="mt-3 text-ink/70">
              No vendemos catálogo en serie: escuchamos, diseñamos y fabricamos
              piezas únicas para espacios reales. Estos son algunos de los
              muebles que hoy viven en las casas de nuestros clientes.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.t} delay={i * 110}>
              <div className="flex items-start gap-3 rounded-2xl border border-ink/10 p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-gold-dark">
                  <Ico name={h.icon} className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-light text-ink">{h.t}</h3>
                  <p className="mt-0.5 text-sm text-ink/60">{h.s}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Galería */}
      <section className="mx-auto max-w-site px-4 py-14 md:px-6 md:py-20">
        <div className="columns-2 gap-4 md:columns-3 md:gap-6 [&>div]:mb-4 md:[&>div]:mb-6">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 80}>
              <Link
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
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/75 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="p-5 text-lg font-light text-white">
                    {p.name}
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 rounded-3xl bg-ink p-8 text-center md:p-14">
            <h2 className="text-2xl font-light text-white md:text-3xl">
              El próximo proyecto puede ser el tuyo
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/60">
              Cuéntanos qué mueble tienes en mente y lo hacemos realidad, del
              boceto a tu sala.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Empezar mi proyecto
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
