// Páginas por ciudad. Existen porque todo el sitio habla de Medellín y, para
// Google, LaFab era una mueblería local: no competía por "sofás a la medida
// Bogotá" ni por ninguna otra capital.
//
// Regla de oro al añadir una ciudad: solo se promete lo que de verdad se
// cumple. La tarifa y el tiempo son los mismos que liquida el checkout y los
// que declara la ficha de producto; si eso cambia, se cambia aquí y en
// lib/shipping.ts, no se inventa por ciudad. Y el texto se escribe nuevo: seis
// páginas con los mismos párrafos y el nombre cambiado son, para un buscador,
// seis páginas de relleno, y castigan al dominio entero.

export type Ciudad = {
  slug: string;
  nombre: string;
  departamento: string;
  gentilicio: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  entrada: string;
  /** Dos o tres párrafos propios de la ciudad. */
  cuerpo: string[];
  /** El ángulo práctico que esta página desarrolla mejor que las otras. */
  destacado: { titulo: string; texto: string };
  faq: { q: string; a: string }[];
};

export const CIUDADES: Ciudad[] = [
  {
    slug: "bogota",
    nombre: "Bogotá",
    departamento: "Cundinamarca",
    gentilicio: "bogotanos",
    metaTitle: "Muebles a la medida en Bogotá · Sofás, comedores y alcobas",
    metaDescription:
      "Fabricamos sofás, comedores, alcobas y poltronas a la medida y los enviamos a Bogotá por $200.000. Fabricación propia en Itagüí, 30 días y garantía.",
    h1: "Muebles a la medida en Bogotá",
    entrada:
      "Diseñamos y fabricamos cada mueble en nuestro taller de Itagüí y lo despachamos a Bogotá. No hay intermediario ni catálogo importado: la pieza que recibes se cortó, se armó y se tapizó para tu espacio.",
    cuerpo: [
      "Comprar un sofá sin sentarse en él da desconfianza, y es razonable. Por eso publicamos la medida exacta de cada pieza, el precio completo y fotos de muebles ya entregados en casas reales, no solo renders de estudio. Antes de confirmar cualquier pedido revisamos contigo el largo, el fondo y la altura, que son los tres números que deciden si el mueble entra y si el espacio queda bien.",
      "En Bogotá la mayoría de nuestras entregas son a apartamento, y ahí el enemigo no es el ascensor sino la puerta: un sofá de 2,00 m entra por casi cualquier vano, pero un sofá en L mal medido no sube. Escríbenos con el ancho de la puerta y del ascensor y te decimos de una qué medida te sirve, incluso si eso significa venderte el modelo más pequeño.",
      "El envío a Bogotá cuesta $200.000 y se suma al precio que ves publicado. La fabricación toma 30 días calendario o menos, y cuando el mueble sale del taller te avisamos para coordinar el día de entrega.",
    ],
    destacado: {
      titulo: "Mide antes de comprar",
      texto:
        "Necesitas tres datos: el ancho de la puerta de entrada, el del ascensor y el largo de la pared donde va el mueble. Con eso te confirmamos qué medida cabe antes de que pagues nada.",
    },
    faq: [
      {
        q: "¿Cuánto cuesta el envío a Bogotá?",
        a: "$200.000, que se suman al precio publicado del mueble. El valor aparece en el checkout apenas eliges Bogotá o Cundinamarca como departamento, así que no hay sorpresas al final.",
      },
      {
        q: "¿Cuánto se demora en llegar?",
        a: "La fabricación toma 30 días calendario o menos desde que confirmas el pedido. Al despachar te avisamos para coordinar la entrega.",
      },
      {
        q: "¿Puedo ver las telas antes de decidir?",
        a: "Cada tela y cada color tienen su foto en la ficha del producto, tomada del material real. Si quieres ver un detalle puntual, escríbenos por WhatsApp y te mandamos fotos o un video de la tela que te interesa.",
      },
      {
        q: "¿Suben el mueble al apartamento?",
        a: "La entrega se coordina contigo al despachar. Cuéntanos el piso y si hay ascensor para organizarlo bien desde el principio.",
      },
      {
        q: "¿Tienen showroom en Bogotá?",
        a: "No. Nuestro showroom está en Itagüí, Antioquia, y es también el taller: quien te atiende es quien fabrica. Si viajas a Medellín te recibimos con cita.",
      },
    ],
  },
  {
    slug: "cali",
    nombre: "Cali",
    departamento: "Valle del Cauca",
    gentilicio: "caleños",
    metaTitle: "Muebles a la medida en Cali · Sofás, comedores y alcobas",
    metaDescription:
      "Sofás, comedores, alcobas y poltronas a la medida, fabricados en Itagüí y enviados a Cali por $200.000. Elige tela, color y medida. 30 días y garantía.",
    h1: "Muebles a la medida en Cali",
    entrada:
      "Fabricamos en Itagüí y enviamos a Cali. Cada mueble se hace después de que lo pides, con la medida, la tela y el color que elegiste: por eso no hay descuento por liquidar inventario, porque no hay inventario.",
    cuerpo: [
      "Lo que más nos preguntan desde el Valle es cómo se elige una tela a distancia. La respuesta corta: por foto del material real, no por un cuadrito de color. En cada ficha verás el retazo de la tela ampliado, y al cambiar de color cambia también la foto del mueble, para que veas el tono en una pieza completa y no en una muestra de dos centímetros.",
      "Trabajamos microfibra, lino y cuero. Las telas son antifluido y pet friendly, que en la práctica significa que un líquido se queda unos segundos en la superficie antes de absorberse y da tiempo de limpiarlo. No son indestructibles y no te las vamos a vender como si lo fueran, pero aguantan el uso diario de una casa con niños o con mascotas.",
      "El envío a Cali cuesta $200.000 sobre el precio publicado y la fabricación toma 30 días calendario o menos.",
    ],
    destacado: {
      titulo: "La tela, por foto del material real",
      texto:
        "Nada de muestrarios genéricos: cada color muestra el retazo de la tela que vamos a usar y el mueble completo en ese tono. Si quieres más detalle, pedimos un video de la tela y te lo mandamos.",
    },
    faq: [
      {
        q: "¿Cuánto cuesta el envío a Cali?",
        a: "$200.000 adicionales al precio del mueble. Se calculan solos en el checkout cuando eliges Valle del Cauca.",
      },
      {
        q: "¿Qué telas manejan?",
        a: "Microfibra, lino y cuero, cada una con su propia carta de colores. Las telas son antifluido y pet friendly.",
      },
      {
        q: "¿Qué pasa si el color no me gusta al verlo?",
        a: "Por eso insistimos en resolver la duda antes de fabricar: te mandamos fotos y video de la tela por WhatsApp hasta que estés seguro. Un mueble hecho a la medida no se puede devolver como uno de catálogo.",
      },
      {
        q: "¿Cuánto se demora?",
        a: "30 días calendario o menos de fabricación, más el envío a Cali.",
      },
      {
        q: "¿La garantía aplica fuera de Medellín?",
        a: "Sí, es la misma en todo el país: tres años en la estructura y un año por desajustes. Telas y espumas, según el tiempo del proveedor.",
      },
    ],
  },
  {
    slug: "barranquilla",
    nombre: "Barranquilla",
    departamento: "Atlántico",
    gentilicio: "barranquilleros",
    metaTitle: "Muebles a la medida en Barranquilla · Sofás y comedores",
    metaDescription:
      "Muebles a la medida para Barranquilla: sofás, comedores, alcobas y poltronas fabricados en Itagüí. Envío $200.000, 30 días de fabricación y garantía.",
    h1: "Muebles a la medida en Barranquilla",
    entrada:
      "Hacemos muebles por encargo en nuestro taller de Itagüí y los enviamos a Barranquilla. Eliges el modelo, la medida, el material y el color; nosotros lo fabricamos y te lo despachamos.",
    cuerpo: [
      "Un mueble que va a la costa viaja más de mil kilómetros, así que lo embalamos para ese viaje y no para una entrega local. Eso no lo cobramos aparte: está dentro de los $200.000 del envío.",
      "Si la limpieza te preocupa, mira el cuero antes de descartarlo. Es el único de nuestros materiales que se limpia pasando un paño húmedo, mientras que una tela requiere más cuidado; a cambio cuesta cerca del doble. Es una decisión de presupuesto más que de gusto, y preferimos que la tomes con el dato a la vista.",
      "La fabricación toma 30 días calendario o menos. Al despachar te avisamos para coordinar la entrega contigo.",
    ],
    destacado: {
      titulo: "Tela o cuero: la diferencia real",
      texto:
        "El cuero se limpia con un paño y dura más, pero cuesta cerca del doble. La microfibra y el lino son antifluido y pet friendly, y aguantan bien el uso diario. Los dos caminos son válidos; el precio de cada uno está en la ficha.",
    },
    faq: [
      {
        q: "¿Envían a Barranquilla?",
        a: "Sí. El envío cuesta $200.000 sobre el precio publicado y se calcula solo en el checkout al elegir Atlántico.",
      },
      {
        q: "¿Cómo embalan los muebles para un viaje largo?",
        a: "Se protegen para el trayecto completo desde Itagüí. El embalaje está incluido en el valor del envío.",
      },
      {
        q: "¿Cuál material recomiendan?",
        a: "Depende del uso y del presupuesto. El cuero se limpia más fácil y dura más, pero vale cerca del doble; la microfibra y el lino son antifluido y pet friendly y cubren bien el uso de una casa normal.",
      },
      {
        q: "¿Cuánto tarda?",
        a: "30 días calendario o menos de fabricación, más el envío.",
      },
      {
        q: "¿Qué cubre la garantía?",
        a: "Tres años en la estructura y un año por desajustes. Telas y espumas, según el tiempo del proveedor.",
      },
    ],
  },
  {
    slug: "bucaramanga",
    nombre: "Bucaramanga",
    departamento: "Santander",
    gentilicio: "bumangueses",
    metaTitle: "Muebles a la medida en Bucaramanga · Sofás y alcobas",
    metaDescription:
      "Sofás, comedores, alcobas y poltronas a la medida con fabricación propia en Itagüí y envío a Bucaramanga por $200.000. 30 días de fabricación y garantía.",
    h1: "Muebles a la medida en Bucaramanga",
    entrada:
      "Fabricamos cada pieza por encargo en Itagüí y la enviamos a Bucaramanga. Nada de catálogo cerrado: la medida, el material y el color los eliges tú.",
    cuerpo: [
      "Los 30 días de fabricación no son una fórmula de cortesía: son el tiempo real que toma cortar la madera, armar la esqueletería, dejar curar, tapizar y revisar. Si pides un mueble pensando en una fecha, sea un trasteo, la entrega de un apartamento o diciembre, cuéntanoslo al encargar y te decimos de frente si llegamos o no. Preferimos perder una venta a prometer una fecha que no se cumple.",
      "Mientras tanto puedes ver cómo quedan nuestros muebles ya instalados: en la página de proyectos hay fotos reales de entregas, tomadas en casas de clientes, sin montaje ni render.",
      "El envío a Bucaramanga cuesta $200.000 sobre el precio publicado.",
    ],
    destacado: {
      titulo: "Si tienes una fecha, dínosla",
      texto:
        "30 días calendario es el tiempo real de fabricación. Si tu fecha es más justa, escríbenos antes de pagar: te decimos si alcanzamos o no, sin rodeos.",
    },
    faq: [
      {
        q: "¿Cuánto cuesta el envío a Bucaramanga?",
        a: "$200.000, que se suman al precio del mueble. Se calculan en el checkout al elegir Santander.",
      },
      {
        q: "¿Se puede pedir con una fecha de entrega?",
        a: "Cuéntanos la fecha al encargar. El tiempo normal es de 30 días calendario o menos, y te confirmamos antes de cobrar si tu fecha es viable.",
      },
      {
        q: "¿Puedo pedir una medida que no está en la ficha?",
        a: "Sí, fabricamos a la medida. Escríbenos con el espacio que tienes y te cotizamos.",
      },
      {
        q: "¿Cómo pago?",
        a: "En línea con tarjeta o PSE a través de Bold. Para pedidos de más de diez millones lo cerramos contigo por WhatsApp, por seguridad de ambos.",
      },
      {
        q: "¿Hay garantía?",
        a: "Sí: tres años en la estructura y un año por desajustes, patas y costuras.",
      },
    ],
  },
  {
    slug: "cartagena",
    nombre: "Cartagena",
    departamento: "Bolívar",
    gentilicio: "cartageneros",
    metaTitle: "Muebles a la medida en Cartagena · Sofás, comedores y más",
    metaDescription:
      "Muebles a la medida para Cartagena: sofás, comedores, alcobas y poltronas hechos en Itagüí. Envío $200.000, fabricación en 30 días y garantía nacional.",
    h1: "Muebles a la medida en Cartagena",
    entrada:
      "Diseñamos y fabricamos en Itagüí, y enviamos a Cartagena. Cada mueble se arma después del pedido con la medida y el material que escogiste.",
    cuerpo: [
      "Muchos de los muebles que mandamos a Cartagena son para apartamentos de descanso o para alquiler, donde la pieza se usa a ráfagas y tiene que aguantar manos distintas cada semana. Si es tu caso, dínoslo: cambia lo que te recomendamos. Para uso intenso y rotativo tiene más sentido una microfibra antifluido o un cuero que un lino claro.",
      "También fabricamos a medidas que no están publicadas. Si el apartamento tiene una sala angosta o una pared irregular, mándanos el plano o las medidas por WhatsApp y te cotizamos la pieza exacta en vez de venderte la que más se le parezca.",
      "El envío cuesta $200.000 sobre el precio publicado y la fabricación toma 30 días calendario o menos.",
    ],
    destacado: {
      titulo: "¿Es para alquilar?",
      texto:
        "Si el mueble va a un apartamento de alquiler o de descanso, cuéntanos: para uso rotativo recomendamos microfibra antifluido o cuero antes que un lino claro. Es un consejo, no un cobro extra.",
    },
    faq: [
      {
        q: "¿Envían a Cartagena?",
        a: "Sí, por $200.000 adicionales al precio publicado. El valor se calcula solo en el checkout al elegir Bolívar.",
      },
      {
        q: "¿Fabrican medidas especiales?",
        a: "Sí. Mándanos las medidas de tu espacio por WhatsApp y te cotizamos la pieza exacta.",
      },
      {
        q: "¿Qué material aguanta más el uso?",
        a: "Para uso intenso o rotativo, microfibra antifluido o cuero. El lino es más delicado al manchado, sobre todo en tonos claros.",
      },
      {
        q: "¿Cuánto tarda la entrega?",
        a: "30 días calendario o menos de fabricación, más el envío desde Itagüí.",
      },
      {
        q: "¿La garantía vale en Cartagena?",
        a: "Sí, es nacional: tres años en la estructura y un año por desajustes, patas y costuras.",
      },
    ],
  },
  {
    slug: "pereira",
    nombre: "Pereira",
    departamento: "Risaralda",
    gentilicio: "pereiranos",
    metaTitle: "Muebles a la medida en Pereira · Sofás, comedores y alcobas",
    metaDescription:
      "Sofás, comedores y alcobas a la medida fabricados en Itagüí y enviados a Pereira por $200.000. Diseño propio, 30 días de fabricación y garantía.",
    h1: "Muebles a la medida en Pereira",
    entrada:
      "Fabricamos en Itagüí, a unas horas de Pereira por la autopista del Café, y despachamos al Eje Cafetero. Cada mueble se hace por encargo con la medida, el material y el color que elijas.",
    cuerpo: [
      "La cercanía tiene una ventaja concreta: si viajas a Medellín, puedes pasar por el showroom de Itagüí y sentarte en los muebles antes de decidir. Es el mismo lugar donde se fabrican, así que quien te atiende es quien arma la pieza, y puedes ver la esqueletería por dentro de un sofá a medio tapizar. Esa visita resuelve en veinte minutos dudas que por chat toman días.",
      "Si no puedes viajar, el proceso es el mismo que para cualquier otra ciudad: medidas y precios publicados, fotos del material real y asesoría por WhatsApp antes de confirmar.",
      "El envío a Pereira cuesta $200.000 sobre el precio publicado y la fabricación toma 30 días calendario o menos.",
    ],
    destacado: {
      titulo: "Estás cerca: ven al taller",
      texto:
        "El showroom está en Itagüí y es también el taller. Si viajas a Medellín, agenda y pásate: sentarte en el sofá y ver cómo está armado por dentro resuelve más que cualquier foto.",
    },
    faq: [
      {
        q: "¿Cuánto cuesta el envío a Pereira?",
        a: "$200.000 sobre el precio publicado. Se calcula en el checkout al elegir Risaralda.",
      },
      {
        q: "¿Puedo visitar el taller?",
        a: "Sí, en Cl. 64 #44-74, Barrio La Esmeralda, Itagüí. Escríbenos antes para agendar y mostrarte lo que te interesa.",
      },
      {
        q: "¿Entregan también en Armenia y Manizales?",
        a: "Sí, enviamos a todas las capitales del país con la misma tarifa de $200.000.",
      },
      {
        q: "¿Cuánto se demora la fabricación?",
        a: "30 días calendario o menos desde que confirmas el pedido.",
      },
      {
        q: "¿Qué garantía tiene el mueble?",
        a: "Tres años en la estructura y un año por desajustes, patas y costuras.",
      },
    ],
  },
];

export const CIUDAD_POR_SLUG: Record<string, Ciudad> = Object.fromEntries(
  CIUDADES.map((c) => [c.slug, c])
);
