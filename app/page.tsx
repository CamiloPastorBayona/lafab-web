import Link from "next/link";
import { getProducts } from "@/lib/woocommerce";
import { SPACES, SHOWROOM, WHATSAPP } from "@/lib/content";
import { SANDIEGO } from "@/lib/sandiego";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";
import Hero from "@/components/Hero";
import WpImage from "@/components/WpImage";
import Reveal from "@/components/Reveal";
import Ico from "@/components/LandingIcons";

export const revalidate = 300;

const eyebrow =
  "text-sm font-medium uppercase tracking-[0.25em] text-gold-dark";
const heading = "mt-2 text-3xl font-light text-ink md:text-4xl";

const SEALS = [
  { t: "Garantía", s: "por fabricación", icon: "shieldCheck" },
  { t: "Pago seguro", s: "100% protegido", icon: "lock" },
  { t: "Fabricación propia", s: "taller en Itagüí", icon: "factory" },
  { t: "Envíos nacionales", s: "a todo el país", icon: "truck" },
  { t: "Respaldo LaFab", s: "marca confiable", icon: "award" },
];

export default async function HomePage() {
  const products = await getProducts({ per_page: 8, orderby: "date" });
  const gallery = products.filter((p) => p.images?.[0]).slice(0, 6);

  return (
    <>
      <Hero />

      {/* Espacios — mosaico */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={eyebrow}>Explora por espacios</p>
              <h2 className={heading}>Un mueble para cada rincón</h2>
            </div>
            <Link
              href="/espacios"
              className="text-sm font-semibold text-gold-dark hover:underline"
            >
              Ver todos →
            </Link>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-2 md:grid-rows-2 md:gap-6">
          {SPACES.map((s, i) => (
            <Reveal
              key={s.slug}
              delay={i * 120}
              className={i === 0 ? "md:row-span-2" : ""}
            >
              <Link
                href={s.href}
                className={`group relative flex items-end overflow-hidden rounded-2xl ${
                  i === 0 ? "aspect-[4/5] md:h-full" : "aspect-[16/10]"
                }`}
              >
                <WpImage
                  src={s.image}
                  alt={s.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                <div className="relative z-10 p-6 text-white">
                  <h3 className="text-2xl font-light md:text-3xl">{s.name}</h3>
                  <p className="mt-1 text-sm text-white/85">{s.description}</p>
                  <span className="mt-3 inline-block text-sm font-medium text-gold-light">
                    Ver productos →
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Fabricación propia + proceso */}
      <section className="bg-[#1a1a1a] text-white">
        <div className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <WpImage
                  src="https://lafab.com.co/wp-content/uploads/2026/06/taller3-1.webp"
                  alt="Taller LaFab"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-sm font-medium uppercase tracking-[0.25em] text-gold-light">
                Fabricación propia
              </p>
              <h2 className="mt-2 text-3xl font-light md:text-4xl">
                No revendemos: fabricamos.
              </h2>
              <p className="mt-4 text-white/70">
                Cada mueble nace en nuestro taller de Itagüí. Del corte a la
                tapicería controlamos cada etapa, con materiales que aguantan el
                uso diario y acabados impecables.
              </p>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-gold px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
              >
                Cotiza tu mueble
              </a>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SANDIEGO.taller.slice(0, 4).map((t, i) => (
              <Reveal key={t.n} delay={i * 100}>
                <div>
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-2xl">
                    <WpImage
                      src={t.img}
                      alt={t.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm text-ink">
                      {t.n}
                    </span>
                  </div>
                  <h3 className="text-lg font-light">{t.title}</h3>
                  <p className="text-sm text-white/60">{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
        <Reveal>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className={eyebrow}>Destacados</p>
              <h2 className={heading}>Nuestros muebles</h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-gold-dark hover:underline md:block"
            >
              Ver la tienda →
            </Link>
          </div>
        </Reveal>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={(i % 4) * 100}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <p className="text-ink/50">No hay productos disponibles.</p>
        )}
      </section>

      {/* Proyectos */}
      {gallery.length > 0 && (
        <section className="bg-cream">
          <div className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
            <Reveal>
              <div className="mb-10 flex items-end justify-between">
                <div>
                  <p className={eyebrow}>Proyectos</p>
                  <h2 className={heading}>Muebles que ya viven en otros hogares</h2>
                </div>
                <Link
                  href="/proyectos"
                  className="hidden text-sm font-semibold text-gold-dark hover:underline md:block"
                >
                  Ver proyectos →
                </Link>
              </div>
            </Reveal>
            <div className="columns-2 gap-4 md:columns-3 md:gap-6 [&>a]:mb-4 md:[&>a]:mb-6">
              {gallery.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/producto/${p.slug}`}
                  className="group relative block break-inside-avoid overflow-hidden rounded-2xl"
                >
                  <img
                    // eslint-disable-next-line @next/next/no-img-element
                    src={p.images[0].thumbnail || p.images[0].src}
                    srcSet={p.images[0].thumbnail_srcset}
                    sizes="(max-width: 768px) 50vw, 33vw"
                    alt={p.images[0].alt || p.name}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                    <span className="p-5 text-lg font-light text-white">
                      {p.name}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reseñas */}
      <Reviews />

      {/* Showroom */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <Reveal>
            <p className={eyebrow}>Showroom</p>
            <h2 className={heading}>Visítanos en Itagüí</h2>
            <p className="mt-4 text-ink/70">
              Ven a tocar las telas, probar los sofás y recibir asesoría
              personalizada de nuestro equipo.
            </p>
            <div className="mt-6 space-y-4 text-ink/75">
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
                <ul className="mt-1 space-y-0.5 text-sm">
                  {SHOWROOM.hours.map((h) => (
                    <li key={h.day}>
                      <span className="font-medium text-ink">{h.day}:</span>{" "}
                      {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href="/showrooms"
              className="mt-6 inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
            >
              Cómo llegar
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl">
              <iframe
                title="Showroom LaFab en Itagüí"
                src={`https://www.google.com/maps?q=${SHOWROOM.mapsQuery}&output=embed`}
                className="h-full min-h-[340px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Sellos */}
      <section className="border-y border-ink/10 bg-cream">
        <div className="mx-auto grid max-w-site grid-cols-2 gap-6 px-4 py-10 md:grid-cols-3 md:px-6 lg:grid-cols-5">
          {SEALS.map((s) => (
            <div key={s.t} className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/15 text-gold-dark">
                <Ico name={s.icon} className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{s.t}</p>
                <p className="text-xs text-ink/50">{s.s}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cierre CTA */}
      <section className="bg-ink">
        <div className="mx-auto max-w-site px-4 py-16 text-center md:px-6 md:py-24">
          <Reveal>
            <h2 className="text-3xl font-light text-white md:text-4xl">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/60">
              Cuéntanos qué necesitas y lo diseñamos contigo. Fabricación propia,
              asesoría personalizada y envío a todo el país.
            </p>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full bg-gold px-8 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Hablar con un asesor
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
