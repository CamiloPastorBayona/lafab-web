"use client";

// Sección "¿Por qué elegir LaFab?" (chips con check, reveal escalonado al entrar
// en viewport). Acoplada a la marca: título en morality, base Poppins del sitio,
// eyebrow gold (#7A6A45), check en gold-light (#CABBA0), fondo cream (#F4F1EC).

import { useEffect, useRef } from "react";

const CHIPS = [
  "Más de 12 años fabricando muebles",
  "Taller propio",
  "Diseños exclusivos",
  "Garantía estructural",
  "Materiales certificados",
  "Envíos nacionales",
  "Atención postventa",
];

const CSS = `
#lf-why,#lf-why *{box-sizing:border-box;margin:0;padding:0;}
#lf-why{width:100%;background:#F4F1EC;color:#151515;font-family:var(--font-poppins),system-ui,sans-serif;
  padding:clamp(50px,7vw,92px) clamp(20px,5vw,70px);}
#lf-why .lfw-wrap{max-width:1000px;margin:0 auto;text-align:center;}
#lf-why .lfw-eyebrow{font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#7A6A45;}
#lf-why .lfw-title{font-weight:300;font-size:clamp(26px,3.4vw,44px);letter-spacing:-.01em;margin-top:12px;color:#151515;}
#lf-why .lfw-sub{font-weight:300;font-size:clamp(14px,1.5vw,17px);color:#6B6B6B;margin:12px auto 0;max-width:52ch;line-height:1.55;}
#lf-why .lfw-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:12px 14px;margin-top:clamp(26px,3.6vw,42px);}
#lf-why .lfw-chip{display:inline-flex;align-items:center;gap:10px;padding:12px 20px;border-radius:999px;
  background:#fff;border:1px solid rgba(20,20,20,.1);
  font-size:clamp(13px,1.35vw,15px);font-weight:400;color:#2F2F2F;cursor:default;
  opacity:0;transform:translateY(18px);
  transition:transform .3s cubic-bezier(.22,1,.36,1),background .3s ease,border-color .3s ease,color .3s ease,box-shadow .3s ease,opacity .6s ease;}
#lf-why .lfw-chip svg{width:18px;height:18px;flex:0 0 auto;color:#CABBA0;transition:transform .3s ease;}
#lf-why.in .lfw-chip{opacity:1;transform:none;}
#lf-why.in .lfw-chip:nth-child(1){transition-delay:.05s}
#lf-why.in .lfw-chip:nth-child(2){transition-delay:.11s}
#lf-why.in .lfw-chip:nth-child(3){transition-delay:.17s}
#lf-why.in .lfw-chip:nth-child(4){transition-delay:.23s}
#lf-why.in .lfw-chip:nth-child(5){transition-delay:.29s}
#lf-why.in .lfw-chip:nth-child(6){transition-delay:.35s}
#lf-why.in .lfw-chip:nth-child(7){transition-delay:.41s}
#lf-why .lfw-chip:hover{background:#151515;border-color:#151515;color:#fff;transform:translateY(-3px);
  box-shadow:0 12px 26px rgba(0,0,0,.16);}
#lf-why .lfw-chip:hover svg{transform:scale(1.18);}
@media (max-width:600px){
  #lf-why .lfw-chips{gap:10px;}
  #lf-why .lfw-chip{padding:11px 16px;}
}
@media (prefers-reduced-motion:reduce){
  #lf-why .lfw-chip{opacity:1;transform:none;transition:background .3s ease,color .3s ease;}
  #lf-why .lfw-chip:hover{transform:none;}
}
`;

export default function SanDiegoWhy() {
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
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div id="garantia" style={{ scrollMarginTop: "80px" }}>
      <section id="lf-why" ref={ref}>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="lfw-wrap">
          <span className="lfw-eyebrow">Fábrica propia</span>
          <h2 className="lfw-title">¿Por qué elegir LaFab?</h2>
          <p className="lfw-sub">
            Más de una década creando muebles que se ven bien y duran.
          </p>
          <div className="lfw-chips">
            {CHIPS.map((c) => (
              <span className="lfw-chip" key={c}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
