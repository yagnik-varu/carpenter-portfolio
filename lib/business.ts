import data from "@/content/business.json";

export const business = data;
export type Business = typeof data;

export const telHref = `tel:${business.contact.phone}`;
export const mailHref = `mailto:${business.contact.email}`;

/** WhatsApp click-to-chat link with an optional prefilled message. */
export function whatsappHref(message?: string): string {
  const base = `https://wa.me/${business.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const yearsInBusiness = new Date().getFullYear() - business.foundedYear;
