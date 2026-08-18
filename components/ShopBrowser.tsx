"use client";

import { useMemo, useState, type ReactNode } from "react";
import { WCProduct } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";

type Cat = { id: number; name: string; slug: string; count: number };

// Forma real de un atributo en la Store API de WooCommerce.
type WCAttr = {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: { id: number; name: string; slug: string }[];
};
type Facet = {
  taxonomy: string;
  name: string;
  terms: Map<string, { name: string; count: number }>;
};

const SORTS = [
  { key: "date", label: "Novedades" },
  { key: "price-asc", label: "Precio: menor a mayor" },
  { key: "price-desc", label: "Precio: mayor a menor" },
  { key: "name", label: "Nombre (A–Z)" },
];

const PRICE_BRACKETS = [
  { label: "Hasta $2M", min: 0, max: 2_000_000 },
  { label: "$2M – $4M", min: 2_000_000, max: 4_000_000 },
  { label: "$4M – $6M", min: 4_000_000, max: 6_000_000 },
  { label: "Más de $6M", min: 6_000_000, max: Infinity },
];

// Atributos que se muestran como filtro, en orden. El resto se omite. Se
// rellenan solos si los productos tienen esos atributos asignados en WooCommerce.
const FACET_TAXONOMIES = [
  "pa_tapizado",
  "pa_caracteristica",
  "pa_color",
  "pa_medida",
  "pa_tipo-de-madera",
];
const HIDDEN_TERMS = new Set(["no aplica", "sin especificar"]);

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="border-t border-ink/10 py-5 first:border-t-0 first:pt-0">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink/40">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function ShopBrowser({ products }: { products: WCProduct[] }) {
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("date");
  const [priceIdx, setPriceIdx] = useState<number | null>(null);
  const [terms, setTerms] = useState<Record<string, Set<string>>>({});
  const [drawer, setDrawer] = useState(false);

  const categories = useMemo<Cat[]>(() => {
    const map = new Map<number, Cat>();
    for (const p of products) {
      for (const c of p.categories) {
        const prev = map.get(c.id);
        if (prev) prev.count += 1;
        else map.set(c.id, { id: c.id, name: c.name, slug: c.slug, count: 1 });
      }
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }, [products]);

  const facets = useMemo<Facet[]>(() => {
    const map = new Map<string, Facet>();
    for (const p of products) {
      for (const a of (p.attributes as WCAttr[]) ?? []) {
        if (!a?.taxonomy || !a.terms?.length) continue;
        if (!FACET_TAXONOMIES.includes(a.taxonomy)) continue;
        let facet = map.get(a.taxonomy);
        if (!facet) {
          facet = { taxonomy: a.taxonomy, name: a.name, terms: new Map() };
          map.set(a.taxonomy, facet);
        }
        for (const t of a.terms) {
          if (HIDDEN_TERMS.has(t.name.trim().toLowerCase())) continue;
          const prev = facet.terms.get(t.slug);
          if (prev) prev.count += 1;
          else facet.terms.set(t.slug, { name: t.name, count: 1 });
        }
      }
    }
    return [...map.values()]
      .filter((f) => f.terms.size > 0)
      .sort(
        (a, b) =>
          FACET_TAXONOMIES.indexOf(a.taxonomy) -
          FACET_TAXONOMIES.indexOf(b.taxonomy)
      );
  }, [products]);

  const price = (p: WCProduct) => Number(p.prices.price) || 0;

  const toggleTerm = (taxonomy: string, slug: string) => {
    setTerms((prev) => {
      const next = { ...prev };
      const set = new Set(next[taxonomy] ?? []);
      if (set.has(slug)) set.delete(slug);
      else set.add(slug);
      if (set.size === 0) delete next[taxonomy];
      else next[taxonomy] = set;
      return next;
    });
  };

  const clearAll = () => {
    setQuery("");
    setActiveCat(null);
    setPriceIdx(null);
    setTerms({});
  };

  const activeCount =
    (activeCat !== null ? 1 : 0) +
    (priceIdx !== null ? 1 : 0) +
    Object.values(terms).reduce((s, set) => s + set.size, 0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const bracket = priceIdx !== null ? PRICE_BRACKETS[priceIdx] : null;

    const list = products.filter((p) => {
      const matchCat =
        activeCat === null || p.categories.some((c) => c.id === activeCat);
      const matchQuery = !q || p.name.toLowerCase().includes(q);
      const pr = price(p);
      const matchPrice = !bracket || (pr >= bracket.min && pr < bracket.max);
      const matchAttrs = Object.entries(terms).every(([taxonomy, slugs]) => {
        const attrs = (p.attributes as WCAttr[]) ?? [];
        const a = attrs.find((x) => x.taxonomy === taxonomy);
        return !!a && a.terms.some((t) => slugs.has(t.slug));
      });
      return matchCat && matchQuery && matchPrice && matchAttrs;
    });

    switch (sort) {
      case "price-asc":
        return [...list].sort((a, b) => price(a) - price(b));
      case "price-desc":
        return [...list].sort((a, b) => price(b) - price(a));
      case "name":
        return [...list].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return list;
    }
  }, [products, activeCat, query, sort, priceIdx, terms]);

  // --- Pills de filtros activos (removibles) ---
  type Pill = { key: string; label: string; remove: () => void };
  const activePills: Pill[] = [];
  if (activeCat !== null) {
    const c = categories.find((x) => x.id === activeCat);
    if (c) activePills.push({ key: "cat", label: c.name, remove: () => setActiveCat(null) });
  }
  if (priceIdx !== null)
    activePills.push({
      key: "price",
      label: PRICE_BRACKETS[priceIdx].label,
      remove: () => setPriceIdx(null),
    });
  for (const f of facets) {
    for (const slug of terms[f.taxonomy] ?? []) {
      const t = f.terms.get(slug);
      if (t)
        activePills.push({
          key: `${f.taxonomy}-${slug}`,
          label: t.name,
          remove: () => toggleTerm(f.taxonomy, slug),
        });
    }
  }

  const catRow = (active: boolean) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
      active
        ? "bg-cream font-medium text-ink"
        : "text-ink/70 hover:bg-cream/60 hover:text-ink"
    }`;
  const pill = (active: boolean) =>
    `rounded-full border px-3.5 py-1.5 text-sm transition-all ${
      active
        ? "border-ink bg-ink text-white"
        : "border-ink/15 text-ink/70 hover:border-ink/40 hover:text-ink"
    }`;

  // Panel de filtros (se usa como sidebar en desktop y como drawer en móvil).
  const panel = (
    <div>
      <Group title="Categoría">
        <ul className="space-y-0.5">
          <li>
            <button onClick={() => setActiveCat(null)} className={catRow(activeCat === null)}>
              <span>Todos</span>
              <span className="text-ink/40">{products.length}</span>
            </button>
          </li>
          {categories.map((c) => (
            <li key={c.id}>
              <button onClick={() => setActiveCat(c.id)} className={catRow(activeCat === c.id)}>
                <span>{c.name}</span>
                <span className="text-ink/40">{c.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Precio">
        <div className="flex flex-wrap gap-2">
          {PRICE_BRACKETS.map((b, i) => (
            <button
              key={b.label}
              onClick={() => setPriceIdx(priceIdx === i ? null : i)}
              className={pill(priceIdx === i)}
            >
              {b.label}
            </button>
          ))}
        </div>
      </Group>

      {facets.map((f) => (
        <Group key={f.taxonomy} title={f.name}>
          <div className="flex flex-wrap gap-2">
            {[...f.terms.entries()].map(([slug, t]) => {
              const active = terms[f.taxonomy]?.has(slug) ?? false;
              return (
                <button
                  key={slug}
                  onClick={() => toggleTerm(f.taxonomy, slug)}
                  className={pill(active)}
                >
                  {t.name} <span className="opacity-50">{t.count}</span>
                </button>
              );
            })}
          </div>
        </Group>
      ))}
    </div>
  );

  return (
    <div>
      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-full border border-ink/15 bg-white px-4 py-2.5 focus-within:border-gold">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-ink/40">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar muebles…"
            className="w-full bg-transparent text-ink outline-none placeholder:text-ink/40"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Limpiar búsqueda" className="text-ink/40 hover:text-ink">
              ×
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Botón Filtros (móvil) */}
          <button
            onClick={() => setDrawer(true)}
            className="flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/40 lg:hidden"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            Filtros
            {activeCount > 0 && (
              <span className="flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-ink px-1 text-xs font-bold text-white">
                {activeCount}
              </span>
            )}
          </button>

          <div className="relative flex-1 sm:flex-none">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full appearance-none rounded-full border border-ink/15 bg-white py-2.5 pl-4 pr-10 text-sm text-ink outline-none transition-colors hover:border-ink/40 focus:border-gold"
            >
              {SORTS.map((s) => (
                <option key={s.key} value={s.key}>
                  {s.label}
                </option>
              ))}
            </select>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Pills de filtros activos */}
      {activePills.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          {activePills.map((p) => (
            <button
              key={p.key}
              onClick={p.remove}
              className="group flex items-center gap-1.5 rounded-full bg-cream px-3 py-1.5 text-sm text-ink transition-colors hover:bg-ink hover:text-white"
            >
              {p.label}
              <span className="text-ink/40 group-hover:text-white/70">×</span>
            </button>
          ))}
          <button onClick={clearAll} className="ml-1 text-sm font-medium text-gold-dark hover:underline">
            Limpiar todo
          </button>
        </div>
      )}

      {/* Cuerpo: sidebar + grid */}
      <div className="mt-6 lg:grid lg:grid-cols-[248px_1fr] lg:gap-10">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-ink/10 bg-white p-5">
            {panel}
          </div>
        </aside>

        {/* Grid */}
        <div>
          <p className="mb-5 text-sm text-ink/50">
            {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          </p>
          {filtered.length > 0 ? (
            <div
              key={`${activeCat}-${sort}-${priceIdx}`}
              className="lf-fade grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6"
            >
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl bg-cream py-16 text-center">
              <p className="text-ink/50">No encontramos productos para tu búsqueda.</p>
              <button
                onClick={clearAll}
                className="mt-4 rounded-full border border-ink/20 px-6 py-2.5 text-sm font-medium text-ink hover:bg-white"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Drawer de filtros (móvil) */}
      <div className={`fixed inset-0 z-[60] lg:hidden ${drawer ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            drawer ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            drawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
            <h2 className="text-lg font-medium text-ink">Filtros</h2>
            <button
              onClick={() => setDrawer(false)}
              aria-label="Cerrar filtros"
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink/60 hover:bg-cream"
            >
              <span className="text-2xl leading-none">×</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5">{panel}</div>
          <div className="flex gap-3 border-t border-ink/10 px-5 py-4">
            <button
              onClick={clearAll}
              className="rounded-full border border-ink/20 px-5 py-3 text-sm font-medium text-ink"
            >
              Limpiar
            </button>
            <button
              onClick={() => setDrawer(false)}
              className="flex-1 rounded-full bg-ink px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Ver {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
