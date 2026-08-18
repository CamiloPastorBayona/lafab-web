# LaFab Web — Frontend headless (Next.js)

Frontend de [lafab.com.co](https://lafab.com.co) construido con **Next.js 14 (App Router) + TypeScript + Tailwind**.
WordPress/WooCommerce queda como **backend headless**: el catálogo se lee por la
**Store API** y el pago se completa en WooCommerce con **Bold Pagos** (checkout híbrido).

---

## 1. Instalar en local

```bash
# mover el proyecto a tu carpeta de proyectos
mv ~/Downloads/lafab-web ~/code/lafab-web
cd ~/code/lafab-web

# variables de entorno
cp .env.local.example .env.local

# instalar dependencias y arrancar
npm install
npm run dev
```

Abre http://localhost:3000

`.env.local` solo tiene una variable:

```
NEXT_PUBLIC_WC_STORE_URL=https://lafab.com.co
```

Apunta al backend del que se leen los productos. Hoy es el sitio en vivo;
después del cutover será `https://cms.lafab.com.co`.

---

## 2. Subir a GitHub

```bash
git init
git add .
git commit -m "Init: LaFab headless frontend"
git branch -M main
git remote add origin https://github.com/<tu-usuario>/lafab-web.git
git push -u origin main
```

---

## 3. Desplegar en Vercel

1. En Vercel → **Add New → Project → Import** el repo `lafab-web`.
2. Framework: **Next.js** (autodetectado). No cambies nada del build.
3. En **Environment Variables** agrega:
   `NEXT_PUBLIC_WC_STORE_URL = https://lafab.com.co`
4. **Deploy**. Quedará en una URL `*.vercel.app` para probar.

---

## 4. Cutover del dominio (paso final, cuando todo esté listo)

Para que `lafab.com.co` lo sirva Vercel y WordPress siga vivo como backend:

1. En Hostinger, mueve WordPress a un subdominio: **`cms.lafab.com.co`**
   (apuntando al hosting actual).
2. En Vercel → Project → **Domains**, agrega `lafab.com.co` y `www.lafab.com.co`
   y sigue las instrucciones de DNS (registro A / CNAME).
3. Cambia `NEXT_PUBLIC_WC_STORE_URL` en Vercel a `https://cms.lafab.com.co` y
   vuelve a desplegar.
4. Verifica que el carrito/checkout (`cms.lafab.com.co/carrito/`) siga funcionando
   con Bold.

> Mientras tanto puedes desarrollar y probar todo contra el sitio actual sin tocar DNS.

---

## Estructura

```
app/
  layout.tsx              Header + Footer + fuente Poppins + metadata global
  page.tsx                Home (hero + destacados + CTA)
  globals.css             Tokens de marca + Tailwind
  shop/page.tsx           Tienda (grid de todos los productos)
  producto/[slug]/page.tsx  Ficha de producto (SSR + SEO + relacionados)
components/
  Header.tsx              Nav sticky, CTA WhatsApp, menú móvil
  Footer.tsx              Footer con columnas y contacto
  ProductCard.tsx         Tarjeta de producto
  ProductGallery.tsx      Galería con miniaturas (client)
  AddToCart.tsx           Cantidad + hand-off al carrito de WooCommerce (client)
lib/
  woocommerce.ts          Cliente Store API + formato de precios + addToCartUrl
```

## Notas técnicas

- **Datos**: Store API `GET /wp-json/wc/store/v1/products`. Solo lectura, sin auth.
- **Precios**: COP sin decimales; `money()` respeta separadores del backend.
- **SEO**: cada página usa `generateMetadata`. Hoy toma título/descripción del
  producto. Si quieres traer el meta exacto de **Rank Math**, el siguiente paso es
  leer `/wp-json/rankmath/v1/getHead?url=...` y volcarlo en `generateMetadata`.
- **Checkout híbrido**: `Añadir al carrito` redirige a
  `/{STORE_URL}/carrito/?add-to-cart=ID&quantity=N`, donde WooCommerce + Bold
  completan el pago. No se replica el checkout en el frontend.
- **Revalidación (ISR)**: páginas cacheadas 300 s; se refrescan solas.
