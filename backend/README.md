# Bogey Baby backend (Medusa v2)

The commerce backend for the Bogey Baby store. It's built on [Medusa](https://github.com/medusajs/medusa) v2.22, starting from the official `medusa-starter-default`.

## What's in it

**The store**
- Bogey Baby, selling in USD with a single US region.
- The system payment provider is in place until Stripe keys are added.

**Shipping**
- One option, "Free US shipping", from a "Printify (made to order)" stock location.
- Hats are made to order, so inventory isn't tracked.

**Sales channel and categories**
- The "Bogey Baby Storefront" sales channel has its own publishable API key. The key is printed in the deploy logs and is safe to use in the browser.
- The storefront's collections are product categories: Embroidered classics, Performance, Ponytail caps, Caps, Rope caps, Visors, Bucket hats and Beanies.

**Products**
- All 13 hats from the storefront, each with colour variants and USD prices. Images point at the storefront's public images.
- Printify IDs are stored in metadata, ready for fulfilment:
  - product: `metadata.printify_product_id`
  - each variant: `metadata.printify_variant_id`

The catalog lives in `src/scripts/data/catalog.json`. It's exported from the storefront, so after changing `storefront/src/data/products.ts`, re-export it:

```bash
node ../storefront/scripts/export-catalog.cjs > src/scripts/data/catalog.json
```

The seed (`src/scripts/seed-bogey-baby.ts`) only creates what's missing, so it runs safely on every deploy. It never overwrites products already in the database. To change an existing product, use the admin.

## Run it locally

You need Postgres and Redis.

```bash
cp .env.template .env      # then fill in DATABASE_URL etc.
npm install
npx medusa db:migrate
npx medusa user -e you@example.com -p a-strong-password
npm run seed
npm run dev                # http://localhost:9000, admin at /app
```

## Deploy (Railway)

The service is `medusa` in the `bogey-baby-storefront` project, alongside its own Postgres and Redis.

| Setting | Value |
|---|---|
| Root directory | `/backend` |
| Build | `npm run build` (compiles the server and the admin to `.medusa/server`) |
| Start | `cd .medusa/server && npm install --omit=dev && npm run predeploy && npm run start` |
| `predeploy` | Migrates the database, creates the first admin user from `MEDUSA_ADMIN_EMAIL` and `MEDUSA_ADMIN_PASSWORD` (skipped if it exists), then runs the seed |
| Healthcheck | `/health` |

**Variables:**
- `DATABASE_URL=${{Postgres.DATABASE_URL}}`
- `REDIS_URL=${{Redis.REDIS_URL}}`
- `JWT_SECRET` and `COOKIE_SECRET`: random values
- `STORE_CORS`, `ADMIN_CORS`, `AUTH_CORS`
- `MEDUSA_BACKEND_URL`
- `STOREFRONT_URL`
- `MEDUSA_ADMIN_EMAIL` and `MEDUSA_ADMIN_PASSWORD`

Secrets live only in Railway, never in this repo. After your first login, change the admin password in the admin under Settings → Profile.

## Still to do before taking real orders

1. **Payments.** Add the Stripe payment provider (`@medusajs/medusa/payment-stripe`) with `STRIPE_API_KEY` and a webhook secret, and enable it on the US region.
2. **Storefront.** Point it at this backend for cart and checkout through the store API, using the publishable key.
3. **Printify orders.** Add a subscriber on `order.placed` that creates the Printify order from the metadata IDs above. Start with orders held for review rather than sent straight to production.
4. **Sales tax.** Set the US tax rates in the admin (Settings → Tax Regions).
