import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { getReviews } from "@/lib/content";
import { fmt, href, type Locale } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/ui/Section";
import { GoogleReviewsLink, ReviewList, Stars } from "@/components/sections/Reviews";
import { CtaBand } from "@/components/sections/CtaBand";
import { pageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({ params }: PageProps<"/[lang]/reviews">): Promise<Metadata> {
  const lang = (await params).lang as Locale;
  const [t, reviews] = await Promise.all([getDictionary(lang), getReviews()]);
  return pageMetadata({
    lang,
    path: "/reviews",
    title: t.reviews.title,
    description: fmt(t.reviews.subtitle, { rating: reviews.rating, count: reviews.count }),
  });
}

export default async function ReviewsPage({ params }: PageProps<"/[lang]/reviews">) {
  const lang = (await params).lang as Locale;
  const [t, reviews] = await Promise.all([getDictionary(lang), getReviews()]);
  return (
    <>
      <PageHeader
        title={t.reviews.title}
        subtitle={fmt(t.reviews.subtitle, { rating: reviews.rating, count: reviews.count })}
        crumbs={[{ label: t.nav.home, href: href(lang) }, { label: t.nav.reviews }]}
        aside={
          <div className="rounded-2xl bg-surface px-8 py-6 text-center shadow-card ring-1 ring-border/60">
            <p className="font-serif text-6xl font-semibold">{reviews.rating.toFixed(1)}</p>
            <Stars rating={reviews.rating} label={fmt(t.reviews.stars, { rating: reviews.rating })} size="size-5" />
            <p className="label-mono mt-2 text-fg-muted">{fmt(t.reviews.basedOn, { count: reviews.count })}</p>
          </div>
        }
      />
      <Section>
        <ReviewList
          reviews={reviews.reviews.slice(0, 3)}
          t={t}
          layout="featured"
          fromGoogle={reviews.source === "google"}
        />
        {reviews.reviews.length > 3 && (
          <div className="mt-5">
            <ReviewList reviews={reviews.reviews.slice(3)} t={t} layout="grid" />
          </div>
        )}
        <div className="mt-10 flex justify-center">
          <GoogleReviewsLink url={reviews.url} t={t} />
        </div>
      </Section>
      <CtaBand locale={lang} t={t} />
    </>
  );
}
