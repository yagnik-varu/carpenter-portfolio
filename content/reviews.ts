import type { Review } from "./types";

// DUMMY fallback reviews. Shown until GOOGLE_PLACES_API_KEY + google.placeId are configured,
// and whenever the Google API is unavailable. Replace with real (verbatim) client reviews.
export const fallbackReviews: Review[] = [
  {
    author: "Priya S.",
    rating: 5,
    relativeTime: "2 months ago",
    text: "They rebuilt our whole kitchen in white oak and it's stunning. Clear quote, showed up every day on time, and cleaned up after themselves. Couldn't be happier.",
  },
  {
    author: "Mark D.",
    rating: 5,
    relativeTime: "4 months ago",
    text: "Our new cedar deck is solid as a rock. They handled the permit and finished a day early. Honest, careful work.",
  },
  {
    author: "Harjit K.",
    rating: 5,
    relativeTime: "5 months ago",
    text: "Built-in bookshelves around our fireplace look like they came with the house. Great attention to detail and very fair pricing.",
  },
  {
    author: "Jennifer L.",
    rating: 5,
    relativeTime: "7 months ago",
    text: "Beautiful walnut dining table — a real heirloom. Communication was excellent from sketches to delivery.",
  },
  {
    author: "Amit P.",
    rating: 4,
    relativeTime: "9 months ago",
    text: "Trim and wainscoting throughout our main floor. Tight joints and clean finish. Small delay on materials but they kept us informed.",
  },
];
