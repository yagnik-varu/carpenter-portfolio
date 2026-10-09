import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { generalFaq } from "@/lib/faq";
import { href, type Locale } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/ui/Section";
import { Faq } from "@/components/sections/Faq";
import { TalkCard } from "@/components/sections/TalkCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/JsonLd";
import { faqJsonLd } from "@/lib/seo/jsonld";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  return pageMetadata({ lang, path: "/faq", title: t.faq.title, description: t.faq.subtitle });
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  const items = generalFaq(t);
  return (
    <>
      <JsonLd data={faqJsonLd(items)} />
      <PageHeader
        title={t.faq.title}
        subtitle={t.faq.subtitle}
        crumbs={[{ label: t.nav.home, href: href(lang) }, { label: t.nav.faq }]}
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
          <Faq items={items} />
          <TalkCard
            locale={lang}
            t={t}
            location="faq_page"
            title={t.faq.stillUnsure.title}
            text={t.faq.stillUnsure.text}
            className="lg:sticky lg:top-24"
          />
        </div>
      </Section>
      <CtaBand locale={lang} t={t} />
    </>
  );
}
