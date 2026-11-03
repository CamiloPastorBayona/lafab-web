"use client";

// Cuenta regresiva de la campaña, en cuatro bloques.
//
// Se calcula en el cliente: la página se cachea con ISR, así que un número
// renderizado en el servidor quedaría congelado hasta la siguiente
// revalidación y estaría mintiendo a los pocos minutos.

import { useEffect, useState } from "react";
import { restante } from "@/lib/promo";

const CAJAS = [
  ["dias", "días"],
  ["horas", "horas"],
  ["minutos", "min"],
  ["segundos", "seg"],
] as const;

export default function CuentaRegresiva({
  className = "",
}: {
  className?: string;
}) {
  const [t, setT] = useState<ReturnType<typeof restante> | null>(null);

  useEffect(() => {
    const tic = () => setT(restante());
    tic();
    const id = setInterval(tic, 1000);
    return () => clearInterval(id);
  }, []);

  // Antes del primer efecto se reserva la altura, para que al aparecer no
  // empuje el contenido de abajo.
  if (!t) return <div className={`h-[86px] ${className}`} aria-hidden />;
  if (t.terminado) return null;

  return (
    <div className={`flex gap-3 ${className}`}>
      {CAJAS.map(([clave, etiqueta]) => (
        <div
          key={clave}
          className="min-w-[66px] rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-center backdrop-blur-sm"
        >
          <span className="block text-2xl font-light tabular-nums text-white">
            {String(t[clave]).padStart(2, "0")}
          </span>
          <span className="mt-0.5 block text-[10px] uppercase tracking-[0.18em] text-white/50">
            {etiqueta}
          </span>
        </div>
      ))}
    </div>
  );
}
