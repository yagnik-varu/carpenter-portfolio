import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business, yearsInBusiness } from "@/lib/business";
import { fmt, href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { Media } from "@/components/ui/Media";

/** Home-page "meet your carpenter" strip: owner photo, short intro, key numbers. */
export function MeetOwner({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
      <div className="reveal grid items-center gap-8 overflow-hidden rounded-3xl bg-surface md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-0">
        <Media
          media={{
            src: business.media.ownerPhoto || undefined,
            alt: { en: `${business.owner}, founder`, gu: `${business.owner}, સ્થાપક` },
          }}
          locale={locale}
          aspect="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[26rem]"
          sizes="(min-width: 768px) 40vw, 100vw"
        />
        <div className="px-6 pb-8 md:px-12 md:py-12">
          <h2 className="font-serif text-3xl font-semibold md:text-4xl">{t.home.meetTitle}</h2>
          <p className="mt-4 text-lg text-fg-muted">
            {fmt(t.home.meetText, { name: business.owner, years: yearsInBusiness, city: business.address.city })}
          </p>
          <dl className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-bg p-4">
              <dt className="text-sm text-fg-muted">{t.about.yearsLabel}</dt>
              <dd className="font-serif text-3xl font-semibold">{yearsInBusiness}+</dd>
            </div>
            <div className="rounded-xl bg-bg p-4">
              <dt className="text-sm text-fg-muted">{t.about.projectsLabel}</dt>
              <dd className="font-serif text-3xl font-semibold">{business.stats.projectsCompleted}+</dd>
            </div>
          </dl>
          <Link
            href={href(locale, "/about")}
            className="mt-6 inline-flex min-h-11 items-center gap-1 font-semibold text-primary"
          >
            {t.home.meetCta} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
