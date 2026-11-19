import type Stripe from 'stripe';
import { getProduct } from '@/lib/catalog';

type SavedLine = {
  handle: string; color: string; qty: number;
  printifyProductId?: string; printifyVariantId?: number;
};
type SavedBasket = { lines: SavedLine[] };
type ShippingDetails = { name?: string | null; address?: Stripe.Address | null };
type ShippingSession = Stripe.Checkout.Session & { shipping_details?: ShippingDetails | null };
export class FulfillmentError extends Error {
  constructor(public code: string) { super(code); }
}
class PrintifyError extends FulfillmentError {
  constructor(public status: number, public body: unknown) { super('printify_http_' + status); }
}

export function printifyOrderPayload(session: ShippingSession, basket: SavedBasket) {
  const shipping = session.collected_information?.shipping_details || session.shipping_details;
  const address = shipping?.address;
  const name = shipping?.name?.trim();
  const email = session.customer_details?.email;
  if (!name || !email || !address?.line1 || !address.city || !address.postal_code || !address.state || address.country !== 'US') {
    throw new FulfillmentError('missing_shipping_details');
  }
  const [firstName, ...lastName] = name.split(/\s+/);
  return {
    external_id: session.id,
    line_items: basket.lines.map((line, index) => {
      const product = getProduct(line.handle);
      const color = product?.colors.find(color => color.slug === line.color);
      const productId = line.printifyProductId || (product?.source.kind === 'printify' ? product.source.productId : undefined);
      const variantId = line.printifyVariantId || color?.printify?.variantId;
      if (!productId || !variantId || !Number.isInteger(line.qty) || line.qty < 1) throw new FulfillmentError('invalid_catalog_mapping');
      return { product_id: productId, variant_id: variantId, quantity: line.qty, external_id: session.id + '-' + index };
    }),
    shipping_method: 1,
    send_shipping_notification: true,
    address_to: {
      first_name: firstName, last_name: lastName.join(' '), email,
      ...(session.customer_details?.phone ? { phone: session.customer_details.phone } : {}),
      country: 'US', region: address.state, address1: address.line1, address2: address.line2 || '',
      city: address.city, zip: address.postal_code,
    },
  };
}
export type PrintifyOrderPayload = ReturnType<typeof printifyOrderPayload>;
export type PrintifyOrder = { line_items?:{product_id:string;variant_id:number;quantity:number;cost?:number}[];total_shipping?:number;total_tax?:number; id: string; status: string; metadata?: { shop_order_id?: string }; external_id?: string };

async function printifyRequest(path: string, body?: object) {
  const token = process.env.PRINTIFY_API_TOKEN;
  const shop = process.env.PRINTIFY_SHOP_ID;
  if (!token || !shop || !/^\d+$/.test(shop)) throw new FulfillmentError('printify_not_configured');
  const response = await fetch('https://api.printify.com/v1/shops/' + shop + path, {
    method: body ? 'POST' : 'GET',
    headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', 'User-Agent': 'BogeyBaby-Fulfillment' },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(20000),
    cache: 'no-store',
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new PrintifyError(response.status, result);
  return result;
}

function productionStarted(order: PrintifyOrder) {
  return ['sending-to-production', 'in-production', 'fulfilled', 'partially-fulfilled'].includes(order.status);
}

/** Persist the provider ID before starting production so a retry always addresses the same order. */
export async function submitPrintifyOrder(payload: PrintifyOrderPayload, existingId: string | null, saveId: (id: string) => Promise<void>, beforeProduction?: (order: PrintifyOrder) => Promise<void>) {
  let id = existingId;
  if (!id) {
    try {
      const created = await printifyRequest('/orders.json', payload);
      id = created.id;
    } catch (error) {
      if (!(error instanceof PrintifyError) || error.status !== 409) throw error;
      const duplicate = error.body as { order?: { id?: string; external_id?: string } };
      if (duplicate.order?.external_id !== payload.external_id) throw new FulfillmentError('duplicate_order_reference_mismatch');
      id = duplicate.order.id || null;
    }
    if (!id || !/^[a-zA-Z0-9-]+$/.test(id)) throw new FulfillmentError('invalid_printify_order_id');
    await saveId(id);
  }
  const path = '/orders/' + encodeURIComponent(id);
  const order: PrintifyOrder = await printifyRequest(path + '.json');
  if ((order.metadata?.shop_order_id || order.external_id) !== payload.external_id) throw new FulfillmentError('printify_order_reference_mismatch');
  if (productionStarted(order)) return id;
  if (order.status === 'canceled') throw new FulfillmentError('printify_order_canceled');
  if (!['pending', 'on-hold', 'payment-not-received'].includes(order.status)) throw new FulfillmentError('printify_order_needs_attention');
  if(beforeProduction)await beforeProduction(order);
  try {
    await printifyRequest(path + '/send_to_production.json', {});
  } catch (error) {
    // The provider may have accepted production even if its response timed out.
    const current: PrintifyOrder = await printifyRequest(path + '.json');
    if (!productionStarted(current)) throw error;
  }
  return id;
}
