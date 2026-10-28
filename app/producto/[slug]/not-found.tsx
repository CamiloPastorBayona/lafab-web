import Link from "next/link";

// Sin este archivo, una ficha que no existe se servía con código 200 y el
// texto "Producto no encontrado". Para Google eso es un soft 404: deja la URL
// en el índice y sigue mandando gente a una página muerta. Con un not-found
// propio del segmento, la respuesta sale con 404 de verdad.
export default function ProductoNoEncontrado() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream px-4">
      <div className="max-w-lg text-center">
        <p className="text-7xl font-bold text-gold md:text-8xl">404</p>
        <h1 className="mt-4 text-2xl font-semibold text-ink md:text-3xl">
          Este mueble ya no está
        </h1>
        <p className="mt-3 text-ink/60">
          Puede que le hayamos cambiado el nombre o que haya salido del
          catálogo. En la tienda están todos los que fabricamos hoy.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/shop"
            className="rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Ver la tienda
          </Link>
          <Link
            href="/alcobas"
            className="rounded-full border border-ink/20 px-7 py-3 font-semibold text-ink transition-colors hover:bg-white"
          >
            Ver las alcobas
          </Link>
        </div>
      </div>
    </section>
  );
}
