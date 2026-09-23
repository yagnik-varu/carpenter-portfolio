import type { Metadata } from "next";
import { BadgeCheck, HardHat, ShieldCheck, Award } from "lucide-react";
import { business, yearsInBusiness } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { fmt, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";
import { PageHeader, Section } from "@/components/ui/Section";
import { Process } from "@/components/sections/Process";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return { title: t.about.title, description: t.about.subtitle };
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
      <PageHeader title={t.about.title} subtitle={t.about.subtitle} />

      <Section>
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <Media
            media={{
              src: business.media.ownerPhoto || undefined,
              alt: { en: `${business.owner}, founder`, gu: `${business.owner}, સ્થાપક` },
            }}
            locale={lang}
            aspect="aspect-[4/5]"
            className="rounded-3xl"
            sizes="(min-width: 768px) 50vw, 100vw"
          />
          <div>
            <h2 className="font-serif text-3xl font-semibold">{t.about.storyTitle}</h2>
            <p className="mt-4 text-lg text-fg-muted">{fmt(t.about.story, { city: business.address.city })}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-surface p-4">
                <dt className="text-sm text-fg-muted">{t.about.yearsLabel}</dt>
                <dd className="font-serif text-3xl font-semibold">{yearsInBusiness}+</dd>
              </div>
              <div className="rounded-xl bg-surface p-4">
                <dt className="text-sm text-fg-muted">{t.about.projectsLabel}</dt>
                <dd className="font-serif text-3xl font-semibold">{business.stats.projectsCompleted}+</dd>
              </div>
            </dl>
          </div>
        </div>
      </Section>

      <Section title={t.about.valuesTitle}>
        <ul className="grid gap-4 md:grid-cols-3">
          {t.about.values.map((v) => (
            <li key={v.title} className="rounded-2xl border border-border bg-surface p-6">
              <h3 className="font-serif text-xl font-semibold">{v.title}</h3>
              <p className="mt-2 text-fg-muted">{v.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.about.credentialsTitle}>
        <ul className="grid gap-3 sm:grid-cols-2">
          {creds.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 rounded-xl border border-border bg-surface p-4 font-medium">
              <Icon className="size-6 text-wood" aria-hidden /> {label}
            </li>
          ))}
        </ul>
      </Section>

      <Section title={t.home.processTitle}>
        <Process t={t} />
      </Section>

      <CtaBand locale={lang} t={t} />
    </>
  );
}
