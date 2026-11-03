// La rejilla de piezas de Black Friday.
//
// Se usa en dos sitios: en la portada, dentro de la sección de campaña, y en la
// tienda, arriba del catálogo. Las piezas ya traen quemados el titular, el logo
// y el nombre del mueble, así que lo único que se añade debajo es lo que la
// imagen no dice: el precio.

import Link from "next/link";
import Reveal from "@/components/Reveal";
import WpImage from "@/components/WpImage";
import { money, descuento, type WCProduct } from "@/lib/woocommerce";
import { PIEZAS } from "@/lib/blackfriday";

export default function PiezasCampana({
  productos,
}: {
  productos: WCProduct[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {PIEZAS.map((pieza, i) => {
        const prod = productos.find((p) => p.slug === pieza.slug);
        if (!prod) return null;
        const pct = descuento(prod.prices);

        return (
          <Reveal key={pieza.slug} delay={(i % 3) * 110}>
            <Link
              href={`/producto/${prod.slug}`}
              className="group block overflow-hidden rounded-2xl bg-ink"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <WpImage
                  src={pieza.imagen}
                  alt={pieza.alt}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="text-sm font-medium text-white">{prod.name}</p>
                  <p className="mt-0.5 text-sm text-white/55">
                    Desde{" "}
                    {money(
                      prod.prices.price_range?.min_amount ?? prod.prices.price,
                      prod.prices
                    )}
                    {pct ? ` · ${pct}% menos` : ""}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="shrink-0 text-gold-light transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </div>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
