"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Desktop nav with a small wood "tick" under the current section. */
export function NavLinks({ items }: { items: { href: string; label: string }[] }) {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-1 text-sm font-medium">
      {items.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={current ? "page" : undefined}
              className="focus-ring group relative block rounded-full px-3 py-2 text-fg-muted transition-colors hover:text-fg aria-[current=page]:text-fg"
            >
              {item.label}
              <span
                aria-hidden
                className="absolute inset-x-3 -bottom-0.5 h-2 origin-center scale-x-0 border-x border-b border-wood transition-transform group-hover:scale-x-100 group-aria-[current=page]:scale-x-100"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
