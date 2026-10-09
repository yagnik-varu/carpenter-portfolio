import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import { DimensionLine } from "@/components/craft/DimensionLine";
import en from "@/messages/en.json";
import gu from "@/messages/gu.json";

// not-found receives no params, so the copy is shown in both languages.
export default function NotFound() {
  return (
    <div className="graph-paper px-4 py-20 md:py-28">
      <div className="mx-auto flex max-w-xl flex-col items-center text-center">
        <p className="label-mono text-wood">{en.notFound.eyebrow}</p>
        <p className="mt-4 font-serif text-8xl font-semibold text-wood md:text-9xl">404</p>
        <DimensionLine className="mt-2 w-full max-w-xs text-wood">404 mm</DimensionLine>
        <h1 className="mt-8 font-serif text-3xl font-semibold text-balance">{en.notFound.title}</h1>
        <p className="mt-2 text-fg-muted">{en.notFound.text}</p>
        <p lang="gu" className="mt-4 text-fg-muted">
          {gu.notFound.title}. {gu.notFound.text}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/en" className={buttonStyles.primary}>
            {en.notFound.back}
          </Link>
          <Link href="/gu" lang="gu" className={buttonStyles.secondary}>
            {gu.notFound.back}
          </Link>
        </div>
      </div>
    </div>
  );
}
