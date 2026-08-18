import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream px-4">
      <div className="max-w-lg text-center">
        <p className="text-7xl font-bold text-gold md:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">
          No encontramos esta página
        </h1>
        <p className="mt-3 text-ink/60">
          Puede que el enlace haya cambiado o que la página ya no exista. Te
          ayudamos a volver al camino.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Ir al inicio
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-ink/20 px-7 py-3 font-semibold text-ink transition-colors hover:bg-white"
          >
            Ver la tienda
          </Link>
        </div>
      </div>
    </section>
  );
}
