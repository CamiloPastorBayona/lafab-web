// Toda la campaña de Black Friday, para montarla en la portada.
//
// Vivía en /black-friday, una página aparte. Se trajo aquí porque el banner
// alto funciona mejor como portada del sitio que como cabecera de una página
// secundaria, y porque partir la campaña en dos sitios obligaba a elegir a
// quién mandar a cuál.

import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import PiezasCampana from "@/components/PiezasCampana";
import TrustStrip from "@/components/TrustStrip";
import { jsonLd } from "@/components/RatingJsonLd";
import { type WCProduct } from "@/lib/woocommerce";
import { PROMO, PROMO_FIN_TEXTO } from "@/lib/promo";
import { BF_FAQ } from "@/lib/blackfriday";
import { WHATSAPP } from "@/lib/content";
import { SHIPPING_NOTE } from "@/lib/shipping";

export const waCampana = (asunto: string) =>
  `${WHATSAPP.split("&text=")[0]}&text=` +
  encodeURIComponent(
    `Hola *LaFab*. Vi el Black Friday en la página y quiero preguntar por ${asunto}.`
  );

export default function SeccionCampana({
  productos,
}: {
  productos: WCProduct[];
}) {
  const seleccion = PROMO.productos
    .map((slug) => productos.find((p) => p.slug === slug))
    .filter((p): p is WCProduct => Boolean(p));

  if (!seleccion.length) return null;

  const sofas = seleccion.filter((p) => p.slug.startsWith("sofa-"));
  const alcobas = seleccion.filter((p) => p.slug.startsWith("alcoba-"));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BF_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const ofertaJsonLd = {
    "@context": "https://schema.org",
    "@type": "SaleEvent",
    name: "Black Friday LaFab",
    description: `Black Friday en LaFab hasta el ${PROMO_FIN_TEXTO}: sofás y alcobas a la medida con precio de campaña.`,
    startDate: PROMO.inicio,
    endDate: PROMO.fin,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: "https://lafab.com.co/#seleccion",
    location: {
      "@type": "VirtualLocation",
      url: "https://lafab.com.co/#seleccion",
    },
    organizer: { "@type": "Organization", name: "LaFab", url: "https://lafab.com.co" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ofertaJsonLd) }} />

      {/* Lo que cubre la compra, en seco y justo debajo del banner. Va dentro
          del ancho del resto de la portada: suelta, la tarjeta se estiraba de
          borde a borde y no casaba con ninguna otra sección. */}
      <div className="mx-auto max-w-site px-4 pt-10 md:px-6 md:pt-14">
        <TrustStrip />
      </div>

      {/* Las piezas, una por producto. Van limpias: cada una ya trae quemados
          el titular, el logo y el nombre del mueble. Lo único que se añade es
          lo que la imagen no dice, que es el precio. */}
      <section id="seleccion" className="mt-14 scroll-mt-24 bg-cream py-16 md:mt-16 md:py-20">
        <div className="mx-auto max-w-site px-4 md:px-6">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
              Black Friday
            </p>
            <h2 className="mt-3 font-morality text-3xl font-light text-ink md:text-4xl">
              Para estrenar este año
            </h2>
            <p className="mt-3 max-w-xl text-ink/60">
              Precio de campaña hasta el {PROMO_FIN_TEXTO}, con la misma
              fabricación a la medida de siempre.
            </p>
          </Reveal>

          <div className="mt-9">
            <PiezasCampana productos={seleccion} />
          </div>
        </div>
      </section>

      {/* El resto de la selección */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-site px-4 md:px-6">
          <Reveal>
            <h2 className="font-morality text-3xl font-light text-ink md:text-4xl">
              Sofás en campaña
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
            {sofas.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {alcobas.length > 0 && (
            <>
              <Reveal>
                <h2 className="mt-16 font-morality text-3xl font-light text-ink md:text-4xl">
                  Alcobas en campaña
                </h2>
              </Reveal>
              <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
                {alcobas.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </>
          )}

          <p className="mt-10 text-sm text-ink/50">{SHIPPING_NOTE}</p>
        </div>
      </section>

      {/* El compromiso de entrega. Explica el para qué, no el porqué. */}
      <section className="bg-ink py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-site items-center gap-10 px-4 md:grid-cols-2 md:px-6">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-gold-light">
              Nuestro compromiso
            </p>
            <h2 className="mt-4 font-morality text-3xl font-light md:text-4xl">
              Que lo estrenes este año
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-4 text-white/70">
              <p>
                Tu mueble se fabrica para ti en nuestro taller de Itagüí, y
                queremos que llegue a tiempo para las fechas que importan.
              </p>
              <p>
                Por eso el Black Friday de LaFab va hasta el{" "}
                {PROMO_FIN_TEXTO}: lo que encargues dentro de la campaña lo
                entregamos antes de que termine el año. Sin esperas de más, sin
                quedarte mal.
              </p>
              <a
                href={waCampana("el Black Friday")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block pt-2 font-medium text-gold-light underline-offset-4 hover:underline"
              >
                ¿Dudas con medidas o telas? Escríbenos por WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Preguntas, plegadas para no alargar la portada. */}
      <section className="bg-cream py-14 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-morality text-2xl font-light text-ink md:text-3xl">
              Sobre la campaña
            </h2>
          </Reveal>
          <div className="mt-6 divide-y divide-ink/10">
            {BF_FAQ.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-medium text-ink marker:content-['']">
                  {f.q}
                  <span
                    className="shrink-0 text-gold-dark transition-transform group-open:rotate-45"
                    aria-hidden
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink/65">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
