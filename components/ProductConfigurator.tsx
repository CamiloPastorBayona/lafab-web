"use client";

// Selector para productos variables: el cliente elige cada opción (tela, puestos,
// etc.), el precio se actualiza en vivo y se agrega al carrito la variación exacta.
//
// Las opciones se derivan de las VARIACIONES (que siempre traen el slug correcto
// de cada valor), no de los términos del atributo padre, que a veces llegan mal
// agrupados por caché del backend. El nombre visible se toma del término si está
// disponible; si no, se formatea el slug.

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import { money, type WCVariation, type WCPrices } from "@/lib/woocommerce";

type Term = { name: string; slug: string };
type Attr = { name: string; terms: Term[] };
type Choice = { slug: string; name: string };

const norm = (s: string) => s.trim().toLowerCase();
const prettify = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

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

  // Opciones reales por atributo, en el orden del producto (Tela, Puestos, …).
  const options = useMemo(() => {
    return product.attributes
      .map((a) => {
        const slugs: string[] = [];
        for (const v of variations) {
          const va = v.attributes.find((x) => norm(x.name) === norm(a.name));
          if (va && !slugs.includes(va.value)) slugs.push(va.value);
        }
        const nameFor = (slug: string) => {
          const t = a.terms.find(
            (t) => norm(t.slug) === norm(slug) || norm(t.name) === norm(slug)
          );
          return t ? t.name : prettify(slug);
        };
        const choices: Choice[] = slugs.map((s) => ({ slug: s, name: nameFor(s) }));
        return { name: a.name, choices };
      })
      .filter((o) => o.choices.length > 0);
  }, [product.attributes, variations]);

  // Selección inicial: primera opción de cada atributo.
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    for (const o of options) if (o.choices[0]) init[o.name] = o.choices[0].slug;
    return init;
  });
  const [busy, setBusy] = useState(false);

  const match = useMemo(() => {
    return variations.find((v) =>
      options.every((o) => {
        const sel = selected[o.name];
        if (!sel) return false;
        return v.attributes.some(
          (va) => norm(va.name) === norm(o.name) && norm(va.value) === norm(sel)
        );
      })
    );
  }, [variations, selected, options]);

  const pick = (attr: string, slug: string) =>
    setSelected((prev) => ({ ...prev, [attr]: slug }));

  const priceNum = match ? Number(match.prices.price) || 0 : 0;
  const canBuy = !!match && match.is_in_stock && priceNum > 0;

  const addToCart = () => {
    if (!canBuy || !match) return;
    const labels = options
      .map((o) => o.choices.find((c) => c.slug === selected[o.name])?.name)
      .filter(Boolean);
    add(
      {
        id: match.id, // id de la variación → línea única por configuración
        name: `${product.name} · ${labels.join(" · ")}`,
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
        {options.map((o) => (
          <div key={o.name}>
            <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-ink/45">
              {o.name}
            </span>
            <div className="flex flex-wrap gap-2">
              {o.choices.map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  onClick={() => pick(o.name, c.slug)}
                  className={pill(selected[o.name] === c.slug)}
                >
                  {c.name}
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
