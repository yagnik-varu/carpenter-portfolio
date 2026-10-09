"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Menu, Phone, X } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";
import { buttonStyles } from "@/components/ui/button";

type Props = {
  items: { href: string; label: string }[];
  labels: { menu: string; close: string; getQuote: string; call: string };
  quoteHref: string;
  telHref: string;
  phoneDisplay: string;
  logo: ReactNode;
  languageSwitcher: ReactNode;
  /** Open-now status line. */
  status: ReactNode;
};

export function MobileMenu({ items, labels, quoteHref, telHref, phoneDisplay, logo, languageSwitcher, status }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDivElement>(null);

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      // Keep Tab focus inside the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>("a[href], button");
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="focus-ring -mr-2 grid size-11 shrink-0 place-items-center rounded-full text-fg transition-colors hover:bg-muted lg:hidden"
      >
        <Menu className="size-6" aria-hidden />
        <span className="sr-only">{labels.menu}</span>
      </button>

      {open && (
        <div
          ref={dialogRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={labels.menu}
          className="graph-paper fixed inset-0 z-50 flex flex-col bg-bg transition-[opacity,translate] duration-300 ease-out starting:translate-y-3 starting:opacity-0 lg:hidden"
        >
          <div aria-hidden className="ruler-edge h-1.5 bg-fg text-inverse/40" />
          <div className="flex h-[3.625rem] items-center justify-between gap-3 px-4">
            <div className="min-w-0">{logo}</div>
            <div className="flex shrink-0 items-center gap-2">
              {languageSwitcher}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="focus-ring -mr-2 grid size-11 place-items-center rounded-full transition-colors hover:bg-muted"
                autoFocus
              >
                <X className="size-6" aria-hidden />
                <span className="sr-only">{labels.close}</span>
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-4 pt-4">
            <ul className="border-t border-border">
              {items.map((item, i) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="focus-ring group flex items-baseline gap-4 py-4 aria-[current=page]:text-wood"
                  >
                    <span className="font-mono text-xs text-wood">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex-1 font-serif text-[1.75rem] leading-tight">{item.label}</span>
                    <ArrowUpRight
                      className="size-5 self-center text-fg-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-3 border-t border-border bg-surface/90 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] backdrop-blur">
            <div className="flex justify-center">{status}</div>
            <TrackedLink
              href={quoteHref}
              event="cta_click"
              eventProps={{ location: "mobile_menu", type: "quote" }}
              className={buttonStyles.primary}
            >
              {labels.getQuote}
            </TrackedLink>
            <TrackedLink
              href={telHref}
              event="call_click"
              eventProps={{ location: "mobile_menu" }}
              className={buttonStyles.secondary}
            >
              <Phone className="size-4" aria-hidden /> {phoneDisplay}
            </TrackedLink>
          </div>
        </div>
      )}
    </>
  );
}
