"use client";

// CTA de personalización (tarjeta oscura con opciones 01/02/03) + reveal al
// entrar en viewport. Acoplado a la marca: título morality, base Poppins,
// eyebrow/acentos gold-light (#CABBA0 / #C9BCA3). Botón primario en gold.

import { useEffect, useRef } from "react";

const WHATSAPP =
  "https://api.whatsapp.com/send/?phone=573054602395&text=Hola+%2ALaFab%2A.+Necesito+m%C3%A1s+informaci%C3%B3n+sobre+Sof%C3%A1+San+Diego+https%3A%2F%2Flafab.com.co%2Fsofa-san-diego%2F&type=phone_number&app_absent=0";

const CSS = `
#lf-custom,#lf-custom *{box-sizing:border-box;margin:0;padding:0;}
#lf-custom{width:100%;background:#fff;color:#151515;font-family:var(--font-poppins),system-ui,sans-serif;
  padding:clamp(40px,6vw,72px) clamp(20px,5vw,70px);}
#lf-custom .lfc-wrap{width:100%;max-width:1200px;margin:0 auto;border-radius:22px;
  background:radial-gradient(circle at 88% 18%, rgba(201,188,163,.16), transparent 34%),
    linear-gradient(135deg, #292827 0%, #222120 55%, #302D2A 100%);
  display:grid;grid-template-columns:1.05fr .95fr;gap:clamp(28px,5vw,70px);align-items:center;
  padding:clamp(34px,5.6vw,64px);overflow:hidden;position:relative;box-shadow:0 22px 58px rgba(0,0,0,.10);}
#lf-custom .lfc-content{position:relative;z-index:2;opacity:0;transform:translateY(24px);
  transition:opacity .8s cubic-bezier(.22,1,.36,1),transform .8s cubic-bezier(.22,1,.36,1);}
#lf-custom.in .lfc-content{opacity:1;transform:translateY(0);}
#lf-custom .lfc-eyebrow{display:inline-block;font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#C9BCA3;margin-bottom:14px;}
#lf-custom .lfc-title{font-weight:300;font-size:clamp(28px,3.4vw,46px);line-height:1.12;letter-spacing:-.01em;color:#fff;}
#lf-custom .lfc-desc{margin-top:18px;max-width:48ch;font-weight:300;font-size:clamp(15px,1.6vw,18px);line-height:1.6;color:rgba(255,255,255,.68);}
#lf-custom .lfc-actions{display:flex;flex-wrap:wrap;gap:14px;margin-top:28px;}
#lf-custom .lfc-btn{display:inline-flex;align-items:center;justify-content:center;min-height:48px;padding:13px 26px;
  text-decoration:none;text-transform:uppercase;letter-spacing:4px;font-size:12px;font-weight:400;border:1px solid transparent;
  transition:background .35s ease,color .35s ease,border-color .35s ease,transform .35s ease;border-radius:6px;}
#lf-custom .lfc-btn--buy{background:#CABBA0;border-color:#CABBA0;color:#1F1F1F;font-weight:500;}
#lf-custom .lfc-btn--buy:hover{background:#D8CBB1;border-color:#D8CBB1;color:#1F1F1F;transform:translateY(-2px);}
#lf-custom .lfc-btn--ghost{background:transparent;border-color:rgba(255,255,255,.5);color:#fff;}
#lf-custom .lfc-btn--ghost:hover{background:#fff;border-color:#fff;color:#222;transform:translateY(-2px);}
#lf-custom .lfc-side{position:relative;z-index:2;display:grid;gap:14px;opacity:0;transform:translateY(24px);
  transition:opacity .8s cubic-bezier(.22,1,.36,1) .12s,transform .8s cubic-bezier(.22,1,.36,1) .12s;}
#lf-custom.in .lfc-side{opacity:1;transform:translateY(0);}
#lf-custom .lfc-option{display:grid;grid-template-columns:auto 1fr;gap:16px;align-items:flex-start;
  padding:18px 20px;border-radius:16px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.10);backdrop-filter:blur(8px);}
#lf-custom .lfc-number{display:inline-flex;width:34px;height:34px;align-items:center;justify-content:center;border-radius:50%;
  background:rgba(201,188,163,.13);border:1px solid rgba(201,188,163,.24);color:#C9BCA3;font-size:11px;font-weight:400;letter-spacing:1px;}
#lf-custom .lfc-option h3{font-weight:400;font-size:clamp(16px,1.5vw,19px);line-height:1.25;color:#fff;letter-spacing:-.01em;}
#lf-custom .lfc-option p{margin-top:6px;font-weight:300;font-size:clamp(13px,1.25vw,15px);line-height:1.5;color:rgba(255,255,255,.58);}
@media (max-width:860px){
  #lf-custom .lfc-wrap{grid-template-columns:1fr;gap:32px;padding:clamp(34px,8vw,52px) clamp(22px,6vw,38px);}
  #lf-custom .lfc-title br{display:none;}
  #lf-custom .lfc-desc{max-width:100%;}
  #lf-custom .lfc-side{gap:12px;}
}
@media (max-width:560px){
  #lf-custom{padding-left:16px;padding-right:16px;}
  #lf-custom .lfc-wrap{border-radius:20px;}
  #lf-custom .lfc-eyebrow{letter-spacing:4px;}
  #lf-custom .lfc-actions{flex-direction:column;}
  #lf-custom .lfc-btn{width:100%;min-height:48px;padding-left:18px;padding-right:18px;letter-spacing:3px;text-align:center;}
  #lf-custom .lfc-option{padding:16px;gap:13px;}
  #lf-custom .lfc-number{width:32px;height:32px;font-size:10px;}
}
@media (prefers-reduced-motion:reduce){
  #lf-custom .lfc-content,#lf-custom .lfc-side{opacity:1;transform:none;transition:none;}
  #lf-custom .lfc-btn:hover{transform:none;}
}
`;

const OPTIONS = [
  { n: "01", h: "Medida", p: "Ajustamos el tamaño al espacio disponible." },
  { n: "02", h: "Color", p: "Elige el tono que mejor combine con tu ambiente." },
  { n: "03", h: "Configuración", p: "Personalizamos detalles según tu forma de usarlo." },
];

export default function SanDiegoCustom() {
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
      { threshold: 0.22 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="lf-custom" ref={ref}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="lfc-wrap">
        <div className="lfc-content">
          <span className="lfc-eyebrow">Personalización</span>
          <h2 className="lfc-title">
            ¿Necesitas otra medida,
            <br />
            color o configuración?
          </h2>
          <p className="lfc-desc">
            Podemos fabricar una versión personalizada del sofá San Diego,
            adaptada a tu espacio, tus medidas y el acabado que estás buscando.
          </p>
          <div className="lfc-actions">
            <a className="lfc-btn lfc-btn--buy" href="#comprar">
              Comprar ahora
            </a>
            <a
              className="lfc-btn lfc-btn--ghost"
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
            >
              Hablar con un diseñador
            </a>
          </div>
        </div>
        <div className="lfc-side" aria-hidden="true">
          {OPTIONS.map((o) => (
            <div className="lfc-option" key={o.n}>
              <span className="lfc-number">{o.n}</span>
              <div>
                <h3>{o.h}</h3>
                <p>{o.p}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
