// Sello de campaña para la esquina de la foto del producto.
//
// Reemplaza al sello rojo de descuento en los productos que entran en la
// campaña, en vez de sumarse a él: dos sellos apilados sobre la misma foto se
// ven como un error, y el rojo de rebaja es justo el código visual que esta
// marca no quiere.

import { PROMO } from "@/lib/promo";

export default function SelloPromo({
  pct,
  className = "",
}: {
  pct: number;
  className?: string;
}) {
  return (
    <span
      className={`z-10 flex flex-col items-center rounded-xl border border-gold/45 bg-ink/90 px-2.5 py-1.5 leading-none shadow-[0_2px_12px_rgba(0,0,0,0.28)] backdrop-blur-sm ${className}`}
    >
      <span className="text-[8px] font-medium uppercase tracking-[0.16em] text-gold-light">
        {PROMO.etiqueta}
      </span>
      <span className="mt-1 text-sm font-semibold text-white">-{pct}%</span>
    </span>
  );
}
