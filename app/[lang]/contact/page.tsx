import type { Metadata } from "next";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/Section";
import { ContactInfo } from "@/components/sections/ContactInfo";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return { title: `${t.contact.title} — ${business.address.city}`, description: t.contact.subtitle };
}

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  return (
    <>
      <PageHeader title={t.contact.title} subtitle={t.contact.subtitle} />
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 lg:grid-cols-[1fr_22rem]">
        {/* Quote form is added in Phase 3. */}
        <div className="rounded-2xl border border-dashed border-border p-8 text-fg-muted">Quote form — coming in Phase 3.</div>
        <ContactInfo locale={lang} t={t} />
      </div>
    </>
  );
}
