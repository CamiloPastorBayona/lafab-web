import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";
import TrustStrip from "@/components/TrustStrip";
import WpImage from "@/components/WpImage";
import CuentaRegresiva from "@/components/CuentaRegresiva";
import { jsonLd } from "@/components/RatingJsonLd";
import { getProducts, money, descuento } from "@/lib/woocommerce";
import { PROMO, PROMO_FIN_TEXTO, enPromo } from "@/lib/promo";
import { PORTADA, PIEZAS, BF_FAQ } from "@/lib/blackfriday";
import { WHATSAPP } from "@/lib/content";
import { OG_IMAGE } from "@/lib/cms";
import { SHIPPING_NOTE } from "@/lib/shipping";

// Más corto que el resto del catálogo: durante una campaña los precios son lo
// que más importa que esté al día, y son doce días contados.
export const revalidate = 300;

const TITULO = "Black Friday LaFab: sofás y alcobas a la medida";
const DESCRIPCION = `Black Friday en LaFab hasta el ${PROMO_FIN_TEXTO}: trece sofás y tres alcobas a la medida con precio de campaña. Fabricación propia en Medellín y entrega antes de fin de año.`;

export const metadata: Metadata = {
  title: TITULO,
  description: DESCRIPCION,
  keywords: [
    "black friday muebles",
    "black friday sofás Medellín",
    "ofertas muebles a la medida",
    "black friday alcobas",
    "descuentos muebles Colombia",
  ],
  alternates: { canonical: "/black-friday" },
  openGraph: {
    title: `${TITULO} | LaFab`,
    description: DESCRIPCION,
    type: "website",
    locale: "es_CO",
    url: "/black-friday",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITULO }],
  },
};

