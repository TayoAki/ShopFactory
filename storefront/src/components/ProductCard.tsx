import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { money } from '@/lib/money';
import { site } from '@/lib/site';

export function ProductCard({ product, priority = false, sizes = '(min-width: 900px) 25vw, 50vw' }: { product: Product; priority?: boolean; sizes?: string }) {
  const lead = product.colors[0];
  return (
    <Link href={`/products/${product.handle}`} className="card" data-handle={product.handle}>
      <div className="card__media">
        {product.badge && <span className="badge card__badge">{site.dropMode ? 'Drops soon' : product.badge}</span>}
        <Image src={lead.image.src} alt={lead.image.alt} width={lead.image.width} height={lead.image.height} sizes={sizes} priority={priority} />
      </div>
      <div className="card__title">{product.title}</div>
      <div className="card__meta">
        <span>{product.subtitle}</span>
        <span className="card__price">{money(product.price)}</span>
      </div>
      {product.colors.length > 1 && (
        <div className="dots" aria-label={`${product.colors.length} colors: ${product.colors.map((c) => c.name).join(', ')}`}>
          {product.colors.map((c) => (
            <span key={c.slug} className="dot" style={{ background: c.swatch }} />
          ))}
        </div>
      )}
    </Link>
  );
}
