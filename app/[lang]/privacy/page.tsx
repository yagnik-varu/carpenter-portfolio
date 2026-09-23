import type { Metadata } from "next";
import { business } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { fmt, type Locale } from "@/lib/i18n";
import { PageHeader } from "@/components/ui/Section";

export async function generateMetadata({ params }: PageProps<"/[lang]/privacy">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return { title: t.privacy.title, robots: { index: false } };
}

export default async function PrivacyPage({ params }: PageProps<"/[lang]/privacy">) {
  const t = await getDictionary((await params).lang as Locale);
  return (
    <>
      <PageHeader title={t.privacy.title} />
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-12 text-fg-muted">
        {t.privacy.body.map((p) => (
          <p key={p}>{fmt(p, { email: business.contact.email })}</p>
        ))}
      </div>
    </>
  );
}
