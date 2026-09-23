import Image from "next/image";
import { Star, Video } from "lucide-react";
import { business } from "@/lib/business";
import { fmt, href, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonStyles } from "@/components/ui/button";
import { HeroVideo } from "./HeroVideo";

export function Hero({ locale, t }: { locale: Locale; t: Dictionary }) {
  const { heroVideo, heroVideoMobile, heroPoster } = business.media;

  return (
    <section className="relative isolate flex min-h-[calc(100svh-4rem-var(--action-bar-h))] items-end overflow-hidden bg-fg md:min-h-[min(85vh,760px)] md:items-center">
      {/* Background: poster image (LCP) → optional video on top → placeholder if neither. */}
      <div className="absolute inset-0 -z-10">
        {heroPoster ? (
          <Image src={heroPoster} alt="" fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="wood-grain tone-walnut absolute inset-0">
            {!heroVideo && (
              <span className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs text-white/80">
                <Video className="size-3.5" aria-hidden /> {t.placeholder.video}
              </span>
            )}
          </div>
        )}
        {heroVideo && <HeroVideo src={heroVideo} mobileSrc={heroVideoMobile || undefined} poster={heroPoster || undefined} />}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/75 md:via-black/45 md:to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4 pt-24 pb-10 md:py-20">
        <div className="max-w-2xl text-white">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm backdrop-blur">
            <Star className="size-4 fill-star text-star" aria-hidden />
            {business.stats.rating} · {fmt(t.hero.eyebrow, { city: business.address.city })}
          </p>
          <h1 className="font-serif text-4xl leading-[1.1] font-semibold text-balance sm:text-5xl md:text-6xl">
            {t.hero.title}
          </h1>
          <p className="mt-4 text-lg text-white/85 md:text-xl">{t.hero.subtitle}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href={href(locale, "/contact")}
              event="cta_click"
              eventProps={{ location: "hero", type: "quote" }}
              className={buttonStyles.light}
            >
              {t.hero.primaryCta}
            </TrackedLink>
            <TrackedLink
              href={href(locale, "/projects")}
              event="cta_click"
              eventProps={{ location: "hero", type: "projects" }}
              className={buttonStyles.ghostLight}
            >
              {t.hero.secondaryCta}
            </TrackedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
