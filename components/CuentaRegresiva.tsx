"use client";

import { useEffect, useState } from "react";
import { INICIO_MS, LANZAMIENTO_MS, VENTANA_MS } from "@/lib/lanzamiento";

type Resto = { d: number; h: number; m: number; s: number; falta: number };

function calcular(): Resto {
  const falta = Math.max(0, LANZAMIENTO_MS - Date.now());
  const seg = Math.floor(falta / 1000);
  return {
    d: Math.floor(seg / 86400),
    h: Math.floor((seg % 86400) / 3600),
    m: Math.floor((seg % 3600) / 60),
    s: seg % 60,
    falta,
  };
}

const dos = (n: number) => String(n).padStart(2, "0");

function Casilla({ valor, etiqueta }: { valor: string; etiqueta: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative flex h-20 w-[4.5rem] items-center justify-center rounded-xl border border-cream/12 bg-cream/[0.04] backdrop-blur-sm sm:h-28 sm:w-28">
        <span className="font-morality text-3xl tabular-nums leading-none text-cream sm:text-5xl">
          {valor}
        </span>
      </div>
      <span className="mt-2.5 text-[10px] uppercase tracking-[0.22em] text-cream/45 sm:text-[11px]">
        {etiqueta}
      </span>
    </div>
  );
}

export default function CuentaRegresiva() {
  const [resto, setResto] = useState<Resto | null>(null);

  useEffect(() => {
    setResto(calcular());
    const id = setInterval(() => setResto(calcular()), 1000);
    return () => clearInterval(id);
  }, []);

  // Cuando llega la hora, la página se recarga: el middleware ya deja pasar.
  useEffect(() => {
    if (resto && resto.falta === 0) window.location.reload();
  }, [resto]);

  const avance = resto
    ? Math.min(100, Math.max(0, ((Date.now() - INICIO_MS) / VENTANA_MS) * 100))
    : 0;

  return (
    <div className="w-full">
      <div className="flex items-start justify-center gap-2.5 sm:gap-5">
        <Casilla valor={resto ? dos(resto.d) : "--"} etiqueta="Días" />
        <Casilla valor={resto ? dos(resto.h) : "--"} etiqueta="Horas" />
        <Casilla valor={resto ? dos(resto.m) : "--"} etiqueta="Minutos" />
        <Casilla valor={resto ? dos(resto.s) : "--"} etiqueta="Segundos" />
      </div>

      <div className="mx-auto mt-10 h-px w-full max-w-md overflow-hidden bg-cream/10">
        <div
          className="h-full bg-gradient-to-r from-gold-dark via-gold to-gold-light transition-[width] duration-1000 ease-linear"
          style={{ width: `${avance}%` }}
        />
      </div>
    </div>
  );
}
