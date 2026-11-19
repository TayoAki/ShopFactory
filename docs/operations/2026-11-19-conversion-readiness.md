# Conversion readiness — approved audit follow-up

Scope approved by the user: fix the six purchase-friction gaps found in the live audit; keep the current brand and $450 operating cap, under $500/month. No new services, ad campaigns, paid orders or sample purchases.

Design: add a visible homepage shop action and separate custom-hat entry; compact the mobile gallery, put a single-hat purchase ahead of optional bundles, and show delivered price, production/transit and return terms beside purchase actions. Publish only manufacturer-confirmed numerical fit data with attribution. Replace unsupported review promises with a durable customer-feedback route; real testimonials remain pending until consent and evidence are supplied. Customization has three steps: local artwork preview, delivery and exact supplier quote, then immutable approval and checkout. Retain all payment, approval, supplier-cost and budget guards. Reuse supplied shipping details in Stripe through a dedicated checkout Customer; no customer PII in analytics.

Validation: production build/type check; existing integration tests with local fixture databases; new address-prefill and feedback tests; browser checks at small mobile, mobile and desktop sizes, local upload preview with no supplier request, retry/back preservation, checkout approval, consent-gated event fields and pricing. Deploy only the tested commit; recheck live UI and dashboard status. No simulated traffic counts as buyer demand.

## Verified before deployment

- 43 automated tests passed, with all four local PostgreSQL fixture databases; no skips. Includes encrypted quote addresses, idempotent Stripe Customer/session mapping, private feedback intake, separate custom-design analytics and existing fulfillment/budget guards.
- Production build and type checks passed.
- Browser checks at 320px, 390px and 1440px: visible first-screen homepage shopping link and Cream PDP purchase button, no horizontal overflow, optional bundles collapsed, correct $45 delivered pre-tax price.
- Custom flow: local artwork preview before address or supplier request; edits, file and address preserved through Back/Change; one quote request; $56 before tax; approval required; oversized image rejected; name preview works. Captured event properties contain only static stage/kind/reason, item ID and numerical quantity/value.
- Read-only live Umami API accepts the six custom-design funnel steps. It ends at checkout handoff and is labeled as not sales. Actual purchases remain in the real-payment funnel and ledger; demo/test completions stay separate.
- Live Stripe shipping-Customer write permission verified with a synthetic fixture, then the fixture was deleted. No charge or production order.

## Remaining evidence

Numerical fit range is sourced from Imperial's L210P product page, checked November 19, 2026: https://imperial1916.com/products/l210p-the-original-small-fit-performance . Other exact fit ranges remain unverified; the fit guide says so and links to fit help. Real buyer photos/testimonials require founder-supplied originals, wording and publication permission. The feedback form saves messages privately; it does not grant consent or publish them automatically. These evidence gaps stay open on the dashboard; no sales or profitability milestone is awarded for UI work.
