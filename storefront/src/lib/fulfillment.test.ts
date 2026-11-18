import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { after, afterEach, before, test } from 'node:test';
import nock from 'nock';
import { paymentDatabase } from './payments';
import { fulfillPaidOrder, processFulfillmentQueue } from './fulfillment';

const url = process.env.PRINTIFY_TEST_DATABASE_URL;
const integration = url ? test : test.skip;
const ids: string[] = [];
let serial = 0;
const printify = 'https://api.printify.com';
const path = '/v1/shops/123456/orders';
before(async () => {
  if (!url) return;
  const parsed = new URL(url);
  assert.ok(['127.0.0.1', 'localhost'].includes(parsed.hostname));
  assert.equal(parsed.pathname, '/bogey_fulfillment_test');
  process.env.CHECKOUT_DATABASE_URL = url;
  process.env.STRIPE_SECRET_KEY = 'sk_live_fixture_only';
  process.env.PRINTIFY_API_TOKEN = 'fixture-token';
  process.env.PRINTIFY_SHOP_ID = '123456';
  process.env.PRINTIFY_AUTO_FULFILLMENT = 'true';
  nock.disableNetConnect();
  await paymentDatabase();
});
afterEach(() => {
  if (!url) return;
  assert.ok(nock.isDone(), nock.pendingMocks().join(', '));
  nock.cleanAll();
});
after(async () => {
  if (!url) return;
  const db = await paymentDatabase();
  await db.query('DELETE FROM bogey_checkout.orders WHERE session_id=ANY($1)', [ids]);
  await db.query('DELETE FROM bogey_checkout.attempts WHERE session_id=ANY($1)', [ids]);
  await db.end();
  nock.enableNetConnect();
});
async function seed(livemode = true) {
  const db = await paymentDatabase();
  const id = 'cs_live_fixture_' + (++serial);
  ids.push(id);
  const attempt = randomUUID();
  const basket = { lines: [{ handle: 'removed-hat', color: 'cream', qty: 1, printifyProductId: 'product1', printifyVariantId: 123 }] };
  await db.query('INSERT INTO bogey_checkout.attempts(id,basket_hash,basket,session_id) VALUES($1,$2,$3,$4)', [attempt, 'fixture', basket, id]);
  await db.query("INSERT INTO bogey_checkout.orders(session_id,attempt_id,livemode,amount_total,currency,basket,stripe_session) VALUES($1,$2,$3,3800,'usd',$4,'{}')", [id, attempt, livemode, basket]);
  return id;
}
function paidStripe(id: string, refunded = false) {
  nock('https://api.stripe.com').get('/v1/checkout/sessions/' + id).query(true).reply(200, {
    id, livemode: true, payment_status: 'paid',
    payment_intent: { latest_charge: { amount_refunded: refunded ? 3800 : 0, disputed: false } },
    customer_details: { email: 'fixture@example.invalid' },
    collected_information: { shipping_details: { name: 'Test Buyer', address: { line1: '1 Test Street', city: 'Oakland', state: 'CA', postal_code: '94612', country: 'US' } } },
  });
}
async function row(id: string) {
  return (await (await paymentDatabase()).query('SELECT * FROM bogey_checkout.orders WHERE session_id=$1', [id])).rows[0];
}
integration('concurrent callbacks submit one Printify order', async () => {
  const id = await seed();
  paidStripe(id);
  const order = { id: 'order1', status: 'on-hold', metadata: { shop_order_id: id } };
  nock(printify).post(path + '.json').delay(80).reply(201, order);
  nock(printify).get(path + '/order1.json').reply(200, order);
  nock(printify).post(path + '/order1/send_to_production.json').reply(202, { id: 'order1' });
  const result = await Promise.all([fulfillPaidOrder(id), fulfillPaidOrder(id)]);
  assert.ok(result.includes('submitted_to_printify'));
  assert.equal((await row(id)).fulfillment_attempts, 1);
  assert.equal((await row(id)).printify_order_id, 'order1');
  assert.equal(await fulfillPaidOrder(id), 'submitted_to_printify');
});
integration('queues a provider outage and retries with the same external reference', async () => {
  const id = await seed();
  paidStripe(id);
  nock(printify).post(path + '.json').reply(503, {});
  assert.equal(await fulfillPaidOrder(id), 'retry_pending');
  assert.equal((await row(id)).fulfillment_last_error, 'printify_http_503');
  await (await paymentDatabase()).query('UPDATE bogey_checkout.orders SET fulfillment_next_attempt_at=now() WHERE session_id=$1', [id]);
  paidStripe(id);
  const order = { id: 'order2', status: 'on-hold', metadata: { shop_order_id: id } };
  nock(printify).post(path + '.json', body => body.external_id === id).reply(201, order);
  nock(printify).get(path + '/order2.json').reply(200, order);
  nock(printify).post(path + '/order2/send_to_production.json').reply(202, { id: 'order2' });
  assert.equal(await fulfillPaidOrder(id), 'submitted_to_printify');
  assert.equal((await row(id)).fulfillment_attempts, 2);
});
integration('skips sandbox payments and blocks refunded live payments without contacting Printify', async () => {
  const sandbox = await seed(false);
  assert.equal(await fulfillPaidOrder(sandbox), 'skipped_test');
  const refunded = await seed();
  paidStripe(refunded, true);
  assert.equal(await fulfillPaidOrder(refunded), 'blocked_refund');
  assert.equal((await row(refunded)).printify_order_id, null);
  assert.equal(await fulfillPaidOrder(refunded), 'blocked_refund');
});
integration('resumes a persisted provider order after a failed production request', async () => {
  const id = await seed();
  paidStripe(id);
  const order = { id: 'order3', status: 'on-hold', metadata: { shop_order_id: id } };
  nock(printify).post(path + '.json').reply(201, order);
  nock(printify).get(path + '/order3.json').reply(200, order);
  nock(printify).post(path + '/order3/send_to_production.json').reply(503, {});
  nock(printify).get(path + '/order3.json').reply(200, order);
  assert.equal(await fulfillPaidOrder(id), 'retry_pending');
  assert.equal((await row(id)).printify_order_id, 'order3');
  await (await paymentDatabase()).query('UPDATE bogey_checkout.orders SET fulfillment_next_attempt_at=now() WHERE session_id=$1', [id]);
  paidStripe(id);
  nock(printify).get(path + '/order3.json').reply(200, { ...order, status: 'in-production' });
  assert.equal(await fulfillPaidOrder(id), 'submitted_to_printify');
  assert.equal((await row(id)).printify_order_id, 'order3');
  assert.equal((await processFulfillmentQueue()).processed, 0);
});
