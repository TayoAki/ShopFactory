'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

export function SearchTracker({ resultCount }: { resultCount: number }) {
  useEffect(() => {
    track('search', { result_count: resultCount });
  }, [resultCount]);
  return null;
}
