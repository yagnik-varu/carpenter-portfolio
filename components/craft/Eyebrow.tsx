import type { ReactNode } from "react";

/** Mono section label with an optional index — "·01 ── Services". */
export function Eyebrow({
  index,
  children,
  className = "text-wood",
}: {
  /** Two-digit section number, e.g. "01". */
  index?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <p className={`label-mono flex items-center gap-3 ${className}`}>
      {index && <span className="font-mono tracking-[0.16em]">·{index}</span>}
      <span aria-hidden className="h-px w-8 shrink-0 bg-current opacity-50" />
      {children && <span>{children}</span>}
    </p>
  );
}
