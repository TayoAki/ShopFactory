/**
 * Seed the Bogey Baby store. Idempotent: it only creates what's missing, so it runs on every deploy.
 *
 * - Store: "Bogey Baby", USD.
 * - Region: United States (USD), system payment provider (swap in Stripe when keys are set).
 * - Stock location "Printify (made to order)", fulfilment via the manual provider, one shipping option:
 *   Free US shipping.
 * - Sales channel "Bogey Baby Storefront" with a publishable API key (printed in the logs).
 * - Categories from the storefront's collections, and every hat from data/catalog.json (exported from the
 *   storefront with `node storefront/scripts/export-catalog.cjs`). Hats are made to order, so inventory isn't
 *   managed. Printify product and variant IDs are kept in metadata for fulfilment.
 */
import { ExecArgs } from '@medusajs/framework/types'
import { ContainerRegistrationKeys, Modules, ProductStatus } from '@medusajs/framework/utils'
import { createWorkflow, transform, WorkflowResponse } from '@medusajs/framework/workflows-sdk'
import {
  createApiKeysWorkflow,
  createProductCategoriesWorkflow,
  createProductsWorkflow,
  createRegionsWorkflow,
  createSalesChannelsWorkflow,
  createShippingOptionsWorkflow,
  createShippingProfilesWorkflow,
  createStockLocationsWorkflow,
  createTaxRegionsWorkflow,
  linkSalesChannelsToApiKeyWorkflow,
  linkSalesChannelsToStockLocationWorkflow,
  updateStoresStep,
  updateStoresWorkflow,
} from '@medusajs/medusa/core-flows'
import catalog from './data/catalog.json'

type CatalogProduct = {
  handle: string
  title: string
  subtitle: string
  description: string
  price: number // cents
  style: string
  line: string
  decoration: string
  fit: string
  collections: string[]
  colors: { name: string; slug: string; swatch: string; image: { src: string }; printify?: { color: string; variantId: number } }[]
  gallery: { src: string }[]
  source: { kind: string; blueprintId?: number; printProviderId?: number; brand?: string; model?: string; productId?: string }
}

const STOREFRONT_URL = (process.env.STOREFRONT_URL || 'https://bogey-baby-preview.up.railway.app').replace(/\/$/, '')
const SALES_CHANNEL = 'Bogey Baby Storefront'
const STOCK_LOCATION = 'Printify (made to order)'
const FULFILLMENT_SET = 'US shipping'
const SHIPPING_OPTION = 'Free US shipping'
const CATEGORY_NAMES: Record<string, string> = {
  embroidered: 'Embroidered classics',
  performance: 'Performance (UPF 50+)',
  'ponytail-caps': 'Ponytail caps',
  caps: 'Caps',
  'rope-caps': 'Rope caps',
  visors: 'Visors',
  'bucket-hats': 'Bucket hats',
  beanies: 'Beanies',
}

const updateStoreCurrencies = createWorkflow(
  'bb-update-store-currencies',
  (input: { store_id: string; supported_currencies: { currency_code: string; is_default?: boolean }[] }) => {
    const normalized = transform({ input }, ({ input }) => ({
      selector: { id: input.store_id },
      update: { supported_currencies: input.supported_currencies.map((c) => ({ currency_code: c.currency_code, is_default: c.is_default ?? false })) },
    }))
    return new WorkflowResponse(updateStoresStep(normalized))
  }
)

const abs = (src: string) => (src.startsWith('http') ? src : `${STOREFRONT_URL}${src}`)

