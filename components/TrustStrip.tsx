// Franja de confianza / envío. Estática, reutilizable en producto y carrito.
import Ico from "@/components/LandingIcons";
import { SHIPPING_NATIONAL_COST, cop } from "@/lib/shipping";

const ITEMS = [
  { i: "truck", t: `Envío incluido en Medellín · +${cop(SHIPPING_NATIONAL_COST)} otras ciudades` },
  { i: "factory", t: "Fabricación propia · plazo confirmado al cotizar" },
  { i: "lock", t: "Pago 100% seguro" },
  { i: "shieldCheck", t: "Garantía por fabricación" },
];

export default function TrustStrip({
  className = "",
  plano = false,
}: {
  className?: string;
  /**
   * Sin tarjeta: ni borde, ni fondo, ni esquinas redondeadas. Para cuando la
   * franja ya va dentro de una banda propia de lado a lado y la tarjeta
   * encima se vería como una caja dentro de otra.
   */
  plano?: boolean;
}) {
  const caja = plano
    ? ""
    : "rounded-2xl border border-ink/10 bg-cream/60 p-4";
  return (
    <div
      // En móvil a una sola columna: a dos, textos como "Envío incluido en
      // Medellín · +$200.000 otras ciudades" se partían en cinco renglones.
      className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 ${caja} ${className}`}
    >
      {ITEMS.map((s) => (
        <div key={s.t} className="flex items-center gap-2.5">
          <span
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gold-dark ${
              plano ? "border border-ink/15" : "bg-white"
            }`}
          >
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
