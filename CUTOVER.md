# Cutover: apuntar lafab.com.co al frontend nuevo

El objetivo del trabajo hecho hasta aquí es que el día del cambio sea
**mover el DNS y nada más**. Este documento es la lista de lo que hay que
dejar hecho antes, y en qué orden.

---

## El punto que hay que entender antes de todo

Hoy `lafab.com.co` es WordPress, y ese mismo hostname sirve **tres cosas
distintas**: las páginas, la API de WooCommerce y la biblioteca de medios
(`/wp-content/*`, incluidas todas las fotos y la fuente propia).

El frontend nuevo consume las tres. Si el DNS del dominio raíz pasa a Vercel
**antes** de que WordPress viva en otro hostname, el sitio queda sin imágenes,
sin tipografía y sin backend: el frontend se estaría llamando a sí mismo.

Por eso el orden correcto es:

```
1. WordPress se muda a cms.lafab.com.co   ← primero, sin tocar el raíz
2. El frontend se repunta a ese hostname y se verifica en staging
3. Recién ahí, el DNS del raíz pasa a Vercel
```

El paso 2 ya está resuelto en el código: no queda ningún dominio escrito a
mano. Todo sale de tres variables de entorno (`lib/site.ts`).

---

## Paso 1 · Mover WordPress a su propio hostname

Lo hace quien administre el hosting; no depende de este repo.

- [ ] Crear el registro DNS `cms.lafab.com.co` apuntando al hosting actual.
- [ ] Certificado SSL para ese hostname.
- [ ] En WordPress, cambiar `siteurl` y `home` a `https://cms.lafab.com.co`.
- [ ] Search-replace en la base de datos: `lafab.com.co` → `cms.lafab.com.co`
      (las URLs de las imágenes están guardadas en la BD; si no se cambian, la
      API de WooCommerce sigue devolviendo rutas del dominio viejo).
- [ ] Verificar que `https://cms.lafab.com.co/wp-json/wc/store/v1/products`
      responde.
- [ ] Dejar el WordPress viejo en **noindex** para que no compita en Google.

> Hoy `cms.lafab.com.co` **no resuelve**. `staging.lafab.com.co` sí (200).

---

## Paso 2 · Variables de entorno en Vercel

Ninguna está escrita en el código. Las tres primeras son las que mueven todo:

| Variable | Valor en el cutover |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://lafab.com.co` |
| `NEXT_PUBLIC_WC_STORE_URL` | `https://cms.lafab.com.co` |
| `NEXT_PUBLIC_WP_MEDIA_URL` | `https://cms.lafab.com.co` (o el CDN, cuando exista) |
| `NEXT_PUBLIC_ALLOW_INDEX` | `true` ← **solo el día del cutover** |

`NEXT_PUBLIC_ALLOW_INDEX` es un único interruptor que hace tres cosas a la vez:
abre el `robots.txt`, quita el `<meta name="robots" content="noindex">` y
**enciende la analítica**. Mientras esté apagado, GA, el Pixel y Clarity no
cargan, así que las pruebas en staging no ensucian las métricas reales.

El resto (correo, KV, webhook) está en `.env.local.example`.

---

## Paso 3 · Verificar en staging antes de tocar el DNS

Con `NEXT_PUBLIC_WC_STORE_URL` ya apuntando a `cms.lafab.com.co`, en el preview
de Vercel:

- [ ] Las fotos cargan (Home, San Diego, Nosotros, Blog, Showrooms).
- [ ] La tipografía `morality` carga (`/fonts/morality.woff2`).
- [ ] La tienda lista productos y la ficha de producto abre.
- [ ] **Una compra real de punta a punta con Bold**, pagada de verdad.
- [ ] Los 9 correos llegan a bandeja de entrada, no a spam
      (`node scripts/enviar-pruebas.mjs`).
- [ ] El webhook de WooCommerce entrega y responde 200.
- [ ] Los productos que faltan están cargados (Haru, Mahal, Witten).

---

## Paso 4 · El cambio de DNS

- [ ] Añadir `lafab.com.co` y `www.lafab.com.co` como dominios del proyecto en Vercel.
- [ ] Cambiar el registro A / CNAME del raíz a Vercel.
- [ ] Poner `NEXT_PUBLIC_ALLOW_INDEX=true` y redesplegar.
- [ ] Actualizar `NEXT_PUBLIC_SITE_URL` a `https://lafab.com.co`.
- [ ] En WooCommerce, apuntar el webhook a `https://lafab.com.co/api/webhooks/woocommerce`.

---

## Paso 5 · Después

- [ ] Enviar `https://lafab.com.co/sitemap.xml` en Search Console.
- [ ] Revisar cobertura y 404 durante las primeras dos semanas.
- [ ] Confirmar que llegan pedidos y que salen sus correos.

---

## Lo que ya quedó resuelto en el código

**Dominios centralizados** (`lib/site.ts`). Las 45 URLs de imágenes que estaban
escritas a mano ahora salen de `UPLOADS`. El fallback de WooCommerce apuntaba al
dominio raíz: post-cutover el frontend se habría llamado a sí mismo.

**301 desde el WordPress viejo** (`next.config.mjs`). Salieron del sitemap real
de Rank Math del sitio vivo, 85 URLs, no de suposiciones:

| Viejo | Nuevo |
|---|---|
| `/cart` | `/carrito` |
| `/finalizar-compra` | `/checkout` |
| `/escribenos` | `/contacto` |
| `/politica-de-tratamiento-y-proteccion-de-datos-personales` | `/politica-de-datos` |
| `/poliza-de-garantia` | `/terminos-y-condiciones` |
| `/landing-san-diego` | `/san-diego` |
| `/landing-page`, `/proximamente` | `/` |
| `/descubre` | `/shop` |
| `/itagui` | `/showrooms` |
| `/closets`, `/cocinas`, `/muebles-de-bano`, `/muebles-de-tv`, `/intervencion-de-espacios-exclusivos`, `/lo-que-ofrecemos` | `/espacios` |
| `/sofas-modulares` | `/sofas` |
| `/proyecto/*` (9) | `/proyectos` |
| `/categoria-producto/*`, `/product-category/*` | `/shop` |
| `/wp-admin`, `/wp-login.php` | el WordPress en su host nuevo |

**Red de seguridad para `/wp-content`**. Los correos ya enviados y los enlaces
viejos apuntan a `lafab.com.co/wp-content/...`. Cuando ese dominio sea Vercel,
un rewrite los reenvía al WordPress nuevo en vez de devolver 404.

**El logo de los correos** ya no tiene dominio escrito a mano: sale de
`MAIL_LOGO_URL` o de `UPLOADS`.

---

## Lo que hay que decidir aparte

**Las URLs de producto.** Los 48 productos del sitio viejo usan slugs como
`/producto/sofa-lineal-milan`. Si en el backend nuevo quedaron con otro slug,
esas URLs indexadas caen en 404. Hay que **comparar las dos listas** y, si no
coinciden, agregar sus 301. Es lo único del cutover que no pude resolver sin ver
los datos del backend nuevo.

**Las imágenes.** Siguen saliendo de WordPress. Funciona, pero un CDN mejoraría
Core Web Vitals y resolvería de paso que Gmail no proxea el logo de los correos.
Con la variable `NEXT_PUBLIC_WP_MEDIA_URL` ya lista, ese cambio es de una línea.
