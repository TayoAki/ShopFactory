import { getImageProps } from 'next/image';
import type { Media } from '@/data/media';

/** Art-directed image: a different crop for phones and desktops, one download per device. */
export function ArtImage({ mobile, desktop, alt, priority = false, className }: { mobile: Media; desktop: Media; alt: string; priority?: boolean; className?: string }) {
  const common = { alt, sizes: '100vw', priority };
  const { props: d } = getImageProps({ ...common, src: desktop.src, width: desktop.width, height: desktop.height, quality: 78 });
  const { props: m } = getImageProps({ ...common, src: mobile.src, width: mobile.width, height: mobile.height, quality: 78 });
  return (
    <picture className={className}>
      <source media="(min-width: 900px)" srcSet={d.srcSet} sizes="100vw" />
      <img {...m} alt={alt} fetchPriority={priority ? 'high' : undefined} />
    </picture>
  );
}
