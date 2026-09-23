"use client";

import { useEffect, useState } from "react";

type Props = { src: string; mobileSrc?: string; poster?: string };

/**
 * Muted looping background video. Only mounts the <video> after hydration and only when
 * the visitor hasn't asked for reduced motion or data saving — the poster stays as LCP.
 */
export function HeroVideo({ src, mobileSrc, poster }: Props) {
  const [videoSrc, setVideoSrc] = useState<string | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduced || saveData) return;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- depends on browser-only media queries
    setVideoSrc(mobile && mobileSrc ? mobileSrc : src);
  }, [src, mobileSrc]);

  if (!videoSrc) return null;
  return (
    <video
      className="absolute inset-0 size-full object-cover"
      src={videoSrc}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
