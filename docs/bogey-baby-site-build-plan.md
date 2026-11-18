# Bogey Baby: Full E-commerce Site Build Plan

**Goal:** a complete, launch-ready store where every page scores 100/100 on the landing page SOP's rubric (a "10/10 site").
**Built on:** the SOP ("SOP — Designing Shopify DTC Landing Pages with Replo AI"), the BogeyBaby Launch Brief, and the Storefront Page Audit (current homepage: 42/100).
**Stack:** the store already runs on a Next.js storefront with a Medusa backend, hosted on Railway. This plan builds on that stack. The SOP's design rules apply whatever the builder is; Appendix C maps it to Shopify + Replo if you switch.
**Date:** 18 Nov 2026

---

## How to read this plan

- **[Brackets]** mark facts only you can supply: price, specs, policies, review counts, dates. Never publish a bracketed claim until it is true. A false claim fails the rubric automatically.
- **G-xx** codes are graphics. Every page section names the graphics it needs, and **Section 8, Graphics library** describes each one fully (what to shoot or draw, size, format, file-size limit and alt text). You make the graphics; the plan tells you exactly what each one is.
- **P-xx** codes are pages, **C-xx** codes are reusable components and **E-xx** codes are emails or texts.
- Every page lists its job, traffic source, section order, full copy, components, graphics, mobile notes, SEO fields, tracking events and the rubric target it must hit.

## Table of contents

1. Principles from the SOP
2. Inputs you must supply
3. Brand foundation
4. Design system
5. Site map, funnel and navigation
6. Global components (C-01 to C-24)
7. Page specs (P-01 to P-22)
8. Graphics library (G-01 to G-46, plus G-47 in 9.5)
9. Product catalog, pricing and offers
10. Technical build spec
11. Email and SMS flows
12. Build phases, QA and launch
13. Rubric scoring sheet
- Appendix A: Claims register
- Appendix B: Content-day shot list
- Appendix C: Shopify + Replo mapping

---

## 1. Principles from the SOP

These rules govern every decision below. When something in this plan conflicts with them, they win.

1. **Offer first, design last.** Each page starts from what it sells, to whom, and how warm the visitor is.
2. **Right page for the traffic.**
   - Cold ads go to the listicle (P-03).
   - Retargeting goes to the offer page (P-04) or the product page (P-05).
   - Branded, organic and returning visitors land on the homepage (P-01).
   - Never send cold traffic to the homepage or a product page.
3. **The 7-section framework.** Hero, Problem, Solution, Social proof, Why it works, Offer, Final CTA. Use only the sections the visitor needs: 4–7+ for cold traffic, 3–6 for warm, 2–4 for hot.
4. **Build all 5 beliefs on every selling page:**
   - "This is for someone like me."
   - "I have this problem."
   - "This can solve it."
   - "It'll work for me."
   - "There's no risk."
5. **The hero passes the 3-second test.** Within 3 seconds the visitor knows what it is, who it's for, why to care and what to do next. A benefit-first headline, subheadline, visual, CTA and trust signal all sit in the mobile fold.
6. **The headline answers the ad.** The page's first words repeat the promise of the ad that sent the visitor.
7. **Transformation first, features as backup.** Ask "So what?" of every feature until it reaches a feeling.
8. **All four trust triggers:** social proof, authority, clarity and risk reversal. Put the guarantee next to the price.
9. **Design for mobile first.** 80–95% of landing-page traffic is on phones. Pass the thumb test, keep tap targets at least 44 px, and keep LCP under 2.5 s (this plan's target is 2.0 s).
10. **Layout:** 1300 px max content width, padding in %, spacing with gaps, cards aligned to the top, and every section built the same way.
11. **Test big swings in a fixed order:** headline, then offer, then CTA, then hero visual, then social proof. Call a winner only after 500–1,000+ sessions per variant and 7+ days.

---

## 2. Inputs you must supply

| # | Input | Used in | Status |
|---|-------|---------|--------|
| I-1 | Final product list: names, colors, fit sizes | 9, all product pages | Cream Rope Cap confirmed; the rest are proposals (Section 9.1) |
| I-2 | Hat spec per product: crown height, panels, closure, fit range in inches, fabric, sweatband, ponytail opening (yes/no), UPF (yes/no, tested?), care | P-05, P-11, G-15 | [Needed] |
| I-3 | Price per hat and bundle prices (proposed: $36 / 2 for $60 / 3 for $81) | P-01, P-03, P-04, P-05 | [Confirm against landed cost] |
| I-4 | Shipping policy (proposed: free US shipping on every order), exchange policy (proposed: free fit exchange within 30 days), returns window (proposed: 30 days, no fee) | Trust lines, P-14 | [Confirm] |
| I-5 | Drop date and first-run quantity per color (real numbers) | Pre-launch states, P-04 | [Needed] |
| I-6 | Founder story: 2–3 true sentences, a name, a photo | P-01, P-10 | [Needed] |
| I-7 | Fit-panel reviews: 20 women golfers; target 10+ written reviews and 3+ try-on clips | Every selling page | [Run before launch] |
| I-8 | Production domain (proposed: bogeybaby.com, which looked unregistered on 17 Nov) | SEO, email, pixels | [Buy and confirm] |
| I-9 | Trademark clearance for "Bogey Baby" (Birdie Babe Golf sells a "BOGEY Babe" hat; BOGEY BOYS and BOGEY BROS hold live marks that cover golf hats) | Everything | [Attorney clearance before buying stock] |
| I-10 | Accounts: Stripe, Klaviyo (or your email/SMS tool), Meta Business, TikTok Ads, Google Analytics 4, Google Search Console | Section 10 | [Needed] |

---

## 3. Brand foundation

### 3.1 Positioning

**One line:** Embroidered golf hats made for women golfers, especially Black women golfers, and the friends who play with them.

**Brand promise:** Good company. Better hats.

**Who it's for:**
- Women aged 25–55 who play for the company: league nights, girls' trips, Saturday tee times, lunch after the round.
- Beginners through mid-handicappers.
- Style matters to her. She has been underserved by pro shops.
- The About page already says: "We center women and Black golfers, from the first bucket at the range to the last tee time of the day."

**Why she buys (from the research):**
- **Choice:** pro shops stock little for women, and what they do stock is "shrunk and pinked".
- **Belonging:** "the last thing you want is to show up at the first tee looking out of place."
- **Fit:** "I have a smaller head". Only claim this if the cap's fit range supports it (I-2).
- **Matching her outfit and collecting colors:** "So cute, I bought a few colors!"

**The angle in one sentence:** Golf hats that look like you, drawn for women golfers rather than men's caps shrunk and pinked.

### 3.2 Messaging pillars

Every page draws its copy from these four pillars. Only use pillar 3 claims that appear as true in the claims register (Appendix A).

| Pillar | Message | Proof needed |
|--------|---------|-------------|
| 1. Looks like you | "Our golfer is one of us": a Black woman golfer, stitched mid-swing | The embroidery itself (G-17) |
| 2. Good company | Golf is better with friends; the hats are made for the group | Group lifestyle photos, the "Bring your golf buddy" bundle |
| 3. Made to fit her | [Fit range, crown depth, ponytail opening, sweatband] | Spec sheet (I-2), fit-panel reviews (I-7) |
| 4. No risk | Free shipping, free fit exchanges, 30-day returns | Policies (I-4) |

### 3.3 Voice

| Do | Don't |
|----|-------|
| Warm, a little cheeky, self-aware: "Bogeys happen. Bad hat days don't." | Golf snobbery or jargon-heavy copy |
| Speak to her like a friend in the cart | "Ladies" or "girls" as product labels; pink-only framing |
| Short sentences; one idea per line | Clever headlines that don't say what it is |
| Real numbers only | Fake urgency, fake counts, fake reviews |
| Use her phrases: "fits my smaller head", "matches my outfit", "lunch after the round" | Body-shaming, "flattering" talk, beauty-standard language |

**Words to use:** good company, first tee, 19th hole, lunch after, the group, our golfer, stitched, made for us, bring your golf buddy.
**Words to avoid:** ladies' line, petite (in copy; it's fine as a size name), flattering, cute (in headlines), "slay".

### 3.4 Product naming

The pattern is "The [Color] [Style]". Name colors after golf and clubhouse things.

| Style | Name pattern | Examples |
|-------|-------------|----------|
| Rope cap | The [Color] Rope Cap | The Cream Rope Cap (confirmed), The Pine Rope Cap (proposed) |
| Performance cap | The [Color] Front Nine | The Fairway Front Nine (proposed) |
| Visor | The [Color] Visor | The Clubhouse Visor (proposed) |
| Bundle | Named for who it's for | The Golf Buddy Pair (2), The Foursome Starter (3) |

---

## 4. Design system

Keep the current brand: it's the strongest part of the site. These tokens come from the live stylesheet (`/brand/storefront.css`), cleaned up into one system.

### 4.1 Color tokens

| Token | Hex | Use | Contrast rule |
|-------|-----|-----|---------------|
| `--pine-900` (brand green) | #082D22 | Headlines, primary buttons, footer background, icons | 14:1 on paper; use freely |
| `--pine-700` | #19382D | Secondary text, borders on dark | High contrast on paper |
| `--pine-500` | #355547 | Muted headings, accordion labels | Check 4.5:1 for body text |
| `--paper` | #FAEFDF | Page background | — |
| `--paper-2` | #F6EEDF | Header and card background | — |
| `--cream` | #F4F0E1 | Raised cards, inputs | — |
| `--cream-ink` | #FFF9DB | Text on pine backgrounds | High contrast on pine |
| `--gold` | #A67843 | Stitch borders, badges, button shadow, large accents | **About 3.4:1 on paper:** large text (24 px+) and decoration only, never body text |
| `--gold-light` | #F1DFB5 | Badge fills, highlights | Decoration only |
| `--ink` | #262B21 | Body text | High contrast on paper |
| `--line` | #D9D0B9 | Dividers, input borders | Decoration only |
| `--burgundy` | #620719 | **Errors and sale/limited badges only.** Remove it from the wordmark; inner pages use it today and break consistency | High contrast on paper |

### 4.2 Typography

| Role | Font | Desktop | Mobile | Notes |
|------|------|---------|--------|-------|
| Display H1 | Bogey Baby Stitch (custom serif; fallback Georgia) | 72/76 px | 44/48 px | Live text, never an image. Ship as woff2, preload, `font-display: swap` |
| H2 section | Bogey Baby Stitch | 56/60 | 36/40 | One per section |
| H3 | Bogey Baby Stitch | 28/34 | 22/28 | Card and reason titles |
| Eyebrow | DM Sans 700, uppercase, tracking 0.08em | 14 | 13 | Above H1/H2 |
| Body L | DM Sans 400 | 20/32 | 18/28 | Hero subheadline, intros |
| Body | DM Sans 400 | 17/27 | 16/25 | Paragraphs of 3 lines max |
| Small | DM Sans 400/700 | 14/20 | 14/20 | Trust lines, fine print |
| Button | Bogey Baby Stitch for the primary button; DM Sans 700 uppercase for the secondary | 18 | 17 | Matches the live site |
| Price | DM Sans 700 | 24 | 22 | Tabular numbers |

Remove Archivo Black: the stylesheet declares it, but nothing uses it.

### 4.3 Spacing, grid and breakpoints

- **Spacing scale:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px. Space with gaps between containers, never empty spacer elements.
- **Container:** 1300 px max content width. Side padding 5% on mobile, 4% on tablet, auto-centered on desktop.
- **Full-width backgrounds** sit on an outer container, and the content sits in an inner 1300 px container with overflow hidden.
- **Grid:** 12 columns on desktop (24 px gutter), 8 on tablet (20 px) and 4 on mobile (16 px).
- **Section vertical padding:** 96 px desktop, 64 px tablet, 48 px mobile.
- **Breakpoints:** mobile 320–767, tablet 768–1023, desktop 1024–1439, wide 1440+. Design at 390, 820, 1280 and 1440 widths.

### 4.4 Shape, texture and motion

- **Corner radius:** 14 px on cards, image frames, the footer top and modals (matches the footer); 10 px on buttons; full pill on chips and badges.
- **Stitch motif:** the brand's signature. A 2 px dashed inset border on buttons and badges, like embroidery stitching. Primary buttons also get a 4 px solid gold "thread" shadow under them. Keep it on buttons, badges, dividers and the price tag only, not on every card.
- **Shadows:** none except the button thread shadow and the cart drawer. The look is flat and paper-like.
- **Motion:** 150–200 ms ease-out on hovers. The cart drawer slides in over 250 ms. Never animate the hero headline on load. Honor `prefers-reduced-motion`.

### 4.5 Imagery rules (applies to every G-code)

