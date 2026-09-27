"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onReopenConsent, reopenConsent, setConsent, useConsent } from "@/lib/consent";
import { analyticsEnabled } from "./Analytics";

type Props = {
  privacyHref: string;
  labels: { text: string; accept: string; decline: string; learnMore: string };
};

/** Bottom banner asking for analytics consent. Sits above the mobile action bar. */
export function ConsentBanner({ privacyHref, labels }: Props) {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => onReopenConsent(() => setReopened(true)), []);

  if (!analyticsEnabled || consent === null) return null;
  if (consent !== "unset" && !reopened) return null;

  const choose = (value: "granted" | "denied") => {
    setConsent(value);
    setReopened(false);
  };

  return (
    <div
      role="region"
      aria-label={labels.learnMore}
      className="fixed inset-x-0 bottom-[calc(var(--action-bar-h)+env(safe-area-inset-bottom))] z-40 p-3 md:bottom-0 md:p-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl border border-border bg-surface p-4 shadow-xl sm:flex-row sm:items-center sm:gap-4">
        <p className="flex-1 text-sm text-fg">
          {labels.text}{" "}
          <Link href={privacyHref} className="font-semibold text-primary underline underline-offset-2">
            {labels.learnMore}
          </Link>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="min-h-11 flex-1 rounded-full border border-border px-5 text-sm font-semibold hover:border-fg sm:flex-none"
          >
            {labels.decline}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="min-h-11 flex-1 rounded-full bg-primary px-5 text-sm font-semibold text-primary-fg hover:bg-primary-hover sm:flex-none"
          >
            {labels.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton({ label }: { label: string }) {
  if (!analyticsEnabled) return null;
  return (
    <button type="button" onClick={reopenConsent} className="hover:text-white">
      {label}
    </button>
  );
}
