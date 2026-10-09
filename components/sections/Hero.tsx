import Image from "next/image";
import { Camera, Check, Star } from "lucide-react";
import type { Media } from "@/content/types";
import { business, heroImages, type HeroImage } from "@/lib/business";
import { fmt, href, l, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { Stars } from "@/components/sections/Reviews";
import { buttonStyles } from "@/components/ui/button";
import { Emphasis } from "@/components/craft/Emphasis";
import { Eyebrow } from "@/components/craft/Eyebrow";
import { DimensionLine } from "@/components/craft/DimensionLine";
import { TrustSeal } from "@/components/craft/TrustSeal";
import { HeroVideo } from "./HeroVideo";

const tones = ["tone-walnut", "tone-cedar", "tone-oak"];

/** Fills its (positioned) parent with the photo, or a wood-grain placeholder when `src` is empty. */
function HeroPhoto({ media, locale, index, sizes }: { media?: Media; locale: Locale; index: number; sizes: string }) {
  if (media?.src) {
    return (
      <Image
        src={media.src}
        alt={l(media.alt, locale)}
        fill
        sizes={sizes}
        // Only the main photo is above the fold on every screen; side tiles are desktop-only.
        preload={index === 0}
        className="object-cover"
        style={media.position ? { objectPosition: media.position } : undefined}
      />
    );
  }
  return <div className={`wood-grain ${tones[index % tones.length]} absolute inset-0`} aria-hidden />;
}

/**
 * Home hero. Below lg: one full-bleed photo behind the copy. From lg: split layout,
 * copy on the left and a 3-photo mosaic on the right. The main photo is the same element
 * in both layouts (repositioned with CSS), so it's downloaded once.
 */
export function Hero({
  locale,
  t,
  rating,
  reviewCount,
}: {
  locale: Locale;
  t: Dictionary;
  rating: number;
  reviewCount: number;
}) {
  const [main, ...side]: (HeroImage | undefined)[] = heroImages;
  const { address } = business;
  const { heroVideo, heroVideoMobile } = business.media;
  const ratingLabel = fmt(t.reviews.stars, { rating });

  return (
    <section className="relative isolate overflow-hidden bg-fg lg:bg-bg">
      <div className="mx-auto flex min-h-[calc(100svh-4rem-var(--action-bar-h))] w-full max-w-6xl flex-col justify-end px-4 pt-24 pb-10 md:min-h-[min(85vh,760px)] md:justify-center md:py-20 lg:grid lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-12 lg:py-14">
        <div className="hero-copy max-w-2xl text-white lg:text-fg">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-inverse/15 px-3 py-1 text-sm backdrop-blur lg:hidden">
            <Star className="size-4 fill-star text-star" aria-hidden />
            {rating.toFixed(1)} · {fmt(t.hero.eyebrow, { city: address.city })}
          </p>
          <Eyebrow className="mb-5 hidden text-wood lg:flex">
            {fmt(t.hero.eyebrowEst, { year: business.foundedYear, city: address.city, region: address.region })}
          </Eyebrow>
          <h1 className="font-serif text-4xl leading-[1.08] font-semibold text-balance sm:text-5xl md:text-6xl xl:text-[4.25rem]">
            <Emphasis text={t.hero.title} className="text-wood-light lg:text-wood" />
          </h1>
          <p className="mt-4 text-lg text-inverse/85 md:text-xl lg:text-fg-muted">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={href(locale, "/contact")}
              event="cta_click"
              eventProps={{ location: "hero", type: "quote" }}
              className={buttonStyles.heroPrimary}
            >
              {t.hero.primaryCta}
            </TrackedLink>
            <TrackedLink
              href={href(locale, "/projects")}
              event="cta_click"
              eventProps={{ location: "hero", type: "projects" }}
              className={buttonStyles.heroSecondary}
            >
              {t.hero.secondaryCta}
            </TrackedLink>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-inverse/85 lg:text-fg-muted">
            {t.hero.reassurance.map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Check className="size-4 text-wood-light lg:text-wood" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:relative lg:grid lg:h-[min(72vh,600px)] lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:grid-rows-2 lg:gap-3">
          {/* Credentials stamp overlapping the mosaic corner (desktop). */}
          <TrustSeal
            id="hero-desktop"
            locale={locale}
            t={t}
            className="absolute -top-10 -left-12 z-10 hidden size-32 text-wood drop-shadow-lg lg:block"
          />
          {/* Main photo: full-bleed background below lg, tall rounded tile from lg. */}
          <div className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-auto lg:row-span-2 lg:overflow-hidden lg:rounded-3xl lg:shadow-lift">
            <div className="hero-media absolute inset-0">
              <HeroPhoto media={main} locale={locale} index={0} sizes="(min-width: 1024px) 40vw, 100vw" />
              {heroVideo && (
                <HeroVideo src={heroVideo} mobileSrc={heroVideoMobile || undefined} poster={main?.src} />
              )}
            </div>
            {!main?.src && !heroVideo && (
              <span className="absolute top-5 left-4 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs text-inverse/80 lg:top-4 lg:right-4 lg:left-auto">
                <Camera className="size-3.5" aria-hidden /> {t.placeholder.photo}
              </span>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 lg:hidden" />
            <TrustSeal
              id="hero-mobile"
              locale={locale}
              t={t}
              spin={false}
              filled={false}
              className="absolute top-5 right-4 size-20 text-inverse/85 lg:hidden"
            />
            {main?.annotation && (
              <DimensionLine className="absolute inset-x-8 top-10 hidden text-inverse drop-shadow md:flex lg:top-auto lg:bottom-28 lg:inset-x-6">
                {main.annotation[locale]}
              </DimensionLine>
            )}
            <div className="absolute bottom-4 left-4 hidden items-center gap-3 rounded-2xl bg-surface/95 px-4 py-3 text-fg shadow-lift backdrop-blur lg:flex">
              <span className="font-serif text-3xl font-semibold">{rating.toFixed(1)}</span>
              <span>
                <Stars rating={rating} label={ratingLabel} />
                <span className="block text-xs text-fg-muted">{fmt(t.reviews.basedOn, { count: reviewCount })}</span>
              </span>
            </div>
          </div>

          {side.slice(0, 2).map((media, i) => (
            <div key={i} className="relative hidden overflow-hidden rounded-3xl shadow-card lg:block">
              <HeroPhoto media={media} locale={locale} index={i + 1} sizes="25vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
