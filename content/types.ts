import type { Localized } from "@/lib/i18n";

/** An image slot. Leave `src` empty to render a styled placeholder. */
export type Media = {
  src?: string;
  alt: Localized;
  width?: number;
  height?: number;
};

export type CategoryId = "kitchens" | "built-ins" | "decks" | "furniture" | "trim";

export type Category = {
  id: CategoryId;
  label: Localized;
};

export type ServiceIcon = "kitchen" | "shelves" | "deck" | "chair" | "door";

export type Service = {
  slug: string;
  category: CategoryId;
  icon: ServiceIcon;
  title: Localized;
  summary: Localized;
  intro: Localized;
  included: Localized[];
  priceRange: Localized;
  image: Media;
  faq: { q: Localized; a: Localized }[];
};

export type Project = {
  slug: string;
  category: CategoryId;
  featured: boolean;
  title: Localized;
  summary: Localized;
  location: string;
  year: number;
  duration: Localized;
  materials: Localized;
  cover: Media;
  gallery: Media[];
  beforeAfter?: { before: Media; after: Media };
};

export type Review = {
  author: string;
  rating: number;
  text: string;
  relativeTime: string;
  avatar?: string;
};