export default async function seedBogeyBaby({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const link = container.resolve(ContainerRegistrationKeys.LINK)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const storeService = container.resolve(Modules.STORE)
  const salesChannelService = container.resolve(Modules.SALES_CHANNEL)
  const regionService = container.resolve(Modules.REGION)
  const taxService = container.resolve(Modules.TAX)
  const stockLocationService = container.resolve(Modules.STOCK_LOCATION)
  const fulfillmentService = container.resolve(Modules.FULFILLMENT)
  const productService = container.resolve(Modules.PRODUCT)

  // Store
  const [store] = await storeService.listStores()
  await updateStoreCurrencies(container).run({ input: { store_id: store.id, supported_currencies: [{ currency_code: 'usd', is_default: true }] } })

  // Sales channel
  let [salesChannel] = await salesChannelService.listSalesChannels({ name: SALES_CHANNEL })
  if (!salesChannel) {
    const { result } = await createSalesChannelsWorkflow(container).run({ input: { salesChannelsData: [{ name: SALES_CHANNEL, description: 'The Bogey Baby Next.js storefront' }] } })
    salesChannel = result[0]
    logger.info(`Created sales channel ${SALES_CHANNEL}`)
  }
  await updateStoresWorkflow(container).run({ input: { selector: { id: store.id }, update: { name: 'Bogey Baby', default_sales_channel_id: salesChannel.id } } })

  // Region + tax region
  let [region] = await regionService.listRegions({ name: 'United States' })
  if (!region) {
    const { result } = await createRegionsWorkflow(container).run({
      input: { regions: [{ name: 'United States', currency_code: 'usd', countries: ['us'], payment_providers: ['pp_system_default'] }] },
    })
    region = result[0]
    logger.info('Created region United States (USD)')
  }
  const taxRegions = await taxService.listTaxRegions({ country_code: 'us' })
  if (!taxRegions.length) {
    await createTaxRegionsWorkflow(container).run({ input: [{ country_code: 'us', provider_id: 'tp_system' }] })
    logger.info('Created US tax region (no default rate; set sales tax in the admin)')
  }

  // Stock location + fulfilment
  let [location] = await stockLocationService.listStockLocations({ name: STOCK_LOCATION })
  if (!location) {
    const { result } = await createStockLocationsWorkflow(container).run({
      input: { locations: [{ name: STOCK_LOCATION, address: { city: 'Made to order', country_code: 'US', address_1: 'Printify print providers' } }] },
    })
    location = result[0]
    await updateStoresWorkflow(container).run({ input: { selector: { id: store.id }, update: { default_location_id: location.id } } })
    await link.create({ [Modules.STOCK_LOCATION]: { stock_location_id: location.id }, [Modules.FULFILLMENT]: { fulfillment_provider_id: 'manual_manual' } })
    logger.info(`Created stock location ${STOCK_LOCATION}`)
  }
  await linkSalesChannelsToStockLocationWorkflow(container).run({ input: { id: location.id, add: [salesChannel.id] } })

  const profiles = await fulfillmentService.listShippingProfiles({ type: 'default' })
  let profile = profiles[0]
  if (!profile) {
    const { result } = await createShippingProfilesWorkflow(container).run({ input: { data: [{ name: 'Default Shipping Profile', type: 'default' }] } })
    profile = result[0]
  }

  let [fulfillmentSet] = await fulfillmentService.listFulfillmentSets({ name: FULFILLMENT_SET }, { relations: ['service_zones'] })
  if (!fulfillmentSet) {
    fulfillmentSet = await fulfillmentService.createFulfillmentSets({
      name: FULFILLMENT_SET,
      type: 'shipping',
      service_zones: [{ name: 'United States', geo_zones: [{ country_code: 'us', type: 'country' }] }],
    })
    await link.create({ [Modules.STOCK_LOCATION]: { stock_location_id: location.id }, [Modules.FULFILLMENT]: { fulfillment_set_id: fulfillmentSet.id } })
    logger.info(`Created fulfillment set ${FULFILLMENT_SET}`)
  }
  const options = await fulfillmentService.listShippingOptions({ name: SHIPPING_OPTION })
  if (!options.length) {
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: SHIPPING_OPTION,
          price_type: 'flat',
          provider_id: 'manual_manual',
          service_zone_id: fulfillmentSet.service_zones[0].id,
          shipping_profile_id: profile.id,
          type: { label: 'Free US shipping', description: 'Made to order. Ships within 10 business days.', code: 'free-us' },
          prices: [
            { currency_code: 'usd', amount: 0 },
            { region_id: region.id, amount: 0 },
          ],
          rules: [
            { attribute: 'enabled_in_store', value: 'true', operator: 'eq' },
            { attribute: 'is_return', value: 'false', operator: 'eq' },
          ],
        },
      ],
    })
    logger.info(`Created shipping option ${SHIPPING_OPTION}`)
  }

  // Publishable API key for the storefront
  const { data: keys } = await query.graph({ entity: 'api_key', fields: ['id', 'token', 'title'], filters: { type: 'publishable', title: 'Bogey Baby storefront' } })
  let apiKey = keys[0]
  if (!apiKey) {
    const { result } = await createApiKeysWorkflow(container).run({
      input: { api_keys: [{ title: 'Bogey Baby storefront', type: 'publishable', created_by: '' }] },
    })
    apiKey = result[0] as typeof apiKey
    await linkSalesChannelsToApiKeyWorkflow(container).run({ input: { id: apiKey.id, add: [salesChannel.id] } })
    logger.info('Created publishable API key')
  }
  logger.info(`Publishable API key (safe to use in the browser): ${apiKey.token}`)

  // Categories
  const products = catalog as CatalogProduct[]
  const wanted = Array.from(new Set(products.flatMap((p) => p.collections))).filter((h) => h !== 'all' && CATEGORY_NAMES[h])
  const existingCats = await productService.listProductCategories({ handle: wanted })
  const missingCats = wanted.filter((h) => !existingCats.some((c) => c.handle === h))
  if (missingCats.length) {
    await createProductCategoriesWorkflow(container).run({
      input: { product_categories: missingCats.map((handle) => ({ name: CATEGORY_NAMES[handle], handle, is_active: true })) },
    })
    logger.info(`Created ${missingCats.length} categories`)
  }
  const categories = await productService.listProductCategories({ handle: wanted })
  const categoryId = (handle: string) => categories.find((c) => c.handle === handle)?.id

  // Products
  const existing = await productService.listProducts({ handle: products.map((p) => p.handle) }, { select: ['id', 'handle'] })
  const toCreate = products.filter((p) => !existing.some((e) => e.handle === p.handle))
  if (toCreate.length) {
    await createProductsWorkflow(container).run({
      input: {
        products: toCreate.map((p) => {
          const images = [...p.colors.map((c) => c.image.src), ...p.gallery.map((g) => g.src)].filter((v, i, a) => a.indexOf(v) === i).map((src) => ({ url: abs(src) }))
          return {
            title: p.title,
            subtitle: p.subtitle,
            handle: p.handle,
            description: p.description,
            status: ProductStatus.PUBLISHED,
            thumbnail: abs(p.colors[0].image.src),
            images,
            category_ids: p.collections.map(categoryId).filter((id): id is string => Boolean(id)),
            sales_channels: [{ id: salesChannel.id }],
            shipping_profile_id: profile.id,
            options: [{ title: 'Color', values: p.colors.map((c) => c.name) }],
            variants: p.colors.map((c) => ({
              title: c.name,
              sku: `BB-${p.handle}-${c.slug}`.toUpperCase(),
              options: { Color: c.name },
              manage_inventory: false,
              prices: [{ amount: p.price / 100, currency_code: 'usd' }],
              metadata: { swatch: c.swatch, image: abs(c.image.src), printify_variant_id: c.printify?.variantId ?? null, printify_color: c.printify?.color ?? null },
            })),
            metadata: {
              style: p.style,
              line: p.line,
              decoration: p.decoration,
              fit: p.fit,
              printify_product_id: p.source.productId ?? null,
              printify_blueprint_id: p.source.blueprintId ?? null,
              printify_print_provider_id: p.source.printProviderId ?? null,
            },
          }
        }),
      },
    })
    logger.info(`Created ${toCreate.length} products: ${toCreate.map((p) => p.handle).join(', ')}`)
  } else {
    logger.info('All products already exist')
  }
  logger.info('Bogey Baby seed complete.')
}
