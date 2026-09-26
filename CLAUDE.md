@AGENTS.md

# Carpenter Portfolio — project guide

A mobile-first marketing site for a solo/small-crew carpenter serving one city. The site exists to **generate quote requests**. Every feature should do one of three jobs:
- **build trust:** portfolio, reviews, credentials
- **remove friction:** one-tap Call / WhatsApp / Quote
- **help local search:** SEO

It is bilingual: English (`/en`) and Gujarati (`/gu`).

## Working agreements
- **Never run `git commit` or `git push`.** At the end of each phase, give the user a ready-to-paste commit message. Reading git state is fine.
- **Free tiers only.** Don't add paid services without asking.
- **Keep hosting portable.** It deploys to Vercel for testing and moves to Cloudflare later. Use plain `fetch` for third-party APIs (no vendor SDKs where a REST call works). No Vercel-only APIs such as Vercel Blob, KV or Edge Config. No `proxy.ts`/middleware. Share images must be statically generated.
- **Every integration is optional through env vars.** When a key is missing, the feature falls back quietly: log instead of email, skip the captcha, show local reviews. Document every new key in `.env.example`.
- **Read the Next.js docs first.** This is Next.js 16 with React 19.2. Check `node_modules/next/dist/docs/` before using an API (see AGENTS.md).
- **Keep `LAUNCH_CHECKLIST.md` current.** See the section below.
- **Verify before claiming done.** Run `npm run build` and `npm run lint`. Where possible, check routes with `next start` and `curl`. Say plainly what couldn't be tested.

## Commands
```bash
npm run dev      # dev server on http://localhost:3000 (/ redirects to /en)
npm run build    # production build; every page is statically generated
npm run start    # serve the production build
npm run lint     # ESLint
```
No test suite yet. Verify with the build, lint, and manual/`curl` checks.

## Stack
- **Framework and styling:** Next.js 16 (App Router, Turbopack), React 19.2, TypeScript, Tailwind CSS v4 (tokens in `app/globals.css`)
- **Forms:** `zod` v4 (shared client and server validation). Icons: `lucide-react`. Analytics client: `posthog-js`.
- **External services:**
  - Resend REST API: email
  - Cloudflare Turnstile: spam protection
  - Google Places API (New): reviews
  - GA4 + PostHog: analytics (Phase 5)
- **No** next-intl, shadcn/ui, CMS or Motion library. These were deliberately dropped to keep dependencies light and the Cloudflare move easy.

## Project structure
```
app/
  [lang]/                 root layout lives here; lang = "en" | "gu" (static params, dynamicParams = false)
    layout.tsx            fonts, header/footer, sticky ActionBar, LocalBusiness JSON-LD, site-wide robots
    page.tsx              home
    services/ [slug]/     service listing + detail (+ opengraph-image.tsx)
    projects/ [slug]/     portfolio gallery + detail (+ opengraph-image.tsx)
    about/ faq/ reviews/ privacy/
    contact/              quote form page, actions.ts (Server Action), thanks/
    opengraph-image.tsx   default share card
    not-found.tsx
  sitemap.ts  robots.ts
components/
  layout/                 Header, MobileMenu, LanguageSwitcher, Footer, ActionBar, Logo
  sections/               page sections (Hero, ServiceCard, ProjectCard, ProjectFilter, Gallery, BeforeAfter, Reviews, Faq, CtaBand, ...)
  forms/                  QuoteForm, Turnstile
  ui/                     Media (image-or-placeholder), Section/PageHeader, button styles
  TrackedLink.tsx TrackView.tsx JsonLd.tsx icons.tsx
content/                  file-based content (dummy data for now)
  business.json           SINGLE source of business details (name, phone, address, hours, media, ...)
  services.ts projects.ts reviews.ts types.ts
lib/
  i18n.ts                 locales, Localized type, l(), fmt(), href()
  dictionaries.ts         getDictionary(locale), server-only
  content.ts              content access layer: getServices/getProjects/getReviews/...
  business.ts             business data + telHref / whatsappHref helpers
  quote.ts                quote zod schema, limits, error keys (shared client/server)
  analytics.ts            track(event, props) → GA4 + PostHog
  faq.ts compress-image.ts
  seo/                    site.ts (siteUrl, allowIndexing), metadata.ts (pageMetadata), jsonld.ts, og.tsx
  server/                 server-only: email.ts, turnstile.ts, rate-limit.ts, google-reviews.ts
messages/en.json gu.json  UI strings (gu is machine-translated; needs native review)
assets/fonts/             Fraunces TTF for share images
```

## Conventions

