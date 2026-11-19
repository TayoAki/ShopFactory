# Checkout campaign attribution

On a tagged landing visit, permitted utm_source, utm_medium, utm_campaign, utm_content and utm_term tags are saved as first/last touches in tab session storage for up to 24 hours. Only bounded plain campaign strings are accepted. No customer emails, click IDs, private order references or cross-site identifiers are stored here.

Live checkout forwards this optional context. The server independently validates fields, timestamps and ordering, respects DNT / Sec-GPC and the client's opt-out state, and saves the first checkout-attempt attribution in PostgreSQL. Retries preserve the original attribution; opt-out clears local attempt attribution. Stripe receives only safe last-touch source/medium/campaign plus an explicit campaign/unknown marker. Existing permitted metadata on an already-created Stripe session is historical; reusing that session does not send new attribution.

Unknown is not relabeled organic or direct. This is campaign annotation, not proof of causation, advertising-platform attribution, cross-device identity or precise CAC. Actual paid sales remain reconciled independently of browser analytics. Existing orders are not retroactively assigned campaigns.

Regression checks exercise persisted attempt context, Stripe metadata, idempotent retries, unknown state and Sec-GPC. Browser checks run only against an isolated local build, block all external analytics, intercept checkout POST, and cover product-page shopping, quick add, and opt-out. No live payments or manufacturing orders are created by those checks.
