import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SPACES, WHATSAPP } from "@/lib/content";
import WpImage from "@/components/WpImage";

export const metadata: Metadata = {
  title: "Espacios",
  description:
    "Explora los muebles a la medida de LaFab por espacio: asientos, dormitorio y comedor. Diseño propio y fabricación en Itagüí.",
};

export default function EspaciosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Espacios"
        title="Un mueble para cada rincón"
        subtitle="Encuentra la pieza perfecta según el espacio que quieres transformar."
      />

      <section className="mx-auto max-w-site px-4 py-14 md:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {SPACES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-2xl"
            >
              <WpImage
                src={s.image}
                alt={s.name}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <h3 className="text-2xl font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm text-white/80">{s.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-gold-light">
                  Ver productos →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-cream p-8 text-center md:p-12">
          <h2 className="text-2xl font-semibold text-ink">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-ink/60">
            Fabricamos a la medida. Cuéntanos qué necesitas y lo diseñamos
            contigo.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Cotizar a la medida
          </a>
        </div>
      </section>
    </>
  );
}
