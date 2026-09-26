import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { business } from "@/lib/business";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Committed static TTF (OFL). Share cards are English-only: Satori has no complex-script
// shaping, so Gujarati renders with misplaced vowel signs.
const fraunces = readFile(join(process.cwd(), "assets/fonts/Fraunces-SemiBold.ttf"));

type Options = { eyebrow: string; title: string; subtitle?: string };

/** Branded 1200×630 share card: wood background, title, business name + phone. */
export async function renderOgImage({ eyebrow, title, subtitle }: Options) {
  const font = await fraunces;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          color: "white",
          fontFamily: "Fraunces",
          backgroundImage: "linear-gradient(135deg, #8a6446 0%, #4e3423 60%, #2b1d14 100%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#c49a6c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
            }}
          >
            {business.name.charAt(0)}
          </div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>{business.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 1000 }}>
          <div style={{ fontSize: 28, color: "#e8d3b8" }}>{eyebrow}</div>
          <div style={{ fontSize: title.length > 40 ? 64 : 80, lineHeight: 1.15 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 30, opacity: 0.85, lineHeight: 1.4 }}>{subtitle}</div>}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, opacity: 0.9 }}>
          <div>{business.contact.phoneDisplay}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* SVG star: the ★ glyph isn't in the bundled fonts. */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="#e0a526">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {`${business.stats.rating} · ${business.address.city}`}
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Fraunces", data: font, weight: 600, style: "normal" }],
    },
  );
}
