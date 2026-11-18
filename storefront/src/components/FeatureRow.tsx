import { BrandIcon } from './BrandIcon';

export function FeatureRow({ items, cols = 4 }: { items: { icon: string; title: string; text: string }[]; cols?: 3 | 4 }) {
  return (
    <ul className={`features features--${cols}`}>
      {items.map((it) => (
        <li key={it.title} className="feature">
          <div className="feature__icon">
            <BrandIcon name={it.icon} />
          </div>
          <h3>{it.title}</h3>
          <p>{it.text}</p>
        </li>
      ))}
    </ul>
  );
}
