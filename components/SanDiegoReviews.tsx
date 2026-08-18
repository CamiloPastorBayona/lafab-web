// "Lo que dicen nuestros clientes": opiniones de Google. Acoplado a la marca:
// título morality, base Poppins, eyebrow gold (#7A6A45), avatar gold-light
// (#CABBA0), fondo cream (#F4F1EC). Estático (sin JS).

const CSS = `
#lf-reviews,#lf-reviews *{box-sizing:border-box;margin:0;padding:0;}
#lf-reviews{width:100%;background:#F4F1EC;color:#151515;font-family:var(--font-poppins),system-ui,sans-serif;
  padding:clamp(56px,7vw,96px) clamp(20px,5vw,70px);}
#lf-reviews .lfr2-wrap{max-width:1200px;margin:0 auto;}
#lf-reviews .lfr2-head{text-align:center;margin-bottom:clamp(30px,4vw,52px);}
#lf-reviews .lfr2-eyebrow{font-size:12px;letter-spacing:5px;text-transform:uppercase;color:#7A6A45;}
#lf-reviews .lfr2-title{font-weight:300;font-size:clamp(27px,3.4vw,46px);letter-spacing:-.01em;margin-top:12px;color:#151515;}
#lf-reviews .lfr2-rating{display:inline-flex;align-items:center;justify-content:center;gap:10px;margin-top:16px;
  padding:9px 18px;border-radius:999px;background:#fff;border:1px solid rgba(0,0,0,.07);box-shadow:0 6px 16px rgba(0,0,0,.05);max-width:100%;}
#lf-reviews .lfr2-stars{display:inline-flex;gap:2px;color:#E8B23A;flex:0 0 auto;}
#lf-reviews .lfr2-stars svg{width:18px;height:18px;display:block;}
#lf-reviews .lfr2-stars.sm svg{width:16px;height:16px;}
#lf-reviews .lfr2-score{font-size:13px;color:#4A4A4A;white-space:nowrap;}
#lf-reviews .lfr2-score strong{font-weight:600;color:#151515;}
#lf-reviews .lfr2-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2vw,26px);}
#lf-reviews .lfr2-card{background:#fff;border:1px solid rgba(0,0,0,.06);border-radius:18px;
  padding:clamp(22px,2.4vw,30px);display:flex;flex-direction:column;gap:14px;box-shadow:0 10px 26px rgba(0,0,0,.05);}
#lf-reviews .lfr2-text{font-weight:300;font-size:15px;line-height:1.6;color:#444;flex:1;}
#lf-reviews .lfr2-user{display:flex;align-items:center;gap:12px;margin-top:4px;padding-top:16px;border-top:1px solid rgba(0,0,0,.06);}
#lf-reviews .lfr2-avatar{width:40px;height:40px;flex:0 0 auto;border-radius:50%;display:flex;align-items:center;justify-content:center;
  font-weight:500;font-size:16px;color:#fff;background:#CABBA0;}
#lf-reviews .lfr2-meta{display:flex;flex-direction:column;line-height:1.2;}
#lf-reviews .lfr2-meta strong{font-size:14px;font-weight:500;color:#151515;}
#lf-reviews .lfr2-meta small{font-size:11.5px;color:#8A857C;}
@media (max-width:860px){ #lf-reviews .lfr2-grid{grid-template-columns:1fr;} }
@media (max-width:400px){
  #lf-reviews .lfr2-rating{gap:8px;padding:8px 14px;}
  #lf-reviews .lfr2-stars svg{width:15px;height:15px;}
  #lf-reviews .lfr2-score{font-size:12px;}
}
`;

const REVIEWS = [
  {
    initial: "M",
    name: "María Angélica Vergara",
    text: "Excelente calidad del sofá, muy cómodo, elegante y con acabados muy bien elaborados. Quedé muy satisfecha con la compra y con el resultado final.",
  },
  {
    initial: "L",
    name: "Lucía Vélez",
    text: "Quedé muy agradecida, llenaron mi expectativa con mi alcoba. Muy feliz, excelente cumplimiento, acabados sensacionales y excelente servicio. ¡Dios los bendiga!",
  },
  {
    initial: "P",
    name: "Paulina Pérez",
    text: "Amé mi sala. Súper recomendado, todo gracias a María por su acompañamiento y asesoría. Les doy un 10 en todo, ¡los mejores!",
  },
  {
    initial: "E",
    name: "Eder Durán",
    text: "Excelente servicio, siempre muy atentos a las sugerencias y nos mantuvieron al tanto de los tiempos. Mandamos a hacer varios muebles y con todos nos fue muy bien.",
  },
  {
    initial: "M",
    name: "María Estefany Chavarría",
    text: "Me encantó el trabajo, me dieron una muy buena asesoría e hicieron realidad lo que tenía en mente. Totalmente recomendados. ¡Muchas gracias!",
  },
  {
    initial: "J",
    name: "Julián Ramírez",
    text: "Mi esposa y yo compramos una mesa y quedamos realmente impresionados. La calidad es excepcional. Muy recomendados.",
  },
];

function Stars({ sm }: { sm?: boolean }) {
  return (
    <span className={`lfr2-stars${sm ? " sm" : ""}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3l2.6 5.6 6.1.6-4.6 4 1.4 6-5.5-3.2L6 19.8l1.4-6-4.6-4 6.1-.6z" />
        </svg>
      ))}
    </span>
  );
}

export default function SanDiegoReviews() {
  return (
    <div id="opiniones" style={{ scrollMarginTop: "80px" }}>
      <section id="lf-reviews">
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
        <div className="lfr2-wrap">
          <header className="lfr2-head">
            <span className="lfr2-eyebrow">Opiniones</span>
            <h2 className="lfr2-title">Lo que dicen nuestros clientes.</h2>
            <div className="lfr2-rating">
              <Stars />
              <span className="lfr2-score">
                <strong>4.9</strong> · 29 opiniones en Google
              </span>
            </div>
          </header>
          <div className="lfr2-grid">
            {REVIEWS.map((r, i) => (
              <article className="lfr2-card" key={`${r.name}-${i}`}>
                <Stars sm />
                <p className="lfr2-text">“{r.text}”</p>
                <div className="lfr2-user">
                  <span className="lfr2-avatar">{r.initial}</span>
                  <div className="lfr2-meta">
                    <strong>{r.name}</strong>
                    <small>vía Google</small>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