- **Real women golfers,** varied in age (25–60), skin tone, body type, hair type and skill. Center Black women golfers, in line with the brand promise.
- **Real courses, carts, ranges and clubhouses.** Natural daylight, golden hour preferred. Warm grade that matches the paper and pine palette; avoid cold blues.
- **Wardrobe:** pine, cream, gold and white; knit vests, polos, skorts, cable sweaters tied at the shoulders, like the brand's illustrated golfer.
- **Show the hat on a head** in every lifestyle image. Product shots sit on paper (#FAEFDF) or pine fabric.
- **No stock photos and no AI-generated people.** AI-generated faces fail the "real" test, can cross a platform's ad rules, and undercut the brand's representation promise.
- **Export:** AVIF and WebP with a JPEG fallback, sRGB, sized to the display (see each G-code), with descriptive file names (`cream-rope-cap-front-paper-1600.avif`).

### 4.6 Accessibility baseline (WCAG 2.2 AA)

- Text contrast at least 4.5:1, and 3:1 for large text and UI parts. Gold is never used for body text.
- Every action is reachable by keyboard, with a visible focus ring: 2 px pine outline with a 2 px offset.
- Tap targets at least 44 × 44 px. Labels sit on every form field, not just placeholders.
- Every meaningful image has alt text (given per G-code). Decorative images use `alt=""`.
- Video has no sound, a pause control and captions if any speech is added.

---

## 5. Site map, funnel and navigation

### 5.1 Site map

| ID | Page | URL | Job | Traffic | Funnel stage |
|----|------|-----|-----|---------|-------------|
| P-01 | Homepage | `/` | Say who we are, send people to the best sellers | Branded search, organic, direct, email, retargeting | Warm / hot |
| P-02 | Pre-launch states (homepage, product and collection) | Same URLs while in "drop mode" | Collect the waitlist | Everything before launch | All |
| P-03 | Listicle: 5 Reasons | `/pages/5-reasons` | Warm up cold ad traffic | Cold Meta and TikTok ads | Cold (top of funnel) |
| P-04 | Offer page: Bring Your Golf Buddy | `/pages/golf-buddy` | Sell the bundle | Retargeting, email, SMS | Warm (middle of funnel) |
| P-05 | Product page template | `/products/[handle]` | Close the sale | From P-01, P-03, P-04, P-06, search | Hot (bottom of funnel) |
| P-06 | Collections | `/collections/all`, `/collections/caps`, `/collections/visors` | Browse | Returning visitors, nav | Hot |
| P-07 | Cart drawer and cart page | Drawer on every page, plus `/cart` | Raise order value, cut friction | — | Hot |
| P-08 | Checkout | Medusa + Stripe | Pay | — | Hot |
| P-09 | Order confirmation | `/order/confirmed/[id]` | Thank her, add a one-click extra, start referrals | — | Customer |
| P-10 | Our Story | `/pages/about-us` | Authority and belonging | Nav, footer, P-01 | Warm |
| P-11 | Fit Guide | `/pages/fit-guide` | Remove sizing fear | P-05, FAQ | Hot |
| P-12 | FAQ | `/pages/faq` | Clear objections | Footer, P-05 | Hot |
| P-13 | Reviews | `/pages/reviews` | Social proof hub | Nav, P-05 | Warm |
| P-14 | Shipping and Returns | `/pages/shipping-returns` | Risk reversal in detail | Footer, buy box | Hot |
| P-15 | Contact | `/pages/contact` | Support | Footer | — |
| P-16 | Account (sign-in, orders, exchanges) | `/account` | Self-serve | Header | Customer |
| P-17 | Search | `/search` | Find | Header | — |
| P-18 | 404 | Any missing URL | Recover | — | — |
| P-19 | Legal pages: Privacy, Terms, Accessibility, Your Privacy Choices | `/pages/privacy` etc. | Compliance | Footer | — |
| P-20 | Find Your Fit quiz (phase 2) | `/pages/find-your-fit` | Personal recommendation | Cold social, P-01 | Cold / warm |
| P-21 | Journal (phase 2) | `/journal/[slug]` | SEO content: "What to wear golfing as a beginner" | Organic | Cold |
| P-22 | Gift card (phase 2) | `/products/gift-card` | Gifting | Holidays | Hot |

### 5.2 Funnel: traffic routing

```
COLD  Meta / TikTok ad (UGC try-on: "pro-shop hat vs Bogey Baby")
        └─> P-03 Listicle "5 Reasons" ──> P-05 Product page ──> P-07 Cart ──> P-08 Checkout ──> P-09 Thanks
                                       └─(left without buying)─> retargeting ad
WARM  Retargeting ad ("Bring your golf buddy: 2 for $60")
        └─> P-04 Offer page ──> P-05 / Cart
HOT   Branded search, email, SMS, direct
        └─> P-01 Homepage ──> P-05 / P-06
PRE-LAUNCH  Every ad and link
        └─> P-02 drop-mode pages ──> Waitlist (E-01) ──> drop-day emails and texts (E-02)
```

**Rule:** keep a single ad-to-URL sheet listing each live ad, its URL, its headline and the page's H1. Before any ad goes live, the page's H1 or subheadline must repeat the ad's promise.

### 5.3 Navigation

**Desktop header (left to right):**
- G-01 wordmark (links home)
- Shop: a dropdown with a mini mega-menu (C-04)
- The Golf Buddy Pair
- G-02 badge, centered
- Fit Guide
- Our Story
- Search icon, Account icon, Bag icon with count

**Mobile header:**
- Menu icon (left), G-01 wordmark, Bag icon with count (right).
- Height 64 px. Every icon's tap area is 44 × 44 px.
- The search field sits at the top of the menu drawer.

**Mobile menu drawer, top to bottom:**
1. Search field
2. Shop all
3. Caps
4. Visors
5. The Golf Buddy Pair
6. Fit Guide
7. Reviews
8. Our Story
9. Account
10. A mini product card for the best seller
11. Trust line

**Footer columns:**
- Brand: G-02 badge, G-01 wordmark, "Golf hats for every round.", the email signup (C-16) and social icons.
- Shop: All hats, Caps, Visors, Golf Buddy Pair, Gift card.
- Help: Fit Guide, FAQ, Shipping & Returns, Start an exchange, Contact.
- About: Our Story, Reviews, Journal.
- Bottom bar: © 2026 Bogey Baby · Privacy · Terms · Accessibility · Your Privacy Choices · payment icons.

**The same header and footer appear on every route,** including 404, search and account. This fixes the audit's inconsistency finding.

---

## 6. Global components

Build these once and reuse them on every page. Each lists its content, states and rules. Graphics refer to Section 8.

| ID | Component | Spec |
|----|-----------|------|
| C-01 | **Announcement bar** | 36 px tall; pine background, cream-ink text, DM Sans 14 700. Rotates up to 3 messages every 5 s, with a pause on hover or focus. Launch messages: "Free US shipping on every hat" · "Free fit exchanges within 30 days" · "Bring your golf buddy: 2 for $[60]". Pre-launch: "The first drop lands [date]. Join the list →". Fully clickable. Dismissing it hides it for the session. |
| C-02 | **Header** | See 5.3. Sticky on scroll-up, hidden on scroll-down (mobile). Background `--paper-2`, 1 px `--line` bottom border. The bag count updates live when an item is added. |
| C-03 | **Mobile menu drawer** | Slides in from the left at 86% width; dark overlay; focus trapped inside; closes with Esc. Contents listed in 5.3. |
| C-04 | **Shop mega-menu (desktop)** | Three columns: (1) category links; (2) "Best seller" product card (G-12 front image, name, price, stars); (3) G-24 promo tile, "Bring your golf buddy: 2 for $[60]". Opens on hover with a 150 ms delay or on click; arrow keys move through it. |
| C-05 | **Primary button: stitch** | `--pine-900` fill, cream-ink text, Bogey Baby Stitch 18 px, 2 px dashed inset border in `--gold-light` 4 px in from the edge, 4 px solid `--gold` shadow below, 10 px radius. At least 52 px tall, full width on mobile. States: hover (shadow to 2 px, moves down 2 px), focus (pine outline), loading (spinner, "Adding…"), disabled (55% opacity, `aria-disabled`). Copy always starts with a verb. |
| C-06 | **Secondary button** | Paper fill, pine text, DM Sans 700 uppercase 15 px, dashed pine border. At least 48 px tall. |
| C-07 | **Text link** | Pine, underlined 1 px with a 3 px offset; gold underline on hover. |
| C-08 | **Trust line** | One line of 3 items with icons (G-30 truck, G-31 exchange, G-32 calendar): "Free shipping · Free fit exchanges · 30-day returns". DM Sans 14 700 with pine icons at 18 px. Appears under every primary CTA, under the price and in the cart. |
| C-09 | **Star rating** | 5 stars (G-37), the score to one decimal and the count ("4.9 · 24 reviews"). Tapping it scrolls to the reviews. **Shown only once there are 10+ real reviews;** before that, nothing is shown, never a zero. |
| C-10 | **Product card** | 4:5 image (G-12 front), a hover or second-tap image (G-13 on-head), name (H3, 20 px), price, star rating (C-09) and a color dot row (up to 5). Optional badge: "Best seller", "New" or "Low stock: [N] left" (real stock only). A quick-add button on desktop hover; on mobile, tapping the card opens the product page. Image area fixed at 4:5 so nothing shifts while loading. |
| C-11 | **Badge / chip** | Pill shape, gold-light fill, pine text, 12 px uppercase 700, dashed inset. Variants: Best seller · Most popular · Best value · New · Limited (burgundy) · Sold out (ink at 40%). |
| C-12 | **Accordion** | A row with a + / − icon at least 56 px tall; DM Sans 700 18 px title; body 16 px; one row opens at a time on the product page; built on `<details>` with ARIA. |
| C-13 | **Bundle picker** (product page and offer page) | Three stacked tiles, single-select (radio inside, the whole tile tappable). Tile 1: "1 hat · $[36]". Tile 2: "2 hats: The Golf Buddy Pair · $[60] · Save $[12]" with a "Most popular" badge, selected by default on P-04. Tile 3: "3 hats: The Foursome Starter · $[81] · Save $[27]" with a "Best value" badge. Each tile shows a per-hat price ("$[30] each") and a G-23 thumbnail. Choosing tile 2 or 3 reveals one color + fit selector per hat. |
| C-14 | **Variant selectors** | Color: round swatches (G-14 crops), 44 px, with the color name shown ("Color: Cream"). Fit: segmented buttons, e.g. "Petite Fit [20.5–22"]" / "Classic Fit [22–23.5"]", plus a "Which fit am I?" link that opens C-15. Sold-out options are crossed out and still selectable for back-in-stock alerts. |
| C-15 | **Fit-guide drawer** | Bottom sheet on mobile, side drawer on desktop: the G-21 measuring diagram, the fit table and the line "Between sizes? Pick the larger fit. Exchanges are free." |
| C-16 | **Email/SMS capture** | Inline form: email field, an optional phone field (shown after the email is entered), and a submit button. Consent text under the phone field: "By entering your number you agree to receive recurring marketing texts from Bogey Baby. Consent isn't a condition of purchase. Msg & data rates may apply. Reply STOP to cancel." Success state: "You're on the list. Check your inbox." Variants: inline (pre-launch hero), footer, and exit-intent popup (C-17). |
| C-17 | **Popup** (exit intent on desktop; after 45 s or 50% scroll on mobile) | Max once per 7 days, never on P-05 before add-to-cart. Offer: early access to new colors, not a discount (Section 9.4). G-42 image on the left (desktop only). Closes on Esc or overlay tap; close button 44 px. |
| C-18 | **Cart drawer** | Slides in from the right on add-to-cart. Shows a free-shipping confirmation ("Free shipping included ✓"), the line items (G-12 thumbnail, name, color/fit, quantity stepper, price, remove link) and a bundle nudge: if 1 hat, "Add a second hat for your golf buddy and save $[12]" with a one-tap add of the best seller. Then subtotal, savings shown in pine, the C-08 trust line, a "Checkout" C-05 button, and Apple Pay / Google Pay express buttons. Empty state: G-28. |
| C-19 | **Sticky add-to-cart bar** (product page, mobile) | Appears once the main add-to-cart button scrolls off screen. Shows a thumbnail, the name, the selected price and an "Add to bag" button. 64 px plus safe-area padding. Hidden when the cart drawer is open. |
| C-20 | **Review card** | Stars, a title, 2–3 line body ("Read more" expands it), reviewer first name and last initial, a "Verified buyer" tag and **fit tags** (Head: Small · Hair: Thick curls · Handicap: 28). Optional photo thumbnail (G-20). |
| C-21 | **UGC clip strip** | A horizontal scroll of 9:16 clips (G-19), 160 px wide on mobile. Tapping one opens it full-screen and muted with captions. Each clip lazy-loads its poster image, and the video file loads only when tapped. |
| C-22 | **Icon + text feature row** | 3–5 items, each a G-3x icon (40 px), an H3 and one line. Stacks in 2 columns on mobile. |
| C-23 | **Breadcrumbs** | On product and collection pages: Home / Caps / The Cream Rope Cap. Also output as BreadcrumbList structured data. |
| C-24 | **Toast** | Bottom center, 4 s: "Added to bag" with a "View bag" link. Announced to screen readers through `aria-live`. |

---

## 7. Page specs

Each page lists its job, the traffic it serves, its section order with full copy, the components (C-xx) and graphics (G-xx) it uses, mobile notes, SEO fields, tracking events and the rubric target it must meet.

### P-01 Homepage (launch state)

- **Job:** tell her who we are in 3 seconds, then send her to the best sellers.
- **Traffic:** branded search, organic, email/SMS, direct, retargeting. **Never cold ads.**
- **Stage and length:** warm to hot traffic, 7 sections plus header and footer.
- **Beliefs built:** 1 (hero, founder), 2 (why it's better), 3 (feature row), 4 (reviews), 5 (trust lines, bundle).

**1. Hero** · Graphics: G-10 (mobile and desktop), G-11 (desktop video) · Components: C-05, C-06, C-08, C-09

- **Eyebrow:** GOOD COMPANY. BETTER HATS.
- **H1:** Golf hats that look like you.
- **Subheadline:** Embroidered caps made for women golfers and the friends who play with them. [Built to fit smaller heads.] Good for 18 holes and lunch after.
- **Primary CTA (C-05):** Shop the Cream Rope Cap · $[36] → links to `/products/cream-rope-cap`.
- **Secondary CTA (C-06):** Shop all hats → `/collections/all`. Only shown once 2+ hats are on sale.
- **Under the CTAs:** the C-09 stars (only with 10+ reviews), then the C-08 trust line.
- **Desktop layout:** text on the left 6 columns, vertically centered, on a pine gradient. G-10 fills the right 7 columns, and the two areas overlap by one column. G-11 video plays muted and looped over G-10 only on screens ≥ 1024 px with Save-Data off. Hero height `min(86vh, 820px)`.
- **Mobile layout:**
  - G-10 mobile crop (4:5) fills the top, with a pine gradient from 0% to 75% over its bottom 55% so the text has contrast.
  - H1 at 44 px, 2–3 lines. Subheadline 18 px.
  - Primary CTA full width; secondary CTA hidden on mobile.
  - All four elements sit within the first 664 px, with the CTA's bottom edge above 640 px.
  - No video on mobile.

**2. Best sellers** · Graphics: G-12, G-13 · Components: C-10

- **Eyebrow:** BEST SELLERS
- **H2:** The first drop
- **With 3 or more products:**
  - Product cards in a 1×4 grid on desktop, 2×2 on mobile.
  - Grids, not carousels; the course found carousels perform worse.
  - Below the grid: C-07 link "Shop all hats →".
- **With 1–2 products:** use a "feature card" instead.
  - Left: G-12 on paper.
  - Right: H3 product name, price, 3 bullets with icons, a C-14 color selector and a C-05 "Add to bag · $[36]" button.
  - Below: C-07 link "See all the details →" to the product page.

**3. Social proof** · Graphics: G-19, G-20 · Components: C-09, C-20, C-21

- **H2:** Good company, already.
- **Summary line:** ★ [4.9] average from [24] golfers.
- **3 review cards (C-20).** Choose reviews that cover 3 different situations: one small head, one long or thick hair, one beginner.
- **C-21 strip** of 3–6 try-on clips.
- **Link:** Read all [24] reviews → `/pages/reviews`.
- **Before 10 reviews exist:** hide the section, and show the fit-panel line from P-02 instead.

**4. Why it's better** (beliefs 2 and 3) · Graphics: G-16, G-33 to G-36 · Components: C-22

- **Eyebrow:** WHY BOGEY BABY
- **H2:** Not shrunk. Not pinked. Drawn for us.
- **Intro (the problem):** Most golf hats are men's hats in smaller boxes, plus one pink one. We started over, with a golfer who looks like us and a fit made for us.
- **Feature row (C-22).** Only include items that are TRUE in Appendix A.
  1. G-33 **Fits a smaller head**: "[Adjusts from 20.5 to 23.5 inches], so the brim sits where it should."
  2. G-34 **Room for your ponytail**: "[A back opening for ponytails and low buns.]"
  3. G-35 **Cool for all 18**: "[Breathable cotton twill and a sweat-wicking band.]"
  4. G-36 **Our golfer, stitched mid-swing**: "Embroidered, not printed, so she lasts."
- **Visual:** G-16 side-by-side fit comparison, full width under the row on mobile, to the right on desktop.
- **CTA (C-05):** Find your hat → `/collections/all`.

**5. Bundle promo** (offer) · Graphics: G-23 (2-hat composition) · Components: C-05, C-08, C-11

- **Badge:** MOST POPULAR
- **H2:** Bring your golf buddy.
- **Body:** Two hats for $[60]. One for you, one for whoever makes you book the next tee time. Save $[12], and both ship free.
- **CTA:** Get the Golf Buddy Pair → `/pages/golf-buddy`. Track this as a promotion click.
- **Under the CTA:** the C-08 trust line.
- **Layout:** pine background with cream-ink text. G-23 on the left on desktop, on top on mobile.

**6. Shop by style** · Graphics: G-24 · Components: tiles

Show this only once there are 2+ categories.

- **Tiles (2–4):** Caps · Visors · The Golf Buddy Pair · Gift card (phase 2).
- **Each tile:** G-24 image, an H3 label and an arrow. 2 columns on mobile.

**7. Founder story** (authority) · Graphics: G-18 · Components: C-07

- **Eyebrow:** OUR STORY
- **H2:** Made for the people we want to see more of on the course.
- **Body:** We center women and Black golfers, from the first bucket at the range to the last tee time of the day. [Founder name] started Bogey Baby after [one true sentence about why]. [One true sentence about the golfer in the logo.]
- **Link:** Read our story → `/pages/about-us`.
- **Layout:** G-18 portrait (4:5) beside the text on desktop, above it on mobile.

**8. Final CTA** · Components: C-05, C-08, C-12

- **H2:** Good rounds start here.
- **Body:** Early tee times, long lunches, and the friends who make you book the next round before you've finished this one.
- **CTA:** Join the good company → `/collections/all`.
- **Under the CTA:** the C-08 trust line.
- **Mini FAQ (C-12, 3 rows):**
  - *Will it fit my head?* → "[Our caps adjust from 20.5 to 23.5 inches.] Not sure? Exchanges are free. See the Fit Guide."
  - *How fast does it ship?* → "[Ships in 1–2 business days.] Free US shipping on every order."
  - *What if I don't love it?* → "Return it within 30 days, or swap the fit for free."

**SEO**

- Title: `Bogey Baby | Golf Hats Made for Women Golfers`
- Meta description: `Embroidered golf hats made for women golfers and the friends who play with them. Free US shipping and free fit exchanges.`
- H1 as above. Organization and WebSite structured data.

**Tracking events:** `page_view`, `view_item_list` (best sellers), `select_item`, `view_promotion` and `select_promotion` (bundle promo), `generate_lead` (footer signup).

**Rubric target:** 5 on every criterion. Criterion 1 is met because traffic is warm and hot only, and retargeting ads repeat the hero promise.

---

### P-02 Pre-launch states (drop mode)

**Job:** turn every pre-launch visit into a waitlist signup. This replaces today's "Coming soon" and the empty collection page. A single `DROP_MODE=true` setting switches these states on across the site.

| Page | Changes in drop mode |
|------|---------------------|
| Homepage hero | **Primary CTA:** "Get first-drop access →", which scrolls to the waitlist block. **Trust line:** "First drop [date] · $[36] · Free fit exchanges". **Stars:** hidden. |
| Homepage block 2 (best sellers) | Each product card shows a "Drops [date]" badge (C-11) and a "Notify me" button that opens C-16 with that product attached. |
| Homepage block 3 (social proof) | Fit-panel teaser: H2 "Tested by women who actually play." Body: "[20] women golfers are wearing the first drop right now. Their reviews land here on launch day." Only show this while the panel is really running. |
| Waitlist block (new, under the hero) | H2: "The first drop lands [date]." Body: "Join the list for 24 hours of early access and first pick of the first run ([N] caps per color)." C-16 form, button "Save my spot". Small print: "One email when it drops. No spam." Optional live count, shown only once the real number is 100+: "[N] golfers on the list". Optional countdown to the real drop time, which never resets. |
| Product page | The buy box shows the price and "Drops [date]", with C-16 (email, optional phone) and the button "Notify me when it drops". All content below the buy box stays. |
| `/collections/all` | The grid shows upcoming hats with "Drops [date]" badges and a waitlist block on top. The text "There are no hats available yet" is removed. |
| Announcement bar | "The first drop lands [date]. Join the list →" |
| Cart | Hidden, so the bag icon doesn't open an empty drawer. |

**Tracking events:** `generate_lead` with `{source: 'hero' | 'product' | 'popup' | 'footer', product_handle}`. This is the main metric before launch.

---

### P-03 Listicle: "5 Reasons" (cold ad landing page)

- **Job:** warm up cold Meta and TikTok traffic, then hand off to the product page.
- **Traffic:** cold ads only. The ads are UGC try-ons in a "pro-shop hat vs Bogey Baby" format.
- **Stage and length:** top of funnel; 5 reasons plus proof, offer, FAQ and close.
- **Format:** an editorial article.
- **Header:** minimal. G-01 wordmark and the bag only, no nav, so nothing pulls her away.
- **Footer:** minimal, with legal links only.

**Hero (the hook)** · Graphics: G-40 · Components: C-05, C-08

- **Byline:** By Bogey Baby · [4] min read · Updated [date]
- **H1 (test A, the control):** Finally, Golf Hats Made for Women: Not Shrunk and Pinked
- **H1 (test B):** The Golf Hat That Works Around Your Ponytail, Not the Other Way Around. Only run this if the ponytail opening is true.
- **Subheadline:** 5 reasons women golfers are switching to Bogey Baby: a fit made for us, room for your hair, and a golfer who finally looks like you.
- **Image:** G-40, the first-tee group shot (16:9 on desktop, 4:5 on mobile).
- **CTA:** See the hats → links to `/products/cream-rope-cap?src=listicle`. Below it, the trust line.

**Intro (the problem)** · Graphics: G-15

Walk into most pro shops and the women's section is a shelf of men's caps in smaller boxes, plus one pink one. They slide over your sunglasses, squash your bun, and end up in your bag by the 4th hole. You've been making do with hats that were never drawn for you.

G-15: the comedic "too-big cap" photo.

**Reason 1: It's drawn for a woman's head, not shrunk from a man's** · Graphics: G-16

[Our caps have a shallower crown and adjust from 20.5 to 23.5 inches, so they sit right on smaller heads.] No youth sizes. No brim on your sunglasses.

**Reason 2: Your ponytail gets its own door** · Graphics: G-41 (loop)

**Only include this reason if it's true.** Otherwise, swap in the "Colors that match your outfit" reason from the brief.

[A back opening fits ponytails, low buns and braids.] Wear your hair how you want; the hat works around it.

**Reason 3: It stays cool for all 18** · Graphics: G-35 icon, G-13f detail

[Breathable cotton twill and a sweat-wicking band] keep the hat on your head instead of in your bag.

- **Inline CTA (C-06):** See the Cream Rope Cap →

**Reason 4: Our golfer looks like you** · Graphics: G-17 (embroidery macro)

The golfer on every Bogey Baby hat is one of us: mid-swing, sunglasses on, sweater tied at the shoulders. She's stitched, not printed, so she'll be there long after the scorecard's forgotten.

**Reason 5: You'll look like you belong, whatever you shoot** · Graphics: G-14 (19th-hole group)

We called it Bogey Baby because nobody plays pretty every hole. You can still look put-together from the first tee to the 19th-hole photo.

- **Pull quote:** a real customer quote from G-20 or C-20, e.g. "[I finally don't feel like the beginner in the group.]" ([Name], [handicap]).

**Social proof** · Components: C-09, C-20 ×3, C-21

- **H2:** Tested by women who actually play.

**Offer** · Graphics: G-23 · Components: C-13 (compact, 3 tiles), C-08

- **H2:** Pick your hats
- **Tiles:** 1 hat $[36] · 2 for $[60] ("Most popular") · 3 for $[81] ("Best value")
- **Beside the price:** "Free shipping · Free fit exchange within 30 days · 30-day returns"
- **CTA:** Choose my hats →. This links to the product page with the chosen tier preselected (`?bundle=2`).

**FAQ** (C-12, 4 rows)

- *Will it fit my small head?* [Answer from the spec.]
- *Does it work with a ponytail?* [Answer from the spec.]
- *How do I wash it?* [Care answer.]
- *What if the size is wrong?* "Exchanges are free within 30 days."

**Final CTA**

- **H2:** Bogeys happen. Bad hat days don't.
- **CTA:** Shop Bogey Baby →
- **Under it:** the C-08 icons.

**Sticky bar (mobile)** · C-19 variant: "Golf hats made for us · See the hats →". It appears after Reason 1.

**SEO:** `noindex`, since this is an ad-only page.
**Tracking events:** `page_view` with UTMs, scroll depth at 25/50/75/100%, `select_promotion` on the CTAs. Split tests are assigned in middleware (Section 10.6).
**Rubric target:** 5 on every criterion. The H1 must repeat the ad's promise word for word (keep a record in the ad-to-URL sheet).

---

### P-04 Offer page: "Bring Your Golf Buddy"

- **Job:** convert warm visitors with the bundle.
- **Traffic:** retargeting ads (people who saw the listicle or a product page), email and SMS.
- **Stage and length:** middle of funnel, 5–6 sections.
- **Layout:** one offer and no distractions. Minimal header.

**Hero** · Graphics: G-25 · Components: C-13 (tile 2 preselected), C-05, C-08, C-11

- **Eyebrow:** THE GOLF BUDDY PAIR
- **H1:** Two hats. One for you, one for your golf buddy.
- **Subheadline:** 2 Bogey Baby hats for $[60]. Save $[12], ship free, and swap either fit for free.
- **Image:** G-25, two friends in matching hats.
- **Buy box:** C-13 bundle picker inline (2 hats selected), with a color and fit selector for each hat.
- **CTA:** Claim the Golf Buddy Pair · $[60] →
- **Urgency (real stock only):** "First run: [N] Cream left". This reads live from inventory and is hidden above 50.

**Problem, short (Pain → Agitate)**

Golf's better with your people. But someone always shows up in a baggy pro-shop cap, and nobody's hat matches the group photo.

**Value stack** · Components: C-22

- 2 embroidered Bogey Baby hats, any colors and fits: ~~$[72]~~ **$[60]**
- Free US shipping on both
- A free fit exchange on either hat
- 30-day returns
- Optional, only if real: a ball-marker hat clip with 2+ hats (G-39)

**Proof and mechanism** · Components: C-20 ×2 (choose reviews that mention friends or groups), C-22 ×3 (fit, embroidery, comfort)

- **H2:** Why golfers buy two

**Guarantee** · Graphics: G-38 badge

- **H2:** The 30-day fit promise
- **Body:** If either hat doesn't fit, swap it free. Don't love it? Send it back within 30 days. No restocking fee.

**Final CTA**

- The C-13 picker repeats.
- **CTA:** Claim the Golf Buddy Pair →
- Under it: the C-08 trust line and 2 short reviews.

**FAQ** (C-12)

- *Can we pick different colors and fits?* Yes.
- *Can I ship one to my friend?* "[Both hats ship to one address.]"
- *Is it giftable?* "[Gift note at checkout, if supported.]"

**SEO:** `noindex`, since this is an ad and email page.
**Tracking events:** `view_promotion`, `select_promotion`, `add_to_cart` with `bundle_size: 2 | 3`.
**Rubric target:** 5 on every criterion.

---

### P-05 Product page template (example: The Cream Rope Cap)

- **Job:** close the sale.
- **Traffic:** from P-01, P-03, P-04, P-06 and search.
- **Stage:** bottom of funnel.
- **Layout:** follows the course's product-page structure: announcement and nav, then images on the left with the buy box on the right, then supporting sections.

**Top fold, desktop:** C-23 breadcrumbs. The gallery takes the left 7 columns and the buy box the right 5. The buy box sticks while the gallery scrolls.
**Top fold, mobile:** a swipe gallery at 4:5 with a "1 / 8" counter and dots. The buy box sits below it. The C-19 sticky bar takes over once the add-to-cart button scrolls away.

**Gallery: 8 slides** (G-13a to G-13h)

Each slide answers one of the course's carousel questions.

| Slide | Graphic | Question it answers |
|-------|---------|--------------------|
| 1 | G-13a: product on paper, front three-quarter | What is it? |
| 2 | G-13b: on-head lifestyle, front | What does it look like on someone like me? |
| 3 | G-13c: fit infographic | How does it fit me? |
| 4 | G-13d: back view (ponytail or strap) | Does it work with my hair? |
| 5 | G-13e: embroidery macro with callout | What's special about it? |
| 6 | G-13f: inside band and materials callouts | What's it made of? |
| 7 | G-13g: two friends, bundle badge | Why buy two? |
| 8 | G-13h: review quote card | What do others say? |

**Buy box, top to bottom**

1. **Rating:** C-09 stars, which scroll down to the reviews. Add "[N] sold" only if real and 100+.
2. **Review quote** (the course's buy-box tip): "Finally a golf hat that fits my small head." ([Name], verified buyer). Use a real quote only; until one exists, show the value tag in its place.
3. **Value tag** (C-11): MADE FOR WOMEN GOLFERS
4. **H1** (product name, kept small at 32 px): The Cream Rope Cap
5. **Price:** $[36]. Under it, the C-08 trust line.
6. **3 benefit bullets with icons**, true items only:
   - G-33: [Fits 20.5–23.5"; made for smaller heads]
   - G-34: [Room for ponytails and low buns]
   - G-36: Our golfer, embroidered mid-swing
7. **Bundle picker** (C-13): 1 / 2 / 3 hats. Tile 1 is selected by default here.
8. **Variant selectors** (C-14): Color (swatches) and Fit (Petite / Classic), plus a "Which fit am I?" link that opens C-15.
9. **Add to bag** (C-05): "Add to bag · $[36]". The label updates with the selected tier ("Add 2 to bag · $[60]").
10. **Express checkout:** Apple Pay and Google Pay through Stripe.
11. **Delivery estimate:** "Ships in [1–2] business days · Arrives [Mon, Dec 1–Thu, Dec 4]", calculated from the visitor's location.
12. **Info dropdowns** (C-12). This is the course's "dropdowns under add to cart" tip.
    - **Details and materials:** [crown, panels, rope, brim, closure, fabric, sweatband].
    - **Fit and sizing:** [range], the fit table, and a link to `/pages/fit-guide`.
    - **Care:** [hand wash cold, air dry, reshape the brim].
    - **Shipping and exchanges:** free US shipping, a free fit exchange within 30 days, 30-day returns, and a link to P-14.
    - **About our golfer:** "Our golfer is caught in her follow-through, in sunglasses and a green striped sweater. Her badge sets the colors for the brand: pine, cream and old gold."

**Below the fold, in order of her biggest concern**

1. **Find your fit** (G-21 diagram and fit table; C-15 content inline)
   - **H2:** Find your fit in 10 seconds.
   - **Body:** Measure around your head just above the ears. [Under 22": Petite Fit. 22–23.5": Classic Fit.] Between sizes? Go up. Exchanges are free.
2. **Reviews** (C-09 summary, a star histogram, C-20 list, C-21 strip)
   - **H2:** Good company, already.
   - **Filters:** Head size, Hair type, Handicap, With photos.
   - **Sort:** Most helpful, Newest.
   - **Button:** "Write a review", for verified buyers only.
3. **Comparison**, a two-column table: Bogey Baby vs a typical pro-shop cap.
   - **H2:** Not your pro-shop cap.

   | | Bogey Baby | Typical pro-shop cap |
   |---|---|---|
   | Fit range | [20.5–23.5"] | Usually one size |
   | Ponytail opening | [Yes] | Rarely |
   | Golfer that looks like you | Yes | — |
   | Free fit exchange | Yes | Varies |

   Only include rows that are true for Bogey Baby. Describe "typical" caps fairly, without naming brands.
4. **Guarantee strip** (G-38): "The 30-day fit promise. Swap the fit free, or return it within 30 days."
5. **Complete the set** (C-10 ×3)
   - **H2:** Bring your golf buddy.
   - Shows other colors, with a link to P-04.
6. **FAQ** (C-12, 5 rows): fit, ponytail, care, shipping time, exchanges.
7. **Final CTA:** the product's thumbnail, name and price, with "Add to bag".

**SEO**

- Title: `The Cream Rope Cap | Women's Golf Hat | Bogey Baby`
- Meta description: `A cream rope golf cap embroidered with our golfer mid-swing. Made for women golfers. [Fits 20.5–23.5".] Free shipping and free fit exchanges.`
- Structured data: Product (price, availability, and a rating only once 10+ real reviews exist) and BreadcrumbList.

**Tracking events:** `view_item`, `select_item` (variant), `add_to_cart` (with `variant_id`, `bundle_size`, `value`), `view_cart`.
**Rubric target:** 5 on every criterion. Test-order every tier before launch (Section 12.3).

---

### P-06 Collections (`/collections/all`, `/caps`, `/visors`)

- **Job:** let returning and warm visitors browse and pick.
- **Stage:** bottom of funnel. Short header, then the grid.

**Banner** (G-24 for that collection, 21:9 on desktop, 4:3 on mobile, with text over it)

- **H1:** Golf hats / Caps / Visors
- **Line:** "Embroidered, made for women golfers, and good for lunch after the round."
- **Under it:** the C-08 trust line.

**Toolbar**

- Product count ("[8] hats")
- Filters: Color, Fit, Style
- Sort: Best selling, Newest, Price low to high
- On mobile, filters open in a bottom sheet with a sticky "Show [N] hats" button.

**Grid:** C-10 cards, 4 columns on desktop, 3 on tablet, 2 on mobile.

**Promo tile:** after the 4th card, a G-24 bundle tile reading "Bring your golf buddy: 2 for $[60] →".

**Below the grid:** a short SEO paragraph (80–120 words) about golf hats for women, written for people, not keyword stuffing. Then the C-16 signup.

**Empty or drop mode:** see P-02. Never show "There are no hats available yet."

**SEO:** title `Women's Golf Hats | Bogey Baby`, plus a CollectionPage and ItemList structured data block.
**Tracking events:** `view_item_list`, `select_item`, filter use.

---

### P-07 Cart drawer and cart page

- **Drawer:** see C-18.
- **Cart page `/cart`:** the same content for visitors without JavaScript and for desktop users who prefer a full page.
  - **Line items:** a 96 px G-12 thumbnail, name, color/fit, quantity stepper and remove link.
  - **Bundle savings line:** "Golf Buddy Pair savings −$[12]".
  - **Shipping:** "Free".
  - **Total.**
  - **Note field (only if real):** "Gift note".
  - **Then:** the C-08 trust line, the Checkout button and the express wallets.
- **Bundle nudge:** with 1 hat in the bag, show "Add a second hat and save $[12]" with a mini card for the best seller in a different color and a one-tap add.
- **Pre-launch:** cart hidden (P-02).
- **Tracking events:** `view_cart`, `remove_from_cart`, `begin_checkout`.

---

### P-08 Checkout (Medusa + Stripe)

1. **Steps:** Contact → Delivery → Payment on one page. Guest checkout is the default; signing in is optional.
2. **Express:** Apple Pay, Google Pay and Link at the top through Stripe's Express Checkout Element. Shop Pay only works on Shopify, so it isn't available on this stack.
3. **Email first.** It's saved as soon as she types it, so abandoned-checkout emails (E-04) can fire.
4. **Delivery:** the address autofills. One shipping option: "Free US shipping, [3–5] business days". An optional paid express option only if real.
5. **Order summary (sticky on desktop, collapsible on mobile):**
   - Thumbnails, the bundle savings and a $0 shipping line.
   - The C-08 trust line.
   - The line: "Secure checkout · Free fit exchanges".
6. **Branding:** the G-01 wordmark top-left, paper background, pine buttons. No nav links.
7. **Marketing opt-in:** an unchecked box: "Email me new colors and drops."
8. **Tracking events:** `begin_checkout`, `add_shipping_info`, `add_payment_info`, `purchase`. The purchase event also goes server-side (Section 10.5).

---

### P-09 Order confirmation

- **H1:** You're in good company, [first name].
- **Body:** "Order #[1234] is confirmed. We'll email tracking when your hats ship ([1–2] business days)."
- **Graphic:** G-43, a group celebration photo.
- **Fit tip:** "When your hat arrives, adjust the strap before your first round. Wrong fit? Start a free exchange from your account."
- **One-click add (only with 1 hat):** "Add a second hat for $[24] before it ships." This is the post-purchase discount that makes up the $60 pair price. Charge it to the same card only if the payment provider supports it, and show the total clearly.
- **Referral (phase 2):** "Give your golf buddy $[10]; get $[10]."
- **Social:** "Tag @[handle] in your first-round photo." Show the handle only once it's confirmed (I-9).
- **Tracking events:** `purchase` (deduplicated), `view_promotion` (upsell).

---

### P-10 Our Story (`/pages/about-us`)

**Job:** authority and belonging (beliefs 1 and 5). It also feeds the founder block on the homepage.

1. **Hero**
   - G-18 founder portrait, with G-14 lifestyle shots as backup.
   - **H1:** Made for the people we want to see more of on the course.
   - **Line:** We center women and Black golfers, from the first bucket at the range to the last tee time of the day.
2. **Why we started:** [3–4 true sentences from the founder, in first person].
3. **Meet our golfer**
   - G-02 badge, large, plus G-17 macro.
   - **Body:** Our golfer is caught in her follow-through, in sunglasses and a green striped sweater. Her badge sets the colors for the brand: pine, cream and old gold.
4. **What we promise** (C-22, 3 items): Made for us · Built to fit · No-risk fit exchanges.
5. **Community:** a G-14 photo grid of real customers or the fit panel (with permission). **H2:** Good company.
6. **CTA:** Shop the first drop → plus the C-08 trust line.

- **SEO:** title `Our Story | Bogey Baby`.
- **Rubric:** the trust criterion (authority) is the main one this page carries.

---

### P-11 Fit Guide (`/pages/fit-guide`)

1. **H1:** Find your fit in 10 seconds.
2. **3-step diagram (G-21):**
   1. Wrap a soft tape measure just above your ears.
   2. Read the inches.
   3. Match your fit below.
   - No tape? Use a phone charger cable, then measure the cable against a ruler.
3. **Fit table (HTML, not an image):**

   | Fit | Head size | Best for |
   |-----|-----------|---------|
   | Petite Fit | [20.5–22"] | Smaller heads, slicked-back styles |
   | Classic Fit | [22–23.5"] | Most heads, thicker hair |

4. **Hair guide (G-22, illustrated):** ponytail, low bun, braids, curls: how each one wears the hat. Include only what's true for the hat.
5. **Line:** "Between sizes? Go up. Exchanges are free within 30 days."
6. **CTA:** Shop hats → plus a link to the FAQ.

**SEO:** title `Women's Golf Hat Fit Guide | Bogey Baby`, plus HowTo structured data.

---

### P-12 FAQ (`/pages/faq`)

- Grouped accordions (C-12), plus FAQPage structured data.
- **Groups:** Fit and hair · Materials and care · Shipping · Exchanges and returns · Orders · Bogey Baby.
- **Answers:** 1–3 sentences each, using the Appendix A claims.
- **Bottom line:** "Still stuck? Email [support@domain] and a real person will reply within [1 business day]."

---

### P-13 Reviews (`/pages/reviews`)

- **H1:** Good company, already.
- **Summary:** overall rating, total count and a star histogram.
- **Photo and video wall:** G-20 photos and the G-19 clips.
- **Reviews list:** with filters (Head size · Hair type · Handicap · Product).
- **CTA:** "Shop the hats they're wearing →".
- **Rule:** verified buyers and fit-panel reviews only. Label fit-panel reviews "Fit panel, received a free hat", as FTC rules require for gifted reviews.

---

### P-14 Shipping and Returns (`/pages/shipping-returns`)

- **H1:** Free shipping. Free fit exchanges. 30-day returns.
- **Three blocks (C-22 with G-30 to G-32):**
  - **Shipping:** [carrier, 1–2 days to dispatch, 3–5 days transit, US only at launch].
  - **Exchanges:** free within 30 days of delivery. Start one from your account or the order email; [we send a prepaid label or a QR code].
  - **Returns:** within 30 days, unworn with tags, no restocking fee; refunds within [5] business days of receipt.
- **Exceptions:** [personalized items, if any, are final sale].
- **CTA:** Start an exchange → `/account`, or a guest order lookup.

---

### P-15 Contact

- **H1:** Talk to a real person.
- **Form:** name, email, order number (optional), message.
- **Promise:** "Reply within [1 business day]."
- **Support email shown in full.**
- **Links:** FAQ, Fit Guide.

---

### P-16 Account (`/account`)

- **Sign-in:** email + password, or a passwordless magic link.
- **Order list:** status, a tracking link, and a **"Start a free exchange"** button on any eligible item. This uses Medusa's built-in exchange flow.
- **Saved addresses.**
- **Communication preferences.**
- **Uses the same header and footer as the rest of the site.**

---

### P-17 Search (`/search`)

- The search field is focused on load.
- Instant results as C-10 cards.
- **No results:** "No hats match '[term]'. Try 'cap', 'visor' or a color." Then the 4 best sellers.

---

### P-18 404

- **Graphic:** G-27 (the golfer searching the rough).
- **H1:** Lost ball.
- **Body:** "This page went out of bounds. Let's get you back on the fairway."
- **Buttons:** Shop hats · Go home.
- **Below:** a search field and the 4 best sellers.

---

### P-19 Legal pages

- **Pages:** Privacy Policy, Terms of Service, Accessibility Statement, and Your Privacy Choices (the opt-out of sale/sharing for CCPA-style state laws; the footer link already exists).
- **Content:** written or reviewed by counsel. Plain-language summary at the top of each.

---

### P-20 Find Your Fit quiz (phase 2, once there are 4+ hats)

- **Hero:** H1 "Find your hat in 30 seconds." Progress bar.
- **Questions (one per screen, with big tappable answer tiles and G-29 illustrations):**
  1. How do you usually wear your hair on the course? (Down · Ponytail · Low bun · Braids · Short)
  2. Do hats usually feel big on you? (Always · Sometimes · Never · Not sure)
  3. Where do you play most? (Hot and sunny · Mild · Early mornings)
  4. Which colors are in your golf closet? (Pine · Cream · White · Navy · A bit of everything)
  5. What's your game? (Just starting · League regular · Lowering my handicap)
- **Result:**
  - "Your hat: The [Color] [Style], in [Fit]".
  - A reason line built from her answers, e.g. "Petite Fit because hats run big on you; the ponytail opening for your low bun."
  - Then C-13 and C-05, and "Bring your golf buddy" as the second option.
- **Email gate:** none. Email is optional ("Email me my result").
- **Tracking events:** `quiz_start`, a `quiz_answer` event for each question, `quiz_complete`, `add_to_cart`.

---

### P-21 Journal (phase 2, SEO)

- **Purpose:** content for the women-golf searches the research surfaced. Each article ends with a product card.
- **First articles:**
  - "What to wear golfing as a beginner"
  - "Golf hats vs visors: which is right for you"
  - "How to wear your hair under a golf hat"
  - "What to wear for a golf girls' trip"
- **Template:** H1, byline, a hero image (G-44), the article, a product block and the C-16 signup.

### P-22 Gift card (phase 2)

- **Amounts:** $[36] / $[60] / $[100].
- **Delivery:** emailed to the recipient on a chosen date.
- **Graphic:** G-45, a gift card design.

---

## 8. Graphics library

Every graphic the site needs. **You make them**; each entry says exactly what it is.

- **"Desc"** is the description to brief your photographer, designer or illustrator.
- **"Sizes"** are the exported pixel sizes. Supply 2× sources where noted.
- **"Max"** is the size limit per exported file, in KB.
- **"Alt"** is the alt text for the image tag.

All photos follow the imagery rules in 4.5. All illustrations follow the badge's style: embroidered-patch look, flat color in pine, cream, old gold and white, a thin dark outline, and slight thread texture.

### 8.1 Brand assets

**G-01 Wordmark**
- **Desc:** "Bogey Baby" in the existing embroidered wordmark. Supply three versions: pine on light, cream-ink on pine, and a flat, texture-free SVG for small sizes and email.
- **Sizes:** SVG, plus PNG/WebP at 300 × 54 and 600 × 108.
- **Max:** 15 KB.
- **Alt:** "Bogey Baby".
- **Used:** header, footer, checkout, emails.

**G-02 Golfer badge**
- **Desc:** the existing round patch: the golfer mid-follow-through in sunglasses, white dress and green-striped sweater, a pine ring with gold edging, and "BOGEY BABY" around the top. Supply the full-detail version for large use and a simplified version for anything under 64 px (fewer stitches, thicker lines, no text ring).
- **Sizes:** 96, 144, 288 and 512 px squares, plus SVG for the simplified version.
- **Max:** 12 KB at 144 px. Today's file is 130 KB.
- **Alt:** "Bogey Baby golfer badge" (or empty when it sits next to the wordmark).
- **Used:** header center, footer, 404, About, favicon source.

**G-03 Favicon and app icons**
- **Desc:** the simplified badge on a pine circle.
- **Sizes:** 16, 32, 180 (Apple touch) and 192/512 (web manifest), plus an SVG favicon.
- **Max:** 5 KB each.

**G-04 Social share card**
- **Desc:** left half, the golfer badge on pine. Right half, cream text: "Golf hats that look like you." with "bogeybaby.com" beneath, all in the Stitch font. Make a second version per product with the product packshot on the right.
- **Size:** 1200 × 630.
- **Max:** 150 KB.
- **Alt:** "Bogey Baby: golf hats that look like you".

**G-05 Email header lockup**
- **Desc:** the wordmark centered on paper, with a 1 px gold stitch line under it.
- **Size:** 600 × 120 (1200 × 240 at 2×).
- **Max:** 40 KB.

**G-06 Stitch divider**
- **Desc:** a horizontal dashed "running stitch" line in gold, 2 px tall with 8 px dashes and 6 px gaps, and a slightly irregular thread texture. Used between sections on paper backgrounds.
- **Format:** SVG.
- **Max:** 2 KB.

### 8.2 Hero and lifestyle photography

**G-10 Homepage hero**
- **Desc:** golden hour on a tree-lined fairway. A Black woman golfer aged 30–40, long hair down or in a low ponytail, sunglasses lowered to look over them. She's mid-laugh, glancing off-camera toward her friends, wearing the Cream Rope Cap with the embroidery clearly visible and facing the camera. Wardrobe: cream sleeveless polo dress and a pine striped sweater tied at the shoulders, echoing the badge. A soft green background blurred at f/2.8. On desktop she sits on the right third, with negative space on the left for text. For mobile, the same scene shot vertically: the subject in the top 60%, darker grass in the bottom 40% for the text overlay.
- **Sizes:** desktop 2400 × 1350 (16:9), exported at 1600 and 2400 wide. Mobile 1080 × 1350 (4:5), exported at 800 and 1080 wide.
- **Max:** 110 KB at mobile 800w; 220 KB at desktop 1600w.
- **Alt:** "A golfer in a cream Bogey Baby rope cap laughs with friends on the fairway."
- **Used:** P-01.

**G-11 Homepage hero video (desktop only)**
- **Desc:** a 6–8 second seamless loop of the same scene: she adjusts her cap, lowers her sunglasses and smiles; a friend's arm enters frame with a high five. No cuts, no text, no sound. A poster frame (the first frame) is required.
- **Size:** 1920 × 1080, H.264 MP4 plus WebM.
- **Max:** 2.5 MB. Never loaded on mobile.

**G-14 Lifestyle library** (8 shots, all with the hats on heads)

| # | Desc | Ratio | Used on |
|---|------|-------|---------|
| a | The first tee: a group of 4 women in different Bogey Baby colors, mid-laugh, one holding a driver. | 16:9 and 4:5 | P-03 hero (G-40), P-10 |
| b | The golf cart: two friends sitting sideways, one pointing at the other's cap. The current "cart friends" shot works if retaken in sharp focus. | 3:2 | P-01, P-04 |
| c | The 19th hole: a clubhouse patio table, lemonades, 4 women, caps on, a scorecard on the table. | 3:2 | P-03 reason 5, P-01 |
| d | The range: a beginner with a bucket of balls and a friend coaching her, both laughing. | 4:5 | P-21, ads |
| e | The putting green: a woman crouched reading a putt, cap brim low, focused. | 4:5 | P-06 banner |
| f | The parking lot: trunk open, changing shoes, cap on, morning light. | 4:5 | P-21 |
| g | A selfie-style group photo, as if for Instagram after the round. | 4:5 | P-13, social |
| h | Walking off the 18th green, from behind, ponytail through the cap opening (only if the hat has one). | 4:5 | P-03 |

- **Max:** 120 KB at 1080w.
- **Alt:** describe the people, the hat color and the activity, e.g. "Four women in Bogey Baby caps laugh on the first tee."

**G-15 Too-big cap (problem shot for P-03)**
- **Desc:** light-hearted, never mocking. A woman in a plain, unbranded, oversized men's cap: the brim slides over her sunglasses and her bun pushes the cap up at the back. She shrugs at the camera with a playful grimace. Neutral fairway background. No competitor logos.
- **Ratio:** 4:5.
- **Max:** 100 KB.
- **Alt:** "A golfer's oversized cap slides down over her sunglasses."

**G-16 Fit comparison**
- **Desc:** a split frame with the same model, same angle and same light. Left: a generic oversized cap sitting low, brim on her sunglasses, gap at the back, labeled "Typical cap". Right: the Bogey Baby cap sitting right, brim level, labeled "Bogey Baby [Petite Fit]". Labels in DM Sans 700 on cream pills.
- **Ratio:** 16:9 desktop, 1:1 mobile.
- **Max:** 120 KB.
- **Alt:** "Side by side: a typical cap slipping down versus a Bogey Baby cap that fits."
- **Only make this if the fit claim is true.**

**G-17 Embroidery macro**
- **Desc:** an extreme close-up of the golfer embroidery on the front panel. Raking side light shows the thread texture; the rope edge is visible at the bottom. Shallow depth of field.
- **Ratio:** 1:1 and 4:5.
- **Max:** 90 KB.
- **Alt:** "Close-up of the golfer embroidered on the front of the cap."

**G-18 Founder portrait**
- **Desc:** the founder on a course or clubhouse porch, wearing the hat, natural smile, waist-up, warm light. Plus a second candid frame of her mid-swing.
- **Ratio:** 4:5.
- **Max:** 110 KB.
- **Alt:** "[Founder name], founder of Bogey Baby, on the course."

**G-25 Offer hero: the pair**
- **Desc:** two friends shoulder to shoulder at the cart, in two different Bogey Baby colors, matching energy, both looking at the camera, one with an arm around the other.
- **Ratio:** 4:5 mobile, 3:2 desktop.
- **Max:** 120 KB.
- **Alt:** "Two friends in matching Bogey Baby hats by a golf cart."

**G-40 Listicle hero**
- **Desc:** the G-14a first-tee group, cropped tighter so the faces and caps fill 70% of the frame.
- **Ratio:** 16:9 and 4:5.
- **Max:** 120 KB.

**G-41 Ponytail loop** (only if the hat has a back opening)
- **Desc:** a 3-second silent loop from behind: hands pull a ponytail through the back opening, then a quick shake. A second clip shows a low bun.
- **Size:** 1080 × 1350 MP4, under 900 KB, with a WebP poster.
- **Alt:** "A ponytail pulled through the back of a Bogey Baby cap."

**G-42 Popup image**
- **Desc:** a tight crop of G-14b: two caps and two smiles.
- **Ratio:** 3:4.
- **Max:** 70 KB.

**G-43 Order-confirmation photo**
- **Desc:** a group high-fiving on the 18th green from a low angle against the sky.
- **Ratio:** 16:9.
- **Max:** 100 KB.
- **Alt:** "Friends in Bogey Baby hats celebrate on the green."

**G-44 Journal hero template**
- **Desc:** one lifestyle photo per article with a 1 px gold stitch frame inset 16 px.
- **Ratio:** 16:9.
- **Max:** 120 KB.

### 8.3 Product photography

**G-12 Packshots** (per product and color)
- **Desc:** on a seamless paper background (#FAEFDF) with a soft shadow, front three-quarter angle, cap slightly tilted, embroidery sharp.
- **Angles to shoot:** front three-quarter (hero), straight front, side, back (strap and opening), top-down, inside band, and a detail of the rope.
- **Sizes:** 2000 × 2500 source (4:5). Exported at 400, 800 and 1200 wide, plus a 160 px swatch crop of the fabric.
- **Max:** 80 KB at 800w.
- **Alt:** "The [Color] Rope Cap, front view."

**G-13 Product page gallery slides** (8 per product, 4:5, 1200 × 1500)

| Slide | Desc | Text on graphic | Max |
|-------|------|-----------------|-----|
| G-13a | Hero packshot (G-12 front three-quarter) | None | 90 KB |
| G-13b | On-head lifestyle, front-on, model smiling, cap fills a third of the frame | None | 110 KB |
| G-13c | Fit infographic: the packshot with thin gold callout lines to the strap ("Adjusts [20.5–23.5"]") and crown ("[Shallow crown, sits lower]"), plus a mini fit table at the bottom | DM Sans 700, pine on paper | 90 KB |
| G-13d | Back view on a model, showing the strap or ponytail opening, callout "[Room for ponytails and low buns]" | One callout | 100 KB |
| G-13e | Embroidery macro (G-17), callout "Our golfer, stitched mid-swing" | One callout | 90 KB |
| G-13f | Inside view showing the sweatband and label, callouts "[Sweat-wicking band]", "[Cotton twill]", "[Rope: polyester]" | Up to 3 callouts | 90 KB |
| G-13g | Two friends in two colors, with a C-11-style pill "Bring your golf buddy: 2 for $[60]" | One pill | 110 KB |
| G-13h | Review card: paper background, 5 gold stars, a real quote in the Stitch font at 56 px, "[Name] · Head: Small · Handicap: 28" in DM Sans, and a small round customer photo if permitted | Quote | 70 KB |

**Every claim printed on a graphic must also be in the HTML,** for accessibility and SEO, and must be true (Appendix A).

**G-23 Bundle compositions**
- **Desc:** flat lays on pine twill fabric:
  - "1 hat": a single cap, centered.
  - "2 hats": two caps overlapping, brims crossed, in two colors.
  - "3 hats": a fan of three caps.
- Each composition has a small golf ball and tee as props.
- **Sizes:** 1:1 at 800 px (thumbnails in C-13 are 120 px) and 4:5 at 1200 px (promo sections).
- **Max:** 70 KB at 800.
- **Alt:** "Two Bogey Baby caps: Cream and Pine."

**G-24 Collection banners and tiles**
- **Desc:** banners are wide crops of lifestyle shots with the left 50% darker for text. Tiles are 4:5 crops of the product on a head.
- **Sizes:** banner 2400 × 1030 (21:9) desktop and 1080 × 810 (4:3) mobile; tiles 800 × 1000.
- **Max:** banner 160 KB, tile 80 KB.

**G-39 Ball-marker hat clip** (only if offered)
- **Desc:** the packshot on paper, plus a photo of it clipped to a cap brim.
- **Ratio:** 1:1.
- **Max:** 50 KB.

### 8.4 User-generated content and reviews

**G-19 Try-on clips (UGC)**

The brief for creators and the fit panel:
- Shoot vertical, 9:16, 1080 × 1920, 8–20 seconds, natural light, phone camera is fine.
- Script beats:
  1. "My usual golf hat…" (shows the problem)
  2. Puts on the Bogey Baby
  3. Adjusts the fit
  4. Shows the back and hair
  5. A one-line verdict in her own words
- Need at least 3 clips: a small head, thick or long hair, and a beginner.
- Burn in captions, or supply an SRT file.
- Get a signed usage release for site and ads; gifted creators must disclose the gift.

**Export:** under 3 MB each, with a WebP poster under 40 KB.

**G-20 Customer photos**
- **Desc:** photos uploaded with reviews, resized to 1080 px on the long side.
- **Shown:** as 1:1 crops at 300 px in cards.
- **Moderation:** check for faces and consent before showing on the homepage.

### 8.5 Illustrations (patch style, matching the badge)

**G-21 How-to-measure diagram**
- **Desc:** three panels side by side (stacked on mobile), each with a big number in a gold stitch circle:
  1. The golfer's head in profile with a cream tape measure wrapped just above the ear (a dotted line around the head).
  2. A close-up of the tape reading "22 in".
  3. Two hat icons labeled "Petite" and "Classic", with an arrow to the match.
- **Format:** SVG preferred; otherwise PNG at 1200 × 400 (desktop) and 600 × 1100 (mobile).
- **Max:** 40 KB.
- **Alt:** "Wrap a tape above your ears, read the inches, match your fit."

**G-22 Hair guide**
- **Desc:** four small patch-style heads in profile wearing the cap: ponytail, low bun, braids, short curls. Each has a one-word label beneath it.
- **Format:** SVG.
- **Size:** 4 × 240 px squares.
- **Alt:** for each, "Cap worn with [style]".
- **Only show styles the hat actually works with.**

**G-27 404: Lost ball**
- **Desc:** the badge golfer (full figure) peering into tall rough with her hand shading her eyes. A golf ball sits in the grass just behind her heel, where she can't see it. Paper background, a pine ground line.
- **Size:** 800 × 600 SVG or PNG.
- **Max:** 40 KB.
- **Alt:** "Our golfer looks for a lost ball in the rough."

**G-28 Empty bag**
- **Desc:** an empty golf cart-bag with a single Bogey Baby cap resting on top of a tee; a line style with a pine fill.
- **Size:** 320 × 240 SVG.
- **Copy beside it:** "Your bag's empty. Let's fix that." with a "Shop hats" button.

**G-29 Quiz icons** (phase 2)
- **Desc:** 16 small patch-style icons for the answer tiles:
  - Hair styles (5): down, ponytail, low bun, braids, short.
  - Hat feel (3): big, okay, small (shown as a cap with arrows).
  - Weather (3): sun, cloud, sunrise.
  - Color swatches (5).
- **Format:** SVG.
- **Size:** 96 px.

**G-45 Gift card** (phase 2)
- **Desc:** a credit-card-ratio card. The pine background has the gold stitch border inset 12 px, the badge centered and "Bogey Baby Gift Card" in cream Stitch below.
- **Size:** 1012 × 638 (plus the email version at 600 × 378).
- **Max:** 60 KB.

### 8.6 Icons

All icons share one style:
- A 24 px grid with a 1.75 px stroke and rounded caps.
- Pine (#082D22) on light backgrounds; cream-ink on pine.
- A small gold "stitch" dash accent where it helps.
- Delivered as an SVG sprite. Icons alone carry no text.

| ID | Icon | Desc | Used in |
|----|------|------|---------|
| G-30 | Free shipping | A delivery truck with a small cap on the cargo box | C-08, P-14 |
| G-31 | Free fit exchange | A cap with two curved arrows circling it | C-08, P-14 |
| G-32 | 30-day returns | A calendar page with "30" and a return arrow | C-08, P-14 |
| G-33 | Fits smaller heads | A soft tape measure curling around a cap | C-22, P-05 |
| G-34 | Ponytail opening | The back of a cap with a ponytail coming out (only if true) | C-22, P-05 |
| G-35 | Breathable / cool | A cap with three wavy airflow lines (only if true) | C-22 |
| G-36 | Embroidered | A needle and thread making a stitch | C-22 |
| G-37 | Star | Solid and half stars in gold #A67843 (decorative, so the 3:1 contrast rule doesn't apply) | C-09 |
| G-38 | 30-day fit promise badge | A round stitched seal: "30-DAY FIT PROMISE" around the edge and a cap in the center, gold on pine. Supply 160 and 320 px plus SVG | P-04, P-05, P-14 |
| G-46 | Utility set | search, account, bag, menu, close, plus, minus, chevron, arrow-right, play, pause, check, lock (secure checkout), gift, star-outline | Everywhere |

---

## 9. Product catalog, pricing and offers

### 9.1 Launch catalog

Launch with **2–4 hats**, so the bundles offer real choice and the grids don't look empty. Only the Cream Rope Cap is confirmed.

| Product | Status | Colors | Fits | Notes |
|---------|--------|--------|------|-------|
| The Cream Rope Cap | **Confirmed** (live on the site) | Cream with a white rope | [Petite / Classic, or one adjustable size] | The hero product; embroidered golfer |
| The Pine Rope Cap | Proposed | Pine with a cream rope | Same | The obvious second color; matches the brand |
| The Clubhouse Visor | Proposed | Cream, white | Adjustable | Visors are the classic choice for long hair; a $28–42 market |
| The Fairway Front Nine (performance cap) | Proposed | White, pine | Same | Lightweight and breathable, for hot rounds (only if the fabric supports the claim) |

### 9.2 Product data (Medusa)

Every product carries these fields. The product page reads directly from them, so spec claims stay in one place.

| Field | Example | Notes |
|-------|---------|-------|
| Title / handle | The Cream Rope Cap / `cream-rope-cap` | |
| Subtitle | "Embroidered rope cap" | Shown on cards |
| Description | 2–3 sentences, transformation first | |
| Collection | Caps | Plus Hats (all) for promotions |
| Options | Color, Fit | |
| SKU pattern | `BB-RC-CRM-PET` (brand-style-color-fit) | |
| Price (USD) | [36.00] | One price for every hat at launch |
| Inventory | Per variant; real numbers | Drives "Low stock" (≤ 20 left) and the P-04 urgency line |
| Metadata: `fit_range` | "[20.5–23.5 in]" | Product page, fit table, G-13c |
| Metadata: `crown` | "[Mid-profile, structured]" | |
| Metadata: `closure` | "[Adjustable strap]" | |
| Metadata: `fabric` | "[100% cotton twill]" | |
| Metadata: `sweatband` | "[Moisture-wicking]" or empty | Empty hides the claim |
| Metadata: `ponytail_opening` | true / false | **false hides every ponytail claim sitewide** |
| Metadata: `upf` | "[50+]" or empty, plus a test certificate reference | No claim without a certificate |
| Metadata: `care` | "[Hand wash cold, air dry]" | |
| Weight and dimensions | For shipping rates | |

### 9.3 Pricing and bundles

| Bundle | Hats | Price | Per hat | Saving | Badge |
|--------|------|-------|---------|--------|-------|
| Single | 1 | $[36] | $[36] | — | — |
| The Golf Buddy Pair | 2 | $[60] | $[30] | $[12] (17%) | Most popular |
| The Foursome Starter | 3+ | $[27] each | $[27] | $[9] per hat (25%) | Best value |

**Setup in Medusa:**
- Use an **automatic promotion** limited to the Hats collection, with cart-quantity conditions: 2 hats get $[12] off; 3 or more get $[9] off each.
- Mixed colors and fits must qualify.
- If Medusa's built-in promotion rules can't apply tiers across mixed variants, add a small custom cart-pricing step. Check the current Medusa docs before building.

**Before launch, confirm landed cost:** at $27 a hat, the 3-hat tier must still cover the hat, free shipping, payment fees and ad cost. If it doesn't, raise the prices rather than drop the guarantee.

### 9.4 Discount and urgency policy

- **No sitewide first-order code.** Competitors give 15%, but it stacks with the bundles and trains buyers to wait for codes.
- **Waitlist perk:** 24 hours of early access and first pick of the first run.
- **Email signup perk:** early access to new colors.
- **Scarcity:** only real inventory ("[N] left" at 20 or fewer per variant) and real first-run quantities. Countdowns only to real drop or end times, never reset.
- **Abandoned checkout:** no discount in emails 1–2. Email 3 may offer the free ball-marker clip, if that exists.

### 9.5 Shipping, packaging and exchanges

- **Shipping:** free US standard on every order, dispatched within [1–2] business days by [carrier].
- **Packaging:** a crush-proof cap box, because caps crush in mailers. Pine box, gold badge sticker, tissue paper.

**G-47 Packaging insert card** (4 × 6 in)
- **Front:** the golfer badge on pine, with "Welcome to the good company."
- **Back:** 3 fit tips ("Adjust the strap before your first round", "Between sizes? Exchange free", "Spot clean or hand wash cold"), a QR code to start an exchange, and "Tag your first round @[handle]".
- **Print:** 300 dpi CMYK with bleed.

**Exchanges** use Medusa's built-in exchange flow, started from the account page or the order email with a prepaid label. Target turnaround: a new hat ships within 2 business days of the return scan.

**Returns:** 30 days from delivery, unworn, no restocking fee.

---

## 10. Technical build spec

### 10.1 Architecture

| Layer | Choice | Notes |
|-------|--------|-------|
| Storefront | Next.js (App Router; already in use) | Server-rendered; static generation for content pages; streaming on product pages |
| Commerce backend | Medusa (already in use) + Postgres + Redis | Products, promotions, cart, orders, exchanges |
| Hosting | Railway (storefront and backend) | Put a CDN such as Cloudflare in front of the storefront to cache static assets and images |
| Images | An image CDN or Next.js Image with AVIF/WebP at the requested width | Never serve the 1672 px hero to phones again |
| Payments | Stripe (Payment Element + Express Checkout Element) | Cards, Apple Pay, Google Pay, Link. Verify the Apple Pay domain through Stripe |
| Email and SMS | Klaviyo, or similar, through its server API | Events sent from the server, so no client script is needed |
| Reviews | A custom Medusa reviews module (recommended) or a service with an API | Must store fit tags and photos and show a verified-buyer label |
| Analytics | First-party `/api/analytics` (exists) → GA4, Meta Conversions API, TikTok Events API | See 10.5 |
| Errors and uptime | Sentry (or similar) + uptime checks | Allow Sentry in the security policy |

### 10.2 Performance budget

Each page must pass this before launch, measured with PageSpeed Insights on mobile.

| Metric | Budget | Today (homepage) |
|--------|--------|------------------|
| LCP | ≤ 2.0 s | 6.9 s on throttled mobile |
| CLS | ≤ 0.05 | 0 ✓ |
| INP | ≤ 200 ms | Not measured |
| TTFB | ≤ 0.6 s | — |
| First-view page weight, mobile | ≤ 900 KB | ~4.0 MB |
| JavaScript, initial route (gzipped) | ≤ 120 KB | — |
| Hero image, mobile | ≤ 110 KB | 270 KB |
| Fonts | 2 woff2 files, preloaded, subset to Latin | 3 files incl. a TTF |

**How to hit it:**
- Preload the hero with `fetchpriority="high"` and use responsive image sizes.
- No video on mobile.
- Lazy-load everything below the fold.
- Live-text headline in the Stitch font as woff2.
- Load the cart drawer, quiz and review widgets as separate code bundles.
- Load third-party scripts only after the page is interactive.
- Reserve space for every image so nothing shifts.

### 10.3 Security policy (CSP) and headers

Keep the strict policy and add only the vendors you use.

```
Content-Security-Policy:
  default-src 'self';
  script-src  'self' https://js.stripe.com [https://connect.facebook.net] [https://analytics.tiktok.com] [https://www.googletagmanager.com];
  frame-src   https://js.stripe.com https://hooks.stripe.com;
  connect-src 'self' https://api.stripe.com [https://www.facebook.com] [https://analytics.tiktok.com] [https://*.google-analytics.com] [https://*.ingest.sentry.io];
  img-src     'self' data: https://*.stripe.com [your image CDN] [https://www.facebook.com] [https://analytics.tiktok.com];
  style-src   'self' 'unsafe-inline';
  font-src    'self';
  media-src   'self' [your video CDN];
  form-action 'self';
  base-uri    'none';
  frame-ancestors 'self';
```

- **[Bracketed] domains are needed only if you load that vendor's browser script.** The recommended setup sends events from the server (10.5), so most of them can stay out.
- **Load any pixel's setup code from a file on your own site** (`/pixels.js`), never inline.
- **Check each vendor's current documentation;** their required domains change.
- **Keep these headers:** `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Strict-Transport-Security` once the custom domain is live.

### 10.4 SEO

- **URLs:**
  - lowercase, hyphenated, stable
  - `/products/cream-rope-cap`
  - `/collections/caps`
  - `/pages/fit-guide`
- **Canonical tags** on every page. Product pages with variants keep one canonical URL.
- **robots.txt:**

```
User-agent: *
Allow: /
Disallow: /account
Disallow: /cart
Disallow: /checkout
Disallow: /api/
Disallow: /search
Sitemap: https://[domain]/sitemap.xml
```

- **Noindex:** P-03 and P-04 (ad pages) and all staging environments. **Remove the sitewide noindex at launch.**
- **sitemap.xml** is generated automatically and covers products, collections, content pages and journal posts.
- **Structured data:**
  - Organization and WebSite on the homepage
  - Product and BreadcrumbList on product pages
  - CollectionPage and ItemList on collections
  - FAQPage on the FAQ
  - HowTo on the fit guide
  - Article on journal posts
- **Titles and descriptions:** as given per page. Every page has one H1 in live text, alt text on every meaningful image, and internal links from the journal to products.
- **Search Console:** verify the domain, submit the sitemap and watch the Core Web Vitals report.

### 10.5 Analytics and tracking

**Source of truth:** the existing first-party `/api/analytics` endpoint.
- Every event is stored on your server first.
- The server then forwards it to GA4 (Measurement Protocol), the Meta Conversions API and the TikTok Events API.
- A shared `event_id` per event lets platforms remove duplicates if their browser pixels are ever added.

**Privacy:**
- Honor "Your Privacy Choices" and the Global Privacy Control signal.
- If someone opts out, send nothing to Meta or TikTok for that browser.

| Event | Fires when | Key parameters |
|-------|-----------|----------------|
| `page_view` | Every page | `page_type`, UTMs, `exp_variant` |
| `generate_lead` | Waitlist or email signup | `source`, `product_handle` |
| `view_item_list` | Collection, homepage best sellers | `list_id`, item IDs |
| `select_item` | A card is clicked | `item_id`, `list_id` |
| `view_item` | Product page loads | `item_id`, `price` |
| `add_to_cart` | Add to bag | `variant_id`, `quantity`, `bundle_size`, `value` |
| `view_cart` | The drawer or cart page opens | `value` |
| `begin_checkout` | Checkout starts | `value`, `items` |
| `add_shipping_info` / `add_payment_info` | Checkout steps | |
| `purchase` | Order placed (sent from the server) | `transaction_id`, `value`, `items`, `bundle_size`, `event_id` |
| `view_promotion` / `select_promotion` | Bundle tiles and promos | `promotion_id` |
| `scroll` | 25/50/75/100% | Listicle and homepage only |
| `quiz_start` / `quiz_complete` | Phase 2 | `answers` |
| `exchange_started` | Account page | `order_id` |

**Dashboards (weekly):**
- Conversion rate by landing page and source
- AOV and bundle take rate (share of orders with 2+ hats)
- Revenue per session
- Waitlist signups and their signup rate
- Bounce rate, scroll depth and CTA clicks on the listicle
- Exchange rate by fit (fit-problem early warning)

### 10.6 A/B testing

- **Assignment:** the server assigns a variant on the first visit and stores it in a cookie (`bb_exp_<test>`, 30 days), split 50/50. The page renders the variant on the server, so it never flickers.
- **Exposure:** recorded as a `page_view` with an `exp_variant` field.
- **Rules (SOP 7.5):**
  - one change per test
  - 500–1,000+ sessions per variant and 7+ days
  - ignore the first 24–48 hours
  - call a winner at a 95%+ probability of beating the control, with 100+ visitors and 10+ conversions per variant
  - lock in a winner only if it wins on 2+ traffic sources
- **Test roadmap (in SOP order):**

| # | Page | Test | A (control) | B (variant) | Metric |
|---|------|------|-------------|-------------|--------|
| 1 | P-03 | Headline | "Finally, Golf Hats Made for Women: Not Shrunk and Pinked" | Ponytail headline (if true) or "Golf Hats That Look Like You" | Scroll depth, CTA clicks |
| 2 | P-04 / P-05 | Offer | 2 for $[60] | 2 for $[60] + a free ball-marker clip | Conversion rate, AOV |
| 3 | P-05 | CTA | "Add to bag" | "Add to bag · Free fit exchange" | Add-to-cart rate |
| 4 | P-01 / P-03 | Hero visual | Group lifestyle | Single golfer close-up / ponytail loop | Bounce rate |
| 5 | P-05 | Social proof | Written reviews first | UGC clips first | Conversion rate |

- **Log every test:** date, page, hypothesis, variant, metric, result and decision, in a shared sheet.

### 10.7 Environments and launch switches

- **Staging:** a Railway preview environment, noindexed and behind basic auth, with Stripe in test mode.
- **Production:** the custom domain, with Stripe in live mode.
- **Settings:**
  - `DROP_MODE` switches pre-launch states (P-02) on and off.
  - `SHOW_RATINGS` turns on automatically at 10+ reviews.
  - `ENABLE_VIDEO_HERO` covers desktop only.
- **Backups:** daily Postgres backups and a monthly restore test.

---

## 11. Email and SMS flows

All emails use the G-05 header, a paper background, pine buttons in the C-05 style, the Stitch font for headlines (with a Georgia fallback) and DM Sans for body text. Width is 600 px. Each email has one main CTA.

**Texts (SMS):** only to people who opted in with the C-16 consent wording, with STOP and HELP keywords, and quiet hours from 9 pm to 9 am in the recipient's time zone.

| ID | Flow | Trigger and timing | Subject / SMS | Content | CTA |
|----|------|--------------------|---------------|---------|-----|
| E-01a | Waitlist welcome | Right after signup | "You're on the list. Here's what's coming." | G-10 hero. Drop date, price, what early access means, the golfer story in 2 lines | See the first drop |
| E-01b | Waitlist: meet our golfer | +3 days | "Meet the golfer on every hat" | G-17 macro, founder note (I-6) | Read our story |
| E-02a | Drop: early access | Drop day minus 24 h | "Your early access is open" + SMS: "Bogey Baby early access is live for 24 hours: [link]" | G-13a for each hat, bundle tiles, trust line | Shop early access |
| E-02b | Drop: public launch | Drop day | "The first drop is here" | G-14a group shot, 3 product cards | Shop the drop |
| E-02c | Drop: last call | Only when real stock is under 25% | "[Color] is almost gone" | The real stock number | Get yours |
| E-03 | Newsletter welcome | Signup outside the waitlist | "Welcome to the good company" | Brand pillars, Fit Guide link, best sellers | Find your hat |
| E-04a/b/c | Abandoned checkout | +1 h, +24 h, +72 h | "Your hats are waiting" / "Questions about fit?" / "Still thinking it over?" | 1: the cart items. 2: the fit FAQ and free exchanges. 3: reviews, plus the ball-marker gift if offered | Back to checkout |
| E-05 | Browse abandonment | Viewed a product, didn't add to cart, +4 h | "Still thinking about the [Color] [Style]?" | The product card, 1 review, the fit line | See it again |
| E-06a | Order confirmed | On purchase | "You're in good company, [name]" | Order summary, ships-in time, fit tip | View order |
| E-06b | Shipped | When fulfilled | "Your hats are on the way" | Tracking link, G-47 insert preview | Track package |
| E-06c | Delivered + fit check | Delivery +1 day | "How's the fit?" | How to adjust the strap, a one-click "Start a free exchange" | Start exchange (secondary: "It fits!") |
| E-06d | Review request | Delivery +14 days | "Tell us about your first round" | A star picker in the email, asking for fit tags (head, hair, handicap) and a photo | Write a review |
| E-06e | Bundle cross-sell | Delivery +21 days (single-hat buyers only) | "Bring your golf buddy next time" | A pair photo (G-25) and the 2-for-$[60] offer | Get the Golf Buddy Pair |
| E-07 | Exchange confirmation | Exchange started | "Your free exchange is on its way" | The label, the steps, the timeline | Print label |
| E-08 | Win-back | 60 and 90 days without an order | "New colors just landed" / "We saved you a spot on the tee sheet" | New products and reviews | Shop new colors |
| E-09 | Back in stock | Variant restocked (subscribers to "Notify me") | "The [Color] is back" | Product card, real stock | Get it before it's gone |

---

## 12. Build phases, QA and launch

### 12.1 Phases

These are relative weeks; set real dates once the hats arrive.

| Week | Phase | Deliverables | Exit check |
|------|-------|-------------|-----------|
| 1 | **Fix the basics on the live site** | Drop mode (P-02) with the waitlist live, the one-header fix, mobile hero performance work, the server-side tracking setup | The current homepage rises from 42 to about 70; the waitlist captures leads |
| 1–2 | **Design system** | Tokens (Section 4), components C-01 to C-24 built and documented in the storefront | Every component works on mobile, tablet and desktop, keyboard and screen reader |
| 2 | **Brand and illustration assets** | G-01 to G-06, G-21, G-22, G-27, G-28, the icon set (G-30 to G-38, G-46) | All exported to spec |
| 2–3 | **Content day** (Appendix B) | G-10 to G-18, G-23 to G-25, G-40 to G-43, packshots | Selected, retouched, exported to sizes and file limits |
| 3 | **Fit panel starts** | 20 golfers receive hats and are briefed on G-19 | Reviews and clips due by week 6 |
| 3–4 | **Core pages** | P-01, P-05, P-06, P-07, cart drawer, checkout styling | Pages pass the rubric with placeholder proof |
| 4–5 | **Selling pages** | P-03 listicle, P-04 offer page, P-09 confirmation | Each ad has a page whose H1 matches it |
| 5 | **Support pages** | P-10 to P-19 | Utility checklist (13.2) passes |
| 5 | **Email and SMS** | E-01 to E-09 built and tested with seed addresses | Every flow renders and links work |
| 6 | **Proof and polish** | Reviews and clips live, ratings switch on at 10+ reviews | Trust criterion scores 5 |
| 6 | **QA** (12.2) | Full regression pass on real devices | Every page scores 5 on all 9 criteria, rated by someone who didn't build it |
| 7 | **Launch** (12.3) | Drop day | Orders flowing, events verified |
| 7+ | **Test and iterate** | The 10.6 roadmap, weekly re-scores | Hold 90+ on every page |

### 12.2 QA checklist (every page, every release)

**Rubric:** scored by someone who didn't build the page, using Section 13.

**Devices:**
- iPhone (Safari)
- Android (Chrome)
- iPad
- Desktop Chrome, Safari and Firefox
- Each at 390, 820, 1280 and 1440 widths

**Thumb test:**
- The headline reads without zooming.
- The CTA can be tapped one-handed.
- The product is clear within 5 seconds.
- No overlaps and no sideways scroll.

**Speed:** PageSpeed mobile meets the 10.2 budget on P-01, P-03, P-04 and P-05.

**Accessibility:**
- Automated check with axe: 0 serious issues.
- Keyboard-only run-through of the full purchase.
- VoiceOver and TalkBack spot checks.

**Content:**
- No unconfirmed [bracketed] claims remain.
- Every number matches its source (Appendix A).
- Spelling check.

**Links:** no 404s. Every CTA goes somewhere new; none loops back to itself.

**Commerce:**
- A live test order for each tier (1, 2 and 3+ hats, mixed colors and fits), then refunded.
- Promotions apply correctly.
- Shipping shows $0.
- Tax is correct.
- An exchange started from the account page.

**Tracking:**
- Every event in 10.5 appears in `/api/analytics`.
- Meta and TikTok test tools show `ViewContent`, `AddToCart`, `InitiateCheckout` and `Purchase` with matching `event_id`s.
- GA4 DebugView shows them too.

**SEO:**
- Titles and descriptions set.
- One H1 per page.
- Structured data passes Google's Rich Results Test.
- The sitemap loads, and robots.txt is correct.

### 12.3 Launch-day runbook

1. **T-24 h:** turn on early access for the waitlist (E-02a) with a private link or code. Watch orders and errors.
2. **T-0:**
   - Set `DROP_MODE=false`.
   - Remove the sitewide noindex.
   - Publish robots.txt and the sitemap, then submit the sitemap in Search Console.
   - Send E-02b.
   - Switch ads to the P-03 listicle.
3. **T+1 h:**
   - Place one live order and refund it.
   - Check `purchase` events in all three platforms.
   - Check that inventory counts drop.
4. **T+24 h:** first metrics review (conversion rate, AOV, bundle take rate, the listicle's scroll and click rate). Fix bugs only; no design changes.
5. **T+7 days:** first weekly re-score; start test #1 (the headline) once traffic supports 500+ sessions per variant.

---

## 13. Rubric scoring sheet

### 13.1 Selling pages: must score 5 on all 9 criteria (100/100)

| Criterion (weight) | P-01 Home | P-03 Listicle | P-04 Offer | P-05 Product | What earns the 5 |
|--------------------|:-:|:-:|:-:|:-:|------------------|
| 1. Offer and traffic fit (10) | 5 | 5 | 5 | 5 | Traffic routing in 5.2; H1 repeats the ad (ad-to-URL sheet) |
| 2. Angle and the 5 beliefs (10) | 5 | 5 | 5 | 5 | A visible block for each belief; real customer language |
| 3. Hero / above the fold (15) | 5 | 5 | 5 | 5 | Headline, subheadline, visual, CTA and trust signal in the mobile fold; passes the 3-second test |
| 4. Offer strength (15) | 5 | 5 | 5 | 5 | Price, bundle tiers, savings, guarantee beside the price, real scarcity |
| 5. Trust (10) | 5 | 5 | 5 | 5 | Reviews + UGC, founder/authority, clarity (fit guide, FAQ), risk reversal |
| 6. Copy and flow (10) | 5 | 5 | 5 | 5 | One idea per section; CTAs at hero, product intro, offer and close, each with different copy |
| 7. Visual design (10) | 5 | 5 | 5 | 5 | Section 4 tokens; 1300 px max width; identical components everywhere |
| 8. Mobile and tablet (10) | 5 | 5 | 5 | 5 | Thumb test; 44 px tap targets; sticky CTA; tablet checked |
| 9. Technical and tracking (10) | 5 | 5 | 5 | 5 | 10.2 budget met; events verified; test orders done; SEO fields set |
| **Total** | **100** | **100** | **100** | **100** | |

### 13.2 Utility pages: checklist instead of the full rubric

These are P-06 to P-19, which don't sell directly. **Each must pass all 8 checks:**

1. Same header, footer and tokens as the selling pages.
2. One live-text H1 that says what the page is.
3. A clear next step (CTA) on every page, including 404 and empty states.
4. The C-08 trust line wherever a price or purchase appears.
5. Mobile thumb test passes; 44 px tap targets.
6. PageSpeed mobile LCP ≤ 2.5 s.
7. Title, description and structured data where listed.
8. Every claim is true and in Appendix A.

---

## Appendix A: Claims register

Nothing goes on the site, in a graphic or in an email unless its row says **True**, with proof on file. Update this table as you confirm facts.

| Claim | Status | Proof needed | Used in |
|-------|--------|-------------|---------|
| "Embroidered" golfer | True | Live product | Everywhere |
| Fit range "[20.5–23.5 in]" | Pending | Manufacturer spec + fit-panel measurements | P-01, P-03, P-05, P-11, G-13c, G-16 |
| "Made for smaller heads" / "Petite Fit" | Pending | As above | P-01, P-03, P-05 |
| Ponytail / back opening | Pending | Physical sample | P-01, P-03, P-05, G-13d, G-34, G-41 |
| Sweat-wicking band | Pending | Spec sheet | P-01, P-03, G-13f, G-35 |
| Breathable fabric | Pending | Spec sheet | P-03, G-35 |
| UPF 50+ | Pending (not used until tested) | Lab test certificate | — |
| Price $[36], 2 for $[60], 3+ at $[27] each | Pending | Landed-cost check | All selling pages |
| Free US shipping on every order | Pending | Policy decision | C-01, C-08, everywhere |
| Free fit exchange within 30 days | Pending | Policy + Medusa exchange setup | C-08, P-14 |
| 30-day returns, no restocking fee | Pending | Policy | C-08, P-14 |
| Ships in [1–2] business days | Pending | Fulfillment setup | P-05, P-08, E-06 |
| Review rating and count | Pending (shown at 10+ reviews) | Reviews database | C-09 |
| "[N] golfers on the list" | Pending (shown at 100+) | Waitlist count | P-02 |
| First-run quantity "[N] per color" | Pending | Production order | P-02, P-04 |
| "We center women and Black golfers" | True | About page | P-01, P-10 |
| Founder story | Pending | The founder | P-01, P-10 |

---

## Appendix B: Content-day shot list

One day of shooting covers almost every photo in Section 8.

- **Location:** a course with a tree-lined fairway, a first tee, a cart path, a putting green and a clubhouse patio. Get permission and a location release.
- **Talent:**
  - 6–8 women golfers aged 25–60, centering Black women, varied in body type, hair (long, braids, curls, short) and skill level.
  - Plus the founder.
  - Signed model releases covering site and ad use.
- **Crew:** a photographer who also shoots video (or one of each), a stylist and a hair stylist (hair shots matter).
- **Wardrobe:** pine, cream, gold and white. Knit vests, polos, skorts, cable sweaters to tie at the shoulders, white golf shoes. No visible competitor logos.
- **Props:** every hat in every color (2 or more of each), golf balls, tees, a cart, a scorecard, lemonades, a tape measure.

**Schedule (by the light):**

| Time | Setup | Graphics captured |
|------|-------|-----------------|
| 7:00–9:00 | First tee group in morning light; parking lot shoe change | G-14a, G-40, G-14f |
| 9:00–11:00 | Packshots and flat lays in shade or a tent on paper and pine fabric; embroidery macros | G-12, G-17, G-23, G-13a/e/f, G-39 |
| 11:00–13:00 | Fit comparison and back views in open shade; ponytail loop; problem shot | G-16, G-13c/d, G-41, G-15 |
| 13:00–15:00 | Clubhouse patio (19th hole); founder portrait; selfies | G-14c, G-18, G-14g |
| 15:00–16:30 | Range and putting green; UGC-style try-ons on phones | G-14d, G-14e, G-19 |
| 16:30–golden hour | **Hero**: fairway portrait and video loop; cart friends; pair shot; 18th-green celebration | G-10, G-11, G-14b, G-25, G-43 |

**Deliverables:**
- Edited selects in a warm grade that matches the paper and pine palette.
- Exported to the sizes in Section 8, as AVIF and WebP plus a JPEG fallback.
- Named `[g-code]-[subject]-[width].[ext]`.

---

## Appendix C: If you switch to Shopify + Replo (the SOP's stack)

The plan carries over almost unchanged. The differences:

| Part | This plan (Medusa + Next.js) | Shopify + Replo |
|------|------------------------------|-----------------|
| Page building | Custom components (C-01 to C-24) | Replo Theme Builder. Start from the SOP's templates: the Plantmade listicle for P-03, the Bro Glo quantity bundles for P-04/P-05. Use Replo saved components for C-xx |
| Bundles | A Medusa promotion or custom cart pricing | Replo bundle tiles + Shopify automatic discounts, or a bundles app |
| Checkout | Stripe (Apple Pay, Google Pay, Link) | Shopify Checkout with Shop Pay |
| Reviews | A custom module | A reviews app that supports custom fields such as fit tags |
| Exchanges | Medusa's built-in exchanges | Shopify returns + an exchange app |
| A/B tests | Server-side assignment | Replo split-test links (SOP 7.3) |
| Pricing | Your hosting costs | Replo Starter: $99/mo billed annually, plus the Shopify plan |
