"use client";

// Datos reales del producto (variaciones del CMS) para el configurador de las
// landings. Antes el configurador traía las telas escritas a mano, así que
// /luton ofrecía las telas del San Diego y un precio fijo que no correspondía
// al material elegido. Ahora la landing recibe las variaciones de WooCommerce
// y de ahí salen materiales, colores, medidas y precios.

import { createContext, useContext, type ReactNode } from "react";
import type { WCVariation } from "@/lib/woocommerce";

export type LandingCatalog = {
  variations: WCVariation[];
  /** Foto del producto en el CMS, por si un color no tiene foto propia. */
  productImage: string;
};

const Ctx = createContext<LandingCatalog | null>(null);

export function LandingCatalogProvider({
  value,
  children,
}: {
  value: LandingCatalog | null;
  children: ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useLandingCatalog(): LandingCatalog | null {
  return useContext(Ctx);
}
