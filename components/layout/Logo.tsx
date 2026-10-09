import Image from "next/image";
import { business } from "@/lib/business";

/** Uses business.media.logo when set, otherwise a text wordmark placeholder. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  if (business.media.logo) {
    return <Image src={business.media.logo} alt={business.name} width={160} height={40} className="h-9 w-auto" preload />;
  }
  return (
    <span className="flex min-w-0 items-center gap-2">
      <span className="wood-grain grid size-9 shrink-0 place-items-center rounded-lg font-serif text-lg font-bold text-inverse">
        {business.name.charAt(0)}
      </span>
      <span className={`truncate font-serif text-lg font-semibold leading-tight ${inverted ? "text-inverse" : "text-fg"}`}>
        {business.name}
      </span>
    </span>
  );
}
