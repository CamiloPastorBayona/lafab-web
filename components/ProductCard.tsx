"use client";

import Link from "next/link";
import { WCProduct, money } from "@/lib/woocommerce";
import { useCart } from "@/lib/cart";
import WpImage from "@/components/WpImage";

export default function ProductCard({ product }: { product: WCProduct }) {
  const img = product.images?.[0];
  const p = product.prices;
  const { add } = useCart();

  const href = `/producto/${product.slug}`;
  // Los productos variables (tela, puestos…) no se pueden agregar directo: hay que
  // elegir la variación en la ficha. Si no, se agregaría el "padre" sin opciones.
  const isVariable = product.type === "variable" || product.has_options;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isVariable || !product.is_purchasable || !product.is_in_stock) {
      window.location.href = href;
      return;
    }
    add(
      {
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: img?.thumbnail || img?.src || "",
        price: parseInt(product.on_sale ? p.sale_price : p.price, 10),
      },
      1
    );
  };

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
      {/* Foto (enlace a la ficha) */}
      <Link href={href} className="absolute inset-0">
        {img ? (
          <WpImage
            src={img.thumbnail || img.src}
            srcSet={img.thumbnail_srcset}
            sizes="(max-width: 768px) 50vw, 25vw"
            alt={img.alt || product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gold-dark/40">
            Sin imagen
          </div>
        )}
      </Link>

      {product.on_sale && (
        <span className="absolute left-3 top-3 z-10 rounded-full bg-sale px-3 py-1 text-xs font-semibold text-white">
          Oferta
        </span>
      )}

      {/* Overlay: visible en móvil, aparece en hover en desktop */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/25 to-transparent p-4 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
        <Link href={href} className="pointer-events-auto">
          <h3 className="text-base font-medium text-white drop-shadow-sm">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1 flex items-baseline gap-2">
          {product.on_sale ? (
            <>
              <span className="text-lg font-semibold text-white">
                {money(p.sale_price, p)}
              </span>
              <span className="text-sm text-white/60 line-through">
                {money(p.regular_price, p)}
              </span>
            </>
          ) : (
            <span className="text-lg font-semibold text-white">
              {money(p.price, p)}
            </span>
          )}
        </div>

        <button
          onClick={handleAdd}
          className="pointer-events-auto mt-3 translate-y-1 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink opacity-100 transition-all hover:bg-gold md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
        >
          {isVariable
            ? "Elegir opciones"
            : product.is_in_stock
              ? "Agregar al carrito"
              : "Ver producto"}
        </button>
      </div>
    </div>
  );
}
