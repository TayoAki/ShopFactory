import { trustItems } from '@/lib/site';
import { Icon } from './Icon';

export function TrustLine({ light = false, className = '' }: { light?: boolean; className?: string }) {
  return (
    <ul className={`trust ${light ? 'trust--light' : ''} ${className}`} aria-label="Our promises">
      {trustItems.map((t) => (
        <li key={t.label}>
          <Icon name={t.icon} />
          {t.label}
        </li>
      ))}
    </ul>
  );
}
