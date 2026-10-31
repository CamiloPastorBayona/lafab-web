import { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";
import Ico from "@/components/LandingIcons";
import { CIUDADES, CIUDAD_POR_SLUG } from "@/lib/ciudades";
import { CATEGORIES } from "@/lib/categories";
import { getProducts } from "@/lib/woocommerce";
import { SHIPPING_NATIONAL_COST, cop } from "@/lib/shipping";
import { WHATSAPP } from "@/lib/content";
import { UPLOADS } from "@/lib/cms";

export const revalidate = 3600;

export function generateStaticParams() {
  return CIUDADES.map((c) => ({ ciudad: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { ciudad: string };
}): Promise<Metadata> {
  const c = CIUDAD_POR_SLUG[params.ciudad];
  if (!c) return {};
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    alternates: { canonical: `/muebles-a-la-medida/${c.slug}` },
    openGraph: {
      title: c.metaTitle,
      description: c.metaDescription,
      type: "website",
      locale: "es_CO",
    },
  };
}

// Los mismos identificadores que usan las páginas de categoría, para que el
// "desde" de aquí y el de allá sean siempre el mismo número.
const CATEGORIAS = [
  { nombre: "Sofás", href: "/sofas", catId: CATEGORIES.sofas.catId },
  { nombre: "Comedores", href: "/comedores", catId: CATEGORIES.comedores.catId },
  { nombre: "Alcobas", href: "/alcobas", catId: CATEGORIES.alcobas.catId },
  { nombre: "Poltronas", href: "/poltronas", catId: CATEGORIES.poltronas.catId },
];

export default async function CiudadPage({
  params,
}: {
  params: { ciudad: string };
}) {
  const c = CIUDAD_POR_SLUG[params.ciudad];
  if (!c) return null;

  // Los precios salen del catálogo, no de un número escrito a mano: si mañana
  // cambia una tarifa, esta página cambia sola y no queda mintiendo.
  const todos = await getProducts({ per_page: 100 }).catch((e) => {
    console.error("[lafab] ciudad sin productos en el build:", c.slug, e);
    return [];
  });
  const desdePorCategoria = CATEGORIAS.map((cat) => {
    const precios = todos
      .filter((p) => p.categories.some((x) => x.id === cat.catId))
      .map((p) => Number(p.prices.price) || 0)
      .filter(Boolean);
    return { ...cat, desde: precios.length ? Math.min(...precios) : null };
  }).filter((x) => x.desde !== null);

  const destacados = [...todos]
    .filter((p) => p.images?.[0] && Number(p.prices.price) > 0)
    .sort((a, b) => Number(a.prices.price) - Number(b.prices.price))
    .slice(0, 8);

  const migas = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: "https://lafab.com.co/" },
      {
        "@type": "ListItem",
        position: 2,
        name: `Muebles a la medida en ${c.nombre}`,
        item: `https://lafab.com.co/muebles-a-la-medida/${c.slug}`,
      },
    ],
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Declara explícitamente que el servicio llega a esta ciudad, aunque el
  // taller esté en Itagüí. Es la pieza que le dice a Google que una búsqueda
  // hecha desde esta ciudad puede resolverse con nosotros.
  const servicioJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Fabricación de muebles a la medida",
    provider: {
      "@type": "FurnitureStore",
      name: "LaFab · La Fábrica de Muebles",
      url: "https://lafab.com.co",
      telephone: "+573054602395",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Cl. 64 #44-74, Barrio La Esmeralda",
        addressLocality: "Itagüí",
        addressRegion: "Antioquia",
        addressCountry: "CO",
      },
    },
    areaServed: {
      "@type": "City",
      name: c.nombre,
      containedInPlace: { "@type": "AdministrativeArea", name: c.departamento },
    },
    url: `https://lafab.com.co/muebles-a-la-medida/${c.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(migas) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(servicioJsonLd) }} />

      <PageHeader
        eyebrow={`Envíos a ${c.nombre}`}
        title={c.h1}
        subtitle={c.entrada}
        image={`${UPLOADS}/2026/10/sofa-crema-en-sala-moderna-con-tapete-lafab-medellin.webp`}
      />

      <div className="mx-auto max-w-site px-4 py-12 md:px-6 md:py-16">
        <nav className="mb-8 text-sm text-ink/50">
          <Link href="/" className="hover:text-ink">Inicio</Link> /{" "}
          <span className="text-ink">{c.nombre}</span>
        </nav>

        {/* Lo que cuesta de verdad llegar hasta allá */}
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: "truck", t: `Envío a ${c.nombre}`, s: `${cop(SHIPPING_NATIONAL_COST)} sobre el precio publicado` },
              { icon: "factory", t: "Fabricación", s: "30 días calendario o menos" },
              { icon: "shieldCheck", t: "Garantía", s: "La misma en todo el país" },
            ].map((b, i) => (
              <Reveal key={b.t} delay={i * 90}>
                <div className="flex items-start gap-3 rounded-2xl border border-ink/10 p-5">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cream text-gold-dark">
                    <Ico name={b.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-medium text-ink">{b.t}</h2>
                    <p className="mt-0.5 text-sm text-ink/60">{b.s}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        {/* Precio con el envío ya sumado, por categoría */}
        {desdePorCategoria.length > 0 && (
          <Reveal>
            <section className="mt-14">
              <h2 className="text-2xl font-light text-ink md:text-3xl">
                Cuánto cuesta puesto en {c.nombre}
              </h2>
              <p className="mt-2 max-w-2xl text-ink/70">
                El precio de la izquierda es el que ves en la tienda. El de la
                derecha es lo que pagas con el envío a {c.nombre} ya sumado, que
                es el número que importa.
              </p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-ink/10">
                {desdePorCategoria.map((cat, i) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-cream ${
                      i > 0 ? "border-t border-ink/10" : ""
                    }`}
                  >
                    <span className="font-medium text-ink">{cat.nombre}</span>
                    <span className="text-sm text-ink/60">
                      desde {cop(cat.desde as number)}
                      <span className="mx-2 text-ink/30">→</span>
                      <strong className="font-semibold text-ink">
                        {cop((cat.desde as number) + SHIPPING_NATIONAL_COST)}
                      </strong>{" "}
                      en {c.nombre}
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {/* El texto propio de la ciudad */}
        <Reveal>
          <section className="mt-14 max-w-3xl space-y-4 text-ink/75">
            {c.cuerpo.map((par, i) => (
              <p key={i}>{par}</p>
            ))}
          </section>
        </Reveal>

        <Reveal>
          <aside className="mt-8 max-w-3xl rounded-3xl bg-cream p-6 md:p-8">
            <h2 className="text-xl font-light text-ink md:text-2xl">
              {c.destacado.titulo}
            </h2>
            <p className="mt-2 text-ink/75">{c.destacado.texto}</p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-semibold text-white transition-transform hover:scale-[1.02]"
            >
              <Ico name="headset" className="h-4 w-4 text-gold" />
              Escríbenos por WhatsApp
            </a>
          </aside>
        </Reveal>

        {/* Muebles */}
        {destacados.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-light text-ink md:text-3xl">
              Algunos muebles que enviamos a {c.nombre}
            </h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {destacados.map((p, i) => (
                <Reveal key={p.id} delay={(i % 4) * 80}>
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/shop"
                className="inline-block rounded-full border border-ink/20 px-7 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-white"
              >
                Ver toda la tienda
              </Link>
            </div>
          </section>
        )}

        {/* Preguntas de la ciudad */}
        <section className="mt-16 max-w-3xl">
          <h2 className="mb-6 text-2xl font-light text-ink md:text-3xl">
            Preguntas de quienes compran desde {c.nombre}
          </h2>
          <div className="divide-y divide-ink/10 border-y border-ink/10">
            {c.faq.map((item) => (
              <details key={item.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg text-ink">
                  {item.q}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cream text-xl leading-none text-gold-dark transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-ink/70">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-16 -mx-4 md:-mx-6">
          <Reviews />
        </div>

        {/* Otras ciudades: enlaza el grupo entre sí */}
        <section className="mt-14">
          <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-ink/40">
            También enviamos a
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {CIUDADES.filter((x) => x.slug !== c.slug).map((x) => (
              <Link
                key={x.slug}
                href={`/muebles-a-la-medida/${x.slug}`}
                className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink"
              >
                {x.nombre}
              </Link>
            ))}
            <Link
              href="/showrooms"
              className="rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink/70 transition-colors hover:border-ink hover:text-ink"
            >
              Medellín · Showroom
            </Link>
          </div>
        </section>

        <Reveal>
          <div className="mt-14 rounded-3xl bg-ink p-8 text-center md:p-12">
            <h2 className="text-2xl font-light text-white md:text-3xl">
              Cuéntanos qué necesitas en {c.nombre}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/60">
              Mándanos las medidas de tu espacio y te decimos qué mueble cabe,
              cuánto cuesta puesto allá y en cuánto tiempo llega.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </>
  );
}
