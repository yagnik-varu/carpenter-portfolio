import Link from "next/link";
import { ArrowRight, ChefHat, DoorOpen, Fence, Library, Sofa } from "lucide-react";
import type { Service, ServiceIcon } from "@/content/types";
import { href, l, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";

export const serviceIcons: Record<ServiceIcon, typeof ChefHat> = {
  kitchen: ChefHat,
  shelves: Library,
  deck: Fence,
  chair: Sofa,
  door: DoorOpen,
};

export function ServiceCard({
  service,
  locale,
  learnMore,
  rangeLabel,
  tone = 0,
}: {
  service: Service;
  locale: Locale;
  learnMore: string;
  /** Label for the price range line, e.g. "Typical range". */
  rangeLabel?: string;
  tone?: number;
}) {
  const Icon = serviceIcons[service.icon];
  return (
    <Link
      href={href(locale, `/services/${service.slug}`)}
      className="focus-ring group flex h-full flex-col overflow-hidden rounded-2xl bg-surface shadow-card ring-1 ring-border/60 transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative overflow-hidden">
        <Media
          media={service.image}
          locale={locale}
          tone={tone}
          compact
          sizes="(min-width: 768px) 33vw, 80vw"
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-2.5 py-1 font-mono text-xs text-fg backdrop-blur">
          {String(tone + 1).padStart(2, "0")}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        <Icon className="mb-3 size-6 text-wood" aria-hidden />
        <h3 className="font-serif text-xl font-semibold md:text-2xl">{l(service.title, locale)}</h3>
        <p className="mt-2 flex-1 text-sm text-fg-muted">{l(service.summary, locale)}</p>
        {rangeLabel && (
          <p className="mt-4 flex items-baseline gap-2 border-t border-dashed border-line pt-3">
            <span className="label-mono text-fg-muted">{rangeLabel}</span>
            <span className="ml-auto text-sm font-semibold">{l(service.priceRange, locale)}</span>
          </p>
        )}
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
          {learnMore}
          <span className="grid size-7 place-items-center rounded-full border border-primary/30 transition-colors group-hover:bg-primary group-hover:text-primary-fg">
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
        </span>
      </div>
    </Link>
  );
}
