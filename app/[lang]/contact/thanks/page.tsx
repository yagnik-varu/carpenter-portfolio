import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { business, telHref, whatsappHref } from "@/lib/business";
import { getDictionary } from "@/lib/dictionaries";
import { fmt, href, type Locale } from "@/lib/i18n";
import { buttonStyles } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons";
import { Signature } from "@/components/craft/Signature";

// Dedicated URL so GA4 can also count "/contact/thanks" page views as a conversion.
export async function generateMetadata({ params }: PageProps<"/[lang]/contact/thanks">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  return { title: t.contact.success.title, robots: { index: false } };
}

export default async function ThanksPage({ params }: PageProps<"/[lang]/contact/thanks">) {
  const lang = (await params).lang as Locale;
  const t = await getDictionary(lang);
  const s = t.contact.success;
  return (
    <div className="graph-paper px-4 py-12 md:py-20">
      {/* A "work ticket": what happens next, signed by the owner. */}
      <div className="relative mx-auto max-w-xl overflow-hidden rounded-3xl bg-surface shadow-lift ring-1 ring-border/60">
        <div aria-hidden className="ruler-edge" />
        <div className="p-6 md:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="label-mono text-wood">{s.ticket}</p>
            <span className="grid size-12 place-items-center rounded-full bg-primary text-primary-fg shadow-card">
              <Check className="size-6" strokeWidth={3} aria-hidden />
            </span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-balance md:text-4xl">{s.title}</h1>
          <p className="mt-3 text-fg-muted">{s.text}</p>

          <h2 className="label-mono mt-8 text-fg-muted">{s.nextTitle}</h2>
          <ol className="relative mt-4 space-y-5">
            <span aria-hidden className="absolute top-2 bottom-2 left-[0.6875rem] border-l border-dashed border-wood/50" />
            {s.steps.map((step, i) => (
              <li key={step.when} className="relative flex gap-4">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface font-mono text-[0.65rem] text-wood ring-2 ring-wood">
                  {i + 1}
                </span>
                <div>
                  <p className="label-mono text-wood">{step.when}</p>
                  <p className="mt-0.5">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-8 border-t border-dashed border-line pt-6">
            <Signature role={t.owner.role} />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
        </div>
      </div>
      <p className="mt-8 text-center">
        <Link href={href(lang)} className="focus-ring rounded-sm text-sm font-semibold text-primary underline-offset-4 hover:underline">
          {s.back}
        </Link>
      </p>
    </div>
  );
}
