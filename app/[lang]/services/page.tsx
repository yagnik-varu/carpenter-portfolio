import type { Metadata } from "next";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getServices } from "@/lib/content";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { fmt, href, l, type Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/Section";
import { Media } from "@/components/ui/Media";
import { buttonStyles } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import { serviceIcons } from "@/components/sections/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/services",
    title: `${t.services.title} — ${business.address.city}`,
    description: t.services.subtitle,
  });
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = (await params).lang as Locale;
  const [t, services] = await Promise.all([getDictionary(lang), getServices()]);

  return (
    <>
      <PageHeader
        title={t.services.title}
        subtitle={t.services.subtitle}
        crumbs={[{ label: t.nav.home, href: href(lang) }, { label: t.nav.services }]}
      />
      {/* Each service is a "chapter": photo and details side by side (alternating) from lg, stacked on phones. */}
      <ol className="mx-auto max-w-6xl space-y-16 px-4 py-12 md:space-y-24 md:py-20">
        {services.map((service, i) => {
          const Icon = serviceIcons[service.icon];
          const title = l(service.title, lang);
          const detail = href(lang, `/services/${service.slug}`);
          return (
            <li key={service.slug} className="reveal grid gap-6 lg:grid-cols-2 lg:items-center lg:gap-14">
              <Link
                href={detail}
                tabIndex={-1}
                aria-hidden
                className={`group block overflow-hidden rounded-3xl shadow-lift ${i % 2 ? "lg:order-2" : ""}`}
              >
                <Media
                  media={service.image}
                  locale={lang}
                  tone={i}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </Link>
              <div>
                <p className="flex items-center gap-3">
                  <span className="font-serif text-5xl font-semibold text-wood/30 md:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="size-7 text-wood" aria-hidden />
                </p>
                <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
                  <Link href={detail} className="focus-ring rounded-sm hover:text-wood">
                    {title}
                  </Link>
                </h2>
                <p className="mt-3 text-fg-muted md:text-lg">{l(service.summary, lang)}</p>
                <ul className="mt-5 space-y-2">
                  {service.included.slice(0, 3).map((item) => (
                    <li key={item.en} className="flex gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                      {l(item, lang)}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-baseline gap-3 border-t border-dashed border-line pt-4">
                  <span className="label-mono text-fg-muted">{t.services.startingFrom}</span>
                  <span className="font-semibold">{l(service.priceRange, lang)}</span>
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <TrackedLink
                    href={`${href(lang, "/contact")}?service=${service.slug}`}
                    event="cta_click"
                    eventProps={{ location: "services_list", type: "quote", service: service.slug }}
                    className={buttonStyles.primary}
                  >
                    {fmt(t.services.quoteCta, { service: title })}
                  </TrackedLink>
                  <Link href={detail} className={buttonStyles.secondary}>
                    {t.actions.learnMore} <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
      <CtaBand locale={lang} t={t} />
    </>
  );
}
