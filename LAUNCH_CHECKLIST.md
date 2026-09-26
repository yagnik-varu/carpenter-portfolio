# Launch Checklist

Everything that must be reviewed, replaced or configured **before the site goes live on the real domain**.
Tick items as you go (`- [x]`). New items are added here whenever a feature needs a launch-time action.

> Status legend: items marked **⚠ untested** were built but could not be verified end-to-end during development.

---

## 1. Business details — `content/business.json`
All values are currently **dummy data**.

- [ ] `name`, `legalName`, `owner`, `foundedYear`
- [ ] `tagline` and `description` (both `en` and `gu`)
- [ ] `url` — the real domain (e.g. `https://yourdomain.ca`)
- [ ] `contact.phone`, `contact.phoneDisplay`, `contact.whatsapp` (digits only, with country code, e.g. `19055550142`)
- [ ] `contact.email` (shown on site) and `contact.leadsEmail` (where quote requests are delivered)
- [ ] `address` (street, city, region, postalCode, country) and `geo` (lat/lng — right-click the location in Google Maps)
- [ ] `serviceArea` — cities you actually serve
- [ ] `hours` — opening hours
- [ ] `credentials` — only claim what is true: licensed, insured (+ amount), WSIB, warranty years
- [ ] `stats` — projects completed, rating, review count (used when Google reviews aren't connected)
- [ ] `social` — real profile links; leave `""` for any you don't have (they're hidden automatically)
- [ ] `google.placeId` — see section 5
- [ ] Name, address and phone match your **Google Business Profile exactly** (same spelling/format) — key local-SEO factor

## 2. Content — replace dummy text and placeholders
- [ ] `content/services.ts` — services offered, descriptions, "what's included", price ranges, service FAQs
- [ ] `content/projects.ts` — real projects (title, summary, location, year, duration, materials)
- [ ] `content/reviews.ts` — fallback reviews: use **real, verbatim** client reviews only (or remove once Google reviews are live)
- [ ] `messages/en.json` — review hero text, about story, process steps, FAQ answers, privacy policy
- [ ] Privacy policy (`privacy.body` in both message files) reviewed against what the site actually collects

## 3. Photos & video — wood-grain placeholders show wherever `src` is empty
- [ ] Project photos: set `src` on `cover`, `gallery` and `beforeAfter` images in `content/projects.ts` (files in `public/projects/...`)
- [ ] Service images: `image.src` in `content/services.ts`
- [ ] Owner photo: `media.ownerPhoto` in `business.json` (About page)
- [ ] Logo: `media.logo` in `business.json` (otherwise a text wordmark is shown)
- [ ] Hero: `media.heroVideo` (desktop, ~2–3 MB), `media.heroVideoMobile` (9:16, **< 1.5 MB**), `media.heroPoster` (JPG) — files in `public/hero/`, audio stripped
- [ ] Every image has a meaningful `alt` text in both languages
- [ ] You own the rights to every photo/video used

## 4. Translations — Gujarati
- [ ] `messages/gu.json` reviewed by a native Gujarati speaker (currently **machine-generated**)
- [ ] Gujarati strings in `content/services.ts`, `content/projects.ts`, `business.json` reviewed
- [ ] Remove the "Gujarati translation is auto-generated" footer note once reviewed (`footer.translationNote` in `components/layout/Footer.tsx`)

## 5. Environment variables — set in hosting dashboard (see `.env.example`)
- [ ] `NEXT_PUBLIC_SITE_URL` = real domain (canonical links, sitemap, share images depend on it)
- [ ] `ALLOW_INDEXING=true` — **only on the production domain**. Leave unset on test/preview deployments.
- [ ] `RESEND_API_KEY` — quote form emails (without it, emails are only logged to the server console)
- [ ] `QUOTE_FROM_EMAIL` — sender on a **domain verified in Resend** (the `onboarding@resend.dev` test sender only delivers to your own Resend account email)
- [ ] `NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY` — real Cloudflare Turnstile keys for the live domain (not the test keys)
- [ ] `GOOGLE_PLACES_API_KEY` — Places API (New), key **restricted** to that API; plus `google.placeId` in `business.json`

## 6. Quote form — test on the live site
- [ ] **⚠ untested end-to-end:** submit a real request with 2–3 phone photos from an iPhone and an Android phone
- [ ] Owner email arrives at `leadsEmail` with all fields and photos attached; "Reply" goes to the customer
- [ ] Customer auto-reply arrives (test once in English, once in Gujarati)
- [ ] Validation errors show correctly in both languages (empty form, bad phone, bad email)
- [ ] `?service=` prefill works from a service page's quote button and from the mobile action bar
- [ ] Turnstile widget appears and blocks submission without verification
- [ ] Redirects to `/contact/thanks` after success
- [ ] Emails don't land in spam (set up SPF/DKIM for the sending domain in Resend)

## 7. SEO — after deploying to the real domain
- [ ] `https://yourdomain/robots.txt` shows `Allow: /` and a `Sitemap:` line (**⚠ untested** with `ALLOW_INDEXING=true`)
- [ ] `https://yourdomain/sitemap.xml` lists real-domain URLs (not `example-carpentry.vercel.app`)
- [ ] View page source on a page: no `<meta name="robots" content="noindex">` (except privacy/thanks)
- [ ] Google Rich Results Test passes for the home page and one service page
- [ ] Create **Google Search Console** property, verify the domain, submit the sitemap
- [ ] Share a link on WhatsApp/Facebook and check the preview card (use the Facebook Sharing Debugger to refresh)
- [ ] **⚠ untested:** live Google reviews appear with "Reviews from Google" attribution (needs API key + place ID)

## 8. Hosting & domain
- [ ] Decide hosting for production: Vercel **Hobby is non-commercial** per Vercel's terms → Vercel Pro, or move to Cloudflare as planned
- [ ] Custom domain connected, HTTPS working, `www` → apex (or reverse) redirect in place
- [ ] If moving to Cloudflare: re-test quote form (Server Action body limit), share images, and Google reviews cache after the move
- [ ] Test/preview deployments are **not** indexed (no `ALLOW_INDEXING` there)

## 9. Final QA
- [ ] Test on a real iPhone (Safari) and Android phone (Chrome) at small width — no horizontal scrolling, sticky bar doesn't cover content
- [ ] Every Call / WhatsApp link opens the right number with the right prefilled message
- [ ] Language switch keeps you on the same page (`/en/...` ↔ `/gu/...`)
- [ ] All pages load with no console errors; 404 page works
- [ ] Lighthouse (mobile): Performance ≥ 90, Accessibility/SEO/Best Practices ≥ 95 — re-check after adding real photos and video

---

<!-- Upcoming phases will add their launch items below: analytics & cookie consent (Phase 5), hero video & polish (Phase 6), PWA & launch (Phase 7). -->
