// Franja de confianza / envío. Estática, reutilizable en producto y carrito.
import Ico from "@/components/LandingIcons";

const ITEMS = [
  { i: "truck", t: "Envío incluido en Medellín" },
  { i: "factory", t: "Fabricación propia · 15-20 días" },
  { i: "lock", t: "Pago 100% seguro" },
  { i: "shieldCheck", t: "Garantía por fabricación" },
];

export default function TrustStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`grid grid-cols-2 gap-3 rounded-2xl border border-ink/10 bg-cream/60 p-4 sm:grid-cols-4 ${className}`}
    >
      {ITEMS.map((s) => (
        <div key={s.t} className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark">
            <Ico name={s.i} className="h-4 w-4" />
          </span>
          <span className="text-xs font-medium leading-tight text-ink/70">
            {s.t}
          </span>
        </div>
      ))}
    </div>
  );
}
