import Image from "next/image";
import { Star } from "lucide-react";
import type { Review } from "@/content/types";
import { fmt } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonStyles } from "@/components/ui/button";

export function Stars({ rating, label, size = "size-4" }: { rating: number; label: string; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={label}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${size} ${i < Math.round(rating) ? "fill-star text-star" : "fill-muted text-muted"}`}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function RatingSummary({ rating, count, t }: { rating: number; count: number; t: Dictionary }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-serif text-4xl font-semibold">{rating.toFixed(1)}</span>
      <div>
        <Stars rating={rating} label={fmt(t.reviews.stars, { rating })} />
        <p className="text-sm text-fg-muted">{fmt(t.reviews.basedOn, { count })}</p>
      </div>
    </div>
  );
}

function ReviewCard({ review, t, featured = false }: { review: Review; t: Dictionary; featured?: boolean }) {
  // `featured` only changes the look from lg up (big dark pull-quote); on phones every card is equal.
  const f = (cls: string) => (featured ? cls : "");
  return (
    <figure
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl bg-surface p-6 shadow-card ring-1 ring-border/60 ${f("lg:bg-fg lg:p-10 lg:text-inverse lg:ring-0")}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-3 right-4 font-serif text-8xl leading-none text-wood/15 ${f("lg:-top-6 lg:right-8 lg:text-[11rem] lg:text-wood-light/25")}`}
      >
        “
      </span>
      {featured && <p className="label-mono mb-4 hidden text-wood-light lg:block">{t.reviews.featured}</p>}
      <Stars rating={review.rating} label={fmt(t.reviews.stars, { rating: review.rating })} />
      <blockquote className="mt-3 flex-1">
        <p className={`line-clamp-6 ${f("lg:line-clamp-none lg:font-serif lg:text-3xl lg:leading-snug lg:text-balance")}`}>
          “{review.text}”
        </p>
      </blockquote>
      <figcaption className={`mt-5 flex items-center gap-3 border-t border-dashed border-line pt-4 text-sm ${f("lg:border-inverse-line")}`}>
        {review.avatar ? (
          <Image src={review.avatar} alt="" width={36} height={36} className="size-9 rounded-full" />
        ) : (
          <span className="grid size-9 place-items-center rounded-full bg-muted font-serif font-semibold text-wood" aria-hidden>
            {review.author.charAt(0)}
          </span>
        )}
        <span>
          {review.authorUrl ? (
            <a
              href={review.authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring block rounded-sm font-semibold hover:underline"
            >
              {review.author}
            </a>
          ) : (
            <span className="block font-semibold">{review.author}</span>
          )}
          <span className={`text-fg-muted ${f("lg:text-inverse-muted")}`}>{review.relativeTime}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Review cards. "scroll": swipe row on phones, 3 columns from md. "featured": swipe row on
 * phones, and from lg a large pull-quote with the other reviews stacked beside it.
 * "grid": plain grid (reviews page).
 */
export function ReviewList({
  reviews,
  t,
  layout = "scroll",
  fromGoogle = false,
}: {
  reviews: Review[];
  t: Dictionary;
  layout?: "scroll" | "featured" | "grid";
  /** Show the attribution Google requires when displaying Places reviews. */
  fromGoogle?: boolean;
}) {
  const scroller = "no-scrollbar fade-edges -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2";
  const listClass = {
    grid: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
    scroll: `${scroller} md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:[mask-image:none]`,
    featured: `${scroller} lg:mx-0 lg:grid lg:grid-cols-5 lg:grid-rows-2 lg:gap-5 lg:overflow-visible lg:px-0 lg:[mask-image:none]`,
  }[layout];
  const itemClass = (i: number) =>
    layout === "grid"
      ? ""
      : layout === "scroll"
        ? "w-[85%] shrink-0 snap-center md:w-auto"
        : `w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto ${i === 0 ? "lg:col-span-3 lg:row-span-2" : "lg:col-span-2"}`;

  return (
    <>
      {fromGoogle && <p className="mb-3 text-xs text-fg-muted">{t.reviews.fromGoogle}</p>}
      <ul className={listClass}>
        {reviews.map((review, i) => (
          <li key={review.author + review.relativeTime} className={itemClass(i)}>
            <ReviewCard review={review} t={t} featured={layout === "featured" && i === 0} />
          </li>
        ))}
      </ul>
    </>
  );
}

export function GoogleReviewsLink({ url, t }: { url: string; t: Dictionary }) {
  if (!url) return null;
  return (
    <TrackedLink
      href={url}
      event="cta_click"
      eventProps={{ location: "reviews", type: "google_reviews" }}
      className={buttonStyles.secondary}
    >
      {t.actions.seeAllOnGoogle}
    </TrackedLink>
  );
}
