import "server-only";
import type { Locale } from "./i18n";
import en from "@/messages/en.json";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  gu: () => import("@/messages/gu.json").then((m) => m.default),
};

export const getDictionary = (locale: Locale) => dictionaries[locale]();
