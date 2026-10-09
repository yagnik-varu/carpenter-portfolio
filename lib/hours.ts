import { business } from "@/lib/business";
import type { Locale } from "@/lib/i18n";

const dayNames: Record<string, Record<Locale, string>> = {
  Mo: { en: "Mon", gu: "સોમ" },
  Tu: { en: "Tue", gu: "મંગળ" },
  We: { en: "Wed", gu: "બુધ" },
  Th: { en: "Thu", gu: "ગુરુ" },
  Fr: { en: "Fri", gu: "શુક્ર" },
  Sa: { en: "Sat", gu: "શનિ" },
  Su: { en: "Sun", gu: "રવિ" },
};

/** Opening hours from business.json as display rows: { days: "Mon – Fri", time: "08:00 – 18:00" }. */
export function hoursRows(locale: Locale) {
  return business.hours.map((h) => ({
    days:
      h.days.length > 1
        ? `${dayNames[h.days[0]][locale]} – ${dayNames[h.days.at(-1)!][locale]}`
        : dayNames[h.days[0]][locale],
    time: `${h.opens} – ${h.closes}`,
  }));
}
