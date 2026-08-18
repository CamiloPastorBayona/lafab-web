"use client";

// Selector para productos variables: el cliente elige cada opción (tela, puestos,
// etc.), el precio se actualiza en vivo y se agrega al carrito la variación exacta.

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { money, type WCVariation, type WCPrices } from "@/lib/woocommerce";

type Term = { name: string; slug: string };
type Attr = { name: string; terms: Term[] };

const norm = (s: string) => s.trim().toLowerCase();

export default function ProductConfigurator({
  product,
  variations,
}: {
  product: {
    id: number;
    name: string;
    slug: string;
    image: string;
    attributes: Attr[];
    prices: WCPrices;
  };
  variations: WCVariation[];
}) {
  const { add, openCart } = useCart();
  const router = useRouter();

  // Selección inicial: primer término de cada atributo.
  const [selected, setSelected] = useState<Record<string, Term>>(() => {
    const init: Record<string, Term> = {};
    for (const a of product.attributes) if (a.terms[0]) init[a.name] = a.terms[0];
    return init;
  });
  const [busy, setBusy] = useState(false);

  const match = useMemo(() => {
    return variations.find((v) =>
      product.attributes.every((a) => {
        const term = selected[a.name];
        if (!term) return false;
        return v.attributes.some(
          (va) =>
            norm(va.name) === norm(a.name) &&
            (norm(va.value) === norm(term.name) || norm(va.value) === norm(term.slug))
        );
      })
    );
  }, [variations, selected, product.attributes]);

  const pick = (attr: string, term: Term) =>
    setSelected((prev) => ({ ...prev, [attr]: term }));

  const priceNum = match ? Number(match.prices.price) || 0 : 0;
  const canBuy = !!match && match.is_in_stock && priceNum > 0;

  const addToCart = () => {
    if (!canBuy || !match) return;
    const opts = product.attributes.map((a) => selected[a.name]?.name).filter(Boolean);
    add(
      {
        id: match.id, // id de la variación → línea única por configuración
        name: `${product.name} · ${opts.join(" · ")}`,
        slug: product.slug,
        image: match.image || product.image,
        price: priceNum,
      },
      1
    );
  };

  const buyNow = () => {
    if (!canBuy) return;
    setBusy(true);
    addToCart();
    router.push("/checkout");
    setTimeout(() => setBusy(false), 1500);
  };

  const pill = (active: boolean) =>
    `rounded-full border px-4 py-2 text-sm transition-all ${
      active
        ? "border-ink bg-ink text-white"
        : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
    }`;

  return (
    <div>
      {/* Precio en vivo */}
      <div className="mt-4 flex flex-wrap items-baseline gap-3">
        {match ? (
          match.on_sale ? (
            <>
              <span className="text-3xl font-semibold text-ink">
                {money(match.prices.sale_price, match.prices)}
              </span>
              <span className="text-lg text-ink/40 line-through">
                {money(match.prices.regular_price, match.prices)}
              </span>
              <span className="rounded-full bg-sale/10 px-3 py-1 text-xs font-semibold text-sale">
                Oferta
              </span>
            </>
          ) : (
            <span className="text-3xl font-semibold text-ink">
              {money(match.prices.price, match.prices)}
            </span>
          )
        ) : (
          <span className="text-xl font-medium text-ink/50">
            Selecciona una opción
          </span>
        )}
      </div>
      <p className="mt-1 text-sm text-ink/50">
        IVA incluido · Envío incluido en Medellín
      </p>

      {/* Selectores */}
      <div className="mt-6 space-y-5">
        {product.attributes.map((a) => (
          <div key={a.name}>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-ink/45">
              {a.name}
            </span>
            <div className="flex flex-wrap gap-2">
              {a.terms.map((t) => (
                <button
                  key={t.slug}
                  type="button"
                  onClick={() => pick(a.name, t)}
                  className={pill(selected[a.name]?.slug === t.slug)}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Acciones */}
      <div className="mt-8 flex flex-col gap-3">
        <button
          type="button"
          onClick={() => {
            addToCart();
            openCart();
          }}
          disabled={!canBuy}
          className="rounded-full border-2 border-ink px-8 py-3 font-semibold text-ink transition-colors hover:bg-ink hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {canBuy ? "Añadir al carrito" : "No disponible"}
        </button>
        <button
          type="button"
          onClick={buyNow}
          disabled={!canBuy || busy}
          className="rounded-full bg-ink px-8 py-3.5 font-semibold text-white transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-ink/40"
        >
          {busy ? "Agregando…" : "Comprar ahora"}
        </button>
      </div>
    </div>
  );
}
