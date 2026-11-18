import { trustItems } from '@/lib/site';
import { BrandIcon } from './BrandIcon';

export function TrustLine({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <ul className={`trust ${light ? 'trust--light' : ''} ${className}`} aria-label="Our promises">
      {trustItems.map((t) => (
        <li key={t.label}>
          <BrandIcon name={t.icon} />
          {t.label}
        </li>
      ))}
    </ul>
  );
}