### Internationalization
- All routes live under `app/[lang]/`. In pages: `const lang = (await params).lang as Locale; const t = await getDictionary(lang);`.
- **UI strings** go in `messages/en.json` and `messages/gu.json`. Always add a key to **both** files. `Dictionary` is typed from `en.json`.
- **Content strings** use the `Localized` type `{ en, gu }`. Read them with `l(value, lang)`.
- Fill placeholders with `fmt("Hi {name}", { name })`. Build links with `href(lang, "/path")`, never hand-written `/en/...`.
- Client components can't call `getDictionary`. Pass them the strings they need as props.
- Gujarati needs extra line-height, which `:lang(gu)` in `globals.css` already handles. Share images are **English-only**, because their renderer (Satori) can't join Gujarati letters correctly.

### Content and data
- Pages get data only through `lib/content.ts`. That keeps a later CMS switch (e.g. Sanity) to one file.
- Business facts (phone, address, hours, credentials) come from `content/business.json`. Never hard-code them in components.
- Images use `<Media media={...} locale={lang} />`. An empty `src` renders a wood-grain placeholder labelled with the alt text; the `tone` prop varies the color.

### Components and styling
- Server Components by default. Add `"use client"` only for interactivity.
- Use the Tailwind theme tokens (`bg-bg`, `bg-surface`, `text-fg`, `text-fg-muted`, `bg-primary`, `text-wood`, `border-border`, ...), not raw hex colors.
- Mobile-first:
  - tap targets at least 44px (`min-h-11`)
  - 16px side gutters (`px-4`), page width `max-w-6xl`
  - no horizontal page scroll
  - the sticky bottom `ActionBar` must never cover content (body bottom padding already handles this)
- Buttons use `buttonStyles.*` from `components/ui/button.ts`.

### Analytics
- Call-to-action, call and WhatsApp links use `<TrackedLink event="..." eventProps={{ location, ... }}>`. One-off page events use `<TrackView>`. Everything goes through `track()` in `lib/analytics.ts`.
- Events: `cta_click`, `call_click`, `whatsapp_click`, `quote_submit`, `project_view`, `filter_used`, `language_switch`. Add new ones to the `AnalyticsEvent` type.

### SEO
- Each page's `generateMetadata` returns `pageMetadata({ lang, path, title, description })`, which adds the canonical link, en/gu/x-default hreflang, and Open Graph tags.
- Structured data uses the builders in `lib/seo/jsonld.ts`, rendered with `<JsonLd data={...} />`. Don't add AggregateRating/Review markup (Google ignores or forbids it for this case).
- Indexing is **off** unless `ALLOW_INDEXING=true` (robots.txt plus the layout's robots meta). Keep it that way on test deployments.
- New public routes must be added to `app/sitemap.ts` (`staticPaths`), and in both languages.

### Server code
- Server-only modules import `"server-only"` and live in `lib/server/`.
- The quote Server Action validates everything with `quoteSchema` (`lib/quote.ts`). Error messages are **dictionary keys** (`contact.form.errors.*`), not display text.
- Photo uploads are compressed in the browser and capped at 3.5 MB total. `serverActions.bodySizeLimit` is `4mb` (under Vercel's 4.5 MB limit).

## Environment variables
Everything is documented in `.env.example`:
- `NEXT_PUBLIC_SITE_URL`
- `ALLOW_INDEXING`
- `RESEND_API_KEY`
- `QUOTE_FROM_EMAIL`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`
- `TURNSTILE_SECRET_KEY`
- `GOOGLE_PLACES_API_KEY`

## Build phases
1. ✅ Foundation: i18n routing, design tokens, layout, sticky action bar
2. ✅ Pages: home, services, filterable portfolio, project detail, about/faq/reviews/privacy
3. ✅ Quote form: validation, photo upload, Resend email, Turnstile, honeypot, rate limit
4. ✅ SEO & trust: Google reviews, JSON-LD, sitemap, robots, hreflang, share images
5. ⏳ Analytics & consent: GA4 + PostHog (proxied via rewrites), cookie consent banner (PIPEDA), GA4 Consent Mode v2
6. ⏳ Hero video & polish: real hero media, motion, accessibility pass
7. ⏳ PWA & launch: manifest, icons, offline page (hand-written service worker, not Serwist), deploy

Deferred to v2: cost estimator, CMS, consultation booking, blog.

## Launch checklist

`LAUNCH_CHECKLIST.md` is the single list of everything the owner must review, replace or configure before the site goes live.

- Whenever you add or change something that needs a launch-time action, add an item to the matching section of `LAUNCH_CHECKLIST.md` in the same change. That includes a new env var, a new third-party service or API key, new placeholder or dummy content, a new file the owner must supply, a feature you couldn't test end-to-end, or a hosting-specific behavior.
- Mark anything that was built but not verified end-to-end with **⚠ untested**, and remove the marker once it has been verified.
- Never delete checklist items the owner hasn't ticked. If an item becomes obsolete, say so in your reply and let the owner remove it.
- At the end of each phase, list any checklist items you added so the owner can review them.
