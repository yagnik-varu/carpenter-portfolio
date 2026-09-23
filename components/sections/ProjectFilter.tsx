"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, type ReactNode } from "react";
import { track } from "@/lib/analytics";

type Item = { slug: string; category: string; node: ReactNode };
type Props = {
  categories: { id: string; label: string }[];
  items: Item[];
  labels: { all: string; filter: string; empty: string };
};

function Grid({ items }: { items: Item[] }) {
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {items.map((item) => (
        <li key={item.slug} className="mb-4 break-inside-avoid">
          {item.node}
        </li>
      ))}
    </ul>
  );
}

function Filtered({ categories, items, labels }: Props) {
  const params = useSearchParams();
  const active = params.get("category") ?? "all";
  const visible = active === "all" ? items : items.filter((i) => i.category === active);

  const select = (id: string) => {
    const url = new URL(window.location.href);
    if (id === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", id);
    // Next.js syncs history.replaceState with useSearchParams — no navigation, no scroll jump.
    window.history.replaceState(null, "", url);
    track("filter_used", { category: id });
  };

  const chips = [{ id: "all", label: labels.all }, ...categories];

  return (
    <>
      <div
        role="group"
        aria-label={labels.filter}
        className="no-scrollbar sticky top-16 z-30 -mx-4 mb-6 flex gap-2 overflow-x-auto bg-bg/90 px-4 py-3 backdrop-blur"
      >
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => select(chip.id)}
            aria-pressed={active === chip.id}
            className="min-h-10 shrink-0 rounded-full border border-border bg-surface px-4 text-sm font-medium transition-colors aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-fg"
          >
            {chip.label}
          </button>
        ))}
      </div>
      {visible.length ? <Grid items={visible} /> : <p className="py-12 text-center text-fg-muted">{labels.empty}</p>}
    </>
  );
}

/** Category chips + masonry grid. The Suspense fallback renders every project so static HTML is complete. */
export function ProjectFilter(props: Props) {
  return (
    <Suspense fallback={<Grid items={props.items} />}>
      <Filtered {...props} />
    </Suspense>
  );
}
