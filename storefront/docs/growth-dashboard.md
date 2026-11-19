# Private growth scorecard
Route: /growth. Uses the existing customer-care admin key and eight-hour staff session. Staff can also open it from /customer-care. Never share the key in analytics, screenshots or repository files.

The initial release adds 23 durable missions, evidence notes, reversible/idempotent XP, milestone progress, a weekly activity count, manual monthly budget/cost entries and an experiment notebook. A cap must be below $500 and is not spending authorization. Committed costs convert to actual without duplication; void entries remain auditable.

Orders are from the saved paid-order ledger, not a fresh Stripe reconciliation. Revenue is merchandise after checkout discounts, before refunds, excluding tax and shipping. Periods are complete Eastern calendar days; current subscriber/support/fulfillment totals are explicitly separate. Current submission status does not prove delivery. Test-mode payments and known email test domains are excluded. Live internal verification records need explicit review. No customer emails or payment session IDs enter the dashboard aggregate response.

Umami funnels, refreshed refunds, provider costs, fees and profit are not connected in this version. Unknown sources show unavailable, never fake values. Refresh is on demand; this release adds no unattended monitoring or campaigns. Missions begin planned and award nothing until staff adds evidence and verifies; existing founder-confirmed sample/order/photo facts do not fabricate historical task completions.

Storage: bogey_growth schema in existing checkout PostgreSQL. Existing backup/recovery procedures must include it. Growth writes require staff auth, same-origin checks, bounded input and parameterized queries. Pages/API are no-store/noindex and disallowed in robots. Budget entries and mission notes are staff-only. Staff evidence is attested, not independently verified by the application.

Checks: production build; 25 regression tests with all three local test DBs configured; authenticated/anonymous API checks; budget validation; XP reversal and persistence; 390/768/1440 viewport overflow checks. Local fixture screenshots are not business results.
