// Desglose de envío con el mismo criterio de la landing del Sofá San Diego:
// precio base (envío incluido en Medellín) + costo adicional explícito para
// las demás ciudades. Estático y reutilizable en fichas y categorías.
import { SHIPPING_NOTE, shippingCostLabel, zonasEnvio } from "@/lib/shipping";
import Ico from "@/components/LandingIcons";

export default function ShippingPrice({
  className = "",
  withNote = true,
  slug,
}: {
  className?: string;
  withNote?: boolean;
  /** Con el mueble a la vista se muestra SU flete; sin él, la tarifa base. */
  slug?: string;
}) {
  const zonas = zonasEnvio(slug);
  return (
    <div
      className={`rounded-2xl border border-ink/10 bg-cream/60 p-4 ${className}`}
    >
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-gold-dark">
        <Ico name="truck" className="h-4 w-4" />
        Envío
      </div>
      <ul className="mt-3 space-y-2">
        {zonas.map((z) => (
          <li
            key={z.label}
            className="flex items-baseline justify-between gap-4 text-sm"
          >
            <span className="text-ink/70">{z.short}</span>
            <span
              className={
                z.cost > 0
                  ? "font-semibold text-ink"
                  : "font-semibold text-gold-dark"
              }
            >
              {shippingCostLabel(z.cost)}
            </span>
          </li>
        ))}
      </ul>
      {withNote && (
        <p className="mt-3 border-t border-ink/10 pt-3 text-xs leading-relaxed text-ink/55">
          {SHIPPING_NOTE}
        </p>
      )}
    </div>
  );
}
