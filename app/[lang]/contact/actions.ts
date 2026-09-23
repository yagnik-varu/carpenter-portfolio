"use server";

import { headers } from "next/headers";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, fmt, hasLocale, l } from "@/lib/i18n";
import { fieldErrorsFrom, quoteSchema, validatePhotos, type QuoteInput, type QuoteState } from "@/lib/quote";
import { escapeHtml, sendEmail } from "@/lib/server/email";
import { rateLimit } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";
import { services } from "@/content/services";

export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never fill this hidden field. Pretend success so bots move on.
  if (formData.get("website")) return { status: "success" };

  const rawLocale = String(formData.get("locale") ?? "");
  const locale = hasLocale(rawLocale) ? rawLocale : defaultLocale;

  const h = await headers();
  const ip = h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(ip)) return { status: "error", fieldErrors: {}, formError: "generic" };

  const parsed = quoteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { status: "error", fieldErrors: fieldErrorsFrom(parsed.error) };

  const photos = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);
  if (!validatePhotos(photos)) return { status: "error", fieldErrors: {}, formError: "photos" };

  const token = formData.get("cf-turnstile-response");
  if (!(await verifyTurnstile(typeof token === "string" ? token : null, ip))) {
    return { status: "error", fieldErrors: {}, formError: "captcha" };
  }

  try {
    const attachments = await Promise.all(
      photos.map(async (file, i) => ({
        filename: `photo-${i + 1}.${file.type.split("/")[1] || "jpg"}`,
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      })),
    );
    await notifyOwner(parsed.data, locale, attachments);
    if (parsed.data.email) await autoReply(parsed.data, locale);
  } catch (err) {
    console.error("[quote] failed to send", err);
    return { status: "error", fieldErrors: {}, formError: "generic" };
  }

  return { status: "success" };
}

function serviceName(slug: string) {
  const s = services.find((x) => x.slug === slug);
  return s ? l(s.title, "en") : slug || "—";
}

async function notifyOwner(q: QuoteInput, locale: string, attachments: { filename: string; content: string }[]) {
  const rows: [string, string][] = [
    ["Name", q.name],
    ["Phone", q.phone],
    ["Email", q.email || "—"],
    ["Preferred contact", q.contactMethod],
    ["Service", serviceName(q.service)],
    ["City / postal", q.city || "—"],
    ["Budget", q.budget || "—"],
    ["Timeline", q.timeline || "—"],
    ["Language", locale],
    ["Photos", String(attachments.length)],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${q.message}`;
  const html = `
    <h2 style="font-family:Georgia,serif">New quote request</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows.map(([k, v]) => `<tr><td style="color:#5c554e">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`).join("")}
    </table>
    <h3 style="font-family:sans-serif">Project details</h3>
    <p style="font-family:sans-serif;white-space:pre-wrap">${escapeHtml(q.message)}</p>`;

  await sendEmail({
    to: business.contact.leadsEmail,
    subject: `New quote request: ${serviceName(q.service)} — ${q.name}`,
    text,
    html,
    replyTo: q.email || undefined,
    attachments,
  });
}

async function autoReply(q: QuoteInput, locale: string) {
  const t = await getDictionary(hasLocale(locale) ? locale : defaultLocale);
  const r = t.contact.autoReply;
  const vars = { name: q.name, business: business.name, phone: business.contact.phoneDisplay };
  const paragraphs = [fmt(r.greeting, vars), fmt(r.body, vars), fmt(r.signoff, vars)];

  await sendEmail({
    to: q.email,
    subject: fmt(r.subject, vars),
    text: paragraphs.join("\n\n"),
    html: paragraphs.map((p) => `<p style="font-family:sans-serif;font-size:15px">${escapeHtml(p)}</p>`).join(""),
    replyTo: business.contact.email,
  });
}
