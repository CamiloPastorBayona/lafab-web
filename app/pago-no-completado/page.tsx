"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Ico from "@/components/LandingIcons";
import { whatsappPago, TELEFONO, TELEFONO_TEL } from "@/lib/content";

/**
 * Un pago que falla no puede terminar en una pantalla de error y nada más. Un
 * mueble de varios millones casi nunca se cierra al primer intento: el pedido
 * ya existe en la tienda, así que lo útil aquí es poner a un asesor a un toque
 * de distancia y decirle al cliente que no le cobraron.
 */
function PagoNoCompletado() {
  const pedido = useSearchParams().get("pedido");

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-6">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
        <Ico name="headset" className="h-9 w-9" />
      </div>

      <h1 className="text-3xl font-light text-ink md:text-4xl">
        El pago no se completó
      </h1>

      <p className="mx-auto mt-4 max-w-lg text-ink/70">
        Tu pedido{pedido ? ` #${pedido}` : ""} quedó guardado y el mueble sigue
        disponible. No se te hizo ningún cobro.
      </p>
      <p className="mx-auto mt-2 max-w-lg text-ink/70">
        Escríbenos por WhatsApp y lo terminamos contigo: te enviamos un enlace de
        pago nuevo o lo coordinamos por el medio que prefieras.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={whatsappPago(pedido)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          <Ico name="headset" className="h-4 w-4 text-gold" />
          Escríbenos por WhatsApp
        </a>
        <Link
          href="/shop"
          className="inline-block rounded-full border border-ink/15 px-7 py-3 font-medium text-ink transition-colors hover:bg-cream"
        >
          Volver a la tienda
        </Link>
      </div>

      <p className="mt-10 text-sm text-ink/55">
        ¿Prefieres llamar?{" "}
        <a
          href={`tel:${TELEFONO_TEL}`}
          className="font-medium text-ink underline underline-offset-4"
        >
          {TELEFONO}
        </a>
        <br />
        Lunes a sábado de 10:00 a.m. a 6:30 p.m.
      </p>
    </div>
  );
}

export default function PagoNoCompletadoPage() {
  return (
    <Suspense fallback={null}>
      <PagoNoCompletado />
    </Suspense>
  );
}
