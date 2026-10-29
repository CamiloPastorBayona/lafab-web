"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import Ico from "@/components/LandingIcons";

function Gracias() {
  const params = useSearchParams();
  const pedido = params.get("pedido");
  const { clear } = useCart();

  // Por si el cliente vuelve del pago, aseguramos el carrito vacío.
  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center md:px-6">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-gold-dark">
        <Ico name="shieldCheck" className="h-9 w-9" />
      </div>
      <h1 className="text-3xl font-light text-ink md:text-4xl">¡Gracias por tu compra!</h1>
      <p className="mx-auto mt-4 max-w-lg text-ink/70">
        Recibimos tu pedido{pedido ? ` #${pedido}` : ""}. Te enviaremos la
        confirmación por correo y te contactaremos para coordinar la fabricación
        y el envío de tu mueble.
      </p>
      <p className="mt-2 text-sm text-ink/50">
        ¿Dudas sobre tu pedido? Escríbenos por WhatsApp y con gusto te ayudamos.
      </p>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/shop"
          className="inline-block rounded-full bg-ink px-7 py-3 font-semibold text-white transition-transform hover:scale-105"
        >
          Seguir explorando
        </Link>
        <Link
          href="/"
          className="inline-block rounded-full border border-ink/15 px-7 py-3 font-medium text-ink transition-colors hover:bg-cream"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}

export default function GraciasPage() {
  return (
    <Suspense fallback={null}>
      <Gracias />
    </Suspense>
  );
}
