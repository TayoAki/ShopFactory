# Bogey Baby storefront

The full frontend for **Bogey Baby**, golf hats made for women golfers. It's built from `docs/bogey-baby-site-build-plan.md`, which itself follows the landing-page SOP.

**Stack:** Next.js 15 (App Router), React 19 and TypeScript.

**Styling:** plain CSS design tokens; no UI framework.

**Rendering:** every page is static except search and the API routes.

## Run it

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build && npm start   # production build (PORT is respected)
```

**Deploy on Railway:** point a service at `storefront/`. The build command is `npm run build` and the start command is `npm start`. Set the variables from `.env.example`.

## What's in it

| Area | Where |
|------|-------|
| Design system (tokens, stitched buttons, components) | `src/app/globals.css` |
| Catalog: 13 hats, real Printify facts, variant IDs | `src/data/products.ts` |
| Claims engine: benefit copy comes only from true feature flags | `src/lib/catalog.ts` (`benefitBullets`) |
| Bundle pricing (2 hats save 10%, 3+ save 15%) | `src/lib/pricing.ts` |
| Cart (saved in the browser), drawer, bundle nudge | `src/lib/cart.tsx`, `src/components/CartDrawer.tsx` |
| First-party analytics (server-side, no third-party pixels) | `src/lib/analytics.ts`, `src/app/api/analytics/route.ts` |
| Waitlist and newsletter (Klaviyo when keys are set) | `src/app/api/waitlist/route.ts` |
| Lifestyle media manifest | `src/data/media.ts` |

### Pages

**Shop pages** (full header and footer):
- `/` homepage
- `/products/[handle]` (13 hats)
- `/collections/[handle]`: all, embroidered, performance, ponytail-caps, caps, rope-caps, visors, bucket-hats, beanies
- `/cart`, `/checkout`, `/order/confirmed`
- `/account`, `/search`
- Content pages: `/pages/about-us`, `fit-guide`, `faq`, `reviews`, `shipping-returns`, `contact`
- Legal pages: `/pages/privacy`, `terms`, `accessibility`, `privacy-choices`
- A custom 404

**Ad landing pages** (minimal header, set to noindex):
- `/pages/5-reasons`: the listicle for cold Meta and TikTok traffic
- `/pages/golf-buddy`: the bundle offer page for retargeting

**Deep links:**
- `/products/front-nine-ponytail-cap?color=rose&bundle=2` preselects a color and a bundle size.
- `?src=` and `utm_*` parameters are recorded with page views.

## Switches (environment variables)

| Variable | Effect |
|----------|--------|
| `NEXT_PUBLIC_DROP_MODE=true` | Pre-launch mode: waitlist signups replace add-to-bag sitewide, and the cart is hidden |
| `NEXT_PUBLIC_DROP_DATE` | Shown in drop-mode copy, e.g. "March 14" |
| `NEXT_PUBLIC_INDEXABLE=true` | Lets search engines index the site. Leave `false` until launch |
| `NEXT_PUBLIC_CHECKOUT_MODE` | `demo` (default) runs checkout without taking payment and shows a banner. Set `live` only after Stripe is wired |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for metadata, sitemap and structured data |
| `KLAVIYO_PRIVATE_KEY`, `KLAVIYO_LIST_ID` | Send signups to Klaviyo. Without them, signups are logged |

## What is real and what is a placeholder

**Real:**
- **Product facts:** every material, closure, ponytail, UPF and small-fit claim comes from that hat's Printify catalog description.
- **Decoration:** "embroidered" or "printed" matches the provider's placement for each hat.
  - **Embroidered (stitched):** the Sunwashed Rope Cap, Front Nine Ponytail Cap, Range Day Mesh Cap, Tee Time Dad Cap and Winter Rules Beanie.
  - **Printed (DTF heat transfer):** the performance caps, visor, bucket hats, trucker and cord cap. The copy says "printed" for these.
  - **Flagship:** the Cream Rope Cap is the existing hero product. Its closest embroidered Printify blank is the Comfort Colors Sunwashed Rope Cap (blueprint 6597) in Ivory.
- **Printify variant IDs** are stored per color, ready for order creation.
- **Shipping time** ("ships within 10 business days") is Printify's stated handling time for these blanks.

**Placeholders to replace before launch:**
- **Images.** All product renders and most lifestyle photos are AI-generated concept images made with OpenRouter (Gemini image models, about $4.50 in total). They're flagged `ai: true` in `src/data/media.ts` and in `products.ts`.
  - Replace product images with Printify mockups once the products are created in Printify.
  - Replace lifestyle images with the real content-day shoot (plan, Appendix B).
  - Never present AI people as customers, reviewers or the founder.
- **Prices** ($30–$40) and **bundle percentages** are proposals. Embroidered Printify caps cost about $21 plus $4.59 shipping (first item) and $2.09 per extra item, so check landed cost per hat before going live.
- **Policies.** Free US shipping, free fit exchanges and 30-day returns are business decisions. Printify doesn't accept change-of-mind returns, so the store absorbs that cost. Confirm them first.
- **Reviews.** None are shown until real ones exist; the plan calls for showing ratings at 10+ verified reviews.
- **Legal pages** are plain-language drafts marked for review.
- **Accounts.** The sign-in form is a placeholder until it's connected to the order system.

## Going live: checkout and fulfillment

1. **Payments.** Add Stripe:
   - Mount the Payment Element and Express Checkout Element in `src/app/(shop)/checkout/CheckoutClient.tsx`.
   - Create a PaymentIntent in a new route, `src/app/api/checkout/route.ts`, priced on the server from `products.ts` plus `pricing.ts`. Never trust prices sent from the browser.
2. **Orders.** After payment succeeds, create the order in one of two ways:
   - in Medusa, if you keep the existing backend, or
   - directly through Printify's `POST /v1/shops/{shop_id}/orders.json`, using each line's `printify.variantId` and a published Printify product.
3. **Products in Printify.** Create one Printify product per hat with the golfer artwork, using each product's `source.blueprintId` and `printProviderId`. Use embroidery placements where listed. Then replace the concept renders with Printify's mockups.
4. **Tracking.** Forward `/api/analytics` events to:
   - the GA4 Measurement Protocol
   - the Meta Conversions API
   - the TikTok Events API

   Reuse `event_id` for deduplication, and skip forwarding when a request carries `Sec-GPC: 1`.
5. **Launch switches.** Set `NEXT_PUBLIC_CHECKOUT_MODE=live`, `NEXT_PUBLIC_INDEXABLE=true` and `NEXT_PUBLIC_DROP_MODE=false`.

## Security

- **Strict security headers** live in `next.config.ts`. `script-src` allows `'unsafe-inline'` because Next.js hydrates with inline scripts. For a stricter policy, switch to per-request nonces in middleware; that makes every page render on request instead of statically.
- **Secrets.** No API keys are in this repo. Keep the Printify token in Railway variables (`PRINTIFY_API_TOKEN`), never in code. **Rotate the token that was shared in chat** during this build.

## QA results (local production build, 18 Nov 2026)

| Page | LCP, phone on throttled 4G (1.6 Mbps, 150 ms, 4× CPU) | CLS | Page weight |
|------|------------------|-----|-------------|
| Homepage | 1.18 s (live site today: 6.9 s) | 0 | ~0.6–0.75 MB (live site: 4.0 MB) |
| Product page | 0.77 s | 0 | ~0.4–0.6 MB |
| 5 Reasons listicle | 1.24 s | 0 | ~0.4 MB |

- No console errors.
- No horizontal scroll at 390 px.
- Add to bag, the bundle discount and demo checkout through to confirmation all pass on phone and desktop.
