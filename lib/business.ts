import data from "@/content/business.json";
import type { Media } from "@/content/types";

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

const toMedia = ({ src, alt, position }: { src: string; alt: Media["alt"]; position?: string }): Media => ({
  src: src || undefined,
  alt,
  position: position || undefined,
});

/** Home hero photos: [main, side, side]. Empty `src` renders a placeholder. */
export const heroImages: Media[] = business.media.heroImages.map(toMedia);

/** Background photo for the home page's closing call-to-action band. */
export const ctaImage: Media = toMedia(business.media.ctaImage);
