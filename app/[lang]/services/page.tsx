import type { Metadata } from "next";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { getServices } from "@/lib/content";
import type { Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/Section";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return {
    title: `${t.services.title} — ${business.address.city}`,
    description: t.services.subtitle,
  };
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const lang = (await params).lang as Locale;
  const [t, services] = await Promise.all([getDictionary(lang), getServices()]);

  return (
    <>
      <PageHeader title={t.services.title} subtitle={t.services.subtitle} />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <li key={service.slug}>
              <ServiceCard service={service} locale={lang} learnMore={t.actions.learnMore} tone={i} />
            </li>
          ))}
        </ul>
      </div>
      <CtaBand locale={lang} t={t} />
    </>
  );
}
