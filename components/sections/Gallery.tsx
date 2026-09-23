"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { Media as MediaType } from "@/content/types";
import { fmt, type Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";

type Props = {
  images: MediaType[];
  locale: Locale;
  labels: { previous: string; next: string; close: string; open: string };
};

/** Thumbnail grid that opens a full-screen, swipeable lightbox. */
export function Gallery({ images, locale, labels }: Props) {
  const [index, setIndex] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);
  const count = images.length;

  const go = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)), [count]);
  const close = useCallback(() => setIndex(null), []);

  useEffect(() => {
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, go, close]);

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {images.map((img, i) => (
          <li key={i} className={i === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="block w-full overflow-hidden rounded-xl"
              aria-label={fmt(labels.open, { n: i + 1 })}
            >
              <Media
                media={img}
                locale={locale}
                tone={i}
                aspect={i === 0 ? "aspect-[4/3] md:aspect-auto md:h-full" : "aspect-square"}
                compact={i !== 0}
                sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
                className="transition-transform duration-300 hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>

      {index !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col bg-black/95"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between p-3 text-white">
            <span className="px-2 text-sm tabular-nums">
              {index + 1} / {count}
            </span>
            <button type="button" onClick={close} className="grid size-11 place-items-center rounded-full hover:bg-white/10" autoFocus>
              <X className="size-6" aria-hidden />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-2 md:px-16">
            <Media
              media={images[index]}
              locale={locale}
              tone={index}
              aspect="aspect-[4/3]"
              sizes="100vw"
              className="w-full max-w-5xl rounded-lg"
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-2 hidden size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:grid"
                >
                  <ChevronLeft className="size-6" aria-hidden />
                  <span className="sr-only">{labels.previous}</span>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-2 hidden size-12 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 md:grid"
                >
                  <ChevronRight className="size-6" aria-hidden />
                  <span className="sr-only">{labels.next}</span>
                </button>
              </>
            )}
          </div>
          <p className="p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] text-center text-sm text-white/70">
            {images[index].alt[locale]}
          </p>
        </div>
      )}
    </>
  );
}
