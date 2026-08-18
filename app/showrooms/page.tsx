import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SHOWROOM, WHATSAPP } from "@/lib/content";

export const metadata: Metadata = {
  title: "Showroom en Itagüí",
  description:
    "Visita el showroom de LaFab en Itagüí: toca las telas, prueba los sofás y recibe asesoría personalizada. Cl. 64 #44-74, Barrio La Esmeralda.",
};

export default function ShowroomsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Showroom"
        title="Visítanos y vive los muebles en persona"
        subtitle="Ven a nuestro showroom en Itagüí: toca las telas, prueba los sofás y recibe asesoría personalizada de nuestro equipo."
      />

      <section className="mx-auto grid max-w-site gap-10 px-4 py-14 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="text-2xl font-semibold text-ink">La Fábrica de Muebles</h2>
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

          <div className="mt-8 flex flex-wrap gap-4">
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
              className="rounded-full border border-ink/15 px-7 py-3 font-semibold text-ink transition-colors hover:bg-cream"
            >
              Cómo llegar
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl">
          <iframe
            title="Ubicación del showroom LaFab en Itagüí"
            src={`https://www.google.com/maps?q=${SHOWROOM.mapsQuery}&output=embed`}
            className="h-full min-h-[360px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}
