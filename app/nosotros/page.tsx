import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { WHATSAPP } from "@/lib/content";
import WpImage from "@/components/WpImage";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "En LaFab diseñamos y fabricamos muebles a la medida con fabricación propia en Itagüí. Conoce nuestra historia, nuestro taller y nuestra forma de trabajar.",
};

const VALUES = [
  {
    title: "Fabricación propia",
    text: "Todo se hace en nuestro taller de Itagüí. Controlamos cada etapa, de la madera al acabado final.",
  },
  {
    title: "Diseño a la medida",
    text: "Adaptamos dimensiones, telas y acabados a tu espacio y tu estilo. Ningún mueble es igual a otro.",
  },
  {
    title: "Materiales de calidad",
    text: "Maderas inmunizadas, espumas de densidad y telas resistentes para que tu mueble dure años.",
  },
  {
    title: "Acompañamiento",
    text: "Te asesoramos antes, durante y después de la compra, con garantía por defectos de fabricación.",
  },
];

const PROCESO = [
  { title: "Corte", text: "Telas y piezas cortadas a medida, con precisión." },
  {
    title: "Costura",
    text: "Puntada a puntada, costuras reforzadas para el uso diario.",
  },
  {
    title: "Esqueletería",
    text: "Construimos el esqueleto en madera: la base firme y duradera.",
  },
  {
    title: "Ensamble",
    text: "Ensamble y refuerzo de la estructura antes del tapizado.",
  },
];

const WHY = [
  "Más de 12 años fabricando",
  "Taller propio en Itagüí",
  "Diseños exclusivos",
  "Garantía estructural",
  "Materiales certificados",
  "Envíos nacionales",
  "Atención postventa",
];

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="Fabricamos los muebles que imaginas"
        subtitle="Somos La Fábrica de Muebles: un taller en Itagüí donde el diseño y la fabricación propia se unen para crear piezas hechas a tu medida."
        image="https://lafab.com.co/wp-content/uploads/2026/06/taller1-1.webp"
      />

      <section className="mx-auto grid max-w-site items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <WpImage
            src="https://lafab.com.co/wp-content/uploads/2026/07/3-1000x1242.webp"
            alt="Muebles fabricados por LaFab"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-semibold text-ink">
            Del taller a tu hogar
          </h2>
          <p className="mt-4 text-ink/70">
            Cada mueble nace de una conversación. Escuchamos lo que necesitas,
            lo diseñamos contigo y lo fabricamos en nuestro taller con
            materiales que aguantan el uso diario. Así logramos piezas cómodas,
            resistentes y con acabados impecables, pensadas para tu espacio.
          </p>
          <p className="mt-4 text-ink/70">
            No revendemos: fabricamos. Eso nos permite cuidar la calidad de
            principio a fin y ofrecerte precios justos por muebles hechos a la
            medida.
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-site px-4 py-16 md:px-6">
          <div className="grid gap-6 md:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6">
                <h3 className="text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-gold-dark">
          Nuestro proceso
        </p>
        <h2 className="mt-1 text-3xl font-semibold text-ink md:text-4xl">
          Del corte al acabado final
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((p, i) => (
            <div key={p.title} className="rounded-2xl border border-ink/10 p-6">
              <span className="text-2xl font-bold text-gold">
                0{i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-1 text-sm text-ink/60">{p.text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {WHY.map((w) => (
            <span
              key={w}
              className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink/70"
            >
              {w}
            </span>
          ))}
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-site px-4 py-16 text-center md:px-6 md:py-20">
          <h2 className="text-3xl font-semibold text-white">
            Diseñemos tu mueble juntos
          </h2>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:scale-105"
          >
            Escríbenos por WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
