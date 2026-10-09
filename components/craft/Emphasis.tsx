import { Fragment } from "react";

/** Renders `*word*` in a dictionary string as an italic wood-coloured accent. */
export function Emphasis({ text, className = "text-wood" }: { text: string; className?: string }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className={`italic ${className}`}>
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

/** Plain-text version (for metadata, aria-labels). */
export function stripEmphasis(text: string): string {
  return text.replace(/\*([^*]+)\*/g, "$1");
}
