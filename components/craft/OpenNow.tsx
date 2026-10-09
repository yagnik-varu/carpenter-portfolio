import { business } from "@/lib/business";
import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "@/lib/dictionaries";
import { OpenStatus } from "./OpenStatus";

const intlLocale: Record<Locale, string> = { en: "en-CA", gu: "gu-IN" };

/** OpenStatus wired to business.json hours and time zone. */
export function OpenNow({ locale, t, className }: { locale: Locale; t: Dictionary; className?: string }) {
  return (
    <OpenStatus
      hours={business.hours}
      timeZone={business.timezone}
      locale={intlLocale[locale]}
      labels={t.openStatus}
      className={className}
    />
  );
}
