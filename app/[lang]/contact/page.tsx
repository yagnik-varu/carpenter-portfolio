import type { Metadata } from "next";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getServices } from "@/lib/content";
import { href, l, type Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/Section";
import { ContactInfo } from "@/components/sections/ContactInfo";
import { QuoteForm } from "@/components/forms/QuoteForm";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return { title: `${t.contact.title} — ${business.address.city}`, description: t.contact.subtitle };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const [t, services] = await Promise.all([getDictionary(lang), getServices()]);
  return (
    <>
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_22rem] lg:items-start">
        <div className="rounded-2xl border border-border bg-surface p-5 md:p-8">
          <QuoteForm
            locale={lang}
            labels={t.contact.form}
            services={services.map((s) => ({ slug: s.slug, title: l(s.title, lang) }))}
            successHref={href(lang, "/contact/thanks")}
          />
        </div>
        <ContactInfo locale={lang} t={t} />
      </div>
    </>
  );
}
