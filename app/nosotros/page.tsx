import { Metadata } from "next";
import Image from "next/image";
import PageHeader from "@/components/PageHeader";
import { WHATSAPP } from "@/lib/content";

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

export default function NosotrosPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nosotros"
        title="Fabricamos los muebles que imaginas"
        subtitle="Somos La Fábrica de Muebles: un taller en Itagüí donde el diseño y la fabricación propia se unen para crear piezas hechas a tu medida."
      />

      <section className="mx-auto grid max-w-site items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
          <Image
            src="https://lafab.com.co/wp-content/uploads/2026/07/3.webp"
            alt="Muebles fabricados por LaFab"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
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
