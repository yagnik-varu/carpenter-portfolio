import "server-only";
import type { ReviewsData } from "@/content/types";

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating: number;
    relativePublishTimeDescription?: string;
    text?: { text: string };
    originalText?: { text: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

/**
 * Fetches rating + up to 5 reviews from Google Places API (New). Cached for a day, so
 * pages stay static and the API is called at most ~once per day per deployment.
 * Returns null when not configured or on any error — callers fall back to local data.
 */
export async function fetchGoogleReviews(placeId: string): Promise<ReviewsData | null> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
      },
      next: { revalidate: 86400 },
    });
    if (!res.ok) {
      console.error("[reviews] Google Places error", res.status, await res.text());
      return null;
    }
    const data = (await res.json()) as PlaceResponse;
    if (!data.rating) return null;

    return {
      rating: data.rating,
      count: data.userRatingCount ?? 0,
      url: data.googleMapsUri ?? "",
      source: "google",
      reviews: (data.reviews ?? [])
        .map((r) => ({
          author: r.authorAttribution?.displayName ?? "Google user",
          authorUrl: r.authorAttribution?.uri,
          avatar: r.authorAttribution?.photoUri,
          rating: r.rating,
          relativeTime: r.relativePublishTimeDescription ?? "",
          text: r.originalText?.text ?? r.text?.text ?? "",
        }))
        .filter((r) => r.text),
    };
  } catch (err) {
    console.error("[reviews] Google Places fetch failed", err);
    return null;
  }
}
