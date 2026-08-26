# Plantillas de correo LaFab

9 plantillas HTML transaccionales de marca, **responsive** y con tono profesional. Diseñadas para integrarse con el sistema de correos (Resend/ESP) del frontend headless.

## Archivos
| Archivo | Uso |
|---|---|
| `pedido-recibido.html` | Pedido recibido / confirmación de compra |
| `en-produccion.html` | Pedido en producción |
| `va-en-camino.html` | Pedido despachado / va en camino |
| `pago-pendiente.html` | Recordatorio de pago pendiente |
| `carrito-abandonado.html` | Carrito abandonado |
| `resena.html` | Solicitud de reseña post-entrega |
| `cuidado.html` | Guía de cuidado del mueble |
| `cotizacion.html` | Respuesta a cotización a la medida |
| `bienvenida.html` | Bienvenida / newsletter |

## Variables (placeholders `{{...}}`)
Reemplazar antes de enviar:
- `{{customer_name}}` — nombre del cliente
- `{{order_number}}` — número de pedido (ej. `#11842`)
- `{{cart_url}}` — enlace para retomar el carrito
- `{{payment_url}}` — enlace para completar el pago
- `{{review_url}}` — enlace de reseña (Google/otro)
- `{{shop_url}}` — enlace a la tienda

El **resumen del pedido** y la **dirección de envío** están con datos de ejemplo (Sofá Milán, Mesa Hakka, etc.); en la integración se generan dinámicamente desde los ítems reales del pedido/carrito.

## Integración (ya cableada)

Las plantillas **no se editan para meter datos**: se rellenan desde código.

- Motor: `lib/emails/templates.ts` — resuelve `{{variables}}`, reemplaza bloques y
  genera la versión en texto plano. El **asunto sale del `<title>`** quitando el
  prefijo `LaFab · `.
- Datos del pedido: `lib/emails/orders.ts` — convierte un pedido de WooCommerce en
  variables y bloques.
- Disparadores: `lib/emails/triggers.ts` — mapa estado del pedido → plantilla.
- Entrada: `POST /api/webhooks/woocommerce` (firmado con HMAC) y el cron
  `/api/cron/emails` para lo diferido.
- Envío manual: `POST /api/emails/send` (cotización y pruebas).
- Vista previa en desarrollo: `/api/dev/email-preview`.

### Bloques `<!--lf:nombre--> … <!--/lf:nombre-->`
Regiones que el código reemplaza enteras. Si no se pasa contenido para un bloque,
queda el de la plantilla (los datos de ejemplo).

| Bloque | Dónde | Qué reemplaza |
|---|---|---|
| `greeting` | todas menos `bienvenida` | el saludo, para evitar "Hola ," cuando no hay nombre |
| `items` | pedido-recibido, en-produccion, va-en-camino, pago-pendiente, carrito-abandonado | filas del resumen |
| `totals` | las mismas | subtotal / envío / total |
| `address` | pedido-recibido, en-produccion, va-en-camino | dirección de envío |
| `quote` | cotizacion | detalle de la cotización |

**Al tocar el HTML, no borres los marcadores**: son comentarios HTML, invisibles en
el correo, pero si desaparecen la plantilla vuelve a mostrar los datos de ejemplo.

### Cuándo sale cada uno
| Plantilla | Disparador |
|---|---|
| `pago-pendiente` | pedido en `pending`, `on-hold` o `failed` |
| `pedido-recibido` | pedido en `processing` (pago confirmado) |
| `en-produccion` | pedido en `en-produccion` / `produccion` |
| `va-en-camino` | pedido en `enviado`, `shipped` o `completed` |
| `cuidado` | 48 h después de la entrega |
| `resena` | 10 días después de la entrega |
| `bienvenida` | 24 h después del primer pedido de ese correo |
| `carrito-abandonado` | 5 h sin completar la compra, con correo capturado |
| `cotizacion` | manual, vía `POST /api/emails/send` |

Las esperas y el mapa de estados se ajustan por variables de entorno; ver
`.env.local.example`.

## Notas
- **Logo:** referenciado por URL (`lafab.com.co/.../lafab-blanco.png`). Gmail no siempre proxea imágenes de ese dominio; para envío real conviene **incrustarlo (CID)** vía el ESP o hospedarlo en un CDN. Hay un respaldo de texto en el `alt` para clientes que bloquean imágenes.
- **CSS:** estilos inline + un `<style>` con media query (`max-width:620px`) para el responsive.
- **Colores de marca:** ink `#151515`, dorado `#b0a080`, dorado claro `#cabba0`, fondo `#efece6`.
- Fuente segura para correo: Arial/Helvetica (la fuente propia "morality" no carga confiable en clientes de correo).
