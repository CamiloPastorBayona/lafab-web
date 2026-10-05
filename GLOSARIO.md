# Glosario de comunicación — LaFab

Una palabra por concepto. Si un término está en la columna "No se usa", no debe
aparecer en ningún texto visible del sitio: ni en títulos, ni en descripciones,
ni en metadatos, ni en el catálogo de WooCommerce.

## Producto

| Concepto | Se dice | No se usa |
|---|---|---|
| Mueble de sala | **sofá**, **sofás** | asiento, asientos |
| Sofá de un solo cuerpo | **sofá lineal** | — |
| Sofá de esquina | **sofá en L** | angular, esquinero, seccional |
| Categoría padre | **Sofás** | Asientos |
| Capacidad de un sofá o comedor | **puestos** | plazas, asientos |
| Espacio de descanso | **dormitorio** | alcoba, habitación, cuarto |
| Tela que repele líquidos | **antifluido** (invariable) | antifluidos |
| Tela apta para mascotas | **pet friendly** en texto corrido · **Pet Friendly** solo como sello o etiqueta | Pet friendly |
| Nombre de la microfibra | **Soft Velvet** | Soft velvet |

> "Sofás angulares" sí puede quedarse en los `keywords` de SEO (`lib/categories.ts`),
> porque es una búsqueda real y no es texto visible.

## Fabricación y entrega

| Concepto | Se dice | No se usa |
|---|---|---|
| Fabricación bajo pedido | **a la medida** | a tu medida |
| Lugar de fabricación | **taller** (en Itagüí) | planta, fábrica |
| Entrega del mueble | **envío** | despacho |
| Punto físico | **showroom** (uno solo, en singular) | sala de exhibición, showrooms |

### Datos canónicos

- Envío **incluido** en Medellín y su área metropolitana.
- Envío a **otras ciudades capitales: $200.000** adicionales.
- Tarifas y textos salen de `lib/shipping.ts`. No se escriben a mano en ningún componente.
- Garantía: **3 años en estructura · 1 año por desajustes**.
- Calificación: la define `REVIEWS_SUMMARY` en `lib/content.ts`, no se escribe a mano.

## Clientes

| Concepto | Se dice | No se usa |
|---|---|---|
| Valoraciones de Google | **reseñas** | opiniones |
| Quien compra | **cliente**, o tuteo directo | comprador, usuario |

## Reglas de escritura

- Títulos **sin punto final**.
- Días de la semana en minúscula salvo al inicio: "Lunes a sábado".
- Razón social siempre **Inversiones Correa Rua S.A.S.** (con punto final).
- Teléfono en formato colombiano: **+57 305 460 2395**.

## Lo que no se toca

Los textos de las reseñas en `lib/content.ts` son **citas textuales** de clientes
reales tomadas del Perfil de Empresa de Google. Se transcriben como los escribió
cada persona (solo se corrigen tildes y puntuación). Si una reseña dice "alcoba",
se deja: es su palabra, no la de la marca.
