import {validateCustomBasket,guardCustomProduction,completeCustomOrder,expireCustomCheckouts} from './custom-fulfillment';
import { paymentDatabase, stripeClient } from '@/lib/payments';
import { FulfillmentError, printifyOrderPayload, submitPrintifyOrder } from '@/lib/printify';

export async function fulfillPaidOrder(sessionId: string) {
  const db = await paymentDatabase();
  if (process.env.PRINTIFY_AUTO_FULFILLMENT !== 'true') return 'disabled';
  const client = await db.connect();
  let locked = false;
  let destroyConnection = false;
  try {
    locked = (await client.query('SELECT pg_try_advisory_lock(hashtextextended($1,0)) AS locked', [sessionId])).rows[0].locked;
    if (!locked) return 'busy';
    const row = (await client.query('SELECT * FROM bogey_checkout.orders WHERE session_id=$1', [sessionId])).rows[0];
    if (!row) return 'missing';
    if (!row.livemode) {
      await client.query("UPDATE bogey_checkout.orders SET fulfillment_status='skipped_test' WHERE session_id=$1", [sessionId]);
      return 'skipped_test';
    }
    if (['submitted_to_printify', 'skipped_test', 'blocked_refund'].includes(row.fulfillment_status)) return row.fulfillment_status;
    if (new Date(row.fulfillment_next_attempt_at).getTime() > Date.now()) return 'deferred';
    await client.query('UPDATE bogey_checkout.orders SET fulfillment_attempts=fulfillment_attempts+1, fulfillment_updated_at=now() WHERE session_id=$1', [sessionId]);
    try {
      const session = await stripeClient().checkout.sessions.retrieve(sessionId, { expand: ['payment_intent.latest_charge'] });
      const intent = session.payment_intent;
      const charge = intent && typeof intent !== 'string' ? intent.latest_charge : null;
      if (!session.livemode || session.payment_status !== 'paid' || !charge || typeof charge === 'string') throw new FulfillmentError('payment_not_verified');
      if (charge.amount_refunded > 0 || charge.disputed) {
        await client.query("UPDATE bogey_checkout.orders SET fulfillment_status='blocked_refund', fulfillment_last_error='refunded_or_disputed', fulfillment_updated_at=now() WHERE session_id=$1", [sessionId]);
        return 'blocked_refund';
      }
      if(row.basket.customDesignId)await validateCustomBasket(sessionId,row.basket,client);
      const payload = printifyOrderPayload(session, row.basket);
      const orderId = await submitPrintifyOrder(payload, row.printify_order_id, async id => {
        await client.query('UPDATE bogey_checkout.orders SET printify_order_id=$2, printify_shop_id=$3 WHERE session_id=$1', [sessionId, id, process.env.PRINTIFY_SHOP_ID]);
      }, row.basket.customDesignId?order=>guardCustomProduction(sessionId,order,client):undefined);
      if(row.basket.customDesignId)await completeCustomOrder(sessionId,orderId,client);
      await client.query("UPDATE bogey_checkout.orders SET fulfillment_status='submitted_to_printify', printify_order_id=$2, fulfillment_last_error=NULL, fulfillment_updated_at=now() WHERE session_id=$1", [sessionId, orderId]);
      return 'submitted_to_printify';
    } catch (error) {
      const code = error instanceof FulfillmentError ? error.code : 'fulfillment_request_failed';
      const delayMinutes = Math.min(360, 2 ** Math.min(Number(row.fulfillment_attempts), 9));
      await client.query("UPDATE bogey_checkout.orders SET fulfillment_status='retry_pending', fulfillment_last_error=$2, fulfillment_next_attempt_at=now()+($3 * interval '1 minute'), fulfillment_updated_at=now() WHERE session_id=$1", [sessionId, code, delayMinutes]);
      console.error('Printify fulfillment queued for retry', sessionId, code);
      return 'retry_pending';
    }
  } finally {
    if (locked) {
      try { await client.query('SELECT pg_advisory_unlock(hashtextextended($1,0))', [sessionId]); }
      catch { destroyConnection = true; }
    }
    client.release(destroyConnection);
  }
}

export async function processFulfillmentQueue() {
  if (process.env.PRINTIFY_AUTO_FULFILLMENT !== 'true') return { disabled: true };
  await expireCustomCheckouts();
  const db = await paymentDatabase();
  const pending = await db.query(`
    SELECT session_id FROM bogey_checkout.orders
    WHERE fulfillment_status IN ('awaiting_fulfillment','retry_pending')
      AND fulfillment_next_attempt_at <= now()
    ORDER BY fulfillment_next_attempt_at, created_at LIMIT 3
  `);
  const results: Record<string, number> = {};
  for (const row of pending.rows) {
    const status = await fulfillPaidOrder(row.session_id);
    results[status] = (results[status] || 0) + 1;
  }
  return { processed: pending.rows.length, results };
}
