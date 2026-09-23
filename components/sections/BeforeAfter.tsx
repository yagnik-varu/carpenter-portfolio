"use client";

import { useState } from "react";
import { MoveHorizontal } from "lucide-react";
import type { Media as MediaType } from "@/content/types";
import type { Locale } from "@/lib/i18n";
import { Media } from "@/components/ui/Media";

type Props = {
  before: MediaType;
  after: MediaType;
  locale: Locale;
  labels: { before: string; after: string; hint: string };
};

/** Drag/keyboard comparison slider. A native range input drives it, so it's accessible for free. */
export function BeforeAfter({ before, after, locale, labels }: Props) {
  const [pos, setPos] = useState(50);

  return (
    <div className="relative overflow-hidden rounded-2xl select-none">
      <Media media={after} locale={locale} aspect="aspect-[4/3]" tone={2} placeholderLabel={labels.after} sizes="(min-width: 768px) 768px, 100vw" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Media media={before} locale={locale} aspect="aspect-[4/3]" tone={1} placeholderLabel={labels.before} sizes="(min-width: 768px) 768px, 100vw" />
      </div>

      <span className="pointer-events-none absolute top-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
        {labels.before}
      </span>
      <span className="pointer-events-none absolute top-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold text-white">
        {labels.after}
      </span>

      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-fg shadow-lg">
          <MoveHorizontal className="size-5" aria-hidden />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={labels.hint}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
