import { Plus } from "lucide-react";

/** Accessible accordion built on native <details>, works without JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-dashed divide-line rounded-2xl bg-surface shadow-card ring-1 ring-border/60">
      {items.map((item, i) => (
        <details key={item.q} className="faq-item group">
          <summary className="focus-ring flex min-h-14 cursor-pointer list-none items-center gap-4 rounded-2xl px-5 py-4 font-semibold transition-colors hover:text-wood md:px-6 [&::-webkit-details-marker]:hidden">
            <span className="font-mono text-xs font-medium text-wood">{String(i + 1).padStart(2, "0")}</span>
            <span className="flex-1">{item.q}</span>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-border transition-[transform,background-color,color] group-open:rotate-45 group-open:bg-primary group-open:text-primary-fg">
              <Plus className="size-4" aria-hidden />
            </span>
          </summary>
          <p className="px-5 pb-5 pl-[3.25rem] text-fg-muted md:px-6 md:pl-[3.5rem]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