export default async function BlackFridayPage() {
  // Se piden todos y se filtra aquí, en vez de una petición por producto: son
  // dieciséis, y el CMS no aguanta esa ráfaga.
  const todos = await getProducts({ per_page: 100 }).catch(() => []);
  const seleccion = PROMO.productos
    .map((slug) => todos.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const sofas = seleccion.filter((p) => p.slug.startsWith("sofa-"));
  const alcobas = seleccion.filter((p) => p.slug.startsWith("alcoba-"));

  // El "desde" se calcula, no se escribe a mano: si mañana cambia un precio,
  // este número cambia solo y la página no queda mintiendo.
  const precios = seleccion
    .map((p) => Number(p.prices.price) || 0)
    .filter(Boolean);
  const desde = precios.length ? Math.min(...precios) : 0;
  const maxPct = Math.max(0, ...seleccion.map((p) => descuento(p.prices) ?? 0));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BF_FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const migasJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://lafab.com.co" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Black Friday",
        item: "https://lafab.com.co/black-friday",
      },
    ],
  };

  const ofertaJsonLd = {
    "@context": "https://schema.org",
    "@type": "SaleEvent",
    name: "Black Friday LaFab",
    description: DESCRIPCION,
    startDate: PROMO.inicio,
    endDate: PROMO.fin,
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    url: "https://lafab.com.co/black-friday",
    location: {
      "@type": "VirtualLocation",
      url: "https://lafab.com.co/black-friday",
    },
    organizer: {
      "@type": "Organization",
      name: "LaFab",
      url: "https://lafab.com.co",
    },
  };

  const waPieza = (nombre: string) =>
    `${WHATSAPP.split("&text=")[0]}&text=` +
    encodeURIComponent(
      `Hola *LaFab*. Vi el Black Friday en la página y quiero preguntar por ${nombre}.`
    );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(migasJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(ofertaJsonLd) }} />

      {/* Portada de la campaña */}
      <section className="relative overflow-hidden bg-[#0D0D0D] text-white">
        <WpImage
          src={PORTADA.imagen}
          alt={PORTADA.alt}
          sizes="100vw"
          priority
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-[#0D0D0D]/40" />

        <div className="relative z-10 mx-auto max-w-site px-4 py-20 md:px-6 md:py-28">
          <nav className="mb-8 text-sm text-white/45">
            <Link href="/" className="hover:text-white">
              Inicio
            </Link>{" "}
            / <span className="text-white/80">Black Friday</span>
          </nav>

          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold-light">
            Nos adelantamos
          </p>
          <h1 className="mt-4 font-morality text-5xl font-light leading-[1.05] md:text-7xl">
            Black Friday
          </h1>
          <p className="mt-5 max-w-xl text-lg font-light text-white/75">
            Para que lo estrenes este año. {maxPct > 0 ? `Hasta ${maxPct}% ` : ""}
            en una selección de sofás y alcobas, con la misma fabricación a la
            medida de siempre.
          </p>

          <CuentaRegresiva className="mt-8" />

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#seleccion"
              className="rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.02]"
            >
              Ver la selección
            </a>
            <a
              href={waPieza("el Black Friday")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:border-white/60"
            >
              Preguntar por WhatsApp
            </a>
          </div>

          {desde > 0 && (
            <p className="mt-6 text-sm text-white/55">
              Desde {money(String(desde), seleccion[0].prices)} · IVA incluido ·
              Entrega entre 20 y 40 días
            </p>
          )}
        </div>
      </section>

      <TrustStrip />

      {/* Las piezas de la campaña, una por producto.
          Van limpias, sin texto sobrepuesto: cada pieza ya trae quemados el
          titular, el logo y el nombre del mueble. Lo único que se añade es lo
          que la imagen no dice, que es el precio, y va debajo. */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-site px-4 md:px-6">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
              La campaña
            </p>
            <h2 className="mt-3 font-morality text-3xl font-light text-ink md:text-4xl">
              Seis piezas para estrenar este año
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PIEZAS.map((pieza, i) => {
              const prod = seleccion.find((p) => p.slug === pieza.slug);
              if (!prod) return null;
              const pct = descuento(prod.prices);

              return (
                <Reveal key={pieza.slug} delay={(i % 3) * 110}>
                  <Link
                    href={`/producto/${prod.slug}`}
                    className="group block overflow-hidden rounded-2xl bg-ink"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <WpImage
                        src={pieza.imagen}
                        alt={pieza.alt}
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex items-center justify-between gap-3 px-5 py-4">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {prod.name}
                        </p>
                        <p className="mt-0.5 text-sm text-white/55">
                          Desde{" "}
                          {money(
                            prod.prices.price_range?.min_amount ??
                              prod.prices.price,
                            prod.prices
                          )}
                          {pct ? ` · ${pct}% menos` : ""}
                        </p>
                      </div>
                      <span
                        aria-hidden
                        className="shrink-0 text-gold-light transition-transform group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <a
              href={waPieza("el Black Friday")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-ink/70 underline underline-offset-4 hover:text-ink"
            >
              ¿Dudas con medidas o telas? Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* La selección */}
      <section id="seleccion" className="scroll-mt-20 bg-white py-16 md:py-20">
        <div className="mx-auto max-w-site px-4 md:px-6">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-gold-dark">
              La selección
            </p>
            <h2 className="mt-3 font-morality text-3xl font-light text-ink md:text-4xl">
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

      {/* Por qué termina el 14 */}
      <section className="bg-ink py-16 text-white md:py-20">
        <div className="mx-auto grid max-w-site gap-10 px-4 md:grid-cols-2 md:px-6">
          <Reveal>
            <h2 className="font-morality text-3xl font-light md:text-4xl">
              ¿Por qué termina antes del viernes negro?
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div className="space-y-4 text-white/70">
              <p>
                Porque aquí no hay bodega. Cada mueble se fabrica después de que
                lo encargas, en el taller de Itagüí, y eso toma entre 20 y 40
                días según la referencia y lo que personalices.
              </p>
              <p>
                Si la campaña fuera el 27 de noviembre como en el resto del
                mundo, lo que compraras llegaría en enero. Nos adelantamos para
                que alcance a llegar este año.
              </p>
              <p className="text-gold-light">
                La campaña va hasta el {PROMO_FIN_TEXTO}.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Preguntas */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <Reveal>
            <h2 className="font-morality text-3xl font-light text-ink md:text-4xl">
              Preguntas frecuentes
            </h2>
          </Reveal>
          <div className="mt-8 divide-y divide-ink/10">
            {BF_FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details className="group py-5">
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
              </Reveal>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-ink p-7 text-center">
            <p className="text-lg font-light text-white">
              ¿Tienes dudas con medidas, telas o tiempos?
            </p>
            <a
              href={waPieza("el Black Friday")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-block rounded-full bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-ink transition-transform hover:scale-[1.02]"
            >
              Escríbenos por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}
