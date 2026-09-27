"use client";

import Script from "next/script";
import { useEffect } from "react";
import posthog from "posthog-js";
import { useConsent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_REGION = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

/** True when at least one analytics tool is configured — otherwise no banner is needed. */
export const analyticsEnabled = Boolean(GA_ID || POSTHOG_KEY);

/**
 * Loads GA4 and PostHog only after the visitor accepts (nothing is loaded or sent before).
 * Page views on client-side navigation are picked up automatically by GA4 enhanced
 * measurement and PostHog's history_change option.
 */
export function Analytics() {
  const consent = useConsent();

  useEffect(() => {
    if (!POSTHOG_KEY) return;
    if (consent === "granted") {
      if (!posthog.__loaded) {
        posthog.init(POSTHOG_KEY, {
          api_host: "/ingest", // proxied through our domain (next.config.ts rewrites)
          ui_host: `https://${POSTHOG_REGION}.posthog.com`,
          capture_pageview: "history_change",
          person_profiles: "identified_only",
          disable_session_recording: true, // quote form has personal data — keep recordings off
        });
      } else {
        posthog.opt_in_capturing();
      }
    } else if (consent === "denied" && posthog.__loaded) {
      posthog.opt_out_capturing();
    }
  }, [consent]);

  useEffect(() => {
    if (!GA_ID || !window.gtag) return; // GA not loaded yet — the init script handles first load
    // Choice changed after GA loaded on this page: switch hits off/on without a reload.
    const denied = consent !== "granted";
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = denied;
    window.gtag("consent", "update", { analytics_storage: denied ? "denied" : "granted" });
  }, [consent]);

  if (!GA_ID || consent !== "granted") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
window['ga-disable-${GA_ID}'] = false;
gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
