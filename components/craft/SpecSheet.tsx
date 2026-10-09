import type { ReactNode } from "react";

export type SpecRow = { label: string; value: ReactNode; icon?: ReactNode };

/** Facts set out like a workshop spec sheet: label ······· value. */
export function SpecSheet({ rows, className = "" }: { rows: SpecRow[]; className?: string }) {
  return (
    <dl className={`divide-y divide-dashed divide-line ${className}`}>
      {rows.map((row) => (
        <div key={row.label} className="flex items-baseline gap-3 py-2.5">
          <dt className="label-mono flex shrink-0 items-center gap-2 text-fg-muted">
            {row.icon}
            {row.label}
          </dt>
          <span aria-hidden className="min-w-4 flex-1 translate-y-[-0.2rem] border-b border-dotted border-line" />
          <dd className="text-right font-medium text-fg">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
