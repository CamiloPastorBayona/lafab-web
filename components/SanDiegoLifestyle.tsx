"use client";

// Sección "Pensado para la vida real" (lifestyle). Original convertido a React
// y acoplado a la marca: títulos en morality, texto en la fuente del sitio
// (Poppins vía --font-poppins), acento en gold. Foto limpia + panel claro que
// sube en hover (desktop); texto debajo en móvil. Reveal con IntersectionObserver.

import { useEffect, useRef } from "react";
import { SANDIEGO } from "@/lib/sandiego";

const CSS = `
#lf-benefits,#lf-benefits *{box-sizing:border-box;margin:0;padding:0;}
#lf-benefits{width:100%;background:#fff;color:#151515;
  font-family:var(--font-poppins),system-ui,sans-serif;
  padding:clamp(56px,9vw,110px) clamp(20px,5vw,70px);}
#lf-benefits .lfb2-wrap{max-width:1200px;margin:0 auto;}
#lf-benefits .lfb2-head{margin-bottom:clamp(28px,4vw,48px);}
#lf-benefits .lfb2-eyebrow{font-size:13px;letter-spacing:5px;text-transform:uppercase;color:#7A6A45;}
#lf-benefits .lfb2-title{font-weight:300;font-size:clamp(31px,4vw,56px);letter-spacing:-.01em;margin-top:12px;line-height:1.14;color:#151515;}
#lf-benefits .lfb2-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:clamp(16px,2.4vw,28px);}
#lf-benefits .lfb2-card{position:relative;border-radius:18px;background:#F4F1EC;overflow:hidden;
  opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1);}
#lf-benefits.in .lfb2-card{opacity:1;transform:translateY(0);}
#lf-benefits.in .lfb2-card:nth-child(2){transition-delay:.1s}
#lf-benefits.in .lfb2-card:nth-child(3){transition-delay:.2s}
#lf-benefits.in .lfb2-card:nth-child(4){transition-delay:.3s}
#lf-benefits .lfb2-card img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:18px;background:#EFECE4;}
#lf-benefits .lfb2-cap{padding:18px 20px 22px;}
#lf-benefits .lfb2-cap h3{font-family:"morality",var(--font-poppins),sans-serif;font-weight:300;font-size:clamp(22px,2.1vw,28px);letter-spacing:0;color:#151515;}
#lf-benefits .lfb2-cap p{margin-top:8px;font-weight:300;font-size:clamp(14px,1.5vw,17px);line-height:1.5;color:#6B6B6B;}
@media (hover:hover) and (min-width:761px){
  #lf-benefits .lfb2-card{aspect-ratio:4/3;}
  #lf-benefits .lfb2-card img{position:absolute;inset:0;width:100%;height:100%;aspect-ratio:auto;border-radius:0;
    transition:transform 1.1s cubic-bezier(.22,1,.36,1);}
  #lf-benefits .lfb2-card:hover img{transform:scale(1.05);}
  #lf-benefits .lfb2-card::after{content:"+";position:absolute;bottom:16px;left:18px;z-index:2;
    width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:50%;
    font-size:20px;font-weight:300;color:#fff;background:rgba(20,20,20,.45);
    border:1px solid rgba(255,255,255,.35);backdrop-filter:blur(4px);transition:opacity .3s ease;}
  #lf-benefits .lfb2-card:hover::after{opacity:0;}
  #lf-benefits .lfb2-cap{position:absolute;left:0;right:0;bottom:0;z-index:3;padding:22px 24px;
    background:rgba(255,255,255,.9);backdrop-filter:blur(8px);border-top:1px solid rgba(0,0,0,.08);
    transform:translateY(101%);transition:transform .45s cubic-bezier(.22,1,.36,1);}
  #lf-benefits .lfb2-card:hover .lfb2-cap{transform:translateY(0);}
  #lf-benefits .lfb2-cap p{color:#444;max-width:36ch;}
}
@media (max-width:760px){
  #lf-benefits .lfb2-grid{grid-template-columns:1fr;gap:22px;}
  #lf-benefits .lfb2-card img{aspect-ratio:3/2;}
  #lf-benefits .lfb2-cap{padding:16px 18px 20px;}
  #lf-benefits .lfb2-cap h3{font-size:22px;}
  #lf-benefits .lfb2-cap p{font-size:15px;margin-top:6px;}
}
@media (prefers-reduced-motion:reduce){
  #lf-benefits .lfb2-card{opacity:1;transform:none;transition:none;}
  #lf-benefits .lfb2-card:hover img{transform:none;}
}
`;

export default function SanDiegoLifestyle() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id="diseno" style={{ scrollMarginTop: "80px" }}>
      <section id="lf-benefits" ref={ref}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="lfb2-wrap">
          <div className="lfb2-head">
            <span className="lfb2-eyebrow">Por qué el Sofá San Diego</span>
            <h2 className="lfb2-title">Pensado para la vida real.</h2>
          </div>
          <div className="lfb2-grid">
            {SANDIEGO.lifestyle.map((l) => (
              <article className="lfb2-card" key={l.title}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={l.img}
                  alt={`${l.title} en el Sofá San Diego`}
                  loading="lazy"
                />
                <div className="lfb2-cap">
                  <h3>{l.title}</h3>
                  <p>{l.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
