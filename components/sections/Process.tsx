import type { Dictionary } from "@/lib/dictionaries";

/**
 * Process steps joined by a dashed measuring line: vertical on phones, horizontal from md.
 * Each step shows when it happens (`when`), so visitors know what to expect.
 */
export function Process({ t }: { t: Dictionary }) {
  return (
    <ol className="relative grid gap-8 md:grid-cols-4 md:gap-6">
      {/* The line: down the number column on phones, across the numbers from md. */}
      <span aria-hidden className="absolute top-2 bottom-8 left-[1.375rem] border-l border-dashed border-wood/50 md:hidden" />
      <span aria-hidden className="absolute top-[1.375rem] right-[12%] left-[1.375rem] hidden border-t border-dashed border-wood/50 md:block" />
      {t.process.steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-5 md:flex-col md:gap-4">
          <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-primary font-mono text-sm font-medium text-primary-fg shadow-card ring-4 ring-surface">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="pt-1 md:pt-0">
            {"when" in step && <p className="label-mono text-wood">{step.when}</p>}
            <h3 className="mt-1 font-serif text-xl font-semibold">{step.title}</h3>
            <p className="mt-1.5 text-sm text-fg-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
