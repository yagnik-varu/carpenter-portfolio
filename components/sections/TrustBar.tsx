import { Award, BadgeCheck, Hammer, HardHat, ShieldCheck, Trophy } from "lucide-react";
import { business, yearsInBusiness } from "@/lib/business";
import { fmt } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";

export function TrustBar({ t }: { t: Dictionary }) {
  const { credentials, stats } = business;
  const items = [
    credentials.licensed && { icon: BadgeCheck, label: t.trust.licensed },
    credentials.insured && { icon: ShieldCheck, label: t.trust.insured },
    credentials.wsib && { icon: HardHat, label: t.trust.wsib },
    { icon: Trophy, label: fmt(t.trust.years, { years: yearsInBusiness }) },
    credentials.warrantyYears > 0 && { icon: Award, label: fmt(t.trust.warranty, { years: credentials.warrantyYears }) },
    { icon: Hammer, label: fmt(t.trust.projects, { count: stats.projectsCompleted }) },
  ].filter(Boolean) as { icon: typeof Award; label: string }[];

  return (
    <div className="relative border-b border-border bg-surface">
      <ul className="no-scrollbar fade-edges mx-auto flex max-w-6xl snap-x items-center gap-5 overflow-x-auto px-4 py-4 md:justify-between md:[mask-image:none]">
        {items.map(({ icon: Icon, label }, i) => (
          <li key={label} className="label-mono flex shrink-0 snap-start items-center gap-5 text-fg">
            {i > 0 && <span aria-hidden className="h-4 w-px bg-line" />}
            <span className="flex items-center gap-2">
              <Icon className="size-4 text-wood" aria-hidden />
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
