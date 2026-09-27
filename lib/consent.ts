"use client";

import { useSyncExternalStore } from "react";

/** Analytics consent: "unset" until the visitor chooses. Stored per browser in localStorage. */
export type Consent = "granted" | "denied" | "unset";

// Bump the version if what we collect changes, so everyone is asked again.
const KEY = "analytics-consent-v1";
const EVENT = "analytics-consent-change";
const REOPEN_EVENT = "analytics-consent-reopen";

function read(): Consent {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : "unset";
  } catch {
    return "unset"; // storage blocked (private mode etc.) — behave as not yet chosen
  }
}

export function setConsent(value: Exclude<Consent, "unset">) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // ignore — the choice still applies for this page view via the event below
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: value }));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback); // other tabs
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

/** Current consent. Returns null during server render/hydration so the banner never flashes for returning visitors. */
export function useConsent(): Consent | null {
  return useSyncExternalStore(subscribe, read, () => null);
}

/** Ask the banner to show again (footer "Cookie settings" link). */
export function reopenConsent() {
  window.dispatchEvent(new Event(REOPEN_EVENT));
}

export function onReopenConsent(callback: () => void) {
  window.addEventListener(REOPEN_EVENT, callback);
  return () => window.removeEventListener(REOPEN_EVENT, callback);
}
