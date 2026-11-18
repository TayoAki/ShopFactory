const endpoint = process.env.FULFILLMENT_ENDPOINT;
const secret = process.env.FULFILLMENT_CRON_SECRET;
if (!endpoint || !secret) throw new Error('Fulfillment retry job is not configured.');
const response = await fetch(endpoint, {
  method: 'POST',
  headers: { Authorization: 'Bearer ' + secret },
  signal: AbortSignal.timeout(240000),
});
if (!response.ok) throw new Error('Fulfillment retry job returned HTTP ' + response.status);
const result = await response.json();
console.log(JSON.stringify({ type: 'printify_fulfillment_retry', ...result }));
if (result.results?.retry_pending) console.error('Printify orders remain queued for retry. Check storefront fulfillment error codes.');
