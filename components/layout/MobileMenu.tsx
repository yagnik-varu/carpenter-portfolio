"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { TrackedLink } from "@/components/TrackedLink";

type Props = {
  items: { href: string; label: string }[];
  labels: { menu: string; close: string; getQuote: string; call: string };
  quoteHref: string;
  telHref: string;
  phoneDisplay: string;
};

export function MobileMenu({ items, labels, quoteHref, telHref, phoneDisplay }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
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
        className="-mr-2 grid size-11 place-items-center rounded-full text-fg md:hidden"
      >
        <Menu className="size-6" aria-hidden />
        <span className="sr-only">{labels.menu}</span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={labels.menu}
          className="fixed inset-0 z-50 flex flex-col bg-bg md:hidden"
        >
          <div className="flex h-16 items-center justify-end px-4">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="-mr-2 grid size-11 place-items-center rounded-full"
              autoFocus
            >
              <X className="size-6" aria-hidden />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4">
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block py-4 font-serif text-2xl aria-[current=page]:text-wood"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-3 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
            <TrackedLink
              href={quoteHref}
              event="cta_click"
              eventProps={{ location: "mobile_menu", type: "quote" }}
              className="rounded-full bg-primary py-3.5 text-center font-semibold text-primary-fg"
            >
              {labels.getQuote}
            </TrackedLink>
            <TrackedLink
              href={telHref}
              event="call_click"
              eventProps={{ location: "mobile_menu" }}
              className="flex items-center justify-center gap-2 rounded-full border border-border py-3.5 font-semibold"
            >
              <Phone className="size-4" aria-hidden /> {phoneDisplay}
            </TrackedLink>
          </div>
        </div>
      )}
    </>
  );
}
