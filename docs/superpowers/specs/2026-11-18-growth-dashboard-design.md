# Bogey Baby private growth dashboard — design for review
November 18, 2026

## Direction and scope
Add a mobile-friendly private /growth dashboard to the existing Next.js storefront, reusing the existing staff authentication. Use the existing PostgreSQL service for tasks, activity, goals and cost entries. No new paid platform or infrastructure service is required for the first version. Incremental hosting usage is still possible; no fixed-cost guarantee is implied.

The founder confirmed a growth budget under $500/month, checked physical samples, and real customer orders/photos. Those are founder-confirmed facts, not audited quantities or permission to publish every photo. The exact monthly cap remains unset; do not silently interpret “under $500” as authorization to spend $499.

Alternatives considered: a standalone dashboard adds integration and hosting work; a full Plane/Mautic deployment adds maintenance beyond the initial need. Recommend the existing private admin for a focused first version.

## Screen layout
Cream background, forest-green typography and navigation, restrained golf-scorecard accents, readable numbers. Desktop: compact navigation beside the main workspace; mobile: stacked cards and accessible navigation with no horizontal page scrolling. Respect reduced motion; labels and icons accompany color statuses.

1. Today: important operational exceptions, next best action, refresh time and data health.
2. Store scorecard: live paid orders, merchandise revenue, refunds, confirmed subscribers and fulfillment exceptions. Period selector: 7/28/90 days, America/New_York boundaries. Show count and comparison period; missing data says “not connected” or “not measured.”
3. Growth course: a 90-day roadmap grouped into Foundation, Product Proof, Acquisition and Repeat Customers. Expand a milestone to see linked tasks, acceptance criteria and evidence.
4. Missions: prioritized daily/weekly tasks seeded from the 23-task plan. Task status: planned, in progress, needs verification, verified, blocked. Persist changes across browsers. Each item has owner, due date, evidence note/link and activity history.
5. Experiments: hypothesis, primary metric, baseline, dates, guardrails, outcome and decision. Completing a test does not imply it succeeded.
6. Budget: user-entered monthly cap strictly below $500, committed and actual spend, category and remaining balance. All entry fields are labeled manual until connected to a real source. Recording a budget never initiates spending.

## Honest gamification
Call the progress display the Growth Scorecard. Award XP for verified work, not page views, unverified claims or invented revenue. Example task awards: 10 XP for a routine verified operation, 25 XP for a completed evidence-backed improvement, 50 XP for a documented experiment with a decision. These are task categories, not repeated rewards for pressing a button. Enforce one active award per task, with an auditable reversal if reopened; make this transactional and idempotent.

Levels: Getting Teed Up (0–99 XP), Finding Our Swing (100–249), On the Fairway (250–499), Building Momentum (500+). Labels describe execution progress, not commercial success. Milestone badges require explicit evidence: Sample Checked, Measurement Ready, First Documented Experiment and First Verified Profitable Cohort. A paid order alone cannot earn the profitable-cohort badge without actual costs and refunds. Existing milestones may be recorded retrospectively with evidence; do not fabricate dates or count founder statements as API verification.

Show a weekly consistency count rather than a punitive daily streak. No penalties for weekends or service incidents. A celebration is brief and optional; critical alerts remain prominent regardless of XP. Task completion percentage and financial metrics stay separate.

## Data and security
Read paid orders from the saved Stripe-backed order ledger, with real/test separation. A ledger-only first version must label its coverage and lack of refreshed refund reconciliation honestly; no “net profit” until costs and refund data exist. Read customer/subscriber/support aggregates from existing restricted tables. Show fulfillment exceptions from saved provider status, explicitly distinguishing local submission state from current delivery tracking.

Umami traffic/funnels require validated server-side access; until connected, show a clear unavailable state rather than demo numbers. Keep server credentials and raw customer details out of client payloads. Authorize every page and API request with the existing staff session. Add staff-only navigation from customer care; no public storefront link. Use no-store/noindex protections, origin checks on writes, input validation and bounded queries. External evidence URLs must not execute code or accept unsafe schemes.

Store task/award/activity records and manual cost entries durably in PostgreSQL. Use unique keys and transactions to prevent duplicate XP. Reopening a task reverses the active award; reverification restores it once. Mark manually attested evidence separately from system-observed evidence. Do not send messages, change prices, refund payments, submit Printify orders or buy advertising from this dashboard.

## Acceptance and validation
Verify unauthenticated page/API denial, authorized access, invalid input rejection and same-origin write checks. Test task persistence, duplicate/reversed XP, period boundaries, budget calculations, real/test exclusions and missing-provider states. Check desktop and mobile rendering, keyboard navigation, focus visibility and reduced-motion behavior. No real payment or manufacturing order is needed for tests. Deployment and connected-source claims must be verified after implementation; this file is a proposed design, not a shipped dashboard.
