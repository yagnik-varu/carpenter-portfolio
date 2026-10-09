import Image from "next/image";
import { business } from "@/lib/business";

/** Owner's signature (image if supplied, otherwise their name in a handwriting font) + role line. */
export function Signature({
  role,
  className = "",
  inverse = false,
}: {
  role?: string;
  className?: string;
  /** Light version for dark backgrounds. */
  inverse?: boolean;
}) {
  const { signature } = business.media;
  return (
    <div className={className}>
      {signature ? (
        <Image
          src={signature}
          alt={business.owner}
          width={220}
          height={72}
          className={`h-14 w-auto ${inverse ? "invert" : ""}`}
        />
      ) : (
        <p
          className={`inline-block -rotate-2 font-hand text-4xl leading-none ${inverse ? "text-inverse" : "text-wood"}`}
          translate="no"
        >
          {business.owner}
        </p>
      )}
      {role && (
        <p className={`label-mono mt-2 ${inverse ? "text-inverse-muted" : "text-fg-muted"}`}>{role}</p>
      )}
    </div>
  );
}
