# Bogey Baby Storefront: Changes to Score 100/100

**Page:** https://storefront-production-c06c27a5.up.railway.app/
**Current score:** 42/100 (fail: three criteria at 1)
**Target:** 100/100, which means every one of the 9 rubric criteria scores 5
**Rubric:** "SOP — Designing Shopify DTC Landing Pages with Replo AI", section 6
**Audited:** 18 Nov 2026

---

## 0. Read this first

1. **A pre-launch page can't score 100.** Criteria 4 (offer), 5 (trust) and 9 (technical) need a price, real reviews and a working add-to-cart, so 100 comes on launch day. Phase 1 (now, before launch) gets the page to roughly 70–75. It also collects the email list and the reviews that Phase 2 needs.
2. **Every claim must be true.** The copy below puts facts I don't know in `[brackets]`. Examples are the fit range, a ponytail opening, the fabric and the review count. If the Cream Rope Cap doesn't have a feature, delete that line; never make it up. A false claim is an automatic fail on the rubric.
3. **This URL is the homepage.** The SOP says homepages are for branded search, organic, email/SMS, returning visitors and retargeting, not cold ads. Criterion 1 can only reach 5 if cold Meta/TikTok ads go to the listicle in the BogeyBaby brief, not to `/`.

### What you must supply (I can't invent these)

| # | Item | Needed for |
|---|------|-----------|
| 1 | Price per cap, plus any bundle price | Criterion 4 |
| 2 | Drop date and first-run quantity (the real number) | Criteria 4 and 6 |
| 3 | Hat spec: closure, fit range in inches, fabric, panel/crown, brim, care, and whether it has a ponytail opening, UPF or sweatband | Criteria 2, 3 and 5 |
| 4 | Policies: shipping (free or threshold), exchanges, returns window | Criteria 4 and 5 |
| 5 | 10+ real reviews and 3+ try-on clips from a pre-launch fit panel | Criteria 2 and 5 |
| 6 | Founder story: 2–3 true sentences, plus a photo | Criterion 5 |
| 7 | Production domain (replacing the railway.app URL) | Criterion 9 |

---

## 1. Score targets

| # | Criterion | Weight | Now | Target | Points now → target |
|---|-----------|-------:|----:|-------:|--------------------:|
| 1 | Offer and traffic fit | 10 | 2 | 5 | 4 → 10 |
| 2 | Angle and the 5 beliefs | 10 | 1 | 5 | 2 → 10 |
| 3 | Hero / above the fold | 15 | 3 | 5 | 9 → 15 |
| 4 | Offer strength | 15 | 1 | 5 | 3 → 15 |
| 5 | Trust | 10 | 1 | 5 | 2 → 10 |
| 6 | Copy and flow | 10 | 3 | 5 | 6 → 10 |
| 7 | Visual design and consistency | 10 | 3 | 5 | 6 → 10 |
| 8 | Mobile and tablet | 10 | 3 | 5 | 6 → 10 |
| 9 | Technical and tracking | 10 | 2 | 5 | 4 → 10 |
| | **Total** | **100** | | | **42 → 100** |

---

## 2. Changes by criterion

### Criterion 1: Offer and traffic fit (2 → 5)

**What a 5 looks like:** the page type and length match the funnel stage, and the headline restates the promise of the ad that sent the visitor.

**Changes:**

- [ ] **1.1** Give `/` one job: the brand homepage for branded search, organic, email/SMS, returning visitors and retargeting.
- [ ] **1.2** Point every cold Meta and TikTok ad at a separate listicle page, `/pages/5-reasons` (the copy is in the BogeyBaby brief, section 5). No cold ad links to `/`.
- [ ] **1.3** Build a product page at `/products/cream-rope-cap` with the full buy box (Criterion 4). Every homepage CTA leads to it.
- [ ] **1.4** Restructure the homepage into the course's homepage order:
  `Hero → Product block → Social proof → Why it's better (USP) → Founder story → Final CTA`
  Add a "Shop by style" category block once you have 2+ styles.
- [ ] **1.5** Make retargeting ads to `/` use the hero's promise word for word, e.g. "The Cream Rope Cap · $[36] · Free fit exchanges".
- [ ] **1.6** Keep a sheet listing every live ad, its destination URL and its headline. Check that each ad's headline matches its page's H1 or subheadline.

