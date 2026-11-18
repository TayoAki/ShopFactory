/**
 * First-party analytics. Every event goes to /api/analytics on this site first. The server can forward
 * it to GA4, the Meta Conversions API and the TikTok Events API (see README) with a shared event_id,
 * so no third-party browser pixels are needed and the security policy stays strict.
 */
export type AnalyticsEvent =
  | 'page_view' | 'generate_lead' | 'view_item_list' | 'select_item' | 'view_item' | 'add_to_cart'
  | 'remove_from_cart' | 'view_cart' | 'begin_checkout' | 'add_shipping_info' | 'add_payment_info'
  | 'purchase' | 'view_promotion' | 'select_promotion' | 'scroll' | 'search';

export function track(event: AnalyticsEvent, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;
  const body = JSON.stringify({
    event,
    params,
    event_id: crypto.randomUUID(),
    path: window.location.pathname + window.location.search,
    ts: Date.now(),
  });
  try {
    if (navigator.sendBeacon) navigator.sendBeacon('/api/analytics', new Blob([body], { type: 'application/json' }));
    else void fetch('/api/analytics', { method: 'POST', body, keepalive: true, headers: { 'Content-Type': 'application/json' } });
  } catch {
    /* analytics must never break the page */
  }
}
