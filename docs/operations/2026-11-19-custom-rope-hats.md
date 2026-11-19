# Personalized rope-hat integration

Upload-first customer flow: PNG/JPG logo or name → selected rope cap and quantity → immutable artwork preview and complete quote → explicit approval → Stripe Checkout. Printify is the selected supplier. Printful is not used.

Each artwork creates a private, unpublished Printify product. Store the upload ID, supplier product and variant with the approved artwork hash. Never call supplier publication endpoints for customer designs. Use the existing verified-payment ledger and idempotent Printify queue; only verified live, non-refunded, non-disputed payments can reach production. Revalidate the private product, its artwork reference and actual supplier order costs before send-to-production. Changed costs or design mappings stop production for operator review.

CUSTOM_HATS_ENABLED and CUSTOM_ROPE_CONFIG control availability. The configuration identifies the verified template, blueprint, provider, front-embroidery placement and variants. All supplier credentials stay in Railway. Disabled ordering cannot create a payment. Artwork is kept in Postgres behind unguessable capability URLs with no-store/noindex headers. Uploads are size/pixel bounded and normalized to PNG; SVG uploads are rejected. Design mutation and checkout use a per-design database lock. Anonymous storage is bounded and unused private supplier products are cleaned up.

Custom checkouts use the regular US shipping threshold, automatic Stripe Tax and a separate basket without general bundle discounts. The server reserves monthly supplier capacity atomically, allows for recorded operating expenses and infrastructure headroom, and rechecks at production, including month changes. Supplier cost allocations are visible separately in the private growth dashboard so contribution is not double counted.

The existing five-minute worker handles retries and expiry. /customer-care/custom-hats lists custom checkouts and review issues under staff authentication. Printify may place embroidery on hold for digitization changes and notifies the merchant. Obtain buyer approval before accepting revised artwork; the integration does not automatically approve changed designs. Existing store return terms remain in force.

Tests must distinguish isolated supplier/payment fixtures, live unpaid checkout verification, and genuine paid orders. Do not create a physical QA shipment or fabricate sales. Update journal wording and CTAs when availability changes.
