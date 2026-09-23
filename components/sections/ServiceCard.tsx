import Link from "next/link";
import { ArrowRight, ChefHat, DoorOpen, Fence, Library, Sofa } from "lucide-react";
import type { Service, ServiceIcon } from "@/content/types";
import { href, l, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";

const icons: Record<ServiceIcon, typeof ChefHat> = {
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
  tone = 0,
}: {
  service: Service;
  locale: Locale;
  learnMore: string;
  tone?: number;
}) {
  const Icon = icons[service.icon];
  return (
    <Link
      href={href(locale, `/services/${service.slug}`)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-shadow hover:shadow-lg"
    >
      <Media media={service.image} locale={locale} tone={tone} compact sizes="(min-width: 768px) 33vw, 80vw" />
      <div className="flex flex-1 flex-col p-5">
        <Icon className="mb-3 size-6 text-wood" aria-hidden />
        <h3 className="font-serif text-xl font-semibold">{l(service.title, locale)}</h3>
        <p className="mt-2 flex-1 text-sm text-fg-muted">{l(service.summary, locale)}</p>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
          {learnMore}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
