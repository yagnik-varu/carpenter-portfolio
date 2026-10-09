import type { ReactNode } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/craft/Eyebrow";

type Props = {
  id?: string;
  title?: string;
  subtitle?: string;
  /** Mono label above the title, e.g. "Portfolio". */
  eyebrow?: string;
  /** Two-digit section number shown with the eyebrow, e.g. "02". */
  index?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Render the title as the page's h1 instead of h2. */
  as?: "h1" | "h2";
  /** "narrow" for reading-width pages (FAQ, privacy). */
  width?: "default" | "narrow";
  /** Fade the section up as it scrolls into view (default on). */
  animate?: boolean;
};

export function Section({
  id,
  title,
  subtitle,
  eyebrow,
  index,
  action,
  children,
  className = "",
  as = "h2",
  width = "default",
  animate = true,
}: Props) {
  const Heading = as;
  return (
    <section
      id={id}
      className={`mx-auto px-4 py-12 md:py-20 ${width === "narrow" ? "max-w-3xl" : "max-w-6xl"} ${className}`}
    >
      {(title || action) && (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
          <div className="max-w-2xl">
            {(eyebrow || index) && <Eyebrow index={index}>{eyebrow}</Eyebrow>}
            {title && (
              <Heading
                className={`font-serif font-semibold text-balance text-fg ${eyebrow || index ? "mt-3" : ""} ${as === "h1" ? "text-4xl md:text-5xl" : "text-3xl md:text-[2.75rem] md:leading-[1.1]"}`}
              >
                {title}
              </Heading>
            )}
            {subtitle && <p className="mt-3 text-fg-muted md:text-lg">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      <div className={animate ? "reveal" : undefined}>{children}</div>
    </section>
  );
}

export type Crumb = { label: string; href?: string };

/** Mono breadcrumb trail: HOME / SERVICES. The last item is the current page. */
export function Breadcrumbs({ items, className = "text-fg-muted" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="label-mono flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-wood">/</span>}
            {item.href && i < items.length - 1 ? (
              <Link href={item.href} className="focus-ring rounded-sm hover:text-fg">
                {item.label}
              </Link>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined} className="text-wood">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Page header for inner pages: graph-paper band, breadcrumb, serif title, ruler edge. */
export function PageHeader({
  title,
  subtitle,
  crumbs,
  aside,
  children,
}: {
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
  /** Desktop-only right column (seal, stats). */
  aside?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="graph-paper relative border-b border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 pt-10 pb-12 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:pt-14 md:pb-16">
        <div>
          {crumbs && <Breadcrumbs items={crumbs} />}
          {children}
          <h1 className="mt-4 font-serif text-4xl font-semibold text-balance md:text-6xl md:leading-[1.05]">{title}</h1>
          {subtitle && <p className="mt-4 max-w-2xl text-fg-muted md:text-lg">{subtitle}</p>}
        </div>
        {aside && <div className="hidden md:block">{aside}</div>}
      </div>
      <div aria-hidden className="ruler-edge absolute inset-x-0 bottom-0 -scale-y-100" />
    </div>
  );
}
