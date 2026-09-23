import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { fmt, href, type Locale } from "@/lib/i18n";
import { buttonStyles } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";

// Dedicated URL so GA4 can also count "/contact/thanks" page views as a conversion.
export async function generateMetadata({ params }: PageProps<"/[lang]/contact/thanks">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return { title: t.contact.success.title, robots: { index: false } };
}

export default async function ThanksPage({ params }: PageProps<"/[lang]/contact/thanks">) {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
      <CheckCircle2 className="size-16 text-primary" aria-hidden />
      <h1 className="mt-6 font-serif text-3xl font-semibold md:text-4xl">{t.contact.success.title}</h1>
      <p className="mt-3 text-fg-muted">{t.contact.success.text}</p>
      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <a href={telHref} className={buttonStyles.secondary}>
          {business.contact.phoneDisplay}
        </a>
        <a
          href={whatsappHref(fmt(t.actions.whatsappMessage, { name: business.name }))}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles.whatsapp}
        >
          <WhatsAppIcon className="size-5" /> {t.actions.whatsapp}
        </a>
      </div>
      <Link href={href(lang)} className="mt-6 text-sm font-semibold text-primary underline-offset-4 hover:underline">
        {t.contact.success.back}
      </Link>
    </div>
  );
}
