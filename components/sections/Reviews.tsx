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

function ReviewCard({ review, t }: { review: Review; t: Dictionary }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-border bg-surface p-5">
      <Stars rating={review.rating} label={fmt(t.reviews.stars, { rating: review.rating })} />
      <blockquote className="mt-3 flex-1 text-fg">
        <p className="line-clamp-6">“{review.text}”</p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3 text-sm">
        {review.avatar ? (
          <Image src={review.avatar} alt="" width={36} height={36} className="size-9 rounded-full" />
        ) : (
          <span className="grid size-9 place-items-center rounded-full bg-muted font-semibold text-wood" aria-hidden>
            {review.author.charAt(0)}
          </span>
        )}
        <span>
          {review.authorUrl ? (
            <a href={review.authorUrl} target="_blank" rel="noopener noreferrer" className="block font-semibold hover:underline">
              {review.author}
            </a>
          ) : (
            <span className="block font-semibold">{review.author}</span>
          )}
          <span className="text-fg-muted">{review.relativeTime}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Horizontal swipe list on mobile (CSS scroll-snap, no JS), grid on desktop. */
export function ReviewList({
  reviews,
  t,
  grid = false,
  fromGoogle = false,
}: {
  reviews: Review[];
  t: Dictionary;
  grid?: boolean;
  /** Show the attribution Google requires when displaying Places reviews. */
  fromGoogle?: boolean;
}) {
  return (
    <>
      {fromGoogle && <p className="mb-3 text-xs text-fg-muted">{t.reviews.fromGoogle}</p>}
      <ul
        className={
          grid
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0"
        }
      >
        {reviews.map((review) => (
          <li key={review.author + review.relativeTime} className={grid ? "" : "w-[85%] shrink-0 snap-center md:w-auto"}>
            <ReviewCard review={review} t={t} />
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