**Pass test:** every live ad URL in Meta and TikTok is either the listicle or a retargeting ad to `/` with a matching promise.

---

### Criterion 2: Angle and the 5 beliefs (1 → 5)

**What a 5 looks like:** all 5 beliefs are built, the angle is in real customer words, and the page goes pain → solution → outcome with a reason it works.

**The angle:** keep the brand's real strength, which is representation and belonging ("Good company"). Add fit only if the cap actually fits smaller heads. Research backs both: women golfers' top complaint is choice ("shrink it and pink it"), and beginners worry about "looking out of place".

| Belief | Add this to the page | Where |
|--------|----------------------|-------|
| 1. "This is for someone like me" | "Made for women golfers, and the friends who play with them." Move the About page line onto the homepage: "We center women and Black golfers, from the first bucket at the range to the last tee time of the day." | Hero subheadline + Founder story |
| 2. "I have this problem" | "Most golf hats are men's hats in smaller boxes, plus one pink one. Ours were drawn for us." | First line of "Why it's better" |
| 3. "This product can solve it" | 3–5 reasons with real specs: fit range `[adjusts to 21–23"]`, `[low-profile crown]`, `[sweat-wicking band]`, embroidery that `[survives the wash]`, `[ponytail opening, only if true]` | "Why it's better" section |
| 4. "I believe it'll work for me" | Fit-panel reviews, each tagged with head size, hair type and handicap (e.g. "Small head · thick curls · 28 handicap"), plus 3 try-on clips | Social proof section |
| 5. "There's no risk to trying it" | "Free fit exchanges · 30-day returns · Free shipping", placed next to the price | Buy box, offer, final CTA |

**Pass test:** a reviewer can point to one block on the page for each of the 5 beliefs.

---

### Criterion 3: Hero / above the fold (3 → 5)

**What a 5 looks like:** a benefit-first headline, subheadline, visual, CTA and trust signal all fit in the mobile fold, and a visitor knows what it is, who it's for, why to care and what to do next within 3 seconds.

**Changes:**

- [ ] **3.1** Make the H1 live text, not an image. Set it in the brand stitch font the site already loads (`/brand/bogey-baby-stitch.ttf`, converted to woff2), so the look stays the same.
- [ ] **3.2** Rewrite the hero:

```
Eyebrow:     Good company. Better hats.
H1:          Golf hats that look like you.
Subheadline: Embroidered caps made for women golfers and the friends who play
             with them. [Adjusts to fit smaller heads.] Good for 18 holes and
             lunch after.
CTA:         Shop the Cream Rope Cap · $[36] →
Trust line:  ★★★★★ [4.9] from [24] fit-panel golfers · Free shipping · Free fit exchanges
```

Pre-launch version (Phase 1): use the CTA "Get first-drop access →" and the trust line "First drop [date] · $[36] · Free fit exchanges". Leave out the stars until the reviews are real.

- [ ] **3.3** Keep a single primary CTA. Remove "Explore all headwear" until more than one hat is for sale; today it opens an empty page.
- [ ] **3.4** Move or remove the floating "Click me" hat. It must not cover the hero or the product photo (see Criterion 8).

**Pass test:** on an iPhone 13 (390 × 664 viewport), the H1, subheadline, CTA and trust line are all visible without scrolling, and the H1 wraps to 3 lines or fewer.

---

### Criterion 4: Offer strength (1 → 5)

**What a 5 looks like:** the offer fits how aware the visitor is, uses 2+ levers that are true, has the guarantee beside the price, and makes the savings clear.

**Launch offer.** These are numbers from the brief; confirm them against your landed cost.

| Tier | Price | Lever |
|------|-------|-------|
| 1 cap | $[36] | — |
| 2 caps ("Bring your golf buddy") | $[60] (save $[12]) | Bundle, which fits the "Good company" idea |
| 3 caps | $[81] (save $[27]) | Bundle, badged "Best value" |

**Changes:**

- [ ] **4.1** Show the price on the homepage product block, on the buy box and in the hero CTA.
- [ ] **4.2** Add the "Bring your golf buddy" 2-cap tier, badged "Most popular". This works even with only one product.
- [ ] **4.3** Put the guarantee on the line directly under the price: "Free shipping · Free fit exchanges · 30-day returns".
- [ ] **4.4** Add real scarcity: "First run: [N] caps". Update the number as stock sells out, and never use a fake countdown.
- [ ] **4.5** Optional gift test: a free ball-marker hat clip with 2+ caps.
- [ ] **4.6** Pre-launch (Phase 1): replace "Coming soon" with a waitlist block.

