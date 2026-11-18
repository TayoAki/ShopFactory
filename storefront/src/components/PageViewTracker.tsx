'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

export function PageViewTracker() {
  const pathname = usePathname();
  const params = useSearchParams();
  useEffect(() => {
    const utm: Record<string, string> = {};
    params.forEach((v, k) => {
      if (k.startsWith('utm_') || k === 'src') utm[k] = v;
    });
    track('page_view', utm);
  }, [pathname, params]);
  return null;
}
