import type { Metadata } from "next";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getServices } from "@/lib/content";
import { href, l, type Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/Section";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { TalkCard } from "@/components/sections/TalkCard";
import { TrustSeal } from "@/components/craft/TrustSeal";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  return pageMetadata({
    lang,
    path: "/contact",
    title: `${t.contact.title} — ${business.address.city}`,
    description: t.contact.subtitle,
  });
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const [t, services] = await Promise.all([getDictionary(lang), getServices()]);
  return (
    <>
      <PageHeader
        title={t.contact.title}
        subtitle={t.contact.subtitle}
        crumbs={[{ label: t.nav.home, href: href(lang) }, { label: t.nav.contact }]}
        aside={<TrustSeal id="contact" locale={lang} t={t} className="size-36 text-wood" />}
      />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:py-14 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        {/* Phones: the quickest route first, then the form. */}
        <TalkCard
          locale={lang}
          t={t}
          location="contact_quickbar"
          title={t.contact.orReachUs}
          text={t.contact.talkText}
          className="lg:hidden"
        />
        <div className="rounded-3xl bg-surface p-5 shadow-card ring-1 ring-border/60 md:p-10">
          <QuoteForm
            locale={lang}
            labels={t.contact.form}
            groups={t.contact.groups}
            services={services.map((s) => ({ slug: s.slug, title: l(s.title, lang) }))}
            successHref={href(lang, "/contact/thanks")}
          />
        </div>
        <ContactInfo locale={lang} t={t} className="lg:sticky lg:top-24" />
      </div>
    </>
  );
}