```
Headline:   The first drop lands [date].
Body:       Join the list for 24 hours of early access and first pick
            of the first run.
Form:       [Email]  [Phone, optional: "Text me instead"]  [Save my spot]
Small print: One email when it drops. No spam.
```

**Pass test:** within 2 seconds of reaching the buy box, a reviewer can say the price, the bundle saving and the guarantee.

---

### Criterion 5: Trust (1 → 5)

**What a 5 looks like:** all 4 trust triggers are on the page, each in the right place, and every number is true.

| Trigger | Add exactly | Place |
|---------|-------------|-------|
| Social proof | Star rating and count; 3 short reviews tagged with head size, hair and handicap; 3 try-on clips (9:16); "[N] golfers on the waitlist" (only the real number) | Under the hero, in its own section, and beside the buy button |
| Authority | Founder story (2–3 sentences + photo); the materials and embroidery maker, if notable; any press logos (only real ones) | Founder story section; small tag in the hero |
| Clarity | Fill in Cap details: fit range, closure, crown, brim, fabric, care, ships-in time. Add a fit guide ("measure above the ears"). Add an FAQ: Will it fit a small head? Can I wear a ponytail? How do I wash it? What if it doesn't fit? | Product block and FAQ |
| Risk reversal | "Free fit exchanges · 30-day returns · Free shipping" as icons | Under the price, the offer and the final CTA, plus the sticky bar |

**Changes:**

- [ ] **5.1** Run the fit panel now: 20 women golfers with mixed head sizes, hair types and skill levels. Collect written reviews (with permission to publish) and try-on clips.
- [ ] **5.2** Add a reviews app or a static reviews section. Only real reviews, with real counts.
- [ ] **5.3** Expand Cap details from its current one line ("Rope front with a curved brim and a multicolor embroidered golfer.") to cover every Clarity item in the table.

**Pass test:** a reviewer finds all 4 triggers, and every number on the page can be backed by a source file.

---

### Criterion 6: Copy and flow (3 → 5)

**What a 5 looks like:** one idea per section, transformation first with features backing it up, easy to skim, and a CTA after the hero, the product intro, the offer and the close.

**Final homepage section order and copy:**

| # | Section | Headline | Body (short) | CTA |
|---|---------|----------|--------------|-----|
| 1 | Hero | Golf hats that look like you. | (see Criterion 3) | Shop the Cream Rope Cap · $[36] → |
| 2 | Product block | The Cream Rope Cap | Cream, white rope, our golfer stitched mid-swing. $[36]. [Fit range]. 3 benefit bullets. | See the details → |
| 3 | Social proof | Good company, already. | 3 tagged reviews + 3 try-on clips | — |
| 4 | Why it's better | Not shrunk. Not pinked. Drawn for us. | Problem line (Belief 2), then 3–5 reasons as icon + one line | Get yours → |
| 5 | Offer | Bring your golf buddy. | 1 / 2 / 3-cap tiers, savings, guarantee icons | Get the deal → |
| 6 | Founder story | Why Bogey Baby | 2–3 true sentences + photo; the About-page line on who it's for | Read our story |
| 7 | Final CTA | Good rounds start here. | Recap line + trust icons + mini FAQ | Join the good company → |

**Changes:**

- [ ] **6.1** Swap the final section's only CTA ("Our story") for "Join the good company →", which goes to the product page. Keep "Our story" as a text link.
- [ ] **6.2** Every CTA leads somewhere new: product page, buy box or signup. None just scrolls back to the same section.
- [ ] **6.3** Rewrite "It's in the details" so each feature ends in a benefit, e.g. "The rope: a white rope across the front, so it reads classic from across the fairway."
- [ ] **6.4** Keep paragraphs under 3 lines, bold the section headlines, and add an icon per reason.

**Pass test:** every section passes the "So what?" check; there are 4+ CTAs, each with different copy; no CTA loops back to itself.

---

### Criterion 7: Visual design and consistency (3 → 5)

**What a 5 looks like:** 1300 px max content width, padding in %, gaps between elements, cards aligned to the top, and the same treatment on every section and every page.

