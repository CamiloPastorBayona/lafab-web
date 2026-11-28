"use client";

// Plazo de entrega de la temporada, en la ficha de producto y en el checkout.
//
// Se decide en el cliente, igual que el aviso de campaña: la ficha se cachea
// con ISR, así que evaluar la vigencia al renderizar dejaría el aviso vivo
// hasta la siguiente revalidación, ya entrado enero.

import { useEffect, useState } from "react";
import { TEMPORADA, temporadaVigente } from "@/lib/temporada";
import Ico from "@/components/LandingIcons";

export default function AvisoTemporada({
  donde = "ficha",
}: {
  donde?: "ficha" | "checkout";
}) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    setMostrar(temporadaVigente());
  }, []);

  if (!mostrar) return null;

  return (
    <p
      className={`flex items-start gap-2 rounded-xl border border-gold/35 bg-gold/10 px-4 py-3 text-sm text-ink/75 ${
        donde === "checkout" ? "mt-5" : "mt-3"
      }`}
    >
      <Ico name="truck" className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
      <span>{donde === "checkout" ? TEMPORADA.checkout : TEMPORADA.ficha}</span>
    </p>
  );
}
