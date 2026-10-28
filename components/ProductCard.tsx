"use client";

import Link from "next/link";
import {
  WCProduct,
  money,
  descuento,
  tienePrecio,
  PRECIO_PENDIENTE,
} from "@/lib/woocommerce";
import { useCart } from "@/lib/cart";
import WpImage from "@/components/WpImage";

export default function ProductCard({ product }: { product: WCProduct }) {
  const img = product.images?.[0];
  const p = product.prices;
  const { add } = useCart();

  const href = `/producto/${product.slug}`;
  // Los productos variables (tela, puestos…) no se pueden agregar directo: hay
  // que elegir la variación en la ficha. Si no, se agregaría el "padre" sin
  // opciones.
  const isVariable = product.type === "variable" || product.has_options;
  const sinPrecio = !tienePrecio(p);
  const pct = descuento(p);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isVariable || sinPrecio || !product.is_purchasable || !product.is_in_stock) {
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

  const etiquetaBoton = sinPrecio
    ? "Ver ficha"
    : isVariable
      ? "Elegir opciones"
      : product.is_in_stock
        ? "Añadir al carrito"
        : "Ver ficha";

  // El precio se arma una sola vez y se reutiliza arriba y abajo.
  const precio = (claro: boolean) => {
    const tono = claro ? "text-white" : "text-ink";
    const tenue = claro ? "text-white/60" : "text-ink/40";
    if (sinPrecio)
      return (
        <span
          className={`text-[11px] font-medium uppercase tracking-[0.12em] ${
            claro ? "text-white/80" : "text-ink/50"
          }`}
        >
          {PRECIO_PENDIENTE}
        </span>
      );
    if (product.on_sale)
      return (
        <>
          <span className={`text-base font-semibold ${tono} md:text-lg`}>
            {money(p.sale_price, p)}
          </span>
          <span className={`text-sm line-through ${tenue}`}>
            {money(p.regular_price, p)}
          </span>
        </>
      );
    if (p.price_range)
      return (
        // Variable: el precio mostrado es el más bajo (Tela), no el final.
        <span className={`text-base font-semibold ${tono} md:text-lg`}>
          <span
            className={`mr-1 text-xs font-normal uppercase tracking-[0.12em] ${
              claro ? "text-white/70" : "text-ink/45"
            }`}
          >
            Desde
          </span>
          {money(p.price_range.min_amount, p)}
        </span>
      );
    return (
      <span className={`text-base font-semibold ${tono} md:text-lg`}>
        {money(p.price, p)}
      </span>
    );
  };

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream">
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

        {/* Cuánto se ahorra, no la palabra "Oferta": el número vende más y
            sale del propio precio, así que nunca miente. */}
        {product.on_sale && pct !== null && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-sale px-2.5 py-1 text-xs font-bold leading-none text-white shadow-[0_2px_10px_rgba(0,0,0,0.18)]">
            -{pct}%
          </span>
        )}

        {/* Capa con la información encima de la foto: solo en escritorio y al
            pasar el mouse. En móvil tapaba la foto de forma permanente y el
            mueble no se veía, que es lo que se vende. */}
        <div className="pointer-events-none absolute inset-0 hidden flex-col justify-end bg-gradient-to-t from-ink/90 via-ink/25 to-transparent p-4 opacity-0 transition-opacity duration-300 md:flex md:group-hover:opacity-100">
          <Link href={href} className="pointer-events-auto">
            <h3 className="text-base font-medium text-white drop-shadow-sm">
              {product.name}
            </h3>
          </Link>
          <div className="mt-1 flex items-baseline gap-2">{precio(true)}</div>
          <button
            onClick={handleAdd}
            className="pointer-events-auto mt-3 translate-y-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-ink opacity-0 transition-all hover:bg-gold group-hover:translate-y-0 group-hover:opacity-100"
          >
            {etiquetaBoton}
          </button>
        </div>
      </div>

      {/* Información debajo de la foto: solo en móvil y tablet. */}
      <div className="mt-3 flex flex-1 flex-col md:hidden">
        <Link href={href}>
          <h3 className="text-sm font-medium leading-snug text-ink">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          {precio(false)}
        </div>
        <button
          onClick={handleAdd}
          className="mt-3 w-full rounded-full border border-ink/15 py-2.5 text-xs font-semibold text-ink transition-colors active:bg-ink active:text-white"
        >
          {etiquetaBoton}
        </button>
      </div>
    </div>
  );
}
