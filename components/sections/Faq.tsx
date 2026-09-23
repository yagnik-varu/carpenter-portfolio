import { ChevronDown } from "lucide-react";

/** Accessible accordion built on native <details>, works without JavaScript. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-surface">
      {items.map((item) => (
        <details key={item.q} className="group px-5">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
            {item.q}
            <ChevronDown className="size-5 shrink-0 text-fg-muted transition-transform group-open:rotate-180" aria-hidden />
          </summary>
          <p className="pb-5 text-fg-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
