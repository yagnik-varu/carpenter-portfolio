import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getCategories, getProjects, getService, getServices } from "@/lib/content";
import { fmt, href, l, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";
import { Breadcrumbs, Section } from "@/components/ui/Section";
import { SpecSheet } from "@/components/craft/SpecSheet";
import { buttonStyles } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  const lang = rawLang as Locale;
  return pageMetadata({
    lang,
    path: `/services/${slug}`,
    title: `${l(service.title, lang)} — ${business.address.city}`,
    description: l(service.summary, lang),
  });
}

export default async function ServicePage({ params }: PageProps<"/[lang]/services/[slug]">) {
  const { lang: rawLang, slug } = await params;
  const lang = rawLang as Locale;
  const service = await getService(slug);
  if (!service) notFound();

  const [t, related, categories] = await Promise.all([
    getDictionary(lang),
    getProjects({ category: service.category }),
    getCategories(),
  ]);
  const title = l(service.title, lang);

  return (
    <>
      <JsonLd data={serviceJsonLd(service, lang)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: t.nav.home, path: href(lang) },
          { name: t.nav.services, path: href(lang, "/services") },
          { name: title, path: href(lang, `/services/${service.slug}`) },
        ])}
      />
      <div className="graph-paper relative border-b border-border bg-muted/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-8 pb-12 md:grid-cols-2 md:items-center md:pt-12 md:pb-16">
        <div>
          <Breadcrumbs
            items={[
              { label: t.nav.home, href: href(lang) },
              { label: t.nav.services, href: href(lang, "/services") },
              { label: title },
            ]}
          />
          <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-6xl md:leading-[1.05]">{title}</h1>
          <p className="mt-4 text-lg text-fg-muted">{l(service.intro, lang)}</p>
          <SpecSheet
            className="mt-6"
            rows={[
              { label: t.services.startingFrom, value: l(service.priceRange, lang) },
              ...(business.credentials.warrantyYears > 0
                ? [
                    {
                      label: fmt(t.trust.warranty, { years: business.credentials.warrantyYears }),
                      value: <Check className="inline size-5 text-primary" aria-hidden />,
                    },
                  ]
                : []),
              { label: t.contact.serviceArea, value: business.serviceArea.slice(0, 3).join(", ") },
            ]}
          />
          <TrackedLink
            href={`${href(lang, "/contact")}?service=${service.slug}`}
            event="cta_click"
            eventProps={{ location: "service_hero", type: "quote", service: service.slug }}
            className={`${buttonStyles.primary} mt-6 w-full sm:w-auto`}
          >
            {fmt(t.services.quoteCta, { service: title })}
          </TrackedLink>
        </div>
        <Media
          media={service.image}
          locale={lang}
          preload
          className="rounded-3xl shadow-lift"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
        </div>
        <div aria-hidden className="ruler-edge absolute inset-x-0 bottom-0 -scale-y-100" />
      </div>

      <Section title={t.services.included}>
        <ul className="graph-paper grid gap-x-8 rounded-3xl bg-surface px-5 py-3 shadow-card ring-1 ring-border/60 sm:grid-cols-2 md:px-8 md:py-5">
          {service.included.map((item) => (
            <li key={item.en} className="flex items-start gap-3 border-b border-dashed border-line py-3.5">
              <span className="grid size-6 shrink-0 place-items-center rounded-md border-2 border-primary text-primary">
                <Check className="size-4" strokeWidth={3} aria-hidden />
              </span>
              {l(item, lang)}
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 && (
        <Section title={t.services.relatedProjects}>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((project, i) => (
              <li key={project.slug}>
                <ProjectCard
                  project={project}
                  category={categories.find((c) => c.id === project.category)}
                  locale={lang}
                  index={i}
                />
              </li>
            ))}
          </ul>
        </Section>
      )}

      {service.faq.length > 0 && (
        <Section title={fmt(t.services.faq, { service: title })}>
          <Faq items={service.faq.map((f) => ({ q: l(f.q, lang), a: l(f.a, lang) }))} />
        </Section>
      )}

      <CtaBand locale={lang} t={t} title={fmt(t.services.quoteCta, { service: title })} service={service.slug} />
    </>
  );
}
