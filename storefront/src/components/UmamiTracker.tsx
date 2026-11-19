'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { flushAnalytics } from '@/lib/analytics';
import {captureCampaign} from '@/lib/campaign-attribution';

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const host = process.env.NEXT_PUBLIC_UMAMI_URL;
const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'src'];

function cleanUrl(value: unknown) {
  if (typeof value !== 'string' || !value) return '';
  const url = new URL(value, window.location.origin);
  const campaign = new URLSearchParams();
  for (const key of campaignKeys) {
    const value = url.searchParams.get(key);
    if (value && /^[a-z0-9 ._+~-]{1,100}$/i.test(value)) campaign.set(key, value);
  }
  return url.pathname + (campaign.size ? '?' + campaign.toString() : '');
}

export function UmamiTracker() {
  const [enabled, setEnabled] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    captureCampaign();
    if (!websiteId || !host || navigator.globalPrivacyControl || navigator.doNotTrack === '1') return;
    window.umamiConfig = {
      beforeSend: (_, payload) => window.location.pathname.startsWith('/growth') ? false : ({
        ...payload,
        url: cleanUrl(payload.url),
        referrer: typeof payload.referrer === 'string' && /^https?:\/\//.test(payload.referrer)
          ? new URL(payload.referrer).origin
          : cleanUrl(payload.referrer).split('?')[0],
      }),
    };
    setEnabled(true);
  }, [pathname]);

  if (!enabled || pathname.startsWith('/growth')) return null;
  return (
    <Script
      src={host + '/script.js'}
      data-website-id={websiteId}
      data-domains="www.bogeybaby.com,bogeybaby.com"
      data-do-not-track="true"
      data-exclude-hash="true"
      strategy="afterInteractive"
      onReady={flushAnalytics}
    />
  );
}
