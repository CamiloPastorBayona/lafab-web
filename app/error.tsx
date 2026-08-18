"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream px-4">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-light text-ink md:text-4xl">
          Algo salió mal
        </h1>
        <p className="mt-3 text-ink/60">
          Tuvimos un inconveniente al cargar esta página. Intenta de nuevo o
          vuelve al inicio.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="rounded-full border border-ink/20 px-7 py-3 font-semibold text-ink transition-colors hover:bg-white"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
