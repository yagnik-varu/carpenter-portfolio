import type { ReactNode } from "react";

type Props = {
  id?: string;
  title?: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  /** Render the title as the page's h1 instead of h2. */
  as?: "h1" | "h2";
};

export function Section({ id, title, subtitle, action, children, className = "", as = "h2" }: Props) {
  const Heading = as;
  return (
    <section id={id} className={`mx-auto max-w-6xl px-4 py-12 md:py-16 ${className}`}>
      {(title || action) && (
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            {title && (
              <Heading className={`font-serif font-semibold text-fg ${as === "h1" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"}`}>
                {title}
              </Heading>
            )}
            {subtitle && <p className="mt-3 text-fg-muted md:text-lg">{subtitle}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/** Page header used at the top of inner pages. */
export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <div className="border-b border-border bg-muted/50">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {children}
        <h1 className="font-serif text-4xl font-semibold md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-fg-muted md:text-lg">{subtitle}</p>}
      </div>
    </div>
  );
}
