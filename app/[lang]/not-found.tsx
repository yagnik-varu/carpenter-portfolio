import Link from "next/link";
import { buttonStyles } from "@/components/ui/button";
import en from "@/messages/en.json";

// not-found receives no params; English copy is used for the rare 404 case.
export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <p className="font-serif text-7xl font-semibold text-wood">404</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold">{en.notFound.title}</h1>
      <p className="mt-2 text-fg-muted">{en.notFound.text}</p>
      <Link href="/en" className={`${buttonStyles.primary} mt-8`}>
        {en.notFound.back}
      </Link>
    </div>
  );
}
