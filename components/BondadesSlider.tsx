"use client";

import { useEffect, useRef, useState } from "react";
import { SANDIEGO } from "@/lib/sandiego";
import WpImage from "@/components/WpImage";

export default function BondadesSlider() {
  const items = SANDIEGO.bondades;
  const [active, setActive] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    stop();
    timer.current = setInterval(
      () => setActive((a) => (a + 1) % items.length),
      4000
    );
  };
  const stop = () => {
    if (timer.current) clearInterval(timer.current);
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div onMouseEnter={stop} onMouseLeave={start}>
      <div className="grid items-center gap-8 md:grid-cols-2">
        {/* Imagen */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
          {items.map((b, i) => (
            <WpImage
              key={b.n}
              src={b.img}
              alt={b.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        {/* Texto */}
        <div key={active} className="lf-fade">
          <span className="text-5xl font-light text-gold">
            {items[active].n}
          </span>
          <h3 className="mt-2 text-3xl font-light text-ink">
            {items[active].title}
          </h3>
          <p className="mt-1 text-lg text-ink/60">{items[active].sub}</p>
        </div>
      </div>

      {/* Dots */}
      <div className="mt-8 flex justify-center gap-2.5">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Bondad ${i + 1}`}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all ${
              i === active ? "w-7 bg-gold" : "w-2 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
