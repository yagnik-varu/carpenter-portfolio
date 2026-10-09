import type { ReactNode } from "react";

/** A drawn measurement, |── label ──|. Colour comes from the parent (`text-*`). */
export function DimensionLine({ children, className = "" }: { children?: ReactNode; className?: string }) {
  return (
    <span className={`dim-line label-mono ${className}`}>
      {children && <span className="shrink-0">{children}</span>}
    </span>
  );
}
