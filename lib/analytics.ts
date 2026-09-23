"use client";

import posthog from "posthog-js";

export type AnalyticsEvent =
  | "cta_click"
  | "call_click"
  | "whatsapp_click"
  | "quote_submit"
  | "project_view"
  | "filter_used"
  | "language_switch";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Send one event to GA4 and PostHog. Silently no-ops if either isn't loaded or consent wasn't given. */
export function track(event: AnalyticsEvent, props: Record<string, string | number | undefined> = {}) {
  try {
    window.gtag?.("event", event, props);
    if (posthog.__loaded) posthog.capture(event, props);
  } catch {
    // Analytics must never break the page.
  }
  if (process.env.NODE_ENV === "development") console.debug("[track]", event, props);
}
