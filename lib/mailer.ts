// Capa de envío de correo. Hoy usa Resend por HTTP (sin SDK, cero dependencias);
// si mañana cambiamos de proveedor solo se toca este archivo.
//
// Variables de entorno:
//   RESEND_API_KEY   - API key del proyecto en Resend.
//   MAIL_FROM        - remitente verificado, p.ej. 'LaFab <hola@lafab.com.co>'
//   MAIL_REPLY_TO    - (opcional) correo de respuesta.
//   MAIL_DRY_RUN     - '1' para no enviar nada y solo registrar en consola.

export type MailInput = {
  to: string;
  subject: string;
  html: string;
  /** Alternativa en texto plano; mejora la entregabilidad. */
  text?: string;
  /** Cabecera List-Unsubscribe (URL). */
  unsubscribeUrl?: string;
  /** Etiqueta para agrupar en las métricas del ESP. */
  tag?: string;
};

export type MailResult = { ok: boolean; id?: string; error?: string };

const FROM = process.env.MAIL_FROM || "LaFab <hola@lafab.com.co>";
const REPLY_TO = process.env.MAIL_REPLY_TO;
const DRY_RUN = process.env.MAIL_DRY_RUN === "1";

export const mailerReady = () => DRY_RUN || Boolean(process.env.RESEND_API_KEY);

export async function sendMail(input: MailInput): Promise<MailResult> {
  const key = process.env.RESEND_API_KEY;

  if (DRY_RUN || !key) {
    // En dev/preview sin API key no reventamos: registramos y seguimos.
    console.info(
      `[mailer] ${DRY_RUN ? "dry-run" : "sin RESEND_API_KEY"} → "${input.subject}" para ${input.to}`
    );
    return { ok: DRY_RUN, error: DRY_RUN ? undefined : "RESEND_API_KEY no configurada" };
  }

  const headers: Record<string, string> = {};
  if (input.unsubscribeUrl) {
    headers["List-Unsubscribe"] = `<${input.unsubscribeUrl}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [input.to],
        subject: input.subject,
        html: input.html,
        ...(input.text ? { text: input.text } : {}),
        ...(REPLY_TO ? { reply_to: REPLY_TO } : {}),
        ...(Object.keys(headers).length ? { headers } : {}),
        ...(input.tag ? { tags: [{ name: "tipo", value: input.tag }] } : {}),
      }),
    });

    const data = (await r.json().catch(() => null)) as
      | { id?: string; message?: string; name?: string }
      | null;

    if (!r.ok) {
      return { ok: false, error: data?.message || `Resend respondió ${r.status}` };
    }
    return { ok: true, id: data?.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Error de red" };
  }
}
