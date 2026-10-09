import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { business, yearsInBusiness } from "@/lib/business";
import { fmt, href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { Media } from "@/components/ui/Media";
import { Eyebrow } from "@/components/craft/Eyebrow";
import { Signature } from "@/components/craft/Signature";
import { TrustSeal } from "@/components/craft/TrustSeal";

/** Home-page "meet your carpenter" strip: owner photo, short intro, signature, key numbers. */
export function MeetOwner({ locale, t, index }: { locale: Locale; t: Dictionary; index?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 md:py-20">
      <div className="reveal grid overflow-hidden rounded-3xl bg-surface shadow-card ring-1 ring-border/60 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative">
          <Media
            media={{
              src: business.media.ownerPhoto || undefined,
              alt: { en: `${business.owner}, founder`, gu: `${business.owner}, સ્થાપક` },
            }}
            locale={locale}
            aspect="aspect-[4/5] md:aspect-auto md:h-full md:min-h-[30rem]"
            sizes="(min-width: 768px) 40vw, 100vw"
          />
          <p className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pt-12 pb-4 font-mono text-[0.7rem] tracking-wider text-inverse uppercase">
            {business.owner} — {fmt(t.seal.est, { year: business.foundedYear })}
          </p>
        </div>

        <div className="graph-paper relative flex flex-col justify-center px-6 py-10 md:px-12 md:py-14">
          <TrustSeal
            id="owner"
            locale={locale}
            t={t}
            spin={false}
            className="absolute top-6 right-6 hidden size-24 text-wood/80 sm:block"
          />
          <Eyebrow index={index}>{t.home.eyebrows.owner}</Eyebrow>
          <h2 className="mt-3 font-serif text-3xl font-semibold md:text-[2.75rem] md:leading-[1.1]">{t.home.meetTitle}</h2>
          <p className="mt-4 max-w-xl text-lg text-fg-muted">
            {fmt(t.home.meetText, { name: business.owner, years: yearsInBusiness, city: business.address.city })}
          </p>
          <Signature role={t.owner.role} className="mt-6" />
          <dl className="mt-8 grid max-w-md grid-cols-2 gap-4">
            <div className="rounded-2xl bg-surface p-4 shadow-card ring-1 ring-border/60">
              <dt className="label-mono text-fg-muted">{t.about.yearsLabel}</dt>
              <dd className="mt-1 font-serif text-4xl font-semibold">{yearsInBusiness}+</dd>
            </div>
            <div className="rounded-2xl bg-surface p-4 shadow-card ring-1 ring-border/60">
              <dt className="label-mono text-fg-muted">{t.about.projectsLabel}</dt>
              <dd className="mt-1 font-serif text-4xl font-semibold">{business.stats.projectsCompleted}+</dd>
            </div>
          </dl>
          <Link
            href={href(locale, "/about")}
            className="focus-ring mt-8 inline-flex min-h-11 items-center gap-2 self-start rounded-full font-semibold text-primary"
          >
            {t.home.meetCta} <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
