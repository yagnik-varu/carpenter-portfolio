import { business } from "@/lib/business";
import { fmt, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

const R_TEXT = 80;
const CIRCUMFERENCE = 2 * Math.PI * R_TEXT;

/**
 * Round credentials stamp. The ring text comes from business.credentials, so it only
 * ever claims what the owner has set. `id` must be unique on the page (SVG textPath).
 */
export function TrustSeal({
  id,
  locale,
  t,
  className = "size-32 text-wood",
  spin = true,
  filled = true,
}: {
  id: string;
  locale: Locale;
  t: Dictionary;
  className?: string;
  spin?: boolean;
  /** Paint a surface-coloured disc behind the stamp (for use over photos). */
  filled?: boolean;
}) {
  const { credentials } = business;
  const items = [
    credentials.licensed && t.trust.licensed,
    credentials.insured && t.trust.insured,
    credentials.wsib && t.trust.wsib,
    credentials.warrantyYears > 0 && fmt(t.trust.warranty, { years: credentials.warrantyYears }),
  ].filter(Boolean) as string[];
  const ring = items.join("  ·  ") + "  ·  ";
  const latin = locale === "en";
  const pathId = `seal-path-${id}`;
  const ticks = Array.from({ length: 60 }, (_, i) => i * 6);

  return (
    <svg
      viewBox="0 0 200 200"
      role="img"
      aria-label={`${items.join(", ")}. ${fmt(t.seal.est, { year: business.foundedYear })}`}
      className={className}
    >
      <defs>
        <path
          id={pathId}
          d={`M100,100 m-${R_TEXT},0 a${R_TEXT},${R_TEXT} 0 1,1 ${R_TEXT * 2},0 a${R_TEXT},${R_TEXT} 0 1,1 -${R_TEXT * 2},0`}
        />
      </defs>
      {filled && <circle cx="100" cy="100" r="99" className="fill-surface" />}
      <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="64" fill="none" stroke="currentColor" strokeWidth="1" />
      <g className={spin ? "seal-spin" : undefined}>
        <text
          fill="currentColor"
          fontSize={latin ? 12.5 : 12}
          fontWeight={500}
          style={{ fontFamily: latin ? "var(--font-mono)" : "var(--font-sans)" }}
        >
          <textPath href={`#${pathId}`} textLength={CIRCUMFERENCE - 2} lengthAdjust="spacing">
            {latin ? ring.toUpperCase() : ring}
          </textPath>
        </text>
      </g>
      {/* Ruler ticks just inside the inner ring. */}
      <g stroke="currentColor" opacity="0.55">
        {ticks.map((deg) => (
          <line
            key={deg}
            x1="100"
            y1="39"
            x2="100"
            y2={deg % 30 === 0 ? 46 : 42}
            strokeWidth={deg % 30 === 0 ? 1.2 : 0.7}
            transform={`rotate(${deg} 100 100)`}
          />
        ))}
      </g>
      <text
        x="100"
        y="88"
        textAnchor="middle"
        fill="currentColor"
        fontSize="10"
        letterSpacing={latin ? 2 : 0}
        style={{ fontFamily: latin ? "var(--font-mono)" : "var(--font-sans)" }}
      >
        {latin ? t.seal.estShort.toUpperCase() : t.seal.estShort}
      </text>
      <text
        x="100"
        y="120"
        textAnchor="middle"
        fill="currentColor"
        fontSize="34"
        fontWeight={600}
        style={{ fontFamily: "var(--font-serif)" }}
      >
        {business.foundedYear}
      </text>
      <text
        x="100"
        y="138"
        textAnchor="middle"
        fill="currentColor"
        fontSize="9"
        letterSpacing="1.5"
        style={{ fontFamily: "var(--font-mono)" }}
      >
        {business.address.city.toUpperCase()}, {business.address.region}
      </text>
    </svg>
  );
}
