"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SANDIEGO } from "@/lib/sandiego";
import { useCart, formatCOP } from "@/lib/cart";

const ENVIOS = ["Medellín · Área metropolitana", "Nacional · ciudad capital"];

export default function SanDiegoConfigurator() {
  const { add } = useCart();
  const router = useRouter();

  const [medida, setMedida] = useState(SANDIEGO.medidas[2]); // 190 cm
  const [telaKey, setTelaKey] = useState("mon");
  const tela = SANDIEGO.telas.find((t) => t.key === telaKey)!;
  const colors = SANDIEGO.configColors[telaKey];
  const [colorName, setColorName] = useState(colors[0].name);
  const color = colors.find((c) => c.name === colorName) ?? colors[0];
  const [envio, setEnvio] = useState(ENVIOS[0]);

  const changeTela = (key: string) => {
    setTelaKey(key);
    setColorName(SANDIEGO.configColors[key][0].name);
  };

  const buy = () => {
    add(
      {
        id: SANDIEGO.productId,
        name: `${SANDIEGO.name} · ${medida} · ${tela.name} · ${color.name}`,
        slug: SANDIEGO.slug,
        image: color.img,
        price: SANDIEGO.price,
      },
      1
    );
    router.push("/checkout");
  };

  const label =
    "mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-ink/50";

  return (
    <div className="grid gap-8 rounded-3xl bg-white p-6 shadow-lg md:grid-cols-2 md:p-8">
      {/* Imagen (cambia según el color) */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={color.img}
          src={color.img}
          alt={`${SANDIEGO.name} ${color.name}`}
          className="lf-fade absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink">
          {color.name}
        </span>
      </div>

      {/* Opciones */}
      <div>
        <h3 className="text-2xl font-light text-ink">{SANDIEGO.name}</h3>
        <p className="mt-1 text-ink/60">{SANDIEGO.tagline}.</p>

        <div className="mt-6">
          <span className={label}>Elige la medida</span>
          <div className="flex flex-wrap gap-2">
            {SANDIEGO.medidas.map((m) => (
              <button
                key={m}
                onClick={() => setMedida(m)}
                className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                  medida === m
                    ? "border-ink bg-ink text-white"
                    : "border-ink/15 text-ink/70 hover:border-ink/40"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <span className={label}>Elige el material de tapizado</span>
          <div className="grid grid-cols-2 gap-2">
            {SANDIEGO.telas.map((t) => (
              <button
                key={t.key}
                onClick={() => changeTela(t.key)}
                className={`rounded-xl border px-3 py-3 text-left text-sm transition-colors ${
                  telaKey === t.key
                    ? "border-ink bg-cream"
                    : "border-ink/15 hover:border-ink/40"
                }`}
              >
                <span className="block font-medium text-ink">{t.name}</span>
                <span className="text-xs text-ink/50">{t.short}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <span className={label}>Elige el color · {tela.name}</span>
          <div className="flex flex-wrap gap-3">
            {colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColorName(c.name)}
                title={c.name}
                className="flex flex-col items-center gap-1"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.swatch}
                  alt={c.name}
                  className={`h-9 w-9 rounded-full border-2 object-cover transition ${
                    colorName === c.name ? "border-ink" : "border-ink/15"
                  }`}
                  loading="lazy"
                />
                <span
                  className={`text-xs ${
                    colorName === c.name ? "text-ink" : "text-ink/50"
                  }`}
                >
                  {c.name}
                </span>
              </button>
            ))}
          </div>
          <p className="mt-2 text-xs text-ink/40">
            El tono puede variar según el dispositivo y el lote de la tela.
          </p>
        </div>

        <div className="mt-5">
          <span className={label}>Envío</span>
          <div className="flex flex-col gap-2">
            {ENVIOS.map((e) => (
              <button
                key={e}
                onClick={() => setEnvio(e)}
                className={`rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${
                  envio === e
                    ? "border-ink bg-cream font-medium text-ink"
                    : "border-ink/15 text-ink/70 hover:border-ink/40"
                }`}
              >
                {e} · envío incluido
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-ink/10 pt-4">
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-ink">
              {formatCOP(SANDIEGO.price)}
            </span>
            <span className="text-lg text-ink/40 line-through">
              {formatCOP(SANDIEGO.regularPrice)}
            </span>
          </div>
          <p className="text-sm text-ink/50">
            Sofá · Envío incluido · IVA incluido
          </p>
          <button
            onClick={buy}
            className="mt-4 w-full rounded-md bg-ink px-6 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.02]"
          >
            Comprar mi sofá
          </button>
        </div>
      </div>
    </div>
  );
}
