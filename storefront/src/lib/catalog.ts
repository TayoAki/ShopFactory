import { collections, products, type Product } from '@/data/products';

export function getProduct(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function productsIn(collectionHandle: string): Product[] {
  return products.filter((p) => p.collections.includes(collectionHandle));
}

export function getCollection(handle: string) {
  return collections.find((c) => c.handle === handle);
}

export function bestSellers(): Product[] {
  const order = ['cream-rope-cap', 'front-nine-ponytail-cap', 'small-fit-performance-cap', 'back-nine-ponytail-cap'];
  return order.map((h) => getProduct(h)).filter(Boolean) as Product[];
}

export type IconName =
  | 'ponytail' | 'smallfit' | 'sun' | 'drop' | 'makeup' | 'needle' | 'print' | 'rope' | 'mesh' | 'leaf' | 'snow' | 'tape';

/** Benefit bullets built only from true feature flags (see data/products.ts). Transformation first. */
export function benefitBullets(p: Product): { icon: IconName; title: string; text: string }[] {
  const f = p.features;
  const out: { icon: IconName; title: string; text: string }[] = [];
  if (f.ponytail === 'concealed') out.push({ icon: 'ponytail', title: 'Room for your ponytail', text: 'A concealed ponytail opening, so your hat works around your hair.' });
  if (f.ponytail === 'open-back') out.push({ icon: 'ponytail', title: 'Open back for ponytails and buns', text: 'Elastic cross bands hold the cap while your hair sits free.' });
  if (f.smallFit) out.push({ icon: 'smallfit', title: 'Made in a small fit', text: 'For smaller heads, so the brim sits where it should.' });
  if (f.upf50) out.push({ icon: 'sun', title: 'UPF 50+ sun protection', text: 'Fabric rated UPF 50+ for long, sunny rounds.' });
  if (f.wicking) out.push({ icon: 'drop', title: 'Cool for all 18', text: 'A moisture-managing sweatband keeps the hat on your head, not in your bag.' });
  if (f.makeupResistant) out.push({ icon: 'makeup', title: 'Makeup-resistant sweatband', text: 'The band resists makeup marks between washes.' });
  if (f.meshBack) out.push({ icon: 'mesh', title: 'Breathable mesh back', text: 'Airflow for hot range sessions.' });
  if (f.rope) out.push({ icon: 'rope', title: 'A rope across the brim', text: 'A nod to classic golf caps.' });
  if (f.warm) out.push({ icon: 'snow', title: 'Warm for winter rounds', text: 'A soft cuffed knit for frosty tee times.' });
  if (f.recycled) out.push({ icon: 'leaf', title: 'Recycled fabric', text: 'Made from 100% recycled polyester.' });
  out.push(
    p.decoration === 'embroidery'
      ? { icon: 'needle', title: 'Our golfer, stitched mid-swing', text: 'Embroidered, not printed, so she lasts.' }
      : { icon: 'print', title: 'Our golfer, printed in full color', text: 'A smooth full-color print on the front.' },
  );
  return out;
}

export const allProducts = products;
