type EventValue = string | number | boolean | string[] | undefined;
type EventData = Record<string, EventValue>;

export type AnalyticsEvent =
  | 'generate_lead' | 'select_item' | 'view_item' | 'add_to_cart'
  | 'remove_from_cart' | 'view_cart' | 'begin_checkout' | 'add_shipping_info'
  | 'fit_quiz_completed' | 'purchase' | 'test_purchase' | 'demo_checkout_completed' | 'select_promotion' | 'scroll' | 'search' | 'contact_submitted';

declare global {
  interface Window {
    umami?: { track: (event: string, properties?: EventData) => void };
    umamiConfig?: { beforeSend: (type: string, payload: Record<string, unknown>) => Record<string, unknown> | false };
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

const pending: [AnalyticsEvent, EventData][] = [];

export function flushAnalytics() {
  if (!window.umami) return;
  for (const [event, data] of pending.splice(0)) window.umami.track(event, data);
}

export function track(event: AnalyticsEvent, data: EventData = {}) {
  if (typeof window === 'undefined' || !process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID) return;
  if (window.navigator.globalPrivacyControl || window.navigator.doNotTrack === '1') return;
  if (window.umami) window.umami.track(event, data);
  else if (pending.length < 50) pending.push([event, data]);
}
