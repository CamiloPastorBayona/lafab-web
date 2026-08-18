import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import WpImage from "@/components/WpImage";
import { ARTICLES } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Consejos sobre muebles a la medida: cómo elegir un sofá, telas pet friendly, medidas de comedor y más. Blog de LaFab, fábrica de muebles en Medellín.",
  alternates: { canonical: "/blog" },
};

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="Consejos para amueblar tu hogar"
        subtitle="Guías prácticas sobre sofás, telas, comedores y todo lo que necesitas saber antes de comprar un mueble a la medida."
        image="https://lafab.com.co/wp-content/uploads/2026/07/4.webp"
      />

      <div className="mx-auto max-w-site px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {ARTICLES.map((a, i) => (
            <Reveal key={a.slug} delay={(i % 3) * 100}>
              <Link
                href={`/blog/${a.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl bg-cream transition-shadow hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <WpImage
                    src={a.image}
                    alt={a.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs uppercase tracking-wide text-gold-dark">
                    {fmtDate(a.date)} · {a.readingMinutes} min
                  </p>
                  <h2 className="mt-2 text-xl font-light text-ink group-hover:text-gold-dark">
                    {a.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-ink/60">{a.excerpt}</p>
                  <span className="mt-4 text-sm font-semibold text-gold-dark">
                    Leer más →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </>
  );
}
