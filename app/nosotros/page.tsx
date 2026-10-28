import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { WHATSAPP } from "@/lib/content";
import WpImage from "@/components/WpImage";
import Reveal from "@/components/Reveal";
import { UPLOADS } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "En LaFab diseñamos y fabricamos muebles a la medida con fabricación propia en Itagüí. Conoce nuestra historia, nuestro taller y nuestra forma de trabajar.",
};

// Las caras del taller. Nueve fotos reales de los muchachos trabajando, las
// mismas que sostienen la sección "Nuestro proceso" de la landing del San
// Diego. Se muestran en mosaico: tres piezas altas marcan el ritmo y el resto
// acompaña, para que la sección respire en vez de verse como una grilla.
const EQUIPO = [
  { src: "2026/06/taller1.webp", alt: "Corte de la madera en el taller de LaFab", alto: true },
  { src: "2026/06/taller2.webp", alt: "Costura de un tapizado en el taller de LaFab" },
  { src: "2026/06/taller3.webp", alt: "Ensamble de la esqueletería en madera" },
  { src: "2026/06/taller4-1.webp", alt: "Revisión manual de cada unión", alto: true },
  { src: "2026/06/taller5.webp", alt: "Acabado artesanal de la tapicería" },
  { src: "2026/06/taller1-1.webp", alt: "Preparación de las piezas antes del ensamble" },
  { src: "2026/06/taller2-1.webp", alt: "Detalle de una costura reforzada", alto: true },
  { src: "2026/06/taller3-1.webp", alt: "Trabajo de carpintería en el taller" },
  { src: "2026/06/taller4.webp", alt: "Control de calidad pieza por pieza" },
];

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
        subtitle="Somos La Fábrica de Muebles: un taller en Itagüí donde el diseño y la fabricación propia se unen para crear piezas hechas a la medida."
        image={`${UPLOADS}/2026/06/taller1-1.webp`}
      />

      <section className="mx-auto grid max-w-site items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <Reveal>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <WpImage
              src={`${UPLOADS}/2026/07/3-1000x1242.webp`}
              alt="Muebles fabricados por LaFab"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="text-3xl font-light text-ink">
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
        </Reveal>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-site px-4 py-16 md:px-6">
          <div className="grid gap-6 md:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 90}>
                <div className="h-full rounded-2xl bg-white p-6">
                  <h3 className="text-lg font-light text-ink">{v.title}</h3>
                  <p className="mt-2 text-sm text-ink/70">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Las caras del taller */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-gold-dark">
            Quiénes lo hacen
          </p>
          <h2 className="mt-1 max-w-2xl text-3xl font-light text-ink md:text-4xl">
            Detrás de cada mueble hay un equipo que lo arma a mano
          </h2>
          <p className="mt-4 max-w-2xl text-ink/70">
            No tercerizamos. Cortamos, cosemos, ensamblamos y tapizamos en
            nuestro taller de Itagüí, con gente que lleva años haciéndolo. Estas
            son algunas de esas manos.
          </p>
        </Reveal>

        <div className="mt-10 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {EQUIPO.map((f, i) => (
            <Reveal key={f.src} delay={(i % 3) * 90}>
              <figure
                className={`group relative overflow-hidden rounded-2xl bg-cream ${
                  f.alto ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <WpImage
                  src={`${UPLOADS}/${f.src}`}
                  alt={f.alt}
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-20">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-wide text-gold-dark">
            Nuestro proceso
          </p>
          <h2 className="mt-1 text-3xl font-light text-ink md:text-4xl">
            Del corte al acabado final
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESO.map((p, i) => (
            <Reveal key={p.title} delay={(i % 4) * 90}>
              <div className="h-full rounded-2xl border border-ink/10 p-6">
                <span className="text-2xl font-light text-gold">0{i + 1}</span>
                <h3 className="mt-2 text-lg font-light text-ink">{p.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{p.text}</p>
              </div>
            </Reveal>
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
          <Reveal>
            <h2 className="text-3xl font-light text-white">
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
