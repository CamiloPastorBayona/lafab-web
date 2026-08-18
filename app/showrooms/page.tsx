import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import WpImage from "@/components/WpImage";
import Ico from "@/components/LandingIcons";
import { SHOWROOM, WHATSAPP } from "@/lib/content";

export const metadata: Metadata = {
  title: "Showroom en Itagüí",
  description:
    "Visita el showroom de LaFab en Itagüí: toca las telas, prueba los sofás y recibe asesoría personalizada. Cl. 64 #44-74, Barrio La Esmeralda.",
};

const BENEFITS = [
  { icon: "layers", t: "Toca las telas", s: "Siente la calidad y textura real antes de decidir." },
  { icon: "sofa", t: "Prueba los muebles", s: "Comodidad real, no una foto: siéntate y compruébalo." },
  { icon: "gem", t: "Diseño a la medida", s: "Vemos contigo medidas, colores y acabados." },
  { icon: "headset", t: "Asesoría experta", s: "Nuestro equipo te acompaña en cada detalle." },
];

export default function ShowroomsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Showroom"
        title="Vive los muebles en persona"
        subtitle="Te esperamos en nuestro showroom de Itagüí, muy cerca de la estación Envigado del Metro."
        image="https://lafab.com.co/wp-content/uploads/2026/07/2.webp"
      />

      {/* Por qué visitarnos */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-20">
        <Reveal>
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-dark">
              La experiencia LaFab
            </p>
            <h2 className="mt-2 text-3xl font-light text-ink md:text-4xl">
              Por qué vale la pena visitarnos
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b, i) => (
            <Reveal key={b.t} delay={i * 110}>
              <div className="h-full rounded-2xl border border-ink/10 p-6 text-center transition-shadow hover:shadow-lg">
                <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-cream text-gold-dark">
                  <Ico name={b.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-light text-ink">{b.t}</h3>
                <p className="mt-1 text-sm text-ink/60">{b.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Info + Mapa */}
      <section className="bg-cream">
        <div className="mx-auto grid max-w-site items-stretch gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
          <Reveal>
            <div className="flex h-full flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-dark">
                Visítanos
              </p>
              <h2 className="mt-2 text-3xl font-light text-ink">
                La Fábrica de Muebles · Itagüí
              </h2>
              <div className="mt-6 space-y-5 text-ink/75">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
                    Dirección
                  </p>
                  <p className="mt-1">
                    {SHOWROOM.address}
                    <br />
                    {SHOWROOM.city}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-gold-dark">
                    Horarios
                  </p>
                  <ul className="mt-1 space-y-1">
                    {SHOWROOM.hours.map((h) => (
                      <li key={h.day}>
                        <span className="font-medium text-ink">{h.day}:</span>{" "}
                        {h.time}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
                >
                  Agendar mi visita
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${SHOWROOM.mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-ink/20 px-7 py-3 font-semibold text-ink transition-colors hover:bg-white"
                >
                  Cómo llegar
                </a>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="h-full min-h-[360px] overflow-hidden rounded-2xl">
              <iframe
                title="Ubicación del showroom LaFab en Itagüí"
                src={`https://www.google.com/maps?q=${SHOWROOM.mapsQuery}&output=embed`}
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA para quienes están lejos */}
      <section className="mx-auto max-w-site px-4 py-16 text-center md:px-6 md:py-20">
        <Reveal>
          <h2 className="text-2xl font-light text-ink md:text-3xl">
            ¿Estás en otra ciudad?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink/60">
            Te atendemos por videollamada: te mostramos el producto, las telas y
            los acabados, y resolvemos todas tus dudas para que compres con total
            tranquilidad.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:scale-105"
          >
            Agendar videollamada
          </a>
        </Reveal>
      </section>
    </>
  );
}
