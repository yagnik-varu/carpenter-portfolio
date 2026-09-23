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
    <div className="border-b border-border bg-surface">
      <ul className="no-scrollbar mx-auto flex max-w-6xl snap-x gap-6 overflow-x-auto px-4 py-4 md:justify-between">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex shrink-0 snap-start items-center gap-2 text-sm font-medium text-fg">
            <Icon className="size-5 text-wood" aria-hidden />
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}
