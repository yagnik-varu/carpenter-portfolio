import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { generalFaq } from "@/lib/faq";
import type { Locale } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/ui/Section";
import { Faq } from "@/components/sections/Faq";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return { title: t.faq.title, description: t.faq.subtitle };
}

export default async function FaqPage({ params }: PageProps<"/[lang]/faq">) {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  return (
    <>
      <PageHeader title={t.faq.title} subtitle={t.faq.subtitle} />
      <Section className="max-w-3xl">
        <Faq items={generalFaq(t)} />
      </Section>
      <CtaBand locale={lang} t={t} />
    </>
  );
}
