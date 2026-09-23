"use client";

import Script from "next/script";

declare global {
  interface Window {
    turnstile?: { reset: (widget?: string) => void };
  }
}

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/** Renders the Cloudflare Turnstile widget. It injects a `cf-turnstile-response` input into the parent form. */
export function Turnstile({ locale }: { locale: string }) {
  if (!turnstileSiteKey) return null;
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />
      <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-language={locale} data-theme="light" data-size="flexible" />
    </>
  );
}

export function resetTurnstile() {
  window.turnstile?.reset();
}