**Changes:**

- [ ] **7.1** Use one header and one footer component on every route: `/`, `/collections/*`, `/products/*`, `/pages/*`, `/search`, `/account` and the 404 page. Today the inner pages switch to a maroon text logo, "bogey baby.", and a different nav (Shop / Collections / About / Search).
- [ ] **7.2** Use the green embroidered wordmark and the badge everywhere. Remove the maroon wordmark style.
- [ ] **7.3** Give the empty collection page, search, account and 404 the homepage's colors, fonts and buttons.
- [ ] **7.4** Hold every new section (reviews, reasons, offer, founder) to 1300 px max width, % side padding, and gap spacing rather than spacer elements.

**Pass test:** clicking through every route shows the same header, footer, wordmark, colors and button style.

---

### Criterion 8: Mobile and tablet (3 → 5)

**What a 5 looks like:** passes the thumb test, with the headline in the top 2–3 lines, a full-width CTA in the fold, 44 px tap targets, and clean stacking at tablet and mobile widths.

**Changes:**

- [ ] **8.1** Make the primary CTA full width on mobile (it's 196 px wide today) with a high-contrast fill.
- [ ] **8.2** Give every link and button a tap area at least 44 px tall. That includes the footer links (about 20 px today) and the header home link (16 px today).
- [ ] **8.3** Floating "Click me" hat: remove it, or rename it to say what it does ("Get first-drop access" before launch, "Shop the cap" after). Keep it in the bottom-right corner above the safe area, and hide it while the hero or product photo is on screen.
- [ ] **8.4** Add a sticky bottom bar on mobile once the hero has scrolled off: "$[36] · Free fit exchanges · [Shop the cap]".
- [ ] **8.5** At tablet width (768–1024 px), check the hero split, the product card and the reviews grid. Cut the number of columns rather than shrinking the text.

**Pass test:** on a real phone, the headline reads without zooming, the CTA works with one thumb, the product is clear within 5 seconds, nothing overlaps, and there is no sideways scroll. The page also looks right on a real tablet.

---

### Criterion 9: Technical and tracking (2 → 5)

**What a 5 looks like:** add-to-cart adds the right variant, images load eagerly above the fold and lazily below it, mobile LCP is under 2.5 s, headings are correct, SEO fields are set, and analytics and A/B testing are live.

#### 9a. Indexing (do this at launch, not before)

- [ ] Remove `<meta name="robots" content="noindex,nofollow">`.
- [ ] Add `/robots.txt`:

```
User-agent: *
Allow: /
Disallow: /account
Disallow: /cart
Disallow: /api/
Sitemap: https://[your-domain]/sitemap.xml
```

- [ ] Add `/sitemap.xml` listing `/`, `/products/cream-rope-cap`, `/collections/all`, `/pages/about-us` and `/pages/5-reasons`.
- [ ] Meta description: "Embroidered golf hats made for women golfers and the friends who play with them. Free fit exchanges."
- [ ] Optional: Product structured data (JSON-LD) with price and availability. Only add `aggregateRating` once the reviews are real.

#### 9b. Ad tracking (blocked today)

The site's security policy is `script-src 'self'; connect-src 'self'; img-src 'self' data:`, which blocks every third-party pixel. Choose one of these:

- **Option A, recommended: server-side events.** Send Purchase, AddToCart, ViewContent and Lead from your backend (the existing `/api/analytics`) to the Meta Conversions API and the TikTok Events API. You don't need to change the security policy.
- **Option B: browser pixels plus server events.** Load each pixel's setup code from a file on your own site (e.g. `/pixels.js`), never inline, and allow only the vendor domains. Typical additions:

```
script-src  'self' https://connect.facebook.net https://analytics.tiktok.com;
connect-src 'self' https://www.facebook.com https://analytics.tiktok.com;
img-src     'self' data: https://www.facebook.com https://analytics.tiktok.com;
```

These are the domains each vendor usually needs; check every vendor's current docs, because they change. With A and B together, send a shared `event_id` so the two sources don't count events twice.

- [ ] Verify with Meta Events Manager's "Test events" and TikTok's Pixel Helper before spending on ads.
- [ ] Set up a split test using Replo split links, or your own 50/50 split with a "variant" field in `/api/analytics`. Run the SOP's first test, the headline.

#### 9c. Speed (mobile LCP is 6.9 s today on slow 4G; the target is under 2.5 s)

| Asset | Now | Change to |
|-------|-----|-----------|
| Hero image `hero-forward-hd.webp` | 1672×941, 270 KB, no srcset | Two sizes: 800w (≤ 90 KB) and 1600w (≤ 200 KB) via `srcset` and `sizes="100vw"`; add `fetchpriority="high"` and a `<link rel="preload" as="image" imagesrcset=… imagesizes="100vw">` |
| Hero video `hero-forward.mp4` | 2.7 MB downloaded on mobile | Only set the video `src` on screens ≥ 768 px wide (`matchMedia`). Skip it when `navigator.connection.saveData` is on. Add a `poster`. A mobile encode, if used, should be ≤ 1 MB |
| Headline image `embroidered-headline-left.webp` | 183 KB image used as the H1 | Live text in the stitch font (woff2, `font-display: swap`, preloaded) |
| Badge `golfer-badge.webp` | 850×850, 130 KB, shown at 48 px | 144×144, ≤ 12 KB (96 px on mobile) |
| Wordmark `embroidered-wordmark.webp` | 720×130, 80 KB, shown at 90–145 px | 300 px wide, ≤ 15 KB, or an SVG |
| Hidden cap cutouts (two images rendered at 0×0) | Load on every visit | Lazy-load them, or remove them until shown |
| Below-fold photos | Already lazy-loaded | Keep as is; add `srcset` |

**Pass test:** PageSpeed Insights on mobile shows LCP under 2.5 s, CLS under 0.1 and INP under 200 ms. Page weight on mobile is under 1 MB at first view.

#### 9d. Buy flow (launch)

- [ ] On `/products/cream-rope-cap`, "Add to cart" must add the correct variant for every tier: 1 cap, 2 caps and 3 caps.
- [ ] Place a real test order for each tier through checkout, then refund it.
- [ ] Make sure bundle discounts and free shipping show up in the cart and at checkout.
- [ ] Confirm `/collections/all` lists the cap; it shows "There are no hats available yet" today.

#### 9e. Headings and accessibility

- [ ] One live-text H1, and an H2 for each section.
- [ ] Every image has alt text (the header wordmark's is empty today; decorative images can stay empty).
- [ ] Text contrast of at least 4.5:1 over the hero photo, with a darker overlay if needed.

---

## 3. Order of work

| Phase | When | Changes | Expected score |
|-------|------|---------|---------------:|
| **Phase 1: pre-launch** | Now | 1.1–1.2, 2 (except reviews), 3.1–3.4 (pre-launch hero), 4.6 waitlist, 5.3, 6.1–6.4, 7.1–7.4, 8.1–8.5, 9b, 9c, 9e | ~70–75 (no price, reviews or buy flow yet) |
| **Phase 2: fit panel** | 2–4 weeks before the drop | 5.1–5.2: collect reviews and clips, write the founder story | — |
| **Phase 3: launch day** | The drop | 1.3–1.6, 3.2 (launch hero), 4.1–4.5, 5.2, 9a, 9d | **100** |
| **Phase 4: after launch** | Weekly | Re-score with the rubric; run the SOP's tests (headline → offer → CTA → hero visual → proof) | Hold at 90+ while the tests run |

---

## 4. Final QA checklist (all must be ticked to score 100)

- [ ] Rubric scored by someone who didn't build the page: 5/5 on all 9 criteria
- [ ] All 5 beliefs visible, each with its own block
- [ ] Hero passes the 3-second test on a real phone
- [ ] Price, bundle saving and guarantee readable at the buy box in 2 seconds
- [ ] All 4 trust triggers present; every number backed by a source file
- [ ] 4+ CTAs with different copy; none loops back to itself
- [ ] Same header, footer and wordmark on every route
- [ ] All tap targets ≥ 44 px; no overlaps; no sideways scroll; tablet checked
- [ ] PageSpeed mobile: LCP < 2.5 s, CLS < 0.1, INP < 200 ms
- [ ] noindex removed; robots.txt and sitemap.xml live
- [ ] Meta and TikTok events verified in their test tools
- [ ] Test order placed and refunded for every tier
- [ ] Every cold ad points to the listicle; every retargeting ad's promise matches the hero
