# Bogey Baby Journal: SEO blog plan

**Status:** draft plan. Nothing here is published, committed or linked from the site.
**Prepared:** 18 Nov 2026.
**Drafts go in:** `content/blog/<slug>.mdx`. Images go in `storefront/public/journal/<slug>/` once a route exists.
**Proposed URL:** `/journal/<slug>`. This matches P-21 "Journal" and the footer "Journal" link in `docs/bogey-baby-site-build-plan.md`. No journal route exists in `storefront/src/app` yet, so building it (Article JSON-LD, breadcrumbs, product block, C-16 signup) comes before the first publish.

---

## Contents

1. [Strategy](#1-strategy)
2. [How the seo-skills methods were applied](#2-how-the-seo-skills-methods-were-applied)
3. [What the research showed](#3-what-the-research-showed)
4. [Customer journey map](#4-customer-journey-map)
5. [Topic clusters](#5-topic-clusters)
6. [Article ideas (37)](#6-article-ideas-37)
7. [Cannibalization and consolidation decisions](#7-cannibalization-and-consolidation-decisions)
8. [Internal linking plan](#8-internal-linking-plan)
9. [Writing briefs for the 15 P1 articles](#9-writing-briefs-for-the-15-p1-articles)
10. [Writing rules](#10-writing-rules)
11. [Brand fact sheet for writers](#11-brand-fact-sheet-for-writers)
12. [Publishing order, batches and measurement](#12-publishing-order-batches-and-measurement)
13. [Sources](#13-sources)

---

## 1. Strategy

We write for women who play golf for the company, centering Black women golfers: beginners through mid-handicappers, roughly 25 to 55, who want to look like they belong on the first tee and keep running into the same three hat problems: caps that swallow a smaller head, caps that fight their hair (ponytails, buns, braids, locs, curls), and long rounds in strong sun. The blog answers the questions she types before she knows Bogey Baby exists (what to wear for a first round, hat etiquette, golf terms, where to find Black women's golf groups, what to pack for a girls' trip) and the questions she types once she knows her problem (a golf hat with a ponytail hole, golf hats for small heads, visor or hat, what UPF 50+ means). Each post solves the reader's problem first with sourced facts, then routes her, through contextual links in the top 40% of the body and one product callout, to the page that sells the fix: `/collections/ponytail-caps`, `/products/small-fit-performance-cap`, `/collections/performance`, `/collections/visors`, `/collections/rope-caps`, and `/pages/golf-buddy` for groups and gifts, with `/pages/fit-guide` and `/pages/shipping-returns` (free fit exchanges within 30 days) taking the risk out. What we want her to do: click through to a collection or product page, and on gift, trip and group posts, take the 2-hat (10% off) or 3-hat (15% off) bundle. Product and collection pages are built to convert and carry little text, so the blog supplies the topical depth and internal links that help them rank, and it gives Google and AI assistants specific, checkable facts to quote (which of our hats have a ponytail opening, which are made with UPF 50+ fabric, which is made in a small fit).

---

## 2. How the seo-skills methods were applied

Skills read in full: `seo/content-coverage`, `seo/blitz-seo`, `seo/seo-title-optimization`, `seo/internal-linking`, `seo/vs-and-alternatives`, `seo/reddit-serp`, `content/scribiz`, `content/unslop-seo`, `content/intro` (+ `examples.md`), `content/seo-blog-images`, `copywriting/understand-customers`, `marketing/customer-journey`. Skimmed: `seo/proof-kb`, `seo/blog-refresher`, `seo/dataforseo-serp`, `copywriting/blitz-copy`, and the README's workflow chains.

**No paid tools were used.** Ahrefs, DataForSEO, AI SEO Tracker and Scribiz MCP were not available. There are **no search volumes, keyword difficulty scores or traffic numbers in this plan.** Every priority (P1/P2/P3) is my judgement from the public signals listed in section 3.

| Skill | How it was applied here | Public-signal substitute for paid data |
| --- | --- | --- |
| `customer-journey` | 5-stage map (section 4) with prompts written the way a woman golfer types them into Google or ChatGPT. | Google autocomplete for about 150 seed queries. |
| `understand-customers` | Language bank, nightmare scenario, desired outcome and beliefs to affirm or challenge (section 3.3). Copy angles use her words. | Forum posts, the owner's earlier research quoted in the build plan, autocomplete phrasing. |
| `content-coverage` | Prompt clusters grouped by intent, one page per intent, a `new / rewrite / consolidate` decision for each (section 7), batches capped at 5, a batch manifest (section 12), and a stop-for-approval checkpoint before drafting. | Autocomplete clusters replace AI SEO Tracker "missing prompts". Top-ranking pages were opened instead of MCP citation sources. |
| `dataforseo-serp` (skim) | Its "fewer than 10 queries: web search fallback, tag source=websearch, skip CPC filters" rule was followed. SERP shape for each main query was spot-checked with web search and by opening the pages. | Web search plus page fetches. |
| `blitz-seo` | One money keyword and one money page get the most internal links: **"golf hat with ponytail hole" -> `/collections/ponytail-caps`**. Secondary target: `/products/small-fit-performance-cap`. The skill says not to run the 30-day sprint on a brand-new domain, so pre-launch we only concentrate links; the sprint starts after indexing (section 12). | No rank data; the target was picked on revenue link (5 of 13 hats) and the size of the autocomplete family. |
| `seo-title-optimization` | Every title puts the primary query first, matches one intent template (how-to, definition, comparison, listicle, checklist), is unique, and the rendered `<title>` (with the layout's ` \| Bogey Baby` suffix) is 60 characters or less. Lengths were checked with a script. | SERP titles seen in web search results. |
| `internal-linking` | Reverse linking from informational posts to money pages, 2-4 contextual links per post, at least 1 in the upper 40% of the body, 3-7 word anchors, 5+ distinct anchors per target, max 3 reuses of any exact anchor, 1 product callout after the problem section, hub and lateral links (section 8). | n/a |
| `vs-and-alternatives` | No `/vs/[competitor]` pages: nobody searches "Bogey Baby vs X" yet and the owner named no competitors. The method is used for **format comparisons** (visor vs hat, structured vs unstructured, rope vs trucker vs dad): verdict in the first 50 words, a "when the other option wins" section, self-contained product blocks. Persona listicles (small heads, braids and locs) follow its honesty gate. | n/a |
| `reddit-serp` | Autocomplete shows Reddit variants for many target queries ("golf hats for small heads reddit", "best golf hats for sun protection reddit", "hats for locs reddit", "do black people need sunscreen reddit", "what to wear to golf lesson reddit"), so Reddit threads rank here. **Reddit was not reachable from this session** (web search refuses reddit.com for this crawler; direct fetches were blocked), so no queue file was built. Section 12 gives the owner the manual steps and reply rules. | Golf Monthly forum and The Sand Trap forum threads. |
| `scribiz` | Planned as the proof pipeline: record fit-panel try-ons (build plan I-7) and interviews with Black women golfers and a licensed stylist, transcribe with Scribiz, and quote only with written consent. This is how real first-hand quotes get into posts later. | Not run (no MCP); listed as a pre-publish task. |
| `proof-kb` (skim) | Section 11 is a single source of truth for product facts, with open questions marked. Writers cite it instead of guessing. | n/a |
| `unslop-seo` | Writing rules (section 10): answer in the first 40 words, question H2s with a 1-2 sentence answer, sentence-case headings, the 20-point slop table, the check script with 0 hits required. | n/a |
| `intro` | Intro pattern per intent, 80-120 words, journey teaser linked to H2 anchors, 2-4 bold hooks, varied closing lines (section 10.3). | n/a |
| `seo-blog-images` | Image idea per P1 brief: real photos for anything showing our hats or people, deterministic SVG for tables, charts and diagrams, AI only for people-free, product-free scenes; filename, alt, size and placement rules (section 10.6). | n/a |

---

## 3. What the research showed

### 3.1 Demand signals (Google autocomplete, US English, 18 Nov 2026)

Autocomplete shows what people type; it does not show how many. Clusters that came back with long, specific tails (my reading of "real demand"):

- **Ponytail:** golf hat with ponytail hole, women's golf hat with ponytail hole, best women's golf hat with ponytail hole, high ponytail golf hat, high pony golf hat, golf bucket hat with ponytail hole, how to wear a hat with a high ponytail, how to wear a baseball cap with a ponytail.
- **Small heads:** golf hats for women with small heads, women's golf hats for small heads, golf caps for smaller heads, golf hats for small heads reddit, fitted golf hats for small heads, small fit hats for women, hats are too big for me, how to make a hat smaller, how to make a snapback smaller, women's hat size chart, average women's hat size.
- **Hair and hats:** golf hairstyles with hat, golf hairstyles with visor, golf hat hairstyles, how to wear a golf hat with long hair, how to wear a hat with braids, how to wear a cap with braids, how to wear a hat with knotless braids, how to wear a hat with locs, hats for locs women, hats for braids, how to wear a hat with natural hair, how to wear a cap with natural hair, visor for curly hair, how to wear a visor with curly hair, how to prevent hat hair women.
- **Visor vs hat and sun:** golf visor vs hat, why do golfers wear visors instead of hats, do women golfers wear visors, are visors good for sun protection, women's golf hats for sun protection, best golf hats for sun protection women, what does upf 50 mean on a hat, what makes a hat upf 50, upf golf bucket hat, can you wear a bucket hat golfing, golf hats for hot weather, best golf hat for sweaty heads.
- **Darker skin and sun:** do black people need sunscreen, do black people need sunscreen to prevent skin cancer, sunscreen for dark skin no white cast, best sunscreen for black skin with hyperpigmentation.
- **What to wear:** what to wear golfing for the first time ladies, what to wear golfing women casual, what to wear golfing women plus size, what to wear golfing when it's cold women, what to wear to topgolf women, what to wear to topgolf date, what to wear to topgolf work event women, what to wear to driving range female, what to wear to a golf lesson female, golf tournament outfit women, golf outfits for women over 50.
- **Etiquette and words:** golf hat etiquette, can you wear a hat in a golf clubhouse, do you have to wear a hat golfing, can you wear a backwards hat golfing, can you wear a beanie golfing, golf terms for beginners, golf lingo, what is a bogey in golf, bogey golf meaning origin, 19th hole meaning.
- **Black women in golf:** black women golfers, black women golf club near me, black women golf club atlanta, black women's golf club chicago, black women golf groups, black girls golf atlanta / houston / dc / charlotte / dallas / chicago, black female golfers 2026, black lpga golfers, african american female golfers, first black woman lpga, wake robin golf club, women of color golf.
- **Gifts, trips, groups:** gifts for women golfers, golf gifts for women who have everything, golf gifts for women under $25, christmas gifts for women golfers, golf gift for mom, girls golf trip, girls golf trip ideas, girls golf trip gifts, ladies golf trips 2026, golf trip packing list, golf bachelorette party ideas, golf bachelorette outfit, golf bachelorette hats, matching golf hats, golf trip hats.
- **Hat styles and care:** rope hats golf, rope hats for women, what is a rope hat, what is the purpose of a rope hat, golf hat vs trucker hat, golf hat vs dad hat, dad hat vs trucker hat, unstructured vs structured cap, golf hat low profile, how to wash a golf hat without ruining it, best way to clean golf hat sweat stain, how to clean white golf hat.

### 3.2 What the top-ranking pages do and miss (pages opened)

- **"Best golf hats" roundups are men-first.** GOLF.com's best-hats list (Jul 2023) names nine hats and one women's hat. It never mentions small heads. The Golf Monthly women's hats page title promises caps, buckets and beanies, but the body did not load for us.
- **"Golf hats for small heads" is owned by thin affiliate pages.** The ranking ThinkIndoor page gives no way to measure, never defines "small", mentions women once, and contradicts its own fit claims. Gap: a women-first page that explains why caps swallow small heads and how to check a hat before buying.
- **"Golf hairstyles for Black women" is weak.** The GolferHive page cites no stylist, no source and no wearer testing, and pushes affiliate products. Gap: hat-construction advice by hairstyle, written with real Black women golfers and a named stylist.
- **Visor vs hat:** a Druids guide (Sep 2026) is balanced and specific (visor = airflow, exposed scalp; cap = scalp shade; bucket = widest shade). Nobody frames it for women with ponytails, curls or braids.
- **What to wear for a first round:** guides agree on the basics (check the dress code, collared or sleeveless tops, shorts, skorts or pants, comfortable shoes). Golf Monthly (Jul 2025) reports that dress codes vary club to club and often scare beginners more than they should. Glenmuir notes visors are especially popular with women golfers.
- **Topgolf:** most ranking pages guess at a dress code. Topgolf's own FAQ says "Technically, we do not have a formal/golf dress code" and bans metal spikes.
- **Girls' golf trip packing:** the Golf Digest team's list (Nov 2025) does not mention hats at all.
- **Black women's golf groups:** a Queens At Work roundup (Mar 2025) lists five groups. Wake-Robin Golf Club's own site documents its 1937 founding. Gap: a single, checked, current directory.
- **Gift guides:** Sunday Golf's 50 gifts (Dec 2025) includes one hat. Gift guides are dominated by clubs, rangefinders and bags.
- **Rope hats:** GOLF.com's rope-hat roundup (Feb 2021) lists no women's styles. Imperial's explainer gives a history timeline with no sources.

### 3.3 Customer understanding (understand-customers)

- **Who she is:** a woman who plays for the people (league nights, Saturday tee times, girls' trips, lunch after), often newer to the game, style-aware, under-served by pro shops. NGF counts a record 8.1M female on-course golfers in 2025, and 36% of the 3.3M beginners that year were female ([NGF, 2026](https://www.ngf.org/wp-content/uploads/2026/03/Female-1-pager-2026.pdf)).
- **Nightmare scenario:** standing on the first tee in a baggy pro-shop cap that slides over her eyes, a ponytail hole that sits halfway up her scalp, a burned part by the 9th hole, and hat hair at lunch. Feeling like the one person who doesn't belong.
- **Her words (verbatim where sourced):**
  - "everything I've tried in AG or local pro shops are HUGE" ([Golf Monthly forum, Aug 2020](https://forums.golfmonthly.com/threads/golf-hats.106360/); the poster does not say their gender)
  - From the owner's earlier research, quoted in the build plan: "shrunk and pinked", "the last thing you want is to show up at the first tee looking out of place", "I have a smaller head", "matches my outfit", "lunch after the round".
  - Search phrasing: "golf hats for women with small heads", "high pony golf hat", "how to wear a hat with knotless braids", "hats for locs women", "visor for curly hair", "what to wear golfing for the first time ladies casual", "do black people need sunscreen".
- **Magic-wand outcome:** a hat that fits the first time, works with her hair, looks like her, and matches the group photo.
- **Belief to affirm:** "Golf hats aren't made for me." We agree, and fix it.
- **Beliefs to challenge, gently:** "I need to be good before I dress the part." "Dark skin doesn't need sunscreen." (The AAD calls this a misbelief.)
- **What women golfers try first:** men's or unisex one-size caps, youth caps, visors because nothing else works with their hair.

---

## 4. Customer journey map

Prompts are written the way people type them. Use them later as tracked prompts in an AI-visibility tool, and as FAQ questions.

### Stage 1: Unaware (she has a golf plan, not a hat problem)
- **Mindset:** "I said yes to golf. What do I wear, what do people say, who do I play with?"
- **Prompts:** "what should I wear to my first golf outing with work", "is it rude to keep my hat on in the clubhouse", "what does the turn mean in golf", "are there black women golf groups in atlanta", "what do I pack for a girls golf weekend", "what do you wear to topgolf on a date"
- **Content:** first-round outfit guide, hat etiquette, golf terms, Black women's golf groups, history, packing list, Topgolf. Soft CTAs to `/collections/all` and the Cream Rope Cap.

### Stage 2: Problem-aware (the hat is the problem)
- **Mindset:** "Every cap is too big / my ponytail won't fit / my part burns / my braids don't fit under it."
- **Prompts:** "why are all golf hats too big for me", "golf hat that works with a high ponytail", "how do I wear a cap with box braids", "my part always gets sunburned golfing", "do I need sunscreen as a black woman playing golf", "how do I stop hat hair after golf"
- **Content:** small heads, braids and locs, hairstyles, darker-skin sun protection, hat hair. CTAs to the specific fix.

### Stage 3: Solution-aware (she knows the type of hat she needs)
- **Mindset:** "Ponytail cap or visor? UPF or not? Structured or soft?"
- **Prompts:** "best women's golf hat with a ponytail hole", "visor or cap for golf in hot weather", "what does UPF 50 mean on a hat", "can you wear a bucket hat golfing", "structured vs unstructured cap for a small head", "what is a rope hat"
- **Content:** ponytail pillar, visor vs hat, UPF 50+, bucket hats, structured vs unstructured, rope hats. CTAs to collections.

### Stage 4: Product-aware (she has found Bogey Baby)
- **Mindset:** "Is the golfer stitched? Which of their hats is for me? What if it doesn't fit?"
- **Prompts:** "bogey baby small fit cap", "is the bogey baby golfer embroidered", "which bogey baby hat has a ponytail hole", "bogey baby exchange policy"
- **Content:** embroidered vs printed, which golf hat should I buy. Most of this stage is served by existing site pages (`/pages/faq`, `/pages/fit-guide`, `/pages/shipping-returns`), so the blog links to them rather than repeating them.

### Stage 5: Most aware (ready to buy, often for more than one person)
- **Mindset:** "Hats for the whole foursome / a gift that fits."
- **Prompts:** "matching golf hats for a girls trip", "golf gift for my mom who just started", "bogey baby golf buddy bundle"
- **Content:** gifts, bachelorette, matching hats. CTA to `/pages/golf-buddy` (2 hats 10% off, 3+ 15% off).

---

## 5. Topic clusters

Each cluster has one pillar, its supporting posts, the journey stages it covers and the money pages it feeds. ★ = P1.

| Cluster | Pillar | Supporting posts | Stages | Money pages fed |
| --- | --- | --- | --- | --- |
| **A. Hair and hats** | ★ `golf-hat-with-ponytail-hole` | ★ `golf-hat-with-braids-locs`, ★ `golf-hairstyles-with-hat`, `golf-hat-hair`, `visor-with-curly-hair`, `golf-hat-with-a-bun` | Problem-aware, solution-aware | `/collections/ponytail-caps` (blitz target), `/collections/visors`, `/products/back-nine-ponytail-cap`, `/products/front-nine-ponytail-cap` |
| **B. Fit** | ★ `golf-hats-small-heads` | `structured-vs-unstructured-hats`, `which-golf-hat-should-i-buy`, `how-to-make-a-hat-smaller` | Problem-aware, solution-aware, product-aware | `/products/small-fit-performance-cap`, `/pages/fit-guide`, `/pages/shipping-returns` |
| **C. Sun and heat** | ★ `golf-visor-vs-hat` | ★ `upf-50-golf-hat-meaning`, ★ `golf-sunscreen-darker-skin`, `best-golf-hats-sun-protection-women`, `bucket-hat-golfing`, `visor-sunburn-scalp` | Problem-aware, solution-aware | `/collections/performance`, `/collections/visors`, `/collections/bucket-hats`, `/products/19th-hole-bucket` |
| **D. First rounds** | ★ `what-to-wear-golfing-women` | ★ `golf-hat-etiquette`, ★ `golf-terms-for-beginners`, `what-to-wear-to-topgolf`, `what-to-wear-driving-range`, `cold-weather-golf-outfit-women`, `golf-dress-code-women`, `how-to-start-golfing-women`, `what-is-a-bogey-in-golf` | Unaware | `/collections/all`, `/products/cream-rope-cap`, `/products/tee-time-dad-cap`, `/products/winter-rules-beanie` |
| **E. Good company: Black women in golf** | ★ `black-women-golf-groups` | ★ `black-women-golf-history`, `womens-golf-leagues-beginners` | Unaware | `/pages/about-us`, `/collections/embroidered`, `/pages/golf-buddy` |
| **F. Gifts, trips and groups** | ★ `gifts-for-women-golfers` | ★ `girls-golf-trip-packing-list`, `golf-bachelorette-party-ideas`, `matching-golf-hats`, `golf-gifts-for-mom` | Most aware (buyers and gift-givers), unaware | `/pages/golf-buddy`, `/collections/all` |
| **G. Hat styles and care** | `which-golf-hat-should-i-buy` (hub, P2) | ★ `what-is-a-rope-hat`, `golf-hat-vs-trucker-vs-dad-hat`, `embroidered-vs-printed-hats`, `how-to-wash-a-golf-hat` | Solution-aware, product-aware, customers | `/collections/rope-caps`, `/collections/embroidered`, `/collections/caps`, `/products/cream-rope-cap` |

Cluster G's hub is P2; until it ships, the rope-hat post links up to `/collections/caps` instead.

---

## 6. Article ideas (37)

Link shorthand: `C:` = `/collections/`, `P:` = `/products/`, `PG:` = `/pages/`. Siblings in the same cluster are linked too (section 8). Priority is my judgement, not measured volume. **★ = one of the 15 P1 articles to write first.**

| # | ★ | Slug | Working title | Primary keyword | Secondary keywords | Intent | Stage | Angle that makes ours worth reading | Internal links | Pri |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | ★ | `golf-hat-with-ponytail-hole` | Golf Hat With a Ponytail Hole: How to Choose | golf hat with ponytail hole | women's golf hat with ponytail hole; ponytail golf hat; high ponytail golf hat; golf cap ponytail | Commercial investigation (how-to guide) | Solution-aware | Explains the three designs (concealed opening, open back with elastic bands, visor) by where she wears her hair, with an honest "for a bun, pick the open back or a visor". Retail pages only list products. | C:ponytail-caps, P:back-nine-ponytail-cap, P:front-nine-ponytail-cap, C:visors, PG:fit-guide | P1 |
| 2 | ★ | `golf-hat-with-braids-locs` | How to Wear a Golf Hat With Braids or Locs | how to wear a hat with braids | how to wear a hat with locs; how to wear a cap with natural hair; hats for locs women; hats for braids | Informational (how-to) | Problem-aware | Matches hat construction (profile, structure, opening, brim) to each style, written with Black women golfers and a named stylist. The ranking page cites nobody. | C:ponytail-caps, P:back-nine-ponytail-cap, C:visors, C:bucket-hats, PG:about-us | P1 |
| 3 | ★ | `golf-hairstyles-with-hat` | Golf Hairstyles Under a Hat: 9 Easy Looks | golf hairstyles with hat | golf hairstyles for women; golf hairstyles with visor; golf hat hairstyles; how to wear a golf hat with long hair | Informational (listicle) | Problem-aware | Each style is paired with the hat that suits it and the one thing to watch, including box braids, a puff and short natural hair, not only blowouts. | C:ponytail-caps, C:visors, C:bucket-hats, P:tee-time-dad-cap | P1 |
| 4 | ★ | `golf-hats-small-heads` | Golf Hats for Women With Small Heads | golf hats for women with small heads | women's golf hats for small heads; golf caps for smaller heads; best golf hats for small heads; hats are too big for me | Commercial investigation | Problem-aware | Explains why caps swallow small heads (crown height, structure, one-size ranges) and how to check a hat before buying. Competing pages never say how to measure. | P:small-fit-performance-cap, PG:fit-guide, PG:shipping-returns, P:front-nine-ponytail-cap, C:caps | P1 |
| 5 | ★ | `golf-visor-vs-hat` | Golf Visor vs Hat: Which Is Better for You? | golf visor vs hat | golf hat or visor; why do golfers wear visors instead of hats; are visors good for sun protection; do women golfers wear visors | Comparison | Solution-aware | Two-sentence verdict up top, then hair, heat, scalp and sweat as the deciding factors. Includes "when a visor is the better choice". | C:visors, C:performance, C:bucket-hats, P:clubhouse-visor, P:19th-hole-bucket | P1 |
| 6 | ★ | `upf-50-golf-hat-meaning` | What Does UPF 50+ Mean on a Golf Hat? | what does upf 50 mean on a hat | upf golf hats; what makes a hat upf 50; upf golf bucket hat; upf vs spf | Informational (definition) | Problem-aware / solution-aware | Skin Cancer Foundation definitions, plain-English, plus what a hat still leaves exposed (ears, neck, part) and which of our hats use UPF 50+ fabric. | C:performance, P:back-nine-ponytail-cap, P:small-fit-performance-cap, P:19th-hole-bucket | P1 |
| 7 | ★ | `golf-sunscreen-darker-skin` | Golf Sun Protection for Darker Skin | do black people need sunscreen | sunscreen for dark skin; tinted sunscreen golf; golf sun protection for women | Informational | Problem-aware | Written for Black women golfers using AAD and Skin Cancer Foundation guidance: tinted SPF 30+, how much and how often on a four-hour round, places people miss, hats. Golf content almost never addresses darker skin. | C:performance, P:19th-hole-bucket, P:back-nine-ponytail-cap, PG:about-us | P1 |
| 8 | ★ | `what-to-wear-golfing-women` | What to Wear Golfing for the First Time (Women) | what to wear golfing for the first time ladies | what to wear golfing women; what to wear to golf course women; first time golfing what to wear; golf outfits for women | Informational (how-to + checklist) | Unaware | The build plan's first journal topic. Calm, dress-code-aware, "you'll look like you belong" angle with three outfit formulas by weather, and the hat as the easy finishing piece. | C:all, P:cream-rope-cap, P:tee-time-dad-cap, C:visors, PG:fit-guide | P1 |
| 9 | ★ | `golf-hat-etiquette` | Golf Hat Etiquette: When to Take Your Hat Off | golf hat etiquette | can you wear a hat in a golf clubhouse; do you have to wear a hat golfing; can you wear a backwards hat golfing; golf hat rules | Informational | Unaware | Separates customs from rules, covers the 2026 "hat off on 18?" debate, and the hat-hair problem women actually face when the hat comes off. | C:caps, C:visors, P:winter-rules-beanie, P:tee-time-dad-cap | P1 |
| 10 | ★ | `golf-terms-for-beginners` | Golf Terms for Beginners: 40 Words to Know | golf terms for beginners | golf lingo; what is a bogey in golf; 19th hole meaning; the turn golf meaning | Informational (glossary) | Unaware | Grouped by where she'll hear each term (range, course, card, clubhouse). Our hats are named after these terms, which gives every product a natural link. | C:all, PG:about-us, P:front-nine-ponytail-cap, P:19th-hole-bucket | P1 |
| 11 | ★ | `black-women-golf-groups` | Black Women's Golf Groups and Clubs to Join | black women golf groups | black women golf club near me; black women's golf clubs; black girls golf; women of color golf | Informational (directory) | Unaware | A checked, current directory, each group verified on its own site on the day of writing, with who it's for and how to join. | PG:about-us, PG:golf-buddy, C:all | P1 |
| 12 | ★ | `black-women-golf-history` | Black Women in Golf: History From 1937 to Today | black women in golf | first black woman lpga; black female golfers; african american women golfers; wake robin golf club | Informational | Unaware | Wake-Robin, Ann Gregory, Althea Gibson, Renee Powell, sourced with dates. A brand that centers Black women golfers should own this page. | PG:about-us, C:embroidered | P1 |
| 13 | ★ | `gifts-for-women-golfers` | Gifts for Women Golfers: 25 Ideas She'll Use | gifts for women golfers | golf gifts for women; golf gifts for women who have everything; christmas gifts for women golfers; golf gifts under $50 | Commercial (listicle) | Most aware (gift-giver) | Grouped by budget and by "how well do you know her golf". Solves the gift-giver's fear: buying a hat without knowing her size (free fit exchanges). | C:all, PG:golf-buddy, PG:fit-guide, PG:shipping-returns, P:cream-rope-cap | P1 |
| 14 | ★ | `girls-golf-trip-packing-list` | Girls' Golf Trip Packing List (Checklist) | girls golf trip packing list | golf trip packing list; girls golf weekend; ladies golf trips; what to pack for a golf trip women | Informational (checklist) | Unaware / most aware | The ranking Golf Digest list skips hats. Ours packs one hat per weather, a sun kit, and matching hats for the group, plus a shareable checklist. | PG:golf-buddy, C:performance, C:visors, P:winter-rules-beanie, P:19th-hole-bucket | P1 |
| 15 | ★ | `what-is-a-rope-hat` | What Is a Rope Hat? Golf's Classic Cap | what is a rope hat | rope hats golf; rope hats for women; what is the purpose of a rope hat; golf rope hat | Informational (definition) | Solution-aware | Honest that the rope has no documented origin story (ranking pages repeat unsourced history), and the only women-first take. Our flagship is a rope cap. | C:rope-caps, P:cream-rope-cap, P:sunwashed-rope-cap, C:embroidered | P1 |
| 16 | | `golf-hat-hair` | How to Prevent Hat Hair After a Round of Golf | how to prevent hat hair women | hat hair; golf hat hair; how to combat hat hair | Informational | Problem-aware | The lunch-after moment. Practical fixes by hair type, and when a visor or unstructured cap helps. | C:visors, C:ponytail-caps, P:tee-time-dad-cap | P2 |
| 17 | | `structured-vs-unstructured-hats` | Structured vs Unstructured Golf Hats: Which Fits You? | unstructured vs structured cap | golf hat low profile; what does low crown mean; structured vs unstructured hat | Comparison | Solution-aware | Our catalog spans unstructured low, light-structured low, semi-structured high and structured mid profiles, so one table shows every shape. | C:caps, P:small-fit-performance-cap, P:cart-path-trucker, P:sunwashed-rope-cap, PG:fit-guide | P2 |
| 18 | | `golf-hat-vs-trucker-vs-dad-hat` | Golf Hat vs Trucker Hat vs Dad Hat: What's the Difference? | golf hat vs trucker hat | golf hat vs dad hat; dad hat vs trucker hat; golf hat vs baseball cap | Comparison | Solution-aware | Defines each by construction (panels, structure, back, closure) using our own hats as examples; notes that sources disagree on "golf cap" brims. | P:tee-time-dad-cap, P:cart-path-trucker, C:rope-caps, C:caps | P2 |
| 19 | | `bucket-hat-golfing` | Can You Wear a Bucket Hat Golfing? | can you wear a bucket hat golfing | bucket hat golf women; golf bucket hat women; golf bucket hat with ponytail hole | Informational | Solution-aware | Yes, and when it beats a cap (all-round shade) or loses (warmth, wind). Honest that neither of our buckets has a ponytail opening. | C:bucket-hats, P:19th-hole-bucket, P:weekend-bucket-hat | P2 |
| 20 | | `best-golf-hats-sun-protection-women` | Best Golf Hats for Sun Protection (Women) | best golf hats for sun protection women | women's golf hats for sun protection; women's golf hats wide brim; golf sun protection hats | Commercial (buying guide) | Solution-aware | Ranks hat types by coverage with SCF's 3-inch brim guidance. Honest that we don't make a wide-brim hat; other brands only with facts checked on their own pages that day. | C:performance, P:19th-hole-bucket, C:visors | P2 |
| 21 | | `what-to-wear-to-topgolf` | What to Wear to Topgolf: Outfit Ideas for Women | what to wear to topgolf women | what to wear to topgolf date; topgolf work event outfit women; what to wear to topgolf in winter | Informational | Unaware | Quotes Topgolf's own FAQ ("no formal/golf dress code"; no metal spikes) where ranking pages guess. Outfits for date, work event, winter. | C:caps, C:visors, P:cart-path-trucker, P:winter-rules-beanie | P2 |
| 22 | | `what-to-wear-driving-range` | What to Wear to the Driving Range or a Golf Lesson | what to wear to driving range female | what to wear to a golf lesson female; what to bring to a golf lesson; first golf lesson outfit | Informational | Unaware | Glenmuir's useful distinction: a range attached to a club follows the club's dress code; a standalone range is relaxed. | P:range-day-mesh-cap, P:weekend-bucket-hat, C:all | P2 |
| 23 | | `cold-weather-golf-outfit-women` | What to Wear Golfing When It's Cold (Women) | what to wear golfing in cold weather women | winter golf women outfits; can you wear a beanie golfing; golf beanies for women | Informational | Problem-aware | Layering guide with a head-to-toe checklist. Publish by early October. | P:winter-rules-beanie, P:the-turn-cord-cap, C:beanies | P2 |
| 24 | | `golf-dress-code-women` | Golf Dress Code for Women: What You Can Wear | golf dress code women | golf course dress code; can you wear leggings golfing; golf tournament attire women | Informational | Unaware | Item-by-item reference. Consolidation candidate with #8 (section 7). | C:all, C:caps | P3 |
| 25 | | `how-to-start-golfing-women` | How to Start Golfing as a Woman: A First-Year Plan | how to start golfing as a woman | golf for beginners women; golf lessons for beginners women; women's golf leagues for beginners | Informational (pillar-style how-to) | Unaware | NGF beginner numbers, lessons, range, first nine, finding your people (LPGA Amateurs welcomes beginners). | C:all, PG:about-us, PG:golf-buddy | P2 |
| 26 | | `what-is-a-bogey-in-golf` | What Is a Bogey in Golf? Meaning and Origin | what is a bogey in golf | bogey golf meaning origin; bogey golfer; double bogey meaning | Informational (definition) | Unaware | The documented Great Yarmouth (1890) and "Colonel Bogey" origin, and why we named the brand for it ("nobody plays pretty every hole"). | PG:about-us, P:cream-rope-cap | P2 |
| 27 | | `golf-bachelorette-party-ideas` | Golf Bachelorette Party Ideas (and What to Wear) | golf bachelorette party ideas | golf bachelorette outfit; golf bachelorette hats; golf bachelorette theme | Commercial | Most aware | The SERP is thin and mostly about bachelor parties. Ideas, outfits, matching hats via the bundle. No personalization claims. | PG:golf-buddy, C:all, C:visors | P2 |
| 28 | | `embroidered-vs-printed-hats` | Embroidered vs Printed Hats: What's the Difference? | embroidered vs printed hat | embroidered hat vs printed; DTF print hat; what is DTF printing | Informational | Product-aware | Transparency: which of our hats are stitched and which are DTF printed, and how to choose. | C:embroidered, C:performance, P:cream-rope-cap | P2 |
| 29 | | `which-golf-hat-should-i-buy` | Which Golf Hat Should I Buy? A 30-Second Guide | which golf hat should i buy | best golf hat for women; what golf hat should i get; golf hats for women | Commercial (decision guide) | Product-aware | A decision tree by hair, head size and weather that lands on one of 13 hats. Cluster G hub; a text version of the phase-2 quiz. | C:all, C:ponytail-caps, P:small-fit-performance-cap, C:performance, PG:fit-guide | P2 |
| 30 | | `how-to-wash-a-golf-hat` | How to Wash a Golf Hat Without Ruining It | how to wash a golf hat without ruining it | how to clean golf hats; golf hat sweat stain; how to clean a white golf hat; makeup on hat brim | Informational (how-to) | Customer / problem-aware | Cites GOLF.com's four-method test (dishwasher A-, hand wash B, machine D). Notes which of our caps have a makeup-resistant sweatband. | PG:faq, P:front-nine-ponytail-cap, P:cart-path-trucker | P2 |
| 31 | | `how-to-make-a-hat-smaller` | How to Make a Golf Hat Smaller (No Sewing) | how to make a hat smaller | how to make a snapback smaller; what to do if a hat is too big | Informational | Problem-aware | Quick fixes, then the honest alternative: a cap made in a small fit, and free fit exchanges. | P:small-fit-performance-cap, PG:fit-guide, PG:shipping-returns | P3 |
| 32 | | `matching-golf-hats` | Matching Golf Hats for Your Group or League | matching golf hats | golf trip hats; golf hats for groups; golf hats for clubs | Commercial | Most aware | Same hat in different colors, or different hats with one golfer: how to match without looking like a uniform. | PG:golf-buddy, C:all, C:embroidered | P3 |
| 33 | | `visor-sunburn-scalp` | Visor Sunburn: How to Protect Your Part and Hairline | how to protect scalp from sun | scalp sunburn; sunscreen for part; visor sunburn | Informational | Problem-aware | SCF dermatologist advice for the part and hairline. Consolidation candidate with #5 and #6 (section 7). | C:performance, C:caps | P3 |
| 34 | | `golf-hat-with-a-bun` | How to Wear a Golf Hat With a Bun | how to wear a hat with a bun | how to wear a baseball cap with a bun; how to wear a hat with a high ponytail | Informational | Problem-aware | Open back vs visor for buns. Consolidation candidate with #1 (section 7). | P:back-nine-ponytail-cap, C:visors | P3 |
| 35 | | `womens-golf-leagues-beginners` | How to Find a Women's Golf League for Beginners | women's golf leagues for beginners | beginner women's golf league; ladies golf leagues near me; women's golf league near me | Informational | Unaware | Where leagues live (course pro shops, LPGA Amateurs chapters, community groups) and what to ask before joining. | PG:golf-buddy, C:all | P3 |
| 36 | | `golf-gifts-for-mom` | Golf Gifts for Mom (Mother's Day and Birthdays) | golf gift for mom | golf gifts for mom; golf gift ideas for mom; best golf gifts for mom | Commercial (listicle) | Most aware | Seasonal spin-off of #13; publish by mid-April. | C:all, PG:golf-buddy, PG:shipping-returns | P3 |
| 37 | | `visor-with-curly-hair` | How to Wear a Visor With Curly Hair | how to wear a visor with curly hair | visor for curly hair; best visor for curly hair; how to wear a visor with long hair | Informational (how-to) | Problem-aware | Curls up, curls down, pineapple, puff: how a visor sits on each, and when to switch to a cap. | P:clubhouse-visor, C:visors, C:ponytail-caps | P2 |

Totals: 15 P1, 15 P2, 7 P3.

---

## 7. Cannibalization and consolidation decisions

Following `content-coverage` Phase 2 (decide `new / rewrite / consolidate` per target before writing).

| Risk | Decision |
| --- | --- |
| "How to measure your head for a hat" vs the existing `/pages/fit-guide` (H1 "Find your fit in 10 seconds.", HowTo schema) | **Consolidate.** No separate measuring post. Blog posts link to the fit guide. Suggest to the owner (not done here) that the fit guide adds a cm column and a "no tape? use a phone cable" line it already has, so it can win "how to measure hat size for women". |
| #1 ponytail pillar vs #34 bun vs #3 hairstyles | #1 owns "ponytail hole" (product-type query). #3 owns "golf hairstyles" (styling query). #34 ships only if #1 does not rank for bun queries after 90 days; otherwise fold it into #1 as an H2. |
| #2 braids and locs vs #3 hairstyles | Different intents: #2 is "I already have this style, which hat?"; #3 is "which style should I do?". Cross-link both ways with different anchors. |
| #5 visor vs hat, #6 UPF, #20 best sun hats, #33 visor sunburn | #5 = choosing a type; #6 = definition; #20 = buying guide. #33 is folded into #5 and #6 unless "scalp sunburn" queries show up in Search Console. |
| #8 first-time outfit vs #24 dress code | #8 is the pillar. #24 only ships if #8 ranks on page 1 and Search Console shows separate "dress code" queries. |
| #10 golf terms vs #26 bogey | #10 has a short bogey entry linking to #26 for origin depth. |
| #13 gifts vs #36 mom gifts | #36 is a seasonal spin-off with its own intro and picks; it links to #13 for the full list. |
| Blog vs `/pages/5-reasons` | No conflict: the listicle is `noindex`. |
| Blog vs collection pages for "women's golf hats" | The blog does not target the head term "women's golf hats"; `/collections/all` does. Posts link to it instead. |

---

## 8. Internal linking plan

Rules from `internal-linking`, adapted for a new blog:

1. **2-4 contextual links to money pages per post, at least one in the upper 40% of the body** (by character count after frontmatter). Max one inline link per target per post.
2. **Anchors are 3-7 descriptive words.** Never "click here", "this hat", "learn more", "shop now" as an inline anchor.
3. **Each target gets 5+ distinct anchors across the blog; no exact anchor is used more than 3 times sitewide.** Use the anchor bank below and keep a running tally in the batch manifest.
4. **One product callout per post** (two for posts over 2,500 words), placed right after the section that explains the problem and before the fix. Needs a `ProductCallout` component that renders a real `<a href>` (not `onClick`).
5. **Hub and lateral links:** every post links to its cluster pillar and 1-2 siblings; every pillar links to all of its published supporting posts. Visible breadcrumb `Home / Journal / <title>` plus BreadcrumbList JSON-LD.
6. **Never add `rel="nofollow"` to internal links.** Never link a money page whose topic the post does not discuss.
7. `/pages/golf-buddy` is `noindex` (ad landing page). Linking to it is for conversion only, so use it only in gift, group, trip and community posts.
8. Do not link `/pages/reviews` until real reviews exist (it shows nothing before 10 reviews).
9. After each batch, re-run the link-graph script from `seo-skills/seo/internal-linking/SKILL.md` (adjusting `routeOf()` for `/journal/`), aiming for at least 3 contextual inbound links to every collection and product page linked from the blog.

### 8.1 Anchor bank (vary these; tally use per target)

| Target | Anchors to rotate |
| --- | --- |
| `/collections/ponytail-caps` | golf caps with a ponytail opening; caps with a hidden ponytail opening; ponytail caps made for hair up; hats that work around your ponytail; our five ponytail caps; ponytail-friendly golf caps |
| `/products/small-fit-performance-cap` | a cap made in a small fit; the Small Fit Performance Cap; a golf cap sized for smaller heads; our small-fit UPF 50+ cap; a cap built for smaller heads |
| `/pages/fit-guide` | measure your head in 10 seconds; our golf hat fit guide; how each of our hats fits; the fit table for every hat; find your fit before you buy |
| `/collections/performance` | UPF 50+ golf hats; hats made with UPF 50+ fabric; performance hats for hot rounds; our UPF 50+ performance line; sun-ready performance caps |
| `/collections/visors` | a cotton golf visor; visors that leave your hair free; shade for your eyes, nothing on your hair; golf visors for women; the visor option |
| `/collections/bucket-hats` | golf bucket hats; a bucket hat with a brim all the way round; bucket hats for sunny rounds; all-round shade from a bucket |
| `/products/back-nine-ponytail-cap` | open-back cap with elastic cross bands; the Back Nine Ponytail Cap; an open-back UPF 50+ ponytail cap; a cap made for a ponytail or bun |
| `/products/front-nine-ponytail-cap` | the Front Nine Ponytail Cap; a washed-cotton ponytail cap; a low-profile cap with a concealed opening |
| `/products/19th-hole-bucket` | the 19th Hole Bucket; a UPF 50+ performance bucket hat; our striped-band bucket hat |
| `/products/cream-rope-cap` | the Cream Rope Cap; our embroidered cream rope cap; the rope cap that started Bogey Baby; a cream rope golf cap |
| `/collections/rope-caps` | golf rope caps; rope hats made for women golfers; our two rope caps |
| `/collections/embroidered` | embroidered golf caps; hats with our golfer stitched on; the embroidered classics |
| `/pages/golf-buddy` | bring your golf buddy; two hats, 10% off; save 15% on three or more hats; matching hats for the group; the Golf Buddy Pair |
| `/pages/about-us` | why we center Black women golfers; meet our golfer; the story behind Bogey Baby; who we make hats for |
| `/pages/shipping-returns` | free fit exchanges within 30 days; how a fit exchange works; made to order, ships within 10 business days; our shipping and returns |
| `/collections/all` | golf hats made for women; all 13 Bogey Baby hats; our full hat lineup; women's golf hats |

### 8.2 Blitz target

`/collections/ponytail-caps` gets an inline link from at least 6 posts (#1, #2, #3, #16, #29, #37) and the callout on #1 and #2. Owner actions on the page itself (not done here; this plan edits no existing file): a meta title like "Women's Golf Hats With a Ponytail Hole" and the 80-120 word SEO paragraph under the grid that the build plan (P-06) already specifies.

---

## 9. Writing briefs for the 15 P1 articles

Common to every brief:
- **Byline:** "By Bogey Baby" (no invented author names or personas). Real names only when a real person writes or is interviewed, with consent.
- **Rendered title** includes the layout suffix ` | Bogey Baby` (`storefront/src/app/layout.tsx` uses `template: '%s | Bogey Baby'`). Put only the part before the suffix in the frontmatter `title`. All rendered titles below are 60 characters or less; all descriptions are 155 or less (checked with a script).
- **End of every post:** product block (C-10 cards rendered from `products.ts`, so prices stay in one place) and the C-16 signup.
- Sources marked "(opened)" in section 13 are the only external sources a writer may cite without re-checking. Anything marked "verify" must be opened on the day of writing.

---

### P1-1. `golf-hat-with-ponytail-hole` (pillar, cluster A, blitz page feeder)

- **H1:** Golf Hats With a Ponytail Hole: How to Choose One
- **Meta title (57):** Golf Hat With a Ponytail Hole: How to Choose | Bogey Baby
- **Meta description (137):** Concealed opening, open back or visor? How each ponytail golf hat handles a low pony, high pony or bun, and what to check before you buy.
- **Reader's question (representative, not a quote):** "Is there a golf hat my ponytail actually goes through, without the hole sitting halfway up my head?"
- **Intent / stage / length / intro:** commercial investigation, how-to pattern / solution-aware / 1,800-2,300 words / how-to intro.
- **Outline:**
  - Intro (answer in the first 40 words: an opening at the back so hair passes through; three designs; pick by where you wear your hair)
  - H2 What is a ponytail golf hat?
  - H2 Which ponytail design suits your hair?
    - H3 Concealed ponytail opening
    - H3 Open back with elastic cross bands
    - H3 A visor (no crown at all)
    - Table: low ponytail / high ponytail / bun / hair down vs the three designs (fill only with what product facts support; see "must not")
  - H2 Can you wear a ponytail cap with a bun?
  - H2 What else to check: profile, structure, closure and sweatband
  - [ProductCallout here]
  - H2 Our five ponytail caps, side by side (one self-contained block each: name, design, fabric, profile, closure, decoration)
  - H2 Ponytail cap or visor: which is better in the heat? (2 short paragraphs, link to #5)
  - H2 FAQ (3-4 questions: "Can I wear a ponytail cap with my hair down?", "Do ponytail caps work for small heads?", "Is there a bucket hat with a ponytail hole?" (answer honestly: ours don't have one))
- **Key points and external facts:**
  - Visors leave the crown open, so the scalp, hairline and part are exposed and can burn ([Druids, Sep 2026](https://www.druids.com/blogs/golf/golf-cap-vs-visor)).
  - The Skin Cancer Foundation says baseball caps and visors "are good options which will stay in place and provide coverage to your face" ([SCF golf article](https://www.skincancer.org/blog/sun-protection-habits-golf-course/)).
  - Gap to exploit: GOLF.com's best-hats list names one women's hat out of nine ([GOLF.com, Jul 2023](https://golf.com/gear/accessories/best-golf-hats/)). Do not name or rank that hat.
- **Product facts (from `products.ts`):**
  - Concealed ponytail opening: Front Nine Ponytail Cap (100% cotton pigment-washed twill, unstructured six-panel low profile, antique brass tri-glide, Elude makeup-resistant breathable wicking sweatband, embroidered golfer); Range Day Mesh Cap (cotton twill front, polyester mesh back, unstructured low profile, plastic snapback, makeup-resistant sweatband, embroidered); Cart Path Trucker (cotton micro canvas front, polyester mesh back, structured six-panel mid profile, snapback, Elude makeup-resistant breathable sweatband, printed golfer); The Turn Cord Cap (thin-wale corduroy front, mesh back, light-structured low profile, snapback, makeup-resistant moisture-wicking sweatband, printed golfer).
  - Open back: Back Nine Ponytail Cap: "an open back with elastic cross bands for your ponytail or bun", UPF 50+, 100% recycled polyester, unstructured low profile, micro hook-and-loop, antimicrobial sweatband, printed golfer.
  - Visor: Clubhouse Visor: "Shade for your eyes, nothing on your hair", bio-washed cotton chino twill, pre-curved brim, hook-and-loop.
- **Internal links:**
  - "golf caps with a ponytail opening" -> `/collections/ponytail-caps` (first 40% of body)
  - "open-back cap with elastic cross bands" -> `/products/back-nine-ponytail-cap`
  - "visors that leave your hair free" -> `/collections/visors`
  - "how each of our hats fits" -> `/pages/fit-guide`
  - Siblings: #2 ("wearing a cap over braids or locs"), #3 ("hairstyles that sit right under a hat"), #5.
- **Image (seo-blog-images):**
  - Cover: real photo from the content-day shoot of the back of a cap with a ponytail through it (build plan G-13d). Filename `golf-hat-ponytail-hole-back-view.webp`, 16:9, at least 1200 px wide, 350 KB max.
  - Inline: deterministic SVG line drawing of the three back designs (concealed slot, open back with cross bands, visor) labelled "CONCEALED", "OPEN BACK", "VISOR", pine on paper. Filename `ponytail-golf-hat-back-designs.svg` converted to webp.
  - Do **not** use `/images/lifestyle/ponytail-back.webp`: it is AI-generated (`ai: true` in `media.ts`).
- **CTA:** callout "Hair up, hat on" -> `/collections/ponytail-caps`, with the line "Free fit exchanges within 30 days."
- **Must NOT claim:**
  - That any concealed-opening cap fits a high ponytail or a bun (products.ts says "ponytail" only; only the Back Nine says "ponytail or bun"). Add a high-ponytail line only after a fit-panel try-on is filmed: `{/* [NEEDS PROOF: fit-panel high ponytail test] */}`.
  - That the Cart Path Trucker's sweatband is moisture-wicking (its details say "makeup-resistant, breathable"; see section 11.3).
  - Any visor sun rating (the visor has no UPF claim).
  - That any hat fits "every hairstyle", or any ranking against named brands.

---

### P1-2. `golf-hat-with-braids-locs` (cluster A)

- **H1:** How to Wear a Golf Hat With Braids, Locs or Natural Hair
- **Meta title (55):** How to Wear a Golf Hat With Braids or Locs | Bogey Baby
- **Meta description (148):** Braids, locs, twists, a puff or a TWA: which golf hat shapes sit well over each style, when a visor or bucket is the better pick, and what to check.
- **Reader's question (representative):** "My braids are usually up in a bun when I play. Is there a golf cap that doesn't sit on top of them like a lid?"
- **Intent / stage / length / intro:** informational how-to / problem-aware / 1,500-2,000 words / how-to intro.
- **Outline:**
  - Intro (answer first: choose by where your hair sits. Low, flat styles fit most caps; a high bun or puff needs an open back or a visor; long braids or locs worn down suit a relaxed, unstructured cap or a bucket)
  - H2 Which hat shape works with which style? (table: box braids or knotless worn down / braids in a low bun / high bun or puff / locs worn down / locs up / twists / TWA or short natural hair vs cap profile, structure, opening, visor, bucket)
  - H2 How do you wear a cap over braids or locs worn down?
  - H2 What about a high bun, puff or ponytail?
  - [ProductCallout]
  - H2 Can you wear a visor with natural hair? (scalp exposure; sunscreen at the part and hairline)
  - H2 Is a bucket hat better for a lot of hair?
  - H2 What to check before you buy: crown height, structure, closure (the fit table)
  - H2 Care for your hair on long, hot rounds: **only with a named, licensed stylist interviewed for this piece** (transcribe with Scribiz, written consent). If no interview happens, cut this section.
  - H2 FAQ ("Can you wear a hat with fresh braids?" only if the stylist answers it; "Will a cap crush my twist-out?"; "Which Bogey Baby hats have an opening at the back?")
- **Key points and external facts:**
  - Visor: open crown, exposed scalp, hairline and part can burn ([Druids](https://www.druids.com/blogs/golf/golf-cap-vs-visor)).
  - A dermatologist in the Skin Cancer Foundation's "Ask the Expert" says hair alone is not enough protection "especially where you part your hair", and advises sunscreen on dry hair at the part and all around the hairline ([SCF, Engelman](https://www.skincancer.org/blog/ask-the-expert-how-can-i-protect-my-scalp-better/)).
  - Hat construction terms (profile, structure, closure) come from our own product facts, so they need no external source.
- **Product facts:** unstructured low-profile caps (Front Nine, Range Day, Tee Time Dad Cap, Back Nine, Small Fit); light-structured low profile (Turn Cord); structured mid profile (Cart Path Trucker); semi-structured high profile (Sunwashed Rope Cap); open back with elastic cross bands (Back Nine); visor (Clubhouse); 19th Hole Bucket "unstructured, relaxed fit"; Weekend Bucket "snug fit, one size fits all" (say plainly it is snug).
- **Internal links:**
  - "caps with a hidden ponytail opening" -> `/collections/ponytail-caps` (upper 40%)
  - "a cap made for a ponytail or bun" -> `/products/back-nine-ponytail-cap`
  - "shade for your eyes, nothing on your hair" -> `/collections/visors`
  - "all-round shade from a bucket" -> `/collections/bucket-hats`
  - "why we center Black women golfers" -> `/pages/about-us`
  - Siblings: #1, #3, #37.
- **Image:**
  - Real photos only for people: the content-day talent list already includes braids, curls and short hair (build plan Appendix B). Shoot each style in the matching hat, with signed model releases. Caption as "photographed for Bogey Baby", never as customers.
  - Until then: SVG matrix (styles down, hat types across, filled dots) `golf-hat-by-hairstyle-chart.svg`.
  - Cover fallback: real flat lay of a cap, visor and bucket on pine fabric with headline badge "GOLF HATS FOR BRAIDS AND LOCS".
- **CTA:** "Find a hat that works with your hair" -> `/collections/ponytail-caps`; secondary link to visors.
- **Must NOT claim:**
  - Hair-health outcomes (prevents breakage, protects edges, reduces friction, keeps moisture) unless a named stylist said it on the record.
  - That any of our hats "fits locs", "fits braids" or "fits big hair". products.ts makes no hair-volume claim.
  - Stereotypes, "flattering", "manageable", or anything that treats textured hair as a problem.
  - No AI-generated images of Black women, ever (build plan 4.5; README).

---

### P1-3. `golf-hairstyles-with-hat` (cluster A)

- **H1:** Golf Hairstyles That Work Under a Hat or Visor
- **Meta title (54):** Golf Hairstyles Under a Hat: 9 Easy Looks | Bogey Baby
- **Meta description (136):** Nine golf hairstyles that sit right under a cap, visor or bucket hat, from a low pony to box braids, with the hat to pair with each one.
- **Reader's question (representative):** "What do I do with my hair so my hat isn't sitting on a lump all round?"
- **Intent / stage / length / intro:** informational listicle / problem-aware / 1,500-2,000 words / listicle intro (mirror the count: "nine").
- **Outline (each item = H2 phrased as the style, with "Best hat:" and "Watch out for:" lines):**
  1. Low ponytail through a ponytail cap
  2. High ponytail with an open-back cap or visor
  3. Low bun at the nape
  4. Two low braids
  5. Box braids or knotless braids, low bun or worn down
  6. Half-up, half-down
  7. A puff with a visor
  8. Short hair or a TWA under a low-profile cap
  9. Hair down under a bucket hat
  - H2 How do I avoid hat hair after the round? (3 lines, link to #16 when live)
  - H2 FAQ
- **Key points and external facts:**
  - GOLF.com's ponytail alternatives piece suggests double twisty buns and notes high pigtails work under a visor ([GOLF.com, Aug 2020](https://golf.com/lifestyle/snazz-up-your-headwear-game-with-these-3-fun-ponytail-alternatives/?amp=1)). Cite only if used.
  - Visor and scalp exposure ([Druids](https://www.druids.com/blogs/golf/golf-cap-vs-visor)).
- **Product facts:** as P1-1 and P1-2. Tee Time Dad Cap: 100% cotton, unstructured six-panel low profile, Permacurv visor, hideaway strap with antique brass buckle, embroidered golfer.
- **Internal links:**
  - "ponytail caps made for hair up" -> `/collections/ponytail-caps` (upper 40%)
  - "golf visors for women" -> `/collections/visors`
  - "bucket hats for sunny rounds" -> `/collections/bucket-hats`
  - "a soft, low-profile dad cap" -> `/products/tee-time-dad-cap`
  - Siblings: #1, #2.
- **Image:** real photos per style from the content-day shoot (hair stylist on set, per Appendix B). Interim: SVG icon grid of nine silhouettes (drawn, not AI), `golf-hairstyles-under-hat-grid.svg`. Cover badge "9 GOLF HAIRSTYLES".
- **CTA:** callout after item 2 -> `/collections/ponytail-caps`.
- **Must NOT claim:** hold times ("lasts 18 holes"), product recommendations for hair products, stylist quotes that were not recorded, AI images of people.

---

### P1-4. `golf-hats-small-heads` (pillar, cluster B)

- **H1:** Golf Hats for Women With Small Heads: What Actually Fits
- **Meta title (49):** Golf Hats for Women With Small Heads | Bogey Baby
- **Meta description (137):** Why most golf caps swallow a smaller head, how to measure yours in a minute, and which hat shapes and closures sit right on a small head.
- **Reader's question (verbatim, forum):** "everything I've tried in AG or local pro shops are HUGE" ([Golf Monthly forum, 2020](https://forums.golfmonthly.com/threads/golf-hats.106360/)).
- **Intent / stage / length / intro:** commercial investigation / problem-aware / 1,800-2,300 words / how-to intro.
- **Outline:**
  - Intro (answer: look for a cap made in a small fit, or a low-profile, unstructured cap whose closure cinches; measure first)
  - H2 Why are golf hats too big for me? (one-size ranges; crown height; structure)
  - H2 How do I measure my head for a golf hat? (3 steps, then link to the fit guide)
  - H2 What to look for in a hat for a small head
    - H3 A cap made in a small fit
    - H3 Low profile and unstructured
    - H3 Closures that cinch: hook-and-loop, D-ring, tri-glide, hideaway strap, snapback
  - [ProductCallout: the Small Fit Performance Cap]
  - H2 Which hat styles tend to sit high? (high-profile, structured crowns; one-size buckets) framed as "check this", not as a claim about any brand
  - H2 Our picks for smaller heads (self-contained blocks: Small Fit Performance Cap; low-profile adjustable caps: Front Nine, Tee Time, Back Nine)
  - H2 What if it still doesn't fit? (free fit exchange within 30 days of delivery)
  - H2 FAQ ("What counts as a small head?" answer only with the Nike range below; "Are youth hats a good option?" no claim about ours)
- **Key points and external facts:**
  - Nike says one-size hats generally fit "head measurements from 54 centimetres to 61 centimetres", and a 56 cm head is about a hat size 7, "small to medium". Measure about 2.5 cm above the eyebrows, slightly above the ears ([Nike, updated Apr 2024](https://www.nike.com/sg/a/how-to-measure-hat-size)).
  - Our fit guide's method: soft tape just above the ears and across the forehead; no tape, use a phone charger cable against a ruler (`/pages/fit-guide`, site copy).
  - Gap: the ranking ThinkIndoor small-heads page gives no measuring method and barely mentions women. Do not name it.
- **Product facts:**
  - Small Fit Performance Cap: "Made in a small fit for smaller heads, so the brim sits where it should"; UPF 50+; 100% recycled polyester; moisture-wicking antimicrobial sweatband; unstructured six-panel low profile; D-ring micro hook-and-loop; printed golfer (front-left).
  - Front Nine: tri-glide strap; unstructured low profile. Tee Time: hideaway strap with brass buckle; unstructured low profile. Back Nine: micro hook-and-loop; unstructured low profile.
  - Policy: fit exchanges are free within 30 days of delivery.
- **Internal links:**
  - "a cap made in a small fit" -> `/products/small-fit-performance-cap` (upper 40%)
  - "measure your head in 10 seconds" -> `/pages/fit-guide`
  - "free fit exchanges within 30 days" -> `/pages/shipping-returns`
  - "a low-profile cap with a concealed opening" -> `/products/front-nine-ponytail-cap`
  - Siblings: #17, #29, #31 when live.
- **Image:**
  - Inline: SVG "how to measure" diagram (head outline, tape path above the ears, 3 numbered steps) `how-to-measure-head-golf-hat.svg`.
  - Inline: real side-by-side photo of the Small Fit cap and a standard cap on the same head (build plan G-16), shot on content day.
  - Do **not** reuse `/images/fit/fit-*.webp` (AI-generated).
  - Cover: real or Printify-mockup photo of the Small Fit Performance Cap on paper with badge "GOLF HATS FOR SMALL HEADS".
- **CTA:** "Made in a small fit" callout -> `/products/small-fit-performance-cap`.
- **Must NOT claim:**
  - Any inch or cm range for any Bogey Baby hat (the claims register lists the fit range as pending).
  - "Petite" in copy, "youth size", "the only small-fit golf hat", "fits every small head".
  - That the Sunwashed Rope Cap or any named hat "runs big".

---

### P1-5. `golf-visor-vs-hat` (pillar, cluster C)

- **H1:** Golf Visor vs Hat: Which Is Better for Women?
- **Meta title (56):** Golf Visor vs Hat: Which Is Better for You? | Bogey Baby
- **Meta description (147):** A visor wins on airflow and hair freedom. A cap or bucket hat wins on scalp sun cover. How to choose by weather, hair and skin, with a quick table.
- **Reader's question (representative):** "Visor or cap? I want my ponytail free, but my part always burns."
- **Intent / stage / length / intro:** comparison / solution-aware / 1,500-2,000 words / comparison intro with the vs-and-alternatives verdict in the first 50 words.
- **Verdict to open with (adapt, keep both sentences):** "Pick a visor if your hair is up or full, the day is hot, and you'll put sunscreen on your part. Pick a cap or bucket hat if the sun is strong, your scalp burns, or you want shade on your hair as well as your face."
- **Outline:**
  - H2 Visor vs hat at a glance (table: airflow, scalp cover, hair freedom, wind, sweat, look)
  - H2 When is a visor the better choice?
  - H2 When is a cap the better choice?
  - H2 Do visors protect you from the sun?
  - [ProductCallout: two links, visors and UPF 50+ hats]
  - H2 What about a bucket hat?
  - H2 Visor or cap with a ponytail?
  - H2 Why do so many women golfers wear visors?
  - H2 FAQ
- **Key points and external facts:**
  - A cap shades the scalp, forehead and eyes; ears, sides of the face and back of the neck can still burn. A visor's open crown improves airflow but leaves the scalp, hairline and part exposed. A bucket hat shades face, ears and neck but can feel warmer ([Druids, Sep 2026](https://www.druids.com/blogs/golf/golf-cap-vs-visor)).
  - SCF: wide-brimmed hats are often impractical on the course; caps and visors stay in place and cover the face ([SCF golf](https://www.skincancer.org/blog/sun-protection-habits-golf-course/)). SCF recommends "a brim of at least three inches" for face, scalp and neck ([SCF clothing](https://www.skincancer.org/prevention/sun-protection/clothing/clothing-umbrella-sun-protection/)).
  - Glenmuir: visors are especially popular with women golfers ([Glenmuir, Apr 2023](https://www.glenmuir.com/news/first-golf-game-clothing-guide)).
  - Ship Sticks: a visor or hat keeps sweat off your eyes; a beanie in cold weather ([Ship Sticks, Mar 2024](https://shipsticks.com/blog/golf-for-beginners-part-2-what-to-wear)).
- **Product facts:** Clubhouse Visor (cotton chino twill, pre-curved brim, hook-and-loop, printed golfer); UPF 50+ fabric: Back Nine, Small Fit, 19th Hole Bucket; mesh-back caps for airflow: Range Day, Cart Path, Turn Cord.
- **Internal links:**
  - "a cotton golf visor" -> `/collections/visors` (upper 40%)
  - "hats made with UPF 50+ fabric" -> `/collections/performance`
  - "a bucket hat with a brim all the way round" -> `/collections/bucket-hats`
  - Siblings: #6, #1, #20.
- **Image:**
  - Inline: SVG coverage diagram (three head outlines, shaded areas for visor, cap, bucket; no numbers) `golf-visor-vs-cap-vs-bucket-coverage.svg`.
  - Cover: real photo of the Clubhouse Visor and a cap side by side on pine fabric, badge "VISOR OR HAT?".
- **CTA:** dual callout: "Shop visors" -> `/collections/visors`; "Shop UPF 50+ hats" -> `/collections/performance`.
- **Must NOT claim:** UPF or sun rating for the visor; brim measurements (products.ts gives none, so never say our brims meet the 3-inch guidance); "no-headache" or comfort promises for the visor; that any hat "prevents" sunburn or skin cancer.

---

### P1-6. `upf-50-golf-hat-meaning` (cluster C)

- **H1:** What Does UPF 50+ Mean on a Golf Hat?
- **Meta title (50):** What Does UPF 50+ Mean on a Golf Hat? | Bogey Baby
- **Meta description (138):** UPF measures how much UV gets through fabric. What UPF 30, 50 and 50+ mean, how UPF differs from SPF, and what a hat still leaves exposed.
- **Reader's question (representative):** "Is a UPF 50 hat really different from a normal cap, or is it just a label?"
- **Intent / stage / length / intro:** definition / problem-aware to solution-aware / 1,000-1,400 words / definition intro.
- **Outline:**
  - Intro (definition first: UPF is a rating of how much UV radiation a fabric lets through to your skin)
  - H2 What does UPF mean?
  - H2 What do UPF 30, 50 and 50+ mean?
  - H2 What's the difference between UPF and SPF?
  - H2 Does a UPF hat protect your whole face?
  - [ProductCallout]
  - H2 Which hat styles cover the most?
  - H2 Our hats made with UPF 50+ fabric (3 self-contained blocks)
  - H2 FAQ
- **Key points and external facts (all [SCF](https://www.skincancer.org/prevention/sun-protection/clothing/clothing-umbrella-sun-protection/) unless noted):**
  - UPF "indicates how much UV radiation (both UVB and UVA) a fabric allows to reach your skin."
  - "A UPF of 30 to 49 offers very good protection, while UPF 50+ rates as excellent."
  - "UPF 50 fabric blocks 98 percent of the sun's rays."
  - Hats: "a brim of at least three inches".
  - Sunscreen is SPF: SCF's golf guidance is broad-spectrum, water-resistant SPF 30+, at least one ounce, 30 minutes before the round, reapplied every two hours or more if sweating; cover ears and neck ([SCF golf](https://www.skincancer.org/blog/sun-protection-habits-golf-course/)).
  - A dermatologist says a UPF 50+ hat "is probably the best protection for your scalp" ([SCF, Engelman](https://www.skincancer.org/blog/ask-the-expert-how-can-i-protect-my-scalp-better/)).
- **Product facts:** Back Nine Ponytail Cap (UPF 50+, open back), Small Fit Performance Cap (UPF 50+), 19th Hole Bucket (UPF 50+ performance fabric, sewn eyelets, striped band). All three: "UPF 50+ protection" in their details. Phrase it as "made with fabric rated UPF 50+".
- **Internal links:**
  - "UPF 50+ golf hats" -> `/collections/performance` (upper 40%)
  - "the Back Nine Ponytail Cap" -> `/products/back-nine-ponytail-cap`
  - "our small-fit UPF 50+ cap" -> `/products/small-fit-performance-cap`
  - "a UPF 50+ performance bucket hat" -> `/products/19th-hole-bucket`
  - Siblings: #5, #7.
- **Image:**
  - Inline: SVG chart from SCF's numbers only: two bands ("UPF 30-49: very good", "UPF 50+: excellent") and one label "UPF 50 blocks 98% (Skin Cancer Foundation)". `upf-rating-scale-skin-cancer-foundation.svg`.
  - Cover: real photo of the 19th Hole Bucket, badge "WHAT UPF 50+ MEANS".
- **CTA:** "Shop UPF 50+ hats" -> `/collections/performance`.
- **Must NOT claim:**
  - Skin Cancer Foundation Seal of Recommendation, or any endorsement.
  - "Prevents skin cancer", "blocks 98% of UV" as a tested property of our hats (only as SCF's general definition), or "fully protects your scalp". The Back Nine's open back and the mesh backs on other caps are not covered by the claim.
  - That the UPF rating lasts a set number of washes (no source).
  - Open item: build plan Appendix A lists UPF 50+ as "Pending (not used until tested)", while products.ts and the FAQ already state it from the blank maker's spec. Owner to confirm before this post ships (section 11.3).

---

### P1-7. `golf-sunscreen-darker-skin` (cluster C)

- **H1:** Sun Protection for Darker Skin on the Golf Course
- **Meta title (48):** Golf Sun Protection for Darker Skin | Bogey Baby
- **Meta description (141):** Melanin is not a sun shield. What dermatologists advise for darker skin on a four-hour round: tinted SPF 30+, reapplying, UPF hats and shade.
- **Reader's question (representative):** "I'm Black. Do I really need sunscreen for a round of golf?"
- **Intent / stage / length / intro:** informational / problem-aware / 1,200-1,600 words / how-to intro with the answer ("Yes") in the first sentence.
- **Outline:**
  - H2 Do Black women need sunscreen for golf?
  - H2 What sunscreen works on darker skin?
  - H2 How much sunscreen, and how often, on a round?
  - H2 Where do golfers miss? (ears, neck, part, hairline)
  - H2 Which hat helps most?
  - [ProductCallout, soft]
  - H2 Tee times, shade and the cart
  - H2 When should you see a dermatologist? (point to a board-certified dermatologist; no self-diagnosis advice beyond the AAD's)
- **Key points and external facts:**
  - AAD: "It's a common misbelief that only people with light skin develop skin cancer." In darker skin, cancer "may show up in areas that receive little, if any, sun" (palms, soles, nails and more) and is "often advanced by the time it's diagnosed." Dermatologists "recommend that everyone protect their skin from the sun." Recommends a tinted, broad-spectrum, water-resistant SPF 30+ sunscreen, shade and sun-protective clothing ([AAD](https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma/skin-color)).
  - SCF golf: at least one ounce, 30 minutes before, every two hours or more if sweating, pick a hole to reapply, cover ears and neck, early or late tee times ([SCF golf](https://www.skincancer.org/blog/sun-protection-habits-golf-course/)).
  - Part and hairline: sunscreen on dry hair at the part and hairline ([SCF, Engelman](https://www.skincancer.org/blog/ask-the-expert-how-can-i-protect-my-scalp-better/)).
  - UPF definitions: see P1-6.
- **Product facts:** UPF 50+ fabric on Back Nine, Small Fit, 19th Hole Bucket.
- **Internal links:**
  - "hats made with UPF 50+ fabric" -> `/collections/performance` (upper 40%; different anchor from P1-5)
  - "our striped-band bucket hat" -> `/products/19th-hole-bucket`
  - "who we make hats for" -> `/pages/about-us`
  - Siblings: #6, #5.
- **Image:** no people. Path A is allowed here: a people-free, product-free scene, 12-22 word prompt, e.g. "Bright daylight close-up of a tinted sunscreen stick beside a white golf ball and glove on a golf cart seat, no text". Inline: SVG "reapply every 2 hours" round timeline (front nine / turn / back nine) built only from SCF guidance.
- **CTA:** soft: "UPF 50+ hats for long, sunny rounds" -> `/collections/performance`.
- **Must NOT claim:** medical advice beyond the AAD and SCF sources; any statistic not on those pages (do not use the "30-40% of melanomas on the feet" figure from secondary coverage); that a hat or sunscreen "prevents skin cancer"; named sunscreen brand recommendations; fear-based language. Include the line "This is general guidance, not medical advice. A board-certified dermatologist can advise on your skin."

---

### P1-8. `what-to-wear-golfing-women` (pillar, cluster D)

- **H1:** What to Wear Golfing for the First Time: A Women's Guide
- **Meta title (60):** What to Wear Golfing for the First Time (Women) | Bogey Baby
- **Meta description (135):** What to wear for your first round of golf: tops, bottoms, shoes and a hat, how to check a course dress code, and what to leave at home.
- **Reader's question (representative):** "I'm playing nine holes with coworkers next week. What do I wear so I don't look out of place?"
- **Intent / stage / length / intro:** how-to with checklist / unaware / 1,800-2,300 words / how-to intro.
- **Outline:**
  - Intro (answer: a collared or sleeveless golf top, golf shorts, a skort or pants, comfortable shoes with grip, a hat and sunscreen; check the course's dress code first)
  - H2 What should a woman wear golfing for the first time? (checklist)
  - H2 How do I check a course's dress code?
  - H2 Tops
  - H2 Shorts, skorts, skirts or pants
  - H2 Do I need golf shoes?
  - H2 Do I need a hat for golf?
  - [ProductCallout]
  - H2 What to bring in your bag (glove, sunscreen, water, layers)
  - H2 What not to wear
  - H2 Three first-round outfits by weather (hot, mild, cold) using generic pieces plus one of our hats each
- **Key points and external facts:**
  - Dress codes vary club to club; a newcomer's worries about leggings, collars and golf shoes turned out to be unfounded at her club ([Golf Monthly, Jul 2025](https://www.golfmonthly.com/features/im-a-long-time-golf-club-member-and-the-dress-code-still-confuses-me)).
  - Women: sleeveless collared shirt or sleeved shirt without collar; golf shorts, trousers or a skirt; canvas shoes are acceptable at most courses; visors are especially popular with women golfers; hats come off in the clubhouse and are not worn backwards on the course ([Glenmuir, Apr 2023](https://www.glenmuir.com/news/first-golf-game-clothing-guide)).
  - Most courses do not allow denim; the dress code is usually on the course website; some courses have length rules ([Ship Sticks, Mar 2024](https://shipsticks.com/blog/golf-for-beginners-part-2-what-to-wear)).
  - Context line: 36% of the 3.3M US beginner golfers in 2025 were female, roughly 7 in 10 of them adults ([NGF, 2026](https://www.ngf.org/wp-content/uploads/2026/03/Female-1-pager-2026.pdf)). Cite as a figure; do not reproduce NGF's chart (their PDF forbids reproduction).
  - Sunscreen basics from SCF (see P1-7).
- **Product facts:** Cream Rope Cap (embroidered golfer, five-panel curved brim, adjustable, "good for the first tee, the 19th hole and lunch after"); Tee Time Dad Cap ("the easy, broken-in cap for early tee times"); Clubhouse Visor; Winter Rules Beanie for cold rounds.
- **Internal links:**
  - "golf hats made for women" -> `/collections/all` (upper 40%)
  - "the rope cap that started Bogey Baby" -> `/products/cream-rope-cap`
  - "a soft, broken-in dad cap" -> `/products/tee-time-dad-cap`
  - "find your fit before you buy" -> `/pages/fit-guide`
  - Siblings: #9, #10, #21, #22, #23.
- **Image:** real flat-lay photo of a first-round outfit on paper (polo, skort, white shoes, glove, Cream Rope Cap) `first-golf-outfit-women-flat-lay.webp`. Existing real image `/images/lifestyle/cap-on-pine.webp` (`ai: false`) can be an inline product shot. Cover badge "YOUR FIRST ROUND OUTFIT".
- **CTA:** "Start with the hat" -> `/products/cream-rope-cap`.
- **Must NOT claim:** universal dress-code rules; clothing claims for brands we don't sell; "flattering"; body-shape advice.

---

### P1-9. `golf-hat-etiquette` (cluster D)

- **H1:** Golf Hat Etiquette: When to Take Your Hat Off (and When Not To)
- **Meta title (58):** Golf Hat Etiquette: When to Take Your Hat Off | Bogey Baby
- **Meta description (142):** Do you have to wear a hat golfing? Does it come off in the clubhouse or on the 18th green? The real customs, where they are changing, and why.
- **Reader's question (representative):** "Do I have to take my cap off to shake hands on 18? My hair is a mess under there."
- **Intent / stage / length / intro:** informational / unaware / 1,000-1,400 words / debate intro (two camps, then the referee).
- **Outline:**
  - Intro (answer: no rule makes you wear a hat; customs say hat off indoors at many clubs, and the 18th-green hat-off is optional; the handshake is what matters)
  - H2 Do you have to wear a hat golfing?
  - H2 Should you take your hat off in the clubhouse?
  - H2 Do you take your hat off on the 18th green?
  - H2 Can you wear a hat backwards on a golf course?
  - H2 Are visors, beanies and bucket hats OK?
  - H2 What about hat hair? (practical, short; link to #16 when live)
  - Table: situation / custom / flexibility
- **Key points and external facts:**
  - Golf Monthly staff debate (Jan 2026): one editor calls clubhouse hat rules "old-fashioned and outdated"; another says "I'd be far more annoyed if someone didn't shake my hand at all" ([Golf Monthly](https://www.golfmonthly.com/features/would-they-rather-see-my-hat-hair-and-shake-the-hand-that-was-raked-over-my-sweaty-scalp-should-golfers-remove-their-caps-on-the-18th-green)). Note in the post that the debate is between men and doesn't consider women's hair.
  - Hats are optional; take them off in the clubhouse; don't wear them backwards on the course ([Glenmuir](https://www.glenmuir.com/news/first-golf-game-clothing-guide)).
  - Visor or hat for sun and sweat; beanie in cold weather ([Ship Sticks](https://shipsticks.com/blog/golf-for-beginners-part-2-what-to-wear)).
- **Product facts:** Tee Time Dad Cap; Clubhouse Visor; Winter Rules Beanie ("For frosty early rounds and the walk to the clubhouse", 100% Turbo acrylic, 12" cuffed, one size, embroidered golfer on the cuff).
- **Internal links:**
  - "embroidered golf caps" -> `/collections/embroidered` (upper 40%)
  - "the visor option" -> `/collections/visors`
  - "a cuffed beanie for frosty rounds" -> `/products/winter-rules-beanie`
  - Siblings: #8, #10.
- **Image:** real photo of the Cream Rope Cap on a clubhouse table beside a scorecard and lemonade (both are on the content-day prop list). Inline SVG "hat on / hat off" table graphic. Cover badge "GOLF HAT ETIQUETTE".
- **CTA:** "Hats that look right in the clubhouse too" -> `/collections/embroidered`.
- **Must NOT claim:** that any custom is a Rule of Golf; specific clubs' policies without a link; that our hats prevent hat hair.

---

### P1-10. `golf-terms-for-beginners` (cluster D)

- **H1:** Golf Terms for Beginners: 40 Words You'll Hear on Day One
- **Meta title (55):** Golf Terms for Beginners: 40 Words to Know | Bogey Baby
- **Meta description (147):** Bogey, the turn, the 19th hole, winter rules: 40 golf terms in plain English, grouped by where you will hear them, from the range to the clubhouse.
- **Reader's question (representative):** "Everyone kept saying 'the turn' and 'winter rules'. What do they mean?"
- **Intent / stage / length / intro:** definition / glossary / unaware / 1,800-2,400 words / definition intro.
- **Outline:**
  - H2 Scoring words (par, birdie, bogey, double bogey, handicap, net, gross)
  - H2 Course words (tee box, fairway, rough, green, front nine, back nine, the turn, cart path)
  - H2 Range and practice words (range, bucket, warm-up)
  - H2 Playing words (tee time, foursome, scramble, mulligan, winter rules, gimme)
  - H2 Clubhouse words (pro shop, clubhouse, 19th hole)
  - H2 Why our hats have golf names (one compact list linking each named product; this list does not count toward the 2-4 contextual links)
- **Key points and external facts:**
  - Bogey origin: in 1890 the "ground score" idea spread; at Great Yarmouth a player was called "a regular Bogey man"; by 1892 "Colonel Bogey" appeared at Gosport; after the USGA's 1911 par distances, Americans used bogey for one over par ([Scottish Golf History](https://www.scottishgolfhistory.org/origin-of-golf-terms/bogey/)).
  - Brand line (real site copy, About page): "We called it Bogey Baby because nobody plays pretty every hole."
  - **Verify on the day:** rules-based definitions (winter rules / preferred lies, mulligan status, handicap) against the USGA's Rules of Golf definitions and Model Local Rules on usga.org. Our fetch of usga.org was blocked, so nothing from it is in this plan.
- **Product facts:** names only: Front Nine, Back Nine, The Turn, Cart Path, Range Day, Tee Time, Clubhouse, 19th Hole, Winter Rules.
- **Internal links:**
  - "all 13 Bogey Baby hats" -> `/collections/all` (upper 40%)
  - "the story behind Bogey Baby" -> `/pages/about-us`
  - Product-name list at the end (one link each).
  - Siblings: #8, #9, #26.
- **Image:** SVG diagram of one golf hole with labels (tee box, fairway, rough, bunker, green, cart path) `golf-hole-diagram-terms.svg`. Cover badge "GOLF TERMS FOR BEGINNERS".
- **CTA:** "Every one of our hats is named for a golf word" -> `/collections/all`.
- **Must NOT claim:** rules definitions that weren't checked against the USGA; a different bogey origin story.

---

### P1-11. `black-women-golf-groups` (pillar, cluster E)

- **H1:** Black Women's Golf Groups and Clubs to Join
- **Meta title (56):** Black Women's Golf Groups and Clubs to Join | Bogey Baby
- **Meta description (145):** From Wake-Robin, founded in 1937, to newer clubs and clinics: Black women's golf groups in the US, what each offers and how to find one near you.
- **Reader's question (representative):** "Is there a group of Black women who golf near me? I don't want to learn alone."
- **Intent / stage / length / intro:** informational directory / unaware / 1,500-2,200 words / listicle intro (count the groups in the title only if the count is final).
- **Outline:**
  - H2 Why join a golf group?
  - H2 Long-standing clubs (Wake-Robin; The Green's Ladies Golf Club)
  - H2 Social clubs and clinics (one self-contained block per group: city or region, who it's for, what it runs, how to join, link to its own site)
  - H2 National options open to all women (LPGA Amateur Golf Association)
  - H2 How to find a group near you
  - H2 What to bring to your first meetup (link to #8)
- **Key points and external facts (verify each group on its own site on the day of writing; drop any that can't be verified):**
  - Wake-Robin Golf Club: founded April 22, 1937 by Helen Webb Harris; thirteen women met at her home in Washington, D.C.; describes itself as "the oldest registered Afro-American woman's golf club in the United States"; petitioned Interior Secretary Ickes in 1938; Langston Golf Course opened in 1939; in 1941 Ickes ordered public courses opened to all; today a 501(c)(3) that funds scholarships ([Wake-Robin](https://wake-robingolf.org/about-us)). Wikipedia's Helen Webb Harris entry cites a 1936 date in one reference; use the club's own date.
  - From a secondary roundup (verify each on the group's site): City Girls Golf (Sierra Balgar; DMV, New York, Florida); Grls Who Golf (Atlanta; Alexis Nicole Howell); Black Girls Golf (Tiffany Mack Fitzgerald; 2013; non-competitive); The Green's Ladies Golf Club (founded May 1, 1954 in West Philadelphia by Lorraine Sawyer and seven others); Women of Color Golf (Tampa; Clemmie Perry; 2014) ([Queens At Work, Mar 2025](https://queensatwork.com/5-golf-communities-for-black-women/)).
  - **Warning:** `blackgirlsgolf.com` redirected to a domain-sale page when checked on 18 Nov 2026. Find the group's current official site or social account before linking.
  - Candidates seen only in search summaries (open their own sites before including): Ladies Who Golf, Posh Putters, Her Shot Golf (Sadena Parks), Black Golf Alliance.
  - LPGA Amateur Golf Association: members must be 18+; beginners are welcomed with the "Let's Go Golf 101" program; full members join local chapters ([LPGA Amateurs memberships](https://lpgaamateurs.com/memberships/)). Check dues on the day if quoted.
  - Why groups: NGF reports women are "around twice as likely to become 'lapsed golfers'" ([NGF, 2026](https://www.ngf.org/wp-content/uploads/2026/03/Female-1-pager-2026.pdf)). Do not claim groups fix this; say a group gives you people and tee times.
- **Product facts:** none needed beyond the bundle (2 hats 10% off, 3+ 15% off).
- **Internal links:**
  - "why we center Black women golfers" -> `/pages/about-us` (upper 40%)
  - "matching hats for the group" -> `/pages/golf-buddy`
  - "golf hats made for women" -> `/collections/all` (choose a different anchor if #8 already used this one 3 times)
  - Siblings: #12, #35, #8.
- **Image:** no AI people and no group logos. SVG US map with a dot per verified group's city `black-womens-golf-groups-us-map.svg`. Later: real photos from a community event, with consent. Cover: the brand golfer badge (`/brand/golfer-badge-384.webp`, real brand art) on pine with headline "BLACK WOMEN'S GOLF GROUPS".
- **CTA:** soft: "Found your foursome? Bring your golf buddy" -> `/pages/golf-buddy`.
- **Must NOT claim:** partnership, sponsorship or endorsement by any group; member counts or "largest" claims unless quoted from the group with attribution; any group whose site couldn't be verified.
- **After publishing:** a short, ask-first note to each listed group telling them about the listing (honest-link-outreach style). No link requests.

---

### P1-12. `black-women-golf-history` (cluster E)

- **H1:** Black Women in Golf: A Short History From 1937 to Today
- **Meta title (60):** Black Women in Golf: History From 1937 to Today | Bogey Baby
- **Meta description (146):** Wake-Robin in 1937, Ann Gregory at the 1956 U.S. Women's Amateur, Althea Gibson and Renee Powell on tour: the Black women who opened golf's doors.
- **Reader's question (representative):** "Who was the first Black woman on the LPGA Tour?"
- **Intent / stage / length / intro:** informational / unaware / 1,500-2,000 words / definition-style intro answering the reader's question first.
- **Outline:**
  - H2 Who was the first Black woman on the LPGA Tour?
  - H2 1937: Wake-Robin Golf Club
  - H2 1956: Ann Gregory at the U.S. Women's Amateur
  - H2 1964: Althea Gibson joins the LPGA Tour
  - H2 1967: Renee Powell
  - H2 1954: The Green's Ladies Golf Club (or place chronologically)
  - H2 Black women in golf today
  - H2 Further reading
- **Key points and external facts:**
  - Althea Gibson joined the LPGA Tour in 1964, at 37, the first African-American woman to do so; best finish a tie for second after a three-way playoff at the 1970 Len Immke Buick Open ([Wikipedia](https://en.wikipedia.org/wiki/Althea_Gibson)).
  - Ann Gregory (1912-1990): on September 17, 1956 she began play in the U.S. Women's Amateur, the first African-American woman to play in a USGA national championship; runner-up at the 1971 USGA Senior Women's Amateur; a 1989 Senior Olympics gold at 76; nearly 300 tournament wins ([Wikipedia](https://en.wikipedia.org/wiki/Ann_Gregory)).
  - Renee Powell: LPGA member from 1967 to 1980, the second African-American woman on the tour; first African American at the U.S. Girls' Junior (1962); head professional at Clearview Golf Club from 1995 (founded by her father in 1948); in 2015 invited to become one of the first women members of the R&A ([Wikipedia](https://en.wikipedia.org/wiki/Renee_Powell)).
  - Wake-Robin facts: see P1-11 ([Wake-Robin](https://wake-robingolf.org/about-us); [Wikipedia, Helen Webb Harris](https://en.wikipedia.org/wiki/Helen_Webb_Harris)).
  - Today: 8.1M female on-course golfers in 2025, a record; 30% of female golfers are people of color vs 26% of all golfers ([NGF, 2026](https://www.ngf.org/wp-content/uploads/2026/03/Female-1-pager-2026.pdf)). NGF does not split out Black women; don't imply it does.
  - **Before publishing:** confirm each Wikipedia fact against a primary source (USGA, LPGA, the World Golf Hall of Fame, or the club itself) and cite that source too. Wikipedia alone is not enough for a history piece.
- **Internal links:**
  - "meet our golfer" -> `/pages/about-us` (upper 40%)
  - "hats with our golfer stitched on" -> `/collections/embroidered`
  - Siblings: #11.
- **Image:** SVG timeline (1937, 1954, 1956, 1964, 1967, 2015) `black-women-golf-history-timeline.svg`. No portraits unless licensed from an archive with written permission; never AI likenesses of real people.
- **CTA:** soft: "Meet our golfer" -> `/pages/about-us`.
- **Must NOT claim:** any link between these women or their organizations and Bogey Baby; "firsts" beyond what sources say; quotes attributed to them unless from a cited source.

---

### P1-13. `gifts-for-women-golfers` (pillar, cluster F)

- **H1:** Gifts for Women Golfers: 25 Ideas She'll Actually Use
- **Meta title (57):** Gifts for Women Golfers: 25 Ideas She'll Use | Bogey Baby
- **Meta description (148):** 25 gifts for women golfers grouped by budget, from small add-ons to lessons and trips, plus how to buy her a golf hat when you do not know her size.
- **Reader's question (representative):** "My mom just got into golf. What do I get her that isn't another sleeve of balls?"
- **Intent / stage / length / intro:** commercial listicle / most aware (gift-giver) / 2,000-2,600 words / listicle intro with a jump link to "how to buy a hat without knowing her size".
- **Outline:**
  - H2 Gifts under $25 (generic categories: ball markers, tees, sunscreen stick, towel, socks)
  - H2 Gifts from $25 to $50 (one of our hats appears here, rendered as a product card so price comes from data; a beanie for winter golfers; a glove)
  - H2 Bigger gifts (lessons, a range card, a club fitting: say "prices vary by course and pro")
  - H2 Experience gifts (a membership: LPGA Amateurs with dues checked on the day; a golf trip)
  - H2 Gifts for the whole group (matching hats via the bundle)
  - [ProductCallout]
  - H2 How do you buy a golf hat when you don't know her size?
  - H2 When to order (made to order, ships within 10 business days)
- **Key points and external facts:**
  - Most ranking gift guides are affiliate lists with one hat or none ([Sunday Golf, Dec 2025](https://sundaygolf.com/blogs/news/golf-gifts-for-women)). Use as context only.
  - LPGA Amateurs: membership tiers and "Let's Go Golf 101" ([LPGA Amateurs](https://lpgaamateurs.com/memberships/)); check dues before quoting.
  - Any other brand's product: name it only with its price and a link to its own page, checked that day, with the check date in an MDX comment.
- **Product facts:** bundle (2 hats 10% off, 3+ 15% off); free US shipping; free fit exchanges within 30 days; made to order, ships within 10 business days; Small Fit cap for smaller heads; most caps adjustable.
- **Internal links:**
  - "our full hat lineup" -> `/collections/all` (upper 40%)
  - "two hats, 10% off" -> `/pages/golf-buddy`
  - "the fit table for every hat" -> `/pages/fit-guide`
  - "made to order, ships within 10 business days" -> `/pages/shipping-returns`
  - Siblings: #14, #36, #27.
- **Image:** real flat lay of gift items with the Cream Rope Cap and a gift tag on paper `gifts-for-women-golfers-flat-lay.webp`. Cover badge "GIFTS FOR WOMEN GOLFERS".
- **CTA:** "Give a hat, swap the fit for free" -> `/collections/all`; group line -> `/pages/golf-buddy`.
- **Must NOT claim:** Bogey Baby prices in body text (prices in products.ts are proposals); delivery-by dates; gift cards or gift wrap (gift cards are phase 2, not live); "best gift" superlatives for our hats; competitor prices without a same-day check.

---

### P1-14. `girls-golf-trip-packing-list` (cluster F)

- **H1:** Girls' Golf Trip Packing List: What to Bring for Three Days
- **Meta title (54):** Girls' Golf Trip Packing List (Checklist) | Bogey Baby
- **Meta description (146):** A 3-day girls' golf trip packing list: outfits per round, one hat per weather, a sun kit, travel gear and dinner looks, with a checklist to share.
- **Reader's question (representative):** "Four of us are doing a golf weekend. What do I pack so I'm not hauling three bags?"
- **Intent / stage / length / intro:** checklist / unaware and most aware / 1,400-1,900 words / how-to intro with a jump link to the checklist.
- **Outline:**
  - H2 The checklist (table you can screenshot)
  - H2 One outfit per round, plus a capsule
  - H2 Which hats to pack (sunny: UPF 50+ cap or bucket; hot: visor or mesh back; cool mornings: beanie; dinner and the 19th hole: rope cap)
  - [ProductCallout]
  - H2 Your sun kit
  - H2 Check each course's dress code
  - H2 Travel gear (generic)
  - H2 Matching hats for the group
- **Key points and external facts:**
  - The Golf Digest team's girls' weekend list (Nov 2025) is built around a capsule wardrobe and does not mention hats ([Australian Golf Digest, Nov 2025](https://www.australiangolfdigest.com.au/the-ultimate-girls-golf-weekend-packing-list-2/)).
  - Sun kit per SCF golf guidance (see P1-7).
  - Dress codes vary by club ([Golf Monthly, Jul 2025](https://www.golfmonthly.com/features/im-a-long-time-golf-club-member-and-the-dress-code-still-confuses-me)).
- **Product facts:** UPF 50+ on Back Nine, Small Fit, 19th Hole Bucket; mesh backs on Range Day, Cart Path, Turn Cord; Clubhouse Visor; Winter Rules Beanie; Cream Rope Cap ("the 19th hole and lunch after"); bundle discounts.
- **Internal links:**
  - "matching hats for the group" -> `/pages/golf-buddy` (upper 40%; vary if used 3 times)
  - "performance hats for hot rounds" -> `/collections/performance`
  - "the 19th Hole Bucket" -> `/products/19th-hole-bucket`
  - "a cuffed beanie for frosty rounds" -> `/products/winter-rules-beanie` (track: second use of this anchor)
  - Siblings: #13, #27, #32.
- **Image:** real overhead photo of a packed carry-on with hats on top `girls-golf-trip-packing-list-flat-lay.webp`. Downloadable checklist as an SVG-rendered PNG or PDF built from the HTML table (text stays in HTML too). Cover badge "GIRLS' GOLF TRIP PACKING LIST".
- **CTA:** "Matching hats for the whole trip: 2 hats save 10%, 3 or more save 15%" -> `/pages/golf-buddy`.
- **Must NOT claim:** that any hat is packable, crushable or travel-proof (not in products.ts); specific destination dress codes without a link; delivery before a trip date.

---

### P1-15. `what-is-a-rope-hat` (cluster G)

- **H1:** What Is a Rope Hat? Why Golfers Wear Them
- **Meta title (51):** What Is a Rope Hat? Golf's Classic Cap | Bogey Baby
- **Meta description (142):** A rope hat is a cap with a braided cord across the front, above the brim. Where the look comes from, why golfers wear it and how to style one.
- **Reader's question (representative):** "What's the point of the rope on a golf hat? Is it just for looks?"
- **Intent / stage / length / intro:** definition / solution-aware / 1,000-1,400 words / definition intro.
- **Outline:**
  - H2 What is a rope hat?
  - H2 What is the rope on a hat for?
  - H2 Are rope hats back in style?
  - H2 Five-panel vs six-panel rope caps
  - [ProductCallout]
  - H2 How to wear a rope hat, on the course and after
  - H2 Our rope caps (two self-contained blocks)
- **Key points and external facts:**
  - Definition: a braided rope running across the front of the cap just above the brim ([Imperial, Jun 2026](https://imperial1916.com/blogs/field-notes/what-is-a-rope-hat-origins-styles-and-why-golfers-wear-them)). Imperial's decade-by-decade history has no sources: do not repeat it as fact. Say plainly that the rope's origin isn't well documented and that the "keeps the hat on in wind" story is unverified.
  - GOLF.com (Feb 2021) says rope hats had returned to mainstream style; its roundup lists no women's rope hats ([GOLF.com](https://golf.com/lifestyle/best-rope-hats-golfers/?amp=1)).
- **Product facts:**
  - Cream Rope Cap: warm cream with a white rope across the brim; multicolor embroidered golfer on the front; five-panel cap with a curved brim; adjustable; "The hat that started Bogey Baby". products.ts lists no fabric or closure type for this hat, so don't state one.
  - Sunwashed Rope Cap: 100% polyester micro ripstop; semi-structured five-panel, high profile; slightly curved bill with a rope braid; performance sweatband; plastic snapback; embroidered golfer; colors Espresso, Chambray, Peachy.
- **Internal links:**
  - "golf rope caps" -> `/collections/rope-caps` (upper 40%)
  - "the Cream Rope Cap" -> `/products/cream-rope-cap`
  - "the embroidered classics" -> `/collections/embroidered`
  - Siblings: #18, #28; up-link to `/collections/caps` until #29 ships.
- **Image:** real macro photo of the rope and the embroidered golfer on the Cream Rope Cap. The existing real images `/images/products/flagship-cream-front.webp` and `/images/lifestyle/cap-on-pine.webp` can be used. Do not use `flagship-cream-macro.webp` (AI). Cover badge "WHAT IS A ROPE HAT?".
- **CTA:** "Shop the Cream Rope Cap" -> `/products/cream-rope-cap`.
- **Must NOT claim:** an origin date or inventor; that the rope has a function; durability claims for the embroidery (avoid the site's "so she lasts" line in blog copy).

---

## 10. Writing rules

### 10.1 Voice (from the build plan, section 3.3)

- Warm, a little cheeky, self-aware. Talk to her like a friend in the cart. Example of the register: "Bogeys happen. Bad hat days don't."
- Short sentences, one idea per line. Mix 6-word lines with 15-20 word explanations. Split anything over 30 words.
- Use her words: "fits my smaller head", "matches my outfit", "lunch after the round", "first tee", "19th hole", "the group", "good company", "our golfer", "stitched", "bring your golf buddy".
- Never: golf snobbery or jargon without a definition; "ladies" or "girls" as a product label (her own phrase "girls' trip" is fine as a search term); pink-only framing; body-shaming; "flattering"; beauty-standard language; "ladies' line"; "petite" in copy; "cute" in headlines; "slay".
- Center Black women golfers as the default reader, not as a special section. Write about textured hair as normal hair.
- Honesty is part of the voice: say when another option is better ("a visor is the better pick if...", "we don't make a wide-brim hat").

### 10.2 Banned AI-sounding words and patterns (unslop-seo 20-point table, plus house additions)

- **Zero em dashes and en dashes**, and no spaced hyphens used as dashes. Use a period, comma or colon. Number ranges use a plain hyphen (3-5).
- No "Not just X, but Y", "It's not X, it's Y".
- Cut: delve, pivotal, tapestry, landscape, testament, underscore, foster, garner, interplay, intricate, crucial, vibrant, enduring, showcase, additionally, moreover, furthermore.
- Cut abstract nouns: substrate, vector, locus, nexus, bedrock, paradigm, north star, flywheel.
- No fancy "is": serves as, stands as, boasts, features (as a verb), offers a.
- No puffery: groundbreaking, revolutionary, game-changing, seamless, blazing-fast, world-class, cutting-edge, next-generation, robust.
- No trailing -ing clauses ("..., ensuring a perfect fit").
- Plain verbs: use (not utilize or leverage), help (not facilitate), start (not commence), many (not numerous), to (not in order to), because (not due to the fact that), if (not in the event that).
- Active voice, named actor. Replace adverbs (significantly, easily) with a fact or a stronger verb.
- No restated bullet labels, padded triplets, synonym cycling (pick "cap" or "hat" per sentence and keep it), false ranges ("from beginners to pros").
- Colons only before a list, example or code. Sentence case on every heading. No emoji. Straight quotes only.
- No chatbot lines: "In this article, we'll explore", "Let's dive in", "I hope this helps", "As we have seen", "In conclusion", "In today's fast-paced world".
- **House additions** (common tells in fashion and golf content): "elevate your game", "take your game to the next level", "look no further", "must-have", "game-changer", "level up", "unlock", "whether you're a seasoned pro or a beginner", "when it comes to", "it's important to note", "navigate" (as a metaphor), "journey" (as a metaphor), "embark".
- **Check:** run the check script from `seo-skills/content/unslop-seo/SKILL.md` ("Check script" section) on every draft; 0 hits is required, then read the draft once more for passive voice, padded triplets, colon splices and cadence, which the script can't see.

### 10.3 Intro pattern (intro skill + unslop-seo)

- **The direct answer is in the first 40 words.** Then why it matters to her, in one or two short sentences.
- **80-120 words**, 2-4 short paragraphs, sentences of 8-15 words.
- **Pattern by intent:** how-to (task, why, optional 3-5 outcome bullets, roadmap); listicle (what it is, why the default isn't enough, what the list covers, mirror the count, optional jump link); definition (term and tight definition, why it matters, roadmap); comparison (two-sentence verdict naming when each option wins); debate (two camps, us as the referee, the questions we answer in H2 order).
- **Journey teaser:** "In this guide, you'll learn:" with 3-5 bullets linked to the real H2 anchors.
- **Bold 2-4 hook words** (primary keyword, pain point, outcome); at most one italic aside; never both on one phrase.
- **No H2 inside the intro.** Vary the closing line across a batch ("Here's how it works.", "Below is the full walkthrough.", "The rest of this guide covers it in order."). Never "Let's dive in."
- **Model intro (P1-1, for tone only):**

  > A **golf hat with a ponytail hole** has an opening at the back, so your hair goes through the hat instead of under it. There are three designs: a concealed opening, an open back with elastic bands, and a visor with no crown at all.
  >
  > Which one works depends on **where you wear your ponytail**.
  >
  > In this guide, you'll learn:
  > - How each ponytail design works
  > - Which design suits a low pony, high pony or bun
  > - What else to check before you buy
  > - How our five ponytail caps compare
  >
  > Here's how to pick yours.

### 10.4 Length and structure

| Type | Words | H2s |
| --- | --- | --- |
| Definition | 1,000-1,400 | 4-6 |
| How-to / comparison | 1,200-2,000 | 5-8 |
| Pillar | 1,800-2,500 | 6-9 |
| Listicle / directory | 1,500-2,600 | one per item, plus 2-3 |

These ranges are my judgement from the pages that rank now; cut anything that doesn't answer the reader. Every post of 1,200+ words has 5 or more H2s and never skips a level.

### 10.5 Formatting

- At least one H2 is the reader's question, word for word, followed by a 1-2 sentence answer before any list or table.
- Every section can stand alone (answer engines quote heading-bounded chunks). Product comparisons use identical self-contained blocks: name, what it is, best for, trade-off, link. **No price in the block** (product cards render prices from data).
- Tables are HTML/Markdown, never images. Every number on a graphic is also in the text.
- One `ProductCallout` after the problem section (two over 2,500 words). End with the product block and the C-16 signup (P-21 template).
- FAQ section of 3-5 questions phrased as she'd type them.
- Frontmatter for drafts: `title` (without the suffix), `description`, `slug`, `date`, `updated`, `cluster`, `stage`, `primaryKeyword`, `image`, `imageAlt`, `products` (handles), `sources` (URLs), `status: draft`.
- Unresolved facts go in an MDX comment, never in visible text: `{/* [NEEDS FACT: ...] */}`, and the unverified sentence is deleted.

### 10.6 Images (seo-blog-images, adapted to the brand rules)

- **No AI-generated people, ever** (build plan 4.5: "No stock photos and no AI-generated people"). **Never present an AI image as a customer, reviewer, founder or fit-panel member** (README).
- **Never use AI to render our hats** in a blog image. That's the hat version of the skill's "never ask an image model to draw a real product's UI". Use Printify mockups or real photos. Files flagged `ai: true` in `media.ts` or `products.ts` are off-limits for the blog. Real (`ai: false` or unflagged) images available now: `/images/lifestyle/cap-on-pine.webp`, `/images/lifestyle/cart-friends.webp` (do not caption the people as customers), `/images/products/flagship-cream-front.webp`, the hero-film frames, and the badge `/brand/golfer-badge-384.webp`.
- **Path C (deterministic SVG)** for every table, chart, diagram, timeline and map, using only numbers from the post's sources. Font `system-ui`, dark pine text on paper (#FAEFDF).
- **Path A (AI)** only for people-free, product-free scenes, 12-22 word prompts, bright daylight, no dark icon-box layouts. Read every generated image back letter by letter.
- **Cover:** 16:9, at least 1200 px wide, 350 KB max, 3-6 word headline badge inside the center 80%, the G-44 gold stitch frame, set as the OG image in frontmatter.
- **Inline:** `.webp`, 220 KB max, explicit `width` and `height`, `loading="lazy"` and `decoding="async"`, placed after the first paragraph of its H2.
- **Filenames:** keyword kebab-case naming the subject (`golf-visor-vs-cap-vs-bucket-coverage.webp`), never `image1` or `hero`.
- **Alt text:** 80-160 characters, says what the image shows in the post's terms, never starts with "Image of".

### 10.7 Fact rules

1. **Product claims come only from `storefront/src/data/products.ts`** (features, details, fit, decoration, description). Policies come from `storefront/src/lib/site.ts` and the live shipping page copy. Use the wording in section 11. If a fact isn't there, it doesn't go in.
2. **No prices in body copy.** Prices in products.ts are proposals. Product cards render them.
3. **No invented statistics, studies, quotes, reviews, ratings, testimonials, customer stories, founder lines or "our fit panel found".** No star ratings until 10+ real reviews exist.
4. **Every external fact is cited inline** with a link to the page it came from. Only pages in section 13 marked "opened" can be cited without re-checking; anything else must be opened and read that day. Search-result snippets are not sources.
5. **Health and sun content** quotes AAD or SCF wording, says "general guidance, not medical advice", and never says a hat or product prevents skin cancer, sunburn or hair damage.
6. **Other brands:** name a product only with facts from its own page, checked that day, with the date in an MDX comment. No competitor logos or screenshots. Don't rank our hats as "best" or "#1".
7. **Real people:** quotes from interviews only with written consent, transcribed (Scribiz) and kept on file. Fit-panel quotes are labelled "Fit panel, received a free hat" (build plan P-13, FTC).
8. **Embroidered vs printed:** say "stitched" or "embroidered" only for the six embroidered items; the others are "printed".

---

## 11. Brand fact sheet for writers

### 11.1 The 13 hats (from `products.ts`)

| Hat (handle) | Style / line | Decoration | Key facts writers may use | Fit and closure | Collections |
| --- | --- | --- | --- | --- | --- |
| The Cream Rope Cap (`cream-rope-cap`) | Rope cap / flagship | Embroidered (multicolor golfer, front) | Warm cream with a white rope across the brim; five-panel, curved brim; "The hat that started Bogey Baby: good for the first tee, the 19th hole and lunch after." | Adjustable | all, embroidered, caps, rope-caps |
| The Sunwashed Rope Cap (`sunwashed-rope-cap`) | Rope cap / classics | Embroidered | 100% polyester micro ripstop; semi-structured five-panel, high profile; slightly curved bill with rope braid; performance sweatband; Espresso, Chambray, Peachy | Plastic snapback | all, embroidered, caps, rope-caps |
| The Front Nine Ponytail Cap (`front-nine-ponytail-cap`) | Cap / classics | Embroidered | Concealed ponytail opening; 100% cotton pigment-washed twill; Elude makeup-resistant, breathable, wicking sweatband; pre-curved brim with pattern undervisor | Unstructured six-panel, low profile; antique brass tri-glide | all, embroidered, caps, ponytail-caps |
| The Range Day Mesh Cap (`range-day-mesh-cap`) | Cap / classics | Embroidered | Concealed ponytail opening; cotton twill front, soft polyester mesh back; makeup-resistant moisture-management sweatband | Unstructured six-panel, low profile; plastic snapback | all, embroidered, caps, ponytail-caps |
| The Tee Time Dad Cap (`tee-time-dad-cap`) | Dad cap / classics | Embroidered | 100% cotton; Permacurv visor with four-row stitching; Spruce, Stone, White | Unstructured six-panel, low profile; hideaway strap with antique brass buckle | all, embroidered, caps |
| The Winter Rules Beanie (`winter-rules-beanie`) | Beanie / classics | Embroidered (on the cuff) | 100% Turbo acrylic, hypoallergenic; 12" cuffed; "For frosty early rounds and the walk to the clubhouse" | One size fits all, stretchy knit | all, embroidered, beanies |
| The Back Nine Ponytail Cap (`back-nine-ponytail-cap`) | Cap / performance | Printed (DTF, front-left) | UPF 50+; 100% recycled polyester; open back panel with elastic cross bands "for your ponytail or bun"; moisture-management antimicrobial sweatband; grey undervisor | Unstructured six-panel, low profile; micro hook-and-loop | all, performance, caps, ponytail-caps |
| The Small Fit Performance Cap (`small-fit-performance-cap`) | Cap / performance | Printed (DTF, front-left) | **Small fit** "for smaller heads, so the brim sits where it should"; UPF 50+; 100% recycled polyester; moisture-wicking antimicrobial sweatband | Unstructured six-panel, low profile; D-ring micro hook-and-loop | all, performance, caps |
| The Clubhouse Visor (`clubhouse-visor`) | Visor / performance line | Printed (DTF, front) | "Shade for your eyes, nothing on your hair"; 100% cotton bio-washed chino twill; pre-curved brim; tear-away label. **No UPF claim.** | Adjustable hook-and-loop | all, performance, visors |
| The 19th Hole Bucket (`19th-hole-bucket`) | Bucket / performance | Printed (DTF, front) | UPF 50+ performance fabric (100% polyester); performance sweatband; sewn eyelets for airflow; striped band; small Imperial maker logo on the crown | Unstructured, relaxed fit | all, performance, bucket-hats |
| The Weekend Bucket Hat (`weekend-bucket-hat`) | Bucket / classics | Printed (DTF, front) | Light to mid-weight 100% cotton; reinforced brim; side eyelets. **No UPF claim.** | Snug fit, one size fits all | all, bucket-hats |
| The Cart Path Trucker (`cart-path-trucker`) | Trucker / classics | Printed (DTF, front-left) | Concealed ponytail opening; cotton micro canvas front, polyester mesh back; Elude makeup-resistant, breathable sweatband | Structured six-panel, mid profile; snapback | all, caps, ponytail-caps |
| The Turn Cord Cap (`the-turn-cord-cap`) | Cap / classics | Printed (DTF, front-left) | Concealed ponytail opening; thin-wale corduroy front, mesh back; Elude makeup-resistant, breathable, moisture-wicking sweatband; "for cool-weather rounds" | Light-structured six-panel, low profile; snapback | all, caps, ponytail-caps |

Quick lists:
- **Ponytail (5):** concealed opening on Front Nine, Range Day, Cart Path Trucker, Turn Cord; open back on Back Nine.
- **UPF 50+ fabric (3):** Back Nine, Small Fit, 19th Hole Bucket.
- **Small fit (1):** Small Fit Performance Cap.
- **Makeup-resistant sweatband (4):** Front Nine, Range Day, Cart Path Trucker, Turn Cord.
- **Mesh back (3):** Range Day, Cart Path Trucker, Turn Cord.
- **Embroidered (6):** Cream Rope, Sunwashed Rope, Front Nine, Range Day, Tee Time, Winter Rules Beanie. Everything else is printed.
- **Our golfer:** a Black woman golfer caught mid-swing (in her follow-through), in sunglasses and a green striped scarf. Brand colors: pine, cream and old gold.

### 11.2 Policies (site.ts and the live shipping page)

- Free US shipping on every order. US addresses only at launch.
- Every hat is made to order and ships within 10 business days.
- Free fit exchanges within 30 days of delivery.
- Returns of unworn hats within 30 days of delivery, no restocking fee.
- Bundles (`pricing.ts`): 2 hats save 10% ("The Golf Buddy Pair"); 3 or more save 15% ("The Foursome Starter").
- These policies are marked "confirm before launch" in the README and the claims register. Mention them in CTA lines and link to `/pages/shipping-returns`, so they can be updated in one place.

### 11.3 Open questions for the owner (resolve before the related post ships)

1. **The golfer's scarf vs sweater.** The brief and the Printify artwork name ("Golden-Tan Golfer with Green Striped Scarf") say scarf; the About page and the build plan say "green striped sweater". Writers use "scarf" until the About page is reconciled.
2. **Ship time.** `site.ts` says `makeTime` and `transitTime` are 2-5 business days each; the shipping page, FAQ and README say "ships within 10 business days". Writers use "ships within 10 business days".
3. **UPF 50+.** products.ts and the FAQ state UPF 50+ from the blank maker's description; build plan Appendix A says "Pending (not used until tested)". Needed before P1-6 and P1-7 ship.
4. **Cart Path Trucker wicking.** Its `wicking: true` flag makes the product page say "moisture-managing sweatband", but its details say only "makeup-resistant, breathable". Writers use the details wording.
5. **Colors that don't match Printify** (README table): Front Nine Rose, Back Nine Winter Green, Weekend Bucket Hazy Pink, Winter Rules Gold, Cart Path Emerald, Turn Cord Chocolate. Don't describe these colors in posts until fixed.
6. **Care instructions.** The FAQ's care answer (spot clean or hand wash cold, air dry) isn't in products.ts or the claims register (build plan lists care as bracketed). Needed before #30.
7. **Fit ranges in inches.** Pending in the claims register. Until confirmed, no inch or cm figure for any Bogey Baby hat.
8. **Journal route and URL** (`/journal/<slug>` proposed) and the `ProductCallout` component.

---

## 12. Publishing order, batches and measurement

### 12.1 Batches (content-coverage caps each batch at 5; get approval on each batch's table before drafting)

| Batch | Posts | Why this order |
| --- | --- | --- |
| 1 | #1 ponytail, #4 small heads, #5 visor vs hat, #8 first-time outfit, #11 Black women's golf groups | Four pillars that route straight to money pages, plus the community pillar that carries the brand's reason to exist. |
| 2 | #2 braids and locs, #3 hairstyles, #6 UPF 50+, #7 darker-skin sun, #15 rope hat | Supporting posts that feed the batch 1 pillars. #2 and #3 need the content-day photos and a stylist interview. #6 and #7 need the UPF answer (11.3 item 3). |
| 3 | #9 hat etiquette, #10 golf terms, #12 history, #13 gifts, #14 packing list | Top-of-funnel and seasonal. #13 should be live by early November; #14 by March for spring trips. |
| 4+ | P2 then P3 by season: #23 cold weather by early October, #36 mom gifts by mid-April, #27 bachelorette by March. | |

### 12.2 Batch manifest (keep it updated; resume from it)

```
CONTENT BATCH MANIFEST v1
Project: Bogey Baby Journal
Planned at: 2026-11-18
Data snapshot: Google autocomplete + opened pages, 2026-11-18 (no paid SEO data)
Phase: plan

| slug | action | cluster | phase | notes |
| --- | --- | --- | --- | --- |
| golf-hat-with-ponytail-hole | new | A | planned | blitz feeder |
| golf-hats-small-heads | new | B | planned | |
| golf-visor-vs-hat | new | C | planned | |
| what-to-wear-golfing-women | new | D | planned | |
| black-women-golf-groups | new | E | planned | verify every group on its own site |

phase values: planned | research | draft | validate | done | blocked
Anchor tally: (add a row per target as anchors are used)
```

### 12.3 Before each post ships (content-coverage Phase 6)

- Frontmatter complete; slug unique; title and description lengths within limits.
- Every internal link resolves to a real route; at least one money link is in the upper 40%.
- Unslop check script: 0 hits. Brand-word check: no "flattering", "petite", "ladies' line", "slay"; no "cute" in headings.
- Every external fact has an inline link; every product fact matches section 11.
- Images exist, meet size and alt rules, and none are AI people or AI renders of our hats.

### 12.4 After launch

- **Search Console:** submit the sitemap with journal URLs; watch impressions by query for each post at 30, 60 and 90 days. Run `blog-refresher` on any post that sits at positions 5-20 after 90 days.
- **Blitz sprint:** once `/collections/ponytail-caps` is indexed and ranks around 5-20 for "golf hat with ponytail hole" (or close variants), run the 30-day `blitz-seo` ritual: a new internal link from an older post each day, one on-page tweak a day, a daily rank log.
- **Reddit (manual, owner):** from a normal browser, search `site:reddit.com` for the "reddit" autocomplete variants in section 2. Keep only threads that are on Google's page 1, not archived or locked, in subreddits that allow product mentions, where the poster asks something our hats actually solve. Reply rules from `reddit-serp`: answer first, reference the poster's detail, name 1-2 real alternatives with honest trade-offs, 4-8 sentences, **no URLs**, disclose ("I work on Bogey Baby, so grain of salt"), max 2 replies a day, from an account with real history. Never post on the brand's behalf without that disclosure.
- **AI search:** if an AI-visibility tracker is connected later, add the section 4 prompts and each P1 post's question H2s as tracked prompts.
- **Proof upgrades:** after the fit panel and content-day shoot, add real photos and consented quotes (transcribed with Scribiz) to #1, #2, #3 and #4 first.

---

## 13. Sources

All pages below were opened (fetched and read) on 18 Nov 2026 unless marked otherwise. Writers may cite the "opened" pages; anything else must be opened on the day.

### 13.1 Opened and usable

| # | Source | Used for |
| --- | --- | --- |
| 1 | NGF, "Golf participation growing, diversifying" (Feb 2025): https://www.ngf.org/golf-participation-growing-diversifying/ | 2024 female and people-of-color participation |
| 2 | NGF, Female Golf Participation 2026 one-pager (PDF, 2025 data): https://www.ngf.org/wp-content/uploads/2026/03/Female-1-pager-2026.pdf | 8.1M female golfers, 36% of beginners, lapse rate, people of color share. Cite figures only; the PDF forbids reproduction. |
| 3 | Skin Cancer Foundation, golf sun protection: https://www.skincancer.org/blog/sun-protection-habits-golf-course/ | Caps and visors, SPF 30+, reapplication, ears and neck, tee times |
| 4 | Skin Cancer Foundation, sun-protective clothing: https://www.skincancer.org/prevention/sun-protection/clothing/clothing-umbrella-sun-protection/ | UPF definition and ratings, UPF 50 blocks 98%, 3-inch brim |
| 5 | Skin Cancer Foundation, Ask the Expert (scalp): https://www.skincancer.org/blog/ask-the-expert-how-can-i-protect-my-scalp-better/ | Part and hairline sunscreen, UPF 50+ hat for the scalp |
| 6 | American Academy of Dermatology, skin cancer in skin of color: https://www.aad.org/public/diseases/skin-cancer/types/common/melanoma/skin-color | Darker-skin guidance, tinted SPF 30+ |
| 7 | Druids, golf cap vs visor (Sep 2026): https://www.druids.com/blogs/golf/golf-cap-vs-visor | Visor vs cap vs bucket trade-offs |
| 8 | Glenmuir, first golf game clothing guide (Apr 2023): https://www.glenmuir.com/news/first-golf-game-clothing-guide | Women's first-round clothing, visors popular with women, hat customs, ranges |
| 9 | Ship Sticks, golf for beginners: what to wear (Mar 2024): https://shipsticks.com/blog/golf-for-beginners-part-2-what-to-wear | Dress code basics, denim, hats and beanies |
| 10 | Golf Monthly, dress code confusion (Jul 2025): https://www.golfmonthly.com/features/im-a-long-time-golf-club-member-and-the-dress-code-still-confuses-me | Dress codes vary by club |
| 11 | Golf Monthly, hats off on the 18th green? (Jan 2026): https://www.golfmonthly.com/features/would-they-rather-see-my-hat-hair-and-shake-the-hand-that-was-raked-over-my-sweaty-scalp-should-golfers-remove-their-caps-on-the-18th-green | Hat etiquette debate |
| 12 | Golf Monthly forum, "Golf Hats?" (Aug 2020): https://forums.golfmonthly.com/threads/golf-hats.106360/ | Verbatim small-head complaint |
| 13 | The Sand Trap forum, "Visor, cap or nothing" p.3 (2010): https://thesandtrap.com/forums/topic/34332-visor-cap-or-nothing/?page=3 | Why golfers choose visor or cap (context only; no women posters) |
| 14 | Nike, how to measure hat size (Apr 2024): https://www.nike.com/sg/a/how-to-measure-hat-size | Measuring method, one-size range 54-61 cm |
| 15 | GOLF.com, best golf hats (Jul 2023): https://golf.com/gear/accessories/best-golf-hats/ | Gap evidence: one women's hat in nine |
| 16 | GOLF.com, ponytail alternatives (Aug 2020): https://golf.com/lifestyle/snazz-up-your-headwear-game-with-these-3-fun-ponytail-alternatives/?amp=1 | Hairstyles under a hat or visor |
| 17 | GOLF.com, removing sweat stains from hats (Oct 2022): https://golf.com/lifestyle/best-ways-remove-sweat-stains-hat/ | Four-method wash test (for #30) |
| 18 | GOLF.com, best rope hats (Feb 2021): https://golf.com/lifestyle/best-rope-hats-golfers/?amp=1 | Rope hats' return; no women's styles listed |
| 19 | Imperial, what is a rope hat (Jun 2026): https://imperial1916.com/blogs/field-notes/what-is-a-rope-hat-origins-styles-and-why-golfers-wear-them | Definition only; its history is unsourced |
| 20 | ThinkIndoor, best golf hats for small heads: https://thinkindoor.com/?p=26143 | Competitor gap analysis only (do not cite as fact) |
| 21 | GolferHive, golf hairstyles for Black women: https://golferhive.com/golf-hairstyle-black-women/ | Competitor gap analysis only (do not cite) |
| 22 | Wake-Robin Golf Club, About us: https://wake-robingolf.org/about-us | Founding date, founders, desegregation advocacy, mission |
| 23 | Wikipedia, Helen Webb Harris: https://en.wikipedia.org/wiki/Helen_Webb_Harris | Wake-Robin context and date discrepancy |
| 24 | Wikipedia, Ann Gregory: https://en.wikipedia.org/wiki/Ann_Gregory | History facts (confirm with a primary source) |
| 25 | Wikipedia, Renee Powell: https://en.wikipedia.org/wiki/Renee_Powell | History facts (confirm with a primary source) |
| 26 | Wikipedia, Althea Gibson: https://en.wikipedia.org/wiki/Althea_Gibson | LPGA 1964 (confirm with a primary source) |
| 27 | Queens At Work, 5 golf communities for Black women (Mar 2025): https://queensatwork.com/5-golf-communities-for-black-women/ | Group list (verify each on its own site) |
| 28 | LPGA Amateur Golf Association, memberships: https://lpgaamateurs.com/memberships/ | Eligibility, beginner program, chapters |
| 29 | Scottish Golf History, origin of "bogey": https://www.scottishgolfhistory.org/origin-of-golf-terms/bogey/ | Bogey origin |
| 30 | Topgolf FAQ: https://topgolf.com/us/faq/ | No formal dress code; no metal spikes |
| 31 | Golfers Authority, what to wear to Topgolf: https://golfersauthority.com/what-to-wear-to-topgolf | SERP analysis only (cites no Topgolf source) |
| 32 | Australian Golf Digest / Golf Digest, girls' golf weekend packing list (Nov 2025): https://www.australiangolfdigest.com.au/the-ultimate-girls-golf-weekend-packing-list-2/ | Gap: no hats |
| 33 | Sunday Golf, golf gifts for women (Dec 2025): https://sundaygolf.com/blogs/news/golf-gifts-for-women | Gift SERP analysis |
| 34 | Google autocomplete (public suggest endpoint), about 150 seed queries, US English: `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=<seed>` | Demand signals and phrasing (section 3.1) |

### 13.2 Opened but not usable as a source

- Golf Monthly, best women's golf hats: https://www.golfmonthly.com/best-golf-deals/best-womens-golf-hats-208333 (only the title loaded)
- Skratch, women's style hats page: https://www.skratch.golf/style/womens-style/few-favorites-7-golf-hats-for-the-girls (returned a listing page with no hat content)
- Black Girls Golf: https://www.blackgirlsgolf.com/ (redirects to a domain-sale page as of 18 Nov 2026)
- BET article link: https://www.bet.com/article/6r0pvt/the-overlooked-story-of-black-women-in-golf (returned the BET homepage)

### 13.3 Tried and blocked (do not cite until opened)

- pga.com "what to wear" (403), womenandgolf.com first lesson (403), golfdigest.com women's trip tips (403), academy.com (bot wall), aarp.org Wake-Robin (403), essence.com Black Girls Golf (403), golfgalaxy.com and dickssportinggoods.com product and review pages (403), usga.org terminology (403), new.blackpast.org (not reachable from this session's network), lpga.com about page (404), en.wikipedia.org/wiki/Wake-Robin_Golf_Club (404), reddit.com (blocked for this research client).
