"use client";

// Selector para productos variables: el cliente elige cada opción (material,
// color, tamaño…), el precio se actualiza en vivo y se agrega al carrito la
// variación exacta.
//
// Las opciones se derivan de las VARIACIONES (que siempre traen el slug correcto
// de cada valor), no de los términos del atributo padre, que a veces llegan mal
// agrupados por caché del backend. El nombre visible se toma del término si está
// disponible; si no, se formatea el slug.
//
// Dos detalles que importan:
//  1. Las opciones de cada atributo se filtran por lo ya elegido, así al pasar
//     de Microfibra a Cuero solo quedan los colores que existen en cuero.
//  2. El atributo "Color" se dibuja como círculos con la foto real de la tela o
//     del cuero (el mismo lenguaje visual del landing de San Diego), no como
//     pastillas de texto.

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";
import {
  money,
  descuento,
  tienePrecio,
  PRECIO_PENDIENTE,
  type WCVariation,
  type WCPrices,
} from "@/lib/woocommerce";
import { SHIPPING_INLINE } from "@/lib/shipping";

type Term = { name: string; slug: string };
type Attr = { name: string; terms: Term[] };
type Choice = { slug: string; name: string; image?: string };

const norm = (s: string) => s.trim().toLowerCase();
const prettify = (slug: string) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
const esColor = (name: string) => /color/i.test(name);

/** ¿La variación cumple con esta selección parcial? */
function coincide(v: WCVariation, sel: Record<string, string>, salvo?: string) {
  return Object.entries(sel).every(([attr, val]) => {
    if (!val || attr === salvo) return true;
    return v.attributes.some(
      (va) => norm(va.name) === norm(attr) && norm(va.value) === norm(val)
    );
  });
}

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

  // Orden de los atributos tal como vienen del producto (Material, Color, Tamaño…).
  const attrNames = useMemo(
    () =>
      product.attributes
        .map((a) => a.name)
        .filter((name) =>
          variations.some((v) =>
            v.attributes.some((va) => norm(va.name) === norm(name))
          )
        ),
    [product.attributes, variations]
  );

  // Selección inicial: la primera variación con precio (o la primera que haya).
  const [selected, setSelected] = useState<Record<string, string>>(() => {
    const base =
      variations.find((v) => Number(v.prices?.price) > 0) ?? variations[0];
    const init: Record<string, string> = {};
    if (base) {
      for (const name of attrNames) {
        const va = base.attributes.find((x) => norm(x.name) === norm(name));
        if (va) init[name] = va.value;
      }
    }
    return init;
  });
  const [busy, setBusy] = useState(false);

  // Opciones de cada atributo, filtradas por lo ya elegido en los anteriores.
  const options = useMemo(() => {
    return attrNames.map((name) => {
      const previas: Record<string, string> = {};
      for (const n of attrNames) {
        if (n === name) break;
        if (selected[n]) previas[n] = selected[n];
      }
      const term = product.attributes.find((a) => norm(a.name) === norm(name));
      const vistos = new Map<string, Choice>();
      for (const v of variations) {
        if (!coincide(v, previas)) continue;
        const va = v.attributes.find((x) => norm(x.name) === norm(name));
        if (!va || vistos.has(va.value)) continue;
        const t = term?.terms.find(
          (t) => norm(t.slug) === norm(va.value) || norm(t.name) === norm(va.value)
        );
        vistos.set(va.value, {
          slug: va.value,
          name: t ? t.name : prettify(va.value),
          image: v.image,
        });
      }
      return { name, choices: [...vistos.values()] };
    });
  }, [attrNames, product.attributes, variations, selected]);

  // Si al cambiar un atributo la selección de otro queda inválida, se corrige
  // sola con la primera opción disponible (p. ej. Microfibra → Cuero).
  useEffect(() => {
    let cambio: Record<string, string> | null = null;
    for (const o of options) {
      if (o.choices.length && !o.choices.some((c) => c.slug === selected[o.name])) {
        cambio = { ...(cambio ?? selected), [o.name]: o.choices[0].slug };
      }
    }
    if (cambio) setSelected(cambio);
  }, [options, selected]);

  const match = useMemo(
    () =>
      variations.find((v) =>
        options.every((o) => {
          const sel = selected[o.name];
          if (!sel) return false;
          return v.attributes.some(
            (va) => norm(va.name) === norm(o.name) && norm(va.value) === norm(sel)
          );
        })
      ),
    [variations, selected, options]
  );

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
        // En el carrito se muestra el mueble, no el retazo de tela.
        image: product.image || match.image || "",
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
        {match && !tienePrecio(match.prices) ? (
          <span className="text-xl font-medium uppercase tracking-[0.12em] text-ink/55">
            {PRECIO_PENDIENTE}
          </span>
        ) : match ? (
          match.on_sale ? (
            <>
              <span className="text-3xl font-semibold text-ink">
                {money(match.prices.sale_price, match.prices)}
              </span>
              <span className="text-lg text-ink/40 line-through">
                {money(match.prices.regular_price, match.prices)}
              </span>
              <span className="rounded-full bg-sale px-3 py-1 text-xs font-bold text-white">
                -{descuento(match.prices)}%
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
      {(!match || tienePrecio(match.prices)) && (
        <p className="mt-1 text-sm text-ink/50">
          IVA incluido · {SHIPPING_INLINE}
        </p>
      )}

      {/* Selectores */}
      <div className="mt-6 space-y-6">
        {options.map((o) => {
          const circulos = esColor(o.name) && o.choices.some((c) => c.image);
          return (
            <div key={o.name}>
              <span className="mb-2 block text-xs font-medium uppercase tracking-[0.18em] text-ink/45">
                {o.name}
                {circulos && selected[o.name] && (
                  <span className="ml-2 normal-case tracking-normal text-ink/70">
                    {o.choices.find((c) => c.slug === selected[o.name])?.name}
                  </span>
                )}
              </span>

              {circulos ? (
                <div className="flex flex-wrap gap-5">
                  {o.choices.map((c) => {
                    const activo = selected[o.name] === c.slug;
                    return (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => pick(o.name, c.slug)}
                        title={c.name}
                        aria-label={c.name}
                        aria-pressed={activo}
                        className="group flex w-[72px] flex-col items-center gap-2 focus:outline-none"
                      >
                        <span
                          className={`block h-[58px] w-[58px] rounded-full bg-cover bg-center shadow-[inset_0_1px_2px_rgba(0,0,0,0.06)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_6px_14px_rgba(0,0,0,0.10)] ${
                            activo
                              ? "ring-2 ring-ink ring-offset-2 ring-offset-white"
                              : "ring-1 ring-black/10"
                          }`}
                          style={
                            c.image
                              ? { backgroundImage: `url('${c.image}')` }
                              : { backgroundColor: "#EDE8E0" }
                          }
                        />
                        <span
                          className={`text-center text-[12.5px] leading-tight ${
                            activo ? "text-ink" : "text-ink/55"
                          }`}
                        >
                          {c.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ) : (
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
              )}
            </div>
          );
        })}
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
