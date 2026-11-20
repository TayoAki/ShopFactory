# Bogey Baby Insights — approved smaller analytics app

User selected the smaller Bogey Baby app after asking to clone PostHog. Upstream is cloned separately at /tmp/bogey-posthog-fork for reference. This app is original storefront code, not a renamed full PostHog distribution. Keep upstream license notices in the reference checkout; do not copy enterprise features.

Scope: private staff traffic/funnel view backed by existing Umami, real-sales snapshot from the payment ledger, click maps and capped rrweb page-session replay in the existing PostgreSQL database. No Clarity, PostHog Cloud or new hosted service. $450 operating cap remains below the user's $500 monthly limit.

Privacy: new affirmative cookie choice for replay; privacy signals override permission. Only known public shopping/editorial paths without query strings or fragments; exclude personal-design, cart, checkout, account, order, search, feedback/support and admin pages. Full-document navigation across replay boundaries prevents the recorder from observing private page transitions. Stop recording before free-text entry and on withdrawal. Mask text and all inputs; block forms and private elements. Sanitize the serialized snapshot again at intake. No identities, input contents, artwork, tokens, full query URLs or payment details. Iframes and scripts are stripped; replay assets must be public same-origin static files.

Cost controls: at most 50 stored page recordings per Eastern day; 3 minutes and 12 chunks per recording; 7-day retention and 50 MiB total hard storage cap; bounded request sizes and rate limiting. Counts and heatmaps are a capped consented sample, not every visitor or a representative conversion study. Existing five-minute maintenance prunes expired data. Staff authentication required for all reads. Operational collection flag allows disabling recording without changing checkout.

Validation: sanitizer tests against personal details, design URLs, scripts and malicious nodes; local PostgreSQL integration tests for limits, idempotence, deletion and authorization; browser tests for reject/accept/withdrawal, private boundaries, desktop/mobile click maps and replay playback. No simulated records presented as customer demand.

Upstream reference: PostHog commit ff2f1117f168474fea2aa77b916b3e08c36a572a, cloned November 19, 2026. Replay implementation uses rrweb 2.2.2 (MIT), with license available at /licenses/rrweb.txt. Store app and dashboard code are original. Staff-authenticated recording submissions are automatically diagnostics and do not count as visitor samples or click maps.

## Verification before release

51 automated tests pass with all local PostgreSQL integration fixtures enabled, including sanitizer, unsafe-resource rejection, encryption, idempotence, daily/session/storage caps and retention. Production build passes. Browser checks pass at 390px and 1440px: staff-only reads (401 without login), renewed consent, opt-out, withdrawal and GPC, local replay persistence/playback, click-map overlay, no horizontal overflow, full navigation at private-page boundaries, no recording on design/query pages, masked test details and excluded artwork URL. No Microsoft/PostHog collection calls. Local test fixtures are not production traffic. Live verification remains a release gate.
