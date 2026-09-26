import { business } from "@/lib/business";
import { href, l, type Locale } from "@/lib/i18n";
import type { Service } from "@/content/types";
import { absoluteUrl, siteUrl } from "./site";

const businessId = `${siteUrl}/#business`;

const dayMap: Record<string, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

/** LocalBusiness data built entirely from content/business.json. */
export function localBusinessJsonLd(lang: Locale) {
  const { address, contact, geo } = business;
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": businessId,
    name: business.name,
    legalName: business.legalName,
    description: l(business.description, lang),
    url: absoluteUrl(href(lang)),
    telephone: contact.phone,
    email: contact.email,
    image: absoluteUrl(`/${lang}/opengraph-image`),
    ...(business.media.logo ? { logo: absoluteUrl(business.media.logo) } : {}),
    foundingDate: String(business.foundedYear),
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    areaServed: business.serviceArea.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => dayMap[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: Object.values(business.social).filter(Boolean),
  };
}

export function serviceJsonLd(service: Service, lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: l(service.title, lang),
    description: l(service.summary, lang),
    serviceType: l(service.title, "en"),
    url: absoluteUrl(href(lang, `/services/${service.slug}`)),
    provider: { "@id": businessId },
    areaServed: business.serviceArea.map((name) => ({ "@type": "City", name })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
