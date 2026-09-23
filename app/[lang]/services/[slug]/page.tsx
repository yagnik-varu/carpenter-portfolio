import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronLeft } from "lucide-react";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getCategories, getProjects, getService, getServices } from "@/lib/content";
import { fmt, href, l, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { buttonStyles } from "@/components/ui/button";
import { TrackedLink } from "@/components/TrackedLink";
import { ProjectCard } from "@/components/sections/ProjectCard";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export const dynamicParams = false;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/services/[slug]">): Promise<Metadata> {
  const { lang, slug } = await params;
  const service = await getService(slug);
  if (!service) return {};
  const locale = lang as Locale;
  return {
    title: `${l(service.title, locale)} — ${business.address.city}`,
    description: l(service.summary, locale),
  };
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
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-2 md:items-center md:py-14">
        <div>
          <Link
            href={href(lang, "/services")}
            className="mb-4 inline-flex items-center gap-1 text-sm text-fg-muted hover:text-fg"
          >
            <ChevronLeft className="size-4" aria-hidden /> {t.nav.services}
          </Link>
          <h1 className="font-serif text-4xl font-semibold md:text-5xl">{title}</h1>
          <p className="mt-4 text-lg text-fg-muted">{l(service.intro, lang)}</p>
          <p className="mt-6 text-sm text-fg-muted">
            {t.services.startingFrom}:{" "}
            <strong className="text-base text-fg">{l(service.priceRange, lang)}</strong>
          </p>
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
          priority
          className="rounded-3xl"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <Section title={t.services.included}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {service.included.map((item) => (
            <li key={item.en} className="flex gap-3 rounded-xl border border-border bg-surface p-4">
              <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
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
