// Etiqueta accesible para un control de formulario.
//
// El checkout tenía nueve controles con placeholder y nada más: ni label, ni
// id, ni name, ni autoComplete. El placeholder desaparece al escribir, así que
// quien use un lector de pantalla no sabe qué le están pidiendo, y el navegador
// tampoco puede autorrellenar, que en un checkout se paga en conversión.
//
// La etiqueta va visualmente oculta para no cambiar el diseño, pero existe en
// el árbol de accesibilidad.

export default function Campo({
  id,
  etiqueta,
  requerido = false,
  className = "",
  children,
}: {
  id: string;
  etiqueta: string;
  requerido?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        {etiqueta}
        {requerido ? " (obligatorio)" : ""}
      </label>
      {children}
    </div>
  );
}
