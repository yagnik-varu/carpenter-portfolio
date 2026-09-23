import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { getReviews } from "@/lib/content";
import { fmt, type Locale } from "@/lib/i18n";
import { PageHeader, Section } from "@/components/ui/Section";
import { GoogleReviewsLink, RatingSummary, ReviewList } from "@/components/sections/Reviews";
import { CtaBand } from "@/components/sections/CtaBand";

export async function generateMetadata({ params }: PageProps<"/[lang]/reviews">): Promise<Metadata> {
  const t = await getDictionary((await params).lang as Locale);
  const reviews = await getReviews();
  return { title: t.reviews.title, description: fmt(t.reviews.subtitle, { rating: reviews.rating, count: reviews.count }) };
}

export default async function ReviewsPage({ params }: PageProps<"/[lang]/reviews">) {
  const lang = (await params).lang as Locale;
  const [t, reviews] = await Promise.all([getDictionary(lang), getReviews()]);
  return (
    <>
      <PageHeader title={t.reviews.title} subtitle={fmt(t.reviews.subtitle, { rating: reviews.rating, count: reviews.count })} />
      <Section>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <RatingSummary rating={reviews.rating} count={reviews.count} t={t} />
          <GoogleReviewsLink url={reviews.url} t={t} />
        </div>
        <ReviewList reviews={reviews.reviews} t={t} grid />
      </Section>
      <CtaBand locale={lang} t={t} />
    </>
  );
}
