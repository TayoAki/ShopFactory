import assert from 'node:assert/strict';
import { after, afterEach, before, test } from 'node:test';
import nock from 'nock';
import type Stripe from 'stripe';
import { printifyOrderPayload, submitPrintifyOrder } from './printify';

const session = {
  id: 'cs_live_fulfillment_fixture',
  customer_details: { email: 'buyer@example.invalid' },
  collected_information: { shipping_details: {
    name: 'Test Buyer',
    address: { line1: '1 Test Street', line2: null, city: 'Oakland', state: 'CA', postal_code: '94612', country: 'US' },
  } },
} as unknown as Stripe.Checkout.Session;
const basket = { lines: [{ handle: 'legacy-hat', color: 'old-color', qty: 2, printifyProductId: 'product1', printifyVariantId: 123 }] };
const payload = printifyOrderPayload(session, basket);
const order = { id: 'order1', status: 'on-hold', metadata: { shop_order_id: session.id } };
const origin = 'https://api.printify.com';
const path = '/v1/shops/123456/orders';

before(() => {
  process.env.PRINTIFY_API_TOKEN = 'fixture-token';
  process.env.PRINTIFY_SHOP_ID = '123456';
  nock.disableNetConnect();
});
afterEach(() => {
  assert.ok(nock.isDone(), 'Expected requests were not made: ' + nock.pendingMocks().join(', '));
  nock.cleanAll();
});
after(() => nock.enableNetConnect());

test('uses the paid snapshot even after a catalog variant is removed, and supports old shipping field', () => {
  assert.deepEqual(payload.line_items, [{ product_id: 'product1', variant_id: 123, quantity: 2, external_id: session.id + '-0' }]);
  assert.equal(payload.address_to.first_name, 'Test');
  assert.equal(payload.address_to.last_name, 'Buyer');
  const legacy = { ...session, collected_information: null, shipping_details: session.collected_information!.shipping_details };
  assert.deepEqual(printifyOrderPayload(legacy, basket), payload);
  assert.throws(() => printifyOrderPayload({ ...session, collected_information: null }, basket));
});

test('persists provider ID before sending production and uses standard shipping', async () => {
  let saved = '';
  nock(origin).post(path + '.json', body => body.external_id === session.id && body.shipping_method === 1).reply(201, order);
  nock(origin).get(path + '/order1.json').reply(200, order);
  nock(origin).post(path + '/order1/send_to_production.json', () => saved === 'order1').reply(202, { id: 'order1' });
  assert.equal(await submitPrintifyOrder(payload, null, async id => { saved = id; }), 'order1');
});

test('recovers a lost create response through Printify external_id uniqueness', async () => {
  nock(origin).post(path + '.json').replyWithError('connection reset after creation');
  await assert.rejects(submitPrintifyOrder(payload, null, async () => {}));
  nock(origin).post(path + '.json').reply(409, { order: { id: 'order1', external_id: session.id } });
  nock(origin).get(path + '/order1.json').reply(200, order);
  nock(origin).post(path + '/order1/send_to_production.json').reply(202, { id: 'order1' });
  assert.equal(await submitPrintifyOrder(payload, null, async () => {}), 'order1');
});

test('does not recreate or resubmit an order that is already in production', async () => {
  nock(origin).get(path + '/order1.json').reply(200, { ...order, status: 'in-production' });
  assert.equal(await submitPrintifyOrder(payload, 'order1', async () => assert.fail('unexpected create')), 'order1');
});

test('recovers an ambiguous production response by checking provider state', async () => {
  nock(origin).get(path + '/order1.json').reply(200, order);
  nock(origin).post(path + '/order1/send_to_production.json').replyWithError('connection reset after production accepted');
  nock(origin).get(path + '/order1.json').reply(200, { ...order, status: 'sending-to-production' });
  assert.equal(await submitPrintifyOrder(payload, 'order1', async () => {}), 'order1');
});

test('refuses canceled orders and mismatched external references', async () => {
  nock(origin).get(path + '/order1.json').reply(200, { ...order, status: 'canceled' });
  await assert.rejects(submitPrintifyOrder(payload, 'order1', async () => {}), /printify_order_canceled/);
  nock(origin).get(path + '/order1.json').reply(200, { ...order, metadata: { shop_order_id: 'other-checkout' } });
  await assert.rejects(submitPrintifyOrder(payload, 'order1', async () => {}), /printify_order_reference_mismatch/);
});
