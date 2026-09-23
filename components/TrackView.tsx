"use client";

import { useEffect } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

/** Fires one analytics event when the page mounts. */
export function TrackView({ event, props }: { event: AnalyticsEvent; props?: Record<string, string> }) {
  const key = JSON.stringify(props);
  useEffect(() => {
    track(event, props);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fire once per distinct props
  }, [event, key]);
  return null;
}
