import Link from "next/link";
import Image from "next/image";
import { WCProduct, money } from "@/lib/woocommerce";

export default function ProductCard({ product }: { product: WCProduct }) {
  const img = product.images?.[0];
  const p = product.prices;

  return (
    <Link
      href={`/producto/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-cream transition-shadow hover:shadow-xl"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        {img ? (
          <Image
            src={img.src}
            alt={img.alt || product.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gold-dark/40">
            Sin imagen
          </div>
        )}
        {product.on_sale && (
          <span className="absolute left-3 top-3 rounded-full bg-sale px-3 py-1 text-xs font-semibold text-white">
            Oferta
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-medium text-ink group-hover:text-gold-dark">
          {product.name}
        </h3>
        <div className="mt-auto pt-3">
          {product.on_sale ? (
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-ink">
                {money(p.sale_price, p)}
              </span>
              <span className="text-sm text-ink/40 line-through">
                {money(p.regular_price, p)}
              </span>
            </div>
          ) : (
            <span className="text-lg font-semibold text-ink">
              {money(p.price, p)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
