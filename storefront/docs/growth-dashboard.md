# Private growth scorecard
Route: /growth. Uses the existing customer-care admin key and eight-hour staff session. Staff can also open it from /customer-care. Never share the key in analytics, screenshots or repository files.

The initial release adds 23 durable missions, evidence notes, reversible/idempotent XP, milestone progress, a weekly activity count, manual monthly budget/cost entries and an experiment notebook. A cap must be below $500 and is not spending authorization. Committed costs convert to actual without duplication; void entries remain auditable.

Orders are from the saved paid-order ledger, not a fresh Stripe reconciliation. Revenue is merchandise after checkout discounts, before refunds, excluding tax and shipping. Periods are complete Eastern calendar days; current subscriber/support/fulfillment totals are explicitly separate. Current submission status does not prove delivery. Test-mode payments and known email test domains are excluded. Live internal verification records need explicit review. No customer emails or payment session IDs enter the dashboard aggregate response.

Umami funnels, refreshed refunds, provider costs, fees and profit are not connected in this version. Unknown sources show unavailable, never fake values. Refresh is on demand; this release adds no unattended monitoring or campaigns. Missions begin planned and award nothing until staff adds evidence and verifies; existing founder-confirmed sample/order/photo facts do not fabricate historical task completions.

Storage: bogey_growth schema in existing checkout PostgreSQL. Existing backup/recovery procedures must include it. Growth writes require staff auth, same-origin checks, bounded input and parameterized queries. Pages/API are no-store/noindex and disallowed in robots. Budget entries and mission notes are staff-only. Staff evidence is attested, not independently verified by the application.

Checks: production build; 25 regression tests with all three local test DBs configured; authenticated/anonymous API checks; budget validation; XP reversal and persistence; 390/768/1440 viewport overflow checks. Local fixture screenshots are not business results.

## Connected reporting upgrade
The dashboard now reads Umami via a server-only API key. Real product-page and quick-add funnels, demo checkout, and test-payment funnels use ordered visitors with a 60-minute inter-step window. Browser purchase events remain separate from the financial ledger; no anonymous visitor is linked to a customer email. Future purchase event identifiers are hashed rather than using private checkout references. Historical staff activity may remain in earlier analytics.

The existing five-minute queue also reconciles financial sources and refreshes the 7/28/90-day analytics caches. A private Sync integrations control can refresh on demand. The visible dashboard reloads every five minutes. Source errors retain cached analytics with stale labels; financial contribution is withheld when incomplete, disputed or stale.

Stripe discovery is restricted to paid, live, USD sessions carrying Bogey Baby's checkout metadata. Missing ledger rows are flagged rather than manufactured or submitted for production. A rolling 190-day discovery window supports 90-day reports. Reads are paginated with an explicit incomplete state at safety limits; five oldest order records are reconciled per run. Provider state must be current and all cohort orders must have complete costs before contribution is shown.

Stripe charge/refund balance transactions supply actual fees including fee credits. Printify line-item fulfillment cost × quantity, order shipping and supplier tax supply provider-reported costs; retail total_price is never treated as cost. Supplier references must match the paid checkout. Covered replacement costs are zero; linked reprints and missing supplier costs require reconciliation and block contribution. Supplier costs are order reports, not a separate supplier settlement audit.

Full refunds exclude known original sales tax. Partial-refund tax splits are proportional estimates unless the amount is tax-free; this explicitly labels contribution estimated. Disputes block contribution. Net contribution after recorded growth expenses is not a complete operating profit: unrecorded overhead, commissions, replacement charges and supplier credits still require bookkeeping. Manual costs acquire a spent timestamp when marked actual, so commitments are not double counted.

No live payment, refund, supplier order or advertising expenditure is created by the reporting sync. The private key is stored in Railway, not shipped to the browser. Umami API keys inherit their issuing account permissions; the dashboard only performs reporting GET requests at runtime.

The default Today view includes activity since midnight Eastern; completed 7/28/90-day views remain available. This avoids hiding launch-day visits.
