"use client";

// Las landings de producto comparten diseño y cambian solo el contenido. En vez
// de pasar el objeto por cada componente, se deja aquí y cada pieza lo lee.

import { createContext, useContext, type ReactNode } from "react";
import { SANDIEGO_LANDING, type Landing } from "@/lib/sandiego";

const LandingCtx = createContext<Landing>(SANDIEGO_LANDING);

export function LandingProvider({
  value,
  children,
}: {
  value: Landing;
  children: ReactNode;
}) {
  return <LandingCtx.Provider value={value}>{children}</LandingCtx.Provider>;
}

export function useLanding(): Landing {
  return useContext(LandingCtx);
}
