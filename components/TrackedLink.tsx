"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = ComponentProps<"a"> & {
  href: string;
  event: AnalyticsEvent;
  eventProps?: Record<string, string | number | undefined>;
};

/** A link that fires an analytics event on click. Uses next/link for internal paths. */
export function TrackedLink({ href, event, eventProps, onClick, ...rest }: Props) {
  const handleClick: Props["onClick"] = (e) => {
    track(event, eventProps);
    onClick?.(e);
  };
  if (href.startsWith("/")) return <Link href={href} onClick={handleClick} {...rest} />;
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={handleClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...rest}
    />
  );
}
