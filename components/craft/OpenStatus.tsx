"use client";

import { useEffect, useState } from "react";

type Hours = { days: string[]; opens: string; closes: string }[];

export type OpenStatusLabels = {
  /** "Open now" */
  open: string;
  /** "closes {time}" */
  closes: string;
  /** "Closed" */
  closed: string;
  /** "opens {day} {time}" */
  opens: string;
};

const DAY_CODES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Current weekday index (0 = Sunday) and minutes past midnight in the business's time zone. */
function nowIn(timeZone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

function formatTime(hhmm: string, locale: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return new Intl.DateTimeFormat(locale, {
    hour: "numeric",
    minute: m ? "2-digit" : undefined,
    timeZone: "UTC",
  }).format(new Date(Date.UTC(2024, 0, 1, h, m)));
}

function formatDay(day: number, locale: string) {
  // 2024-01-07 was a Sunday.
  return new Intl.DateTimeFormat(locale, { weekday: "short", timeZone: "UTC" }).format(
    new Date(Date.UTC(2024, 0, 7 + day)),
  );
}

function status(hours: Hours, timeZone: string, locale: string, labels: OpenStatusLabels) {
  const { day, minutes } = nowIn(timeZone);
  const today = hours.find((h) => h.days.includes(DAY_CODES[day]));
  if (today && minutes >= toMinutes(today.opens) && minutes < toMinutes(today.closes)) {
    return { open: true, text: `${labels.open} · ${labels.closes.replace("{time}", formatTime(today.closes, locale))}` };
  }
  // Next opening: later today, or the next day with hours.
  for (let offset = 0; offset < 8; offset++) {
    const d = (day + offset) % 7;
    const slot = hours.find((h) => h.days.includes(DAY_CODES[d]));
    if (!slot || (offset === 0 && minutes >= toMinutes(slot.opens))) continue;
    const when = labels.opens
      .replace("{day}", offset === 0 ? "" : formatDay(d, locale))
      .replace("{time}", formatTime(slot.opens, locale))
      .replace(/\s+/g, " ")
      .trim();
    return { open: false, text: `${labels.closed} · ${when}` };
  }
  return { open: false, text: labels.closed };
}

/**
 * "● Open now · closes 6 pm". Computed in the browser only (it depends on the current
 * time), so the static HTML never shows a stale status.
 */
export function OpenStatus({
  hours,
  timeZone,
  locale,
  labels,
  className = "",
}: {
  hours: Hours;
  timeZone: string;
  locale: string;
  labels: OpenStatusLabels;
  className?: string;
}) {
  const [state, setState] = useState<{ open: boolean; text: string } | null>(null);

  useEffect(() => {
    const update = () => setState(status(hours, timeZone, locale, labels));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours, timeZone, locale, labels]);

  if (!state) return <span className={`inline-block min-h-5 ${className}`} aria-hidden />;
  return (
    <span className={`inline-flex items-center gap-2 text-sm ${className}`}>
      <span className="relative flex size-2.5" aria-hidden>
        {state.open && <span className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-60 motion-reduce:hidden" />}
        <span className={`relative size-2.5 rounded-full ${state.open ? "bg-whatsapp" : "bg-fg-muted"}`} />
      </span>
      {state.text}
    </span>
  );
}
