"use client";

// "Bondades del producto": carrusel horizontal automático (reloj rAF sin drift),
// dots y swipe táctil. Acoplado a la marca: título/h3 en morality, base Poppins,
// eyebrow gold (#7A6A45), número en gold-light (#CABBA0).

import { useEffect, useRef, useState, type TouchEvent } from "react";
import { SANDIEGO } from "@/lib/sandiego";

const CSS = `
#lf-story,#lf-story *{box-sizing:border-box;margin:0;padding:0;}
#lf-story{width:100%;background:#fff;color:#151515;font-family:var(--font-poppins),system-ui,sans-serif;
  padding:clamp(56px,9vw,100px) clamp(20px,5vw,70px);}
#lf-story .lfst-head{max-width:1200px;margin:0 auto clamp(30px,4vw,52px);text-align:center;}
#lf-story .lfst-eyebrow{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#7A6A45;}
#lf-story .lfst-title{font-weight:300;font-size:clamp(26px,3.6vw,50px);letter-spacing:-.01em;margin-top:12px;white-space:nowrap;}
#lf-story .lfst-viewport{max-width:1200px;margin:0 auto;overflow:hidden;touch-action:pan-y;}
#lf-story .lfst-track{display:flex;transition:transform .5s cubic-bezier(.65,0,.25,1);will-change:transform;}
#lf-story .lfst-slide{flex:0 0 100%;display:grid;grid-template-columns:1fr 1fr;gap:clamp(24px,5vw,80px);align-items:center;}
#lf-story .lfst-media{height:clamp(320px,60vh,560px);border-radius:20px;overflow:hidden;background:#EFECE4;}
#lf-story .lfst-media img{width:100%;height:100%;object-fit:cover;display:block;}
#lf-story .lfst-num{font-weight:300;font-size:clamp(40px,4.6vw,60px);color:#CABBA0;line-height:1;}
#lf-story .lfst-text h3{font-weight:500;font-size:clamp(28px,3.4vw,42px);margin:16px 0;letter-spacing:-.01em;color:#151515;}
#lf-story .lfst-text p{font-weight:300;font-size:clamp(17px,1.8vw,20px);line-height:1.65;color:#555;max-width:34ch;}
#lf-story .lfst-dots{display:flex;gap:10px;justify-content:center;margin-top:clamp(24px,4vw,44px);}
#lf-story .lfst-dot{width:9px;height:9px;border:0;border-radius:50%;background:#D8D3C8;cursor:pointer;padding:0;transition:width .35s ease,background .35s ease;}
#lf-story .lfst-dot.is-active{background:#CABBA0;width:28px;border-radius:5px;}
@media (max-width:860px){
  #lf-story{padding:40px 18px;}
  #lf-story .lfst-title{white-space:normal;}
  #lf-story .lfst-slide{grid-template-columns:1fr;gap:22px;align-items:start;}
  #lf-story .lfst-media{height:42vh;min-height:260px;}
  #lf-story .lfst-text p{max-width:100%;}
}
@media (prefers-reduced-motion:reduce){
  #lf-story .lfst-track{transition:none;}
}
`;

const DELAY = 4500;

export default function SanDiegoBondades() {
  const slides = SANDIEGO.bondades;
  const N = slides.length;
  const [i, setI] = useState(0);
  const lastRef = useRef(0);
  const x0 = useRef<number | null>(null);
  const y0 = useRef<number | null>(null);
  const locked = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    if (reduce) return;
    let raf = 0;
    const frame = (t: number) => {
      if (!lastRef.current) lastRef.current = t;
      if (t - lastRef.current >= DELAY) {
        setI((v) => (v + 1) % N);
        lastRef.current = t;
      }
      raf = requestAnimationFrame(frame);
    };
    const onVis = () => {
      if (!document.hidden) lastRef.current = 0;
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [N]);

  const go = (idx: number) => {
    setI(((idx % N) + N) % N);
    lastRef.current = 0;
  };

  const onTouchStart = (e: TouchEvent) => {
    x0.current = e.touches[0].clientX;
    y0.current = e.touches[0].clientY;
    locked.current = false;
  };
  const onTouchMove = (e: TouchEvent) => {
    if (x0.current === null || y0.current === null) return;
    const dx = e.touches[0].clientX - x0.current;
    const dy = e.touches[0].clientY - y0.current;
    if (!locked.current && Math.abs(dx) > Math.abs(dy)) locked.current = true;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (x0.current === null) return;
    const dx = e.changedTouches[0].clientX - x0.current;
    if (locked.current && Math.abs(dx) > 40) go(i + (dx < 0 ? 1 : -1));
    x0.current = null;
    y0.current = null;
  };

  return (
    <section id="lf-story">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="lfst-head">
        <span className="lfst-eyebrow">Diseñado para vivirse a diario</span>
        <h2 className="lfst-title">Bondades del producto.</h2>
      </div>
      <div
        className="lfst-viewport"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="lfst-track"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {slides.map((s) => (
            <article className="lfst-slide" key={s.n}>
              <div className="lfst-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={`${s.title} del Sofá San Diego`} loading="lazy" />
              </div>
              <div className="lfst-text">
                <span className="lfst-num">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.sub}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="lfst-dots">
        {slides.map((s, k) => (
          <button
            key={s.n}
            type="button"
            aria-label={s.title}
            className={`lfst-dot${k === i ? " is-active" : ""}`}
            onClick={() => go(k)}
          />
        ))}
      </div>
    </section>
  );
}
