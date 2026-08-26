#!/usr/bin/env node
// Envía una prueba de las 9 plantillas a un destinatario.
//
//   BASE=https://... EMAILS_ADMIN_TOKEN=... node scripts/enviar-pruebas.mjs [correo]
//
// Por defecto apunta a http://localhost:3000 y a info@lafab.com.co.
// Cada correo lleva un dedupeKey con marca de tiempo para que se pueda repetir
// la prueba sin que la idempotencia lo bloquee.

const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const TOKEN = process.env.EMAILS_ADMIN_TOKEN;
const TO = process.argv[2] || process.env.TEST_EMAIL || "info@lafab.com.co";

if (!TOKEN) {
  console.error("Falta EMAILS_ADMIN_TOKEN.");
  process.exit(1);
}

const stamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);

// Datos de ejemplo realistas: así la prueba muestra el correo como lo verá un cliente.
const items = `<tr>
  <td style="padding:14px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515;"><strong style="font-weight:700;">Sofá San Diego</strong><br><span style="font-size:12px; color:#8a887f;">Tela Milán · Marfil · 3 puestos</span><br><span style="font-size:12px; color:#8a887f;">Cantidad: 1</span></td>
  <td align="right" valign="top" style="padding:14px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515; white-space:nowrap;">$ 3.400.000</td>
</tr>
<tr>
  <td style="padding:14px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515;"><strong style="font-weight:700;">Poltrona Haru</strong><br><span style="font-size:12px; color:#8a887f;">Tela Toscana · Beige arena</span><br><span style="font-size:12px; color:#8a887f;">Cantidad: 2</span></td>
  <td align="right" valign="top" style="padding:14px 0; border-bottom:1px solid #f1ede5; font-size:14px; color:#151515; white-space:nowrap;">$ 1.750.000</td>
</tr>`;

const totals = `<tr><td style="padding:8px 0 0 0; font-size:13px; color:#8a887f;">Subtotal</td><td align="right" style="padding:8px 0 0 0; font-size:13px; color:#42403c;">$ 5.150.000</td></tr>
<tr><td style="padding:6px 0; font-size:13px; color:#8a887f;">Envío</td><td align="right" style="padding:6px 0; font-size:13px; color:#42403c;">Gratis</td></tr>
<tr><td style="padding:10px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">Total</td><td align="right" style="padding:10px 0 0 0; font-size:16px; color:#151515; font-weight:700; border-top:2px solid #151515;">$ 5.150.000</td></tr>`;

const address = "Ana Restrepo<br>Cra. 45 #10-20, Apto 502<br>El Poblado, Medellín, Antioquia";

const vars = { customer_name: "Ana", order_number: "#11842" };
const blocks = { items, totals, address };

const PRUEBAS = [
  { template: "pedido-recibido", vars, blocks },
  { template: "en-produccion", vars, blocks },
  { template: "va-en-camino", vars, blocks },
  { template: "pago-pendiente", vars, blocks: { items, totals } },
  { template: "carrito-abandonado", vars, blocks: { items, totals } },
  { template: "resena", vars },
  { template: "cuidado", vars },
  {
    template: "cotizacion",
    vars,
    quote: {
      items: [
        { name: "Sofá a la medida · 3.20 m", detail: "Tela a elección · estructura en madera", price: 4200000 },
        { name: "Base y patas en madera maciza", price: "Incluido" },
      ],
      total: 4200000,
    },
  },
  { template: "bienvenida" },
];

let ok = 0;
for (const prueba of PRUEBAS) {
  const r = await fetch(`${BASE}/api/emails/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ ...prueba, to: TO, dedupeKey: `prueba:${prueba.template}:${stamp}` }),
  });
  const data = await r.json().catch(() => ({}));
  const estado = data.status || data.error || `HTTP ${r.status}`;
  console.log(`${r.ok ? "✓" : "✗"} ${prueba.template.padEnd(20)} ${estado}`);
  if (r.ok) ok += 1;
}

console.log(`\n${ok}/${PRUEBAS.length} enviados a ${TO}`);
process.exit(ok === PRUEBAS.length ? 0 : 1);
