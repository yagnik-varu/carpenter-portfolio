import { business } from "./business";
import { fmt } from "./i18n";
import type { Dictionary } from "./dictionaries";

/** General FAQ items with business placeholders filled in. */
export function generalFaq(t: Dictionary) {
  const areas = business.serviceArea.join(", ");
  return t.faq.items.map((item) => ({ q: item.q, a: fmt(item.a, { areas }) }));
}
