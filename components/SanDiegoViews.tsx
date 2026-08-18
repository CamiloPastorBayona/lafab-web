"use client";

// "Míralo desde todos los ángulos": marquee horizontal en loop infinito por
// transform (sin salto), arrastre solo en táctil. Acoplado a la marca: título en
// morality, base Poppins, eyebrow gold (#7A6A45). Set de 4 cards duplicado.

import { useEffect, useRef } from "react";
import { SANDIEGO } from "@/lib/sandiego";

const CSS = `
#lf-views,#lf-views *{box-sizing:border-box;margin:0;padding:0;}
#lf-views{width:100%;max-width:100%;background:#fff;color:#151515;font-family:var(--font-poppins),system-ui,sans-serif;
  padding:clamp(56px,9vw,100px) 0;overflow:hidden;}
#lf-views .lfv-head{max-width:1200px;margin:0 auto clamp(28px,4vw,48px);padding:0 clamp(20px,5vw,70px);text-align:center;}
#lf-views .lfv-eyebrow{font-size:12px;letter-spacing:4px;text-transform:uppercase;color:#7A6A45;}
#lf-views .lfv-title{font-weight:300;font-size:clamp(28px,3.6vw,50px);letter-spacing:-.01em;margin-top:12px;}
#lf-views .lfv-marquee{width:100%;max-width:100%;overflow:hidden;cursor:default;
  -webkit-mask-image:linear-gradient(90deg,transparent 0,#000 6%,#000 94%,transparent 100%);
  mask-image:linear-gradient(90deg,transparent 0,#000 6%,#000 94%,transparent 100%);}
#lf-views .lfv-track{display:flex;width:max-content;will-change:transform;}
#lf-views .lfv-card{flex:0 0 auto;width:clamp(240px,26vw,360px);margin-right:clamp(16px,2vw,28px);
  user-select:none;-webkit-user-select:none;}
#lf-views .lfv-media{border-radius:16px;overflow:hidden;aspect-ratio:4/5;background:#EFECE4;}
#lf-views .lfv-media img{width:100%;height:100%;object-fit:cover;display:block;
  pointer-events:none;-webkit-user-drag:none;user-select:none;}
#lf-views .lfv-card figcaption{margin-top:12px;font-size:12px;letter-spacing:.22em;
  text-transform:uppercase;font-weight:500;color:#6B6B6B;}
@media (pointer:coarse){
  #lf-views .lfv-marquee{cursor:grab;touch-action:pan-y;}
  #lf-views .lfv-marquee.is-drag{cursor:grabbing;}
}
@media(max-width:600px){
  #lf-views .lfv-card{width:72vw;}
}
`;

const PER_SET = 4;
const SPEED = 0.5;

export default function SanDiegoViews() {
  const rootRef = useRef<HTMLElement | null>(null);
  const views = SANDIEGO.vistas;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const vp = root.querySelector(".lfv-marquee") as HTMLElement | null;
    const track = root.querySelector(".lfv-track") as HTMLElement | null;
    if (!vp || !track) return;
    const cards = track.children;
    const reduce = window.matchMedia?.("(prefers-reduced-motion:reduce)").matches;
    const isTouch =
      window.matchMedia?.("(pointer:coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    let offset = 0;
    let period = 0;
    let dragging = false;
    let lastX = 0;
    let raf = 0;

    const measure = () => {
      if (cards.length > PER_SET) {
        const w = (cards[PER_SET] as HTMLElement).offsetLeft;
        if (w > 0) period = w;
      }
    };
    const wrap = () => {
      if (!period) return;
      if (offset >= period) offset -= period;
      else if (offset < 0) offset += period;
    };
    const apply = () => {
      track.style.transform = `translate3d(${-offset}px,0,0)`;
    };
    const frame = () => {
      if (!period) measure();
      if (period) {
        if (!dragging && !reduce) offset += SPEED;
        wrap();
        apply();
      }
      raf = requestAnimationFrame(frame);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      vp.classList.add("is-drag");
      try {
        vp.setPointerCapture(e.pointerId);
      } catch {
        /* noop */
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      offset -= dx;
      wrap();
      apply();
    };
    const endDrag = () => {
      dragging = false;
      vp.classList.remove("is-drag");
    };
    if (isTouch) {
      vp.addEventListener("pointerdown", onDown);
      vp.addEventListener("pointermove", onMove);
      vp.addEventListener("pointerup", endDrag);
      vp.addEventListener("pointercancel", endDrag);
    }
    const onResize = () => {
      period = 0;
      measure();
    };
    window.addEventListener("resize", onResize);
    measure();
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      if (isTouch) {
        vp.removeEventListener("pointerdown", onDown);
        vp.removeEventListener("pointermove", onMove);
        vp.removeEventListener("pointerup", endDrag);
        vp.removeEventListener("pointercancel", endDrag);
      }
    };
  }, []);

  const cards = [...views, ...views];

  return (
    <div id="vistas" style={{ scrollMarginTop: "80px" }}>
      <section id="lf-views" ref={rootRef}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="lfv-head">
          <span className="lfv-eyebrow">Cada detalle pensado para verse bien</span>
          <h2 className="lfv-title">Míralo desde todos los ángulos.</h2>
        </div>
        <div className="lfv-marquee">
          <div className="lfv-track">
            {cards.map((v, idx) => {
              const dup = idx >= views.length;
              return (
                <figure
                  className="lfv-card"
                  key={idx}
                  aria-hidden={dup || undefined}
                >
                  <div className="lfv-media">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={v.img}
                      alt={dup ? "" : `Vista ${v.label} del Sofá San Diego`}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption>{v.label}</figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
