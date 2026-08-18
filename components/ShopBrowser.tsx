"use client";

import { useMemo, useState } from "react";
import { WCProduct } from "@/lib/woocommerce";
import ProductCard from "@/components/ProductCard";

type Cat = { id: number; name: string; slug: string; count: number };

const SORTS = [
  { key: "date", label: "Novedades" },
  { key: "price-asc", label: "Precio: menor a mayor" },
  { key: "price-desc", label: "Precio: mayor a menor" },
  { key: "name", label: "Nombre (A–Z)" },
];

export default function ShopBrowser({ products }: { products: WCProduct[] }) {
  const [activeCat, setActiveCat] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("date");

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

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = products.filter((p) => {
      const matchCat =
        activeCat === null || p.categories.some((c) => c.id === activeCat);
      const matchQuery = !q || p.name.toLowerCase().includes(q);
      return matchCat && matchQuery;
    });
    const price = (p: WCProduct) => Number(p.prices.price) || 0;
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
  }, [products, activeCat, query, sort]);

  const chip = (active: boolean) =>
    `whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-all ${
      active
        ? "border-ink bg-ink text-white shadow-sm"
        : "border-ink/15 text-ink/70 hover:border-ink/50 hover:text-ink"
    }`;

  return (
    <div>
      {/* Barra de filtros pegajosa */}
      <div className="sticky top-16 z-20 -mx-4 bg-white/90 px-4 py-4 backdrop-blur md:mx-0 md:rounded-2xl md:px-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-3 rounded-full border border-ink/15 px-4 py-2.5 focus-within:border-gold">
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
              <button onClick={() => setQuery("")} aria-label="Limpiar" className="text-ink/40 hover:text-ink">
                ×
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <label className="hidden shrink-0 text-sm text-ink/50 sm:block">
              Ordenar
            </label>
            <div className="relative w-full sm:w-auto">
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
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/40"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Chips de categorías */}
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <button onClick={() => setActiveCat(null)} className={chip(activeCat === null)}>
            Todos <span className="opacity-60">({products.length})</span>
          </button>
          {categories.map((c) => (
            <button key={c.id} onClick={() => setActiveCat(c.id)} className={chip(activeCat === c.id)}>
              {c.name} <span className="opacity-60">({c.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Contador */}
      <p className="mb-6 mt-6 text-sm text-ink/50">
        {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div
          key={`${activeCat}-${sort}`}
          className="lf-fade grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl bg-cream py-16 text-center">
          <p className="text-ink/50">No encontramos productos para tu búsqueda.</p>
          <button
            onClick={() => {
              setQuery("");
              setActiveCat(null);
            }}
            className="mt-4 rounded-full border border-ink/20 px-6 py-2.5 text-sm font-medium text-ink hover:bg-white"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </div>
  );
}
