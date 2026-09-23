import "server-only";

type Attachment = { filename: string; content: string /* base64 */ };
type Email = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
};

/**
 * Sends email through Resend's REST API (plain fetch — no SDK, runs on Vercel or Cloudflare).
 * Without RESEND_API_KEY it logs the email instead, so the form works in local development.
 */
export async function sendEmail(email: Email): Promise<void> {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.QUOTE_FROM_EMAIL || "Website <onboarding@resend.dev>";

  if (!key) {
    console.info("[email] RESEND_API_KEY not set — email not sent:", {
      to: email.to,
      subject: email.subject,
      attachments: email.attachments?.length ?? 0,
      text: email.text,
    });
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: email.to,
      subject: email.subject,
      html: email.html,
      text: email.text,
      reply_to: email.replyTo,
      attachments: email.attachments,
    }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
