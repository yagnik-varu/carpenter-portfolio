import { z } from "zod";

export const MAX_PHOTOS = 5;
/** Per-photo cap after client-side compression. */
export const MAX_PHOTO_BYTES = 1.5 * 1024 * 1024;
/** Stay well under Vercel's 4.5 MB function body limit (Server Action limit is set to 4mb). */
export const MAX_TOTAL_BYTES = 3.5 * 1024 * 1024;

export const contactMethods = ["phone", "whatsapp", "email"] as const;

/**
 * Shared by the client form and the Server Action. Error messages are keys into
 * `contact.form.errors` in the dictionaries so they can be shown in either language.
 */
export const quoteSchema = z.object({
  name: z.string().trim().min(2, "name").max(100, "name"),
  phone: z
    .string()
    .trim()
    .regex(/^[+()\-.\s\d]{7,20}$/, "phone")
    .refine((v) => v.replace(/\D/g, "").length >= 7, "phone"),
  email: z.union([z.literal(""), z.email("email").max(200, "email")]),
  service: z.string().max(100).optional().default(""),
  city: z.string().trim().max(100).optional().default(""),
  budget: z.string().max(50).optional().default(""),
  timeline: z.string().max(50).optional().default(""),
  message: z.string().trim().min(10, "message").max(4000, "message"),
  contactMethod: z.enum(contactMethods).default("phone"),
  consent: z.literal("on", "consent"),
});

export type QuoteInput = z.infer<typeof quoteSchema>;
export type QuoteErrorKey = "name" | "phone" | "email" | "message" | "consent" | "captcha" | "photos" | "generic";

export type QuoteState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; fieldErrors: Partial<Record<keyof QuoteInput, QuoteErrorKey>>; formError?: QuoteErrorKey };

const errorKeys = new Set<string>(["name", "phone", "email", "message", "consent", "captcha", "photos", "generic"]);

/**
 * Flatten a zod error to { field: errorKey }. Built-in zod messages (e.g. a missing field)
 * aren't dictionary keys, so fall back to the field's own key, then "generic".
 */
export function fieldErrorsFrom(error: z.ZodError): Partial<Record<keyof QuoteInput, QuoteErrorKey>> {
  const out: Partial<Record<keyof QuoteInput, QuoteErrorKey>> = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as keyof QuoteInput;
    if (out[field]) continue;
    const key = errorKeys.has(issue.message) ? issue.message : errorKeys.has(field) ? field : "generic";
    out[field] = key as QuoteErrorKey;
  }
  return out;
}

export function validatePhotos(files: File[]): boolean {
  if (files.length > MAX_PHOTOS) return false;
  let total = 0;
  for (const f of files) {
    if (!f.type.startsWith("image/") || f.size > MAX_PHOTO_BYTES) return false;
    total += f.size;
  }
  return total <= MAX_TOTAL_BYTES;
}
