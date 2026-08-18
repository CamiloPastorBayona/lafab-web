import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { FAQS, WHATSAPP } from "@/lib/content";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Resolvemos tus dudas sobre muebles a la medida, tiempos de fabricación, envíos, pagos, garantía y personalización en LaFab.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ayuda"
        title="Preguntas frecuentes"
        subtitle="Todo lo que necesitas saber antes de encargar tu mueble a la medida."
        image="https://lafab.com.co/wp-content/uploads/2026/06/sofa3.webp"
      />

      <section className="mx-auto max-w-3xl px-4 py-14 md:px-6">
        <div className="divide-y divide-ink/10">
          {FAQS.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium text-ink">
                {item.q}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-xl leading-none text-gold-dark transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink/70">{item.a}</p>
            </details>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-cream p-8 text-center">
          <h2 className="text-xl font-semibold text-ink">
            ¿Te quedó otra duda?
          </h2>
          <p className="mt-2 text-ink/60">
            Escríbenos por WhatsApp y con gusto te asesoramos.
          </p>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Hablar con un asesor
          </a>
        </div>
      </section>
    </>
  );
}
