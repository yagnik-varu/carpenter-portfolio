import type { Metadata } from "next";
import { BadgeCheck, HardHat, ShieldCheck, Award } from "lucide-react";
import { business, yearsInBusiness } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { fmt, href, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";
import { PageHeader, Section } from "@/components/ui/Section";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow } from "@/components/craft/Eyebrow";
import { Signature } from "@/components/craft/Signature";
import { TrustSeal } from "@/components/craft/TrustSeal";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  return pageMetadata({ lang, path: "/about", title: t.about.title, description: t.about.subtitle });
}

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  const { credentials } = business;

  const creds = [
    credentials.licensed && { icon: BadgeCheck, label: t.trust.licensed },
    credentials.insured && { icon: ShieldCheck, label: `${t.trust.insured} · ${credentials.insuranceAmount}` },
    credentials.wsib && { icon: HardHat, label: t.trust.wsib },
    credentials.warrantyYears > 0 && { icon: Award, label: fmt(t.trust.warranty, { years: credentials.warrantyYears }) },
  ].filter(Boolean) as { icon: typeof Award; label: string }[];

  return (
    <>
      <PageHeader
        title={t.about.title}
        subtitle={t.about.subtitle}
        crumbs={[{ label: t.nav.home, href: href(lang) }, { label: t.nav.about }]}
        aside={<TrustSeal id="about-header" locale={lang} t={t} className="size-40 text-wood" />}
      />

      {/* Story */}
      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-14">
          <div className="relative">
            <Media
              media={{
                src: business.media.ownerPhoto || undefined,
                alt: { en: `${business.owner}, founder`, gu: `${business.owner}, સ્થાપક` },
              }}
              locale={lang}
              aspect="aspect-[4/5]"
              className="rounded-3xl shadow-lift"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <p className="label-mono absolute -bottom-4 left-6 rounded-full bg-fg px-4 py-2 text-inverse shadow-card">
              {business.owner} · {fmt(t.seal.est, { year: business.foundedYear })}
            </p>
          </div>
          <div>
            <Eyebrow>{t.about.storyTitle}</Eyebrow>
            <blockquote className="mt-4 font-serif text-3xl leading-snug font-semibold text-balance md:text-4xl">
              <span className="text-wood">“</span>
              {t.about.pullQuote}
              <span className="text-wood">”</span>
            </blockquote>
            <p className="mt-6 text-lg text-fg-muted">{fmt(t.about.story, { city: business.address.city })}</p>
            <Signature role={t.owner.role} className="mt-6" />
            <dl className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-surface p-4 shadow-card ring-1 ring-border/60">
                <dt className="label-mono text-fg-muted">{t.about.yearsLabel}</dt>
                <dd className="mt-1 font-serif text-4xl font-semibold">{yearsInBusiness}+</dd>
              </div>
              <div className="rounded-2xl bg-surface p-4 shadow-card ring-1 ring-border/60">
                <dt className="label-mono text-fg-muted">{t.about.projectsLabel}</dt>
                <dd className="mt-1 font-serif text-4xl font-semibold">{business.stats.projectsCompleted}+</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      {/* Milestones on a measuring line */}
      <div className="graph-paper border-y border-border bg-surface">
        <Section title={t.about.timelineTitle}>
          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute top-2 bottom-2 left-[0.4375rem] border-l border-dashed border-wood/50 md:hidden" />
            <span aria-hidden className="absolute top-[0.4375rem] right-0 left-0 hidden border-t border-dashed border-wood/50 md:block" />
            {t.about.timeline.map((m) => (
              <li key={m.year} className="relative pl-8 md:pt-8 md:pl-0">
                <span aria-hidden className="absolute top-0.5 left-0 size-3.5 rounded-full border-2 border-wood bg-surface md:top-0" />
                <p className="font-mono text-sm text-wood">{m.year}</p>
                <h3 className="mt-1 font-serif text-xl font-semibold">{m.title}</h3>
                <p className="mt-1.5 text-sm text-fg-muted">{m.text}</p>
              </li>
            ))}
          </ol>
        </Section>
      </div>

      <Section title={t.about.valuesTitle}>
        <ul className="grid gap-4 md:grid-cols-3 md:gap-5">
          {t.about.values.map((v, i) => (
            <li key={v.title} className="rounded-2xl bg-surface p-6 shadow-card ring-1 ring-border/60 md:p-8">
              <p className="font-mono text-sm text-wood">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-serif text-2xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-fg-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Credentials as a certificate */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl bg-fg p-6 text-inverse shadow-lift md:p-12">
          <div aria-hidden className="ruler-edge absolute inset-x-0 top-0 text-inverse/30" />
          <div className="grid gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:items-center md:gap-12">
            <TrustSeal id="about-cert" locale={lang} t={t} filled={false} className="mx-auto size-40 text-wood-light md:size-48" />
            <div>
              <h2 className="font-serif text-3xl font-semibold text-balance md:text-4xl">{t.about.credentialsTitle}</h2>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {creds.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 border-b border-dashed border-inverse-line py-3 font-medium">
                    <Icon className="size-5 shrink-0 text-wood-light" aria-hidden /> {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section title={t.home.processTitle}>
        <Process t={t} />
      </Section>

      <CtaBand locale={lang} t={t} />
    </>
  );
}
