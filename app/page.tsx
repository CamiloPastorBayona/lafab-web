import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/woocommerce";
import { SPACES, WHATSAPP } from "@/lib/content";
import ProductCard from "@/components/ProductCard";
import Reviews from "@/components/Reviews";

export const revalidate = 300;

export default async function HomePage() {
  const products = await getProducts({ per_page: 8, orderby: "date" });

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-[64px] flex min-h-[92vh] items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://lafab.com.co/wp-content/uploads/2026/07/3.webp"
          alt="Muebles a la medida LaFab"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/30 to-ink/40" />
        <div className="relative z-10 mx-auto w-full max-w-site px-4 pb-20 md:px-6">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-gold-light">
            La Fábrica de Muebles · Medellín
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-white md:text-6xl">
            Muebles a la medida, hechos para tu espacio
          </h1>
          <p className="mt-4 max-w-xl text-lg text-white/80">
            Diseñamos y fabricamos sofás, comedores, camas y closets con
            materiales de calidad y acabados impecables.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="rounded-full bg-gold px-7 py-3 font-semibold text-ink transition-transform hover:scale-105"
            >
              Ver la tienda
            </Link>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/40 px-7 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Cotizar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Espacios */}
      <section className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-wide text-gold-dark">
            Explora por espacios
          </p>
          <h2 className="mt-1 text-3xl font-semibold text-ink md:text-4xl">
            Un mueble para cada rincón
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {SPACES.map((s) => (
            <Link
              key={s.slug}
              href={s.href}
              className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-2xl"
            >
              <Image
                src={s.image}
                alt={s.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              <div className="relative z-10 p-6 text-white">
                <h3 className="text-2xl font-semibold">{s.name}</h3>
                <p className="mt-1 text-sm text-white/80">{s.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="bg-cream">
        <div className="mx-auto max-w-site px-4 py-16 md:px-6 md:py-24">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-gold-dark">
                Destacados
              </p>
              <h2 className="mt-1 text-3xl font-semibold text-ink md:text-4xl">
                Nuestros muebles
              </h2>
            </div>
            <Link
              href="/shop"
              className="hidden text-sm font-semibold text-gold-dark hover:underline md:block"
            >
              Ver todo →
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-ink/50">No hay productos disponibles.</p>
          )}
        </div>
      </section>

      {/* Reseñas */}
      <Reviews />

      {/* Cierre CTA */}
      <section className="bg-ink">
        <div className="mx-auto max-w-site px-4 py-16 text-center md:px-6 md:py-24">
          <h2 className="text-3xl font-semibold text-white md:text-4xl">
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
        </div>
      </section>
    </>
  );
}
