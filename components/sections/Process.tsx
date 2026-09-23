import type { Dictionary } from "@/lib/dictionaries";

export function Process({ t }: { t: Dictionary }) {
  return (
    <ol className="grid gap-6 md:grid-cols-4">
      {t.process.steps.map((step, i) => (
        <li key={step.title} className="relative flex gap-4 md:flex-col">
          <span className="grid size-11 shrink-0 place-items-center rounded-full bg-primary font-serif text-lg font-semibold text-primary-fg">
            {i + 1}
          </span>
          <div>
            <h3 className="font-serif text-lg font-semibold">{step.title}</h3>
            <p className="mt-1 text-sm text-fg-muted">{step.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
