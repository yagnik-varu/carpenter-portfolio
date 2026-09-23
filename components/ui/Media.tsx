import Image from "next/image";
import { Camera } from "lucide-react";
import type { Media as MediaType } from "@/content/types";
import { l, type Locale } from "@/lib/i18n";

type Props = {
  media: MediaType;
  locale: Locale;
  /** Tailwind aspect class, e.g. "aspect-[4/3]". */
  aspect?: string;
  sizes?: string;
  priority?: boolean;
  /** Varies the placeholder wood tone so grids don't look uniform. */
  tone?: number;
  className?: string;
  /** Hide the placeholder caption (for small thumbnails). */
  compact?: boolean;
  placeholderLabel?: string;
};

const tones = ["tone-oak", "tone-walnut", "tone-cedar", "tone-maple"];

/** Renders an optimized image when `media.src` is set, otherwise a wood-grain placeholder. */
export function Media({
  media,
  locale,
  aspect = "aspect-[4/3]",
  sizes = "100vw",
  priority,
  tone = 0,
  className = "",
  compact,
  placeholderLabel,
}: Props) {
  const alt = l(media.alt, locale);

  if (media.src) {
    return (
      <div className={`relative overflow-hidden bg-muted ${aspect} ${className}`}>
        <Image src={media.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`wood-grain ${tones[tone % tones.length]} relative flex items-center justify-center overflow-hidden ${aspect} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-white/85">
        <Camera className={compact ? "size-5" : "size-8"} aria-hidden />
        {!compact && (
          <span className="line-clamp-2 max-w-[16rem] text-xs font-medium tracking-wide">
            {placeholderLabel ?? alt}
          </span>
        )}
      </div>
    </div>
  );
}
