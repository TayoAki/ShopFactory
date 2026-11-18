import type { MetadataRoute } from 'next';
import { collections, products } from '@/data/products';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/pages/about-us', '/pages/fit-guide', '/pages/faq', '/pages/reviews', '/pages/shipping-returns', '/pages/contact'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : 0.5 })),
    ...collections.map((c) => ({ url: `${site.url}/collections/${c.handle}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.7 })),
    ...products.map((p) => ({ url: `${site.url}/products/${p.handle}`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 })),
  ];
}
