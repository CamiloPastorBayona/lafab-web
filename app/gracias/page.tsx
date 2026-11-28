"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/lib/cart";
import Ico from "@/components/LandingIcons";
import { tomaCompra, trackPurchase } from "@/lib/analytics";

function Gracias() {
  const params = useSearchParams();
  const pedido = params.get("pedido");
  const { clear } = useCart();
  // El documento con el que se va a facturar, para que el cliente confirme de
  // una vez que quedó bien y no haya que llamarlo después.
  const [documento, setDocumento] = useState<string | null>(null);

  // Por si el cliente vuelve del pago, aseguramos el carrito vacío.
  useEffect(() => {
    clear();
  }, [clear]);

  // Registra la venta en GA4 y en el pixel de Meta. tomaCompra() la entrega
  // una sola vez, así recargar esta página no duplica la conversión.
  useEffect(() => {
    const compra = tomaCompra();
    if (!compra) return;
    trackPurchase(compra.pedido, compra.items, compra.total);
    if (compra.documento) setDocumento(compra.documento);
  }, []);

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
      {documento && (
        <p className="mx-auto mt-5 max-w-md rounded-xl border border-ink/10 bg-cream/60 px-4 py-3 text-sm text-ink/70">
          Facturamos a nombre del documento{" "}
          <strong className="font-semibold text-ink">{documento}</strong>. Si no
          es el correcto, escríbenos por WhatsApp y lo corregimos antes de
          emitir la factura.
        </p>
      )}

      <p className="mt-4 text-sm text-ink/50">
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
