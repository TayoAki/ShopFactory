/**
 * Bogey Baby catalog.
 *
 * Facts in `details` and the feature flags come from each Printify blueprint's catalog description
 * (fetched Nov 2026). Feature flags drive every claim on the site, so a hat only says
 * "ponytail opening" or "UPF 50+" when its blank really has it.
 *
 * `decoration` is decided by the Printify print provider: "embroidery" placements are stitched,
 * "print" placements are DTF heat-transfer prints. Copy only says "stitched" for embroidery.
 *
 * Prices are proposals: confirm them against Printify cost + shipping before launch.
 */

export type Decoration = 'embroidery' | 'print';
export type Line = 'flagship' | 'classics' | 'performance';

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** AI-generated concept image (replace with Printify mockups or photography before launch). */
  ai?: boolean;
}

export interface ColorOption {
  name: string;
  slug: string;
  swatch: string;
  image: ProductImage;
  printify?: { color: string; variantId: number };
}

export interface Features {
  ponytail?: 'concealed' | 'open-back';
  smallFit?: boolean;
  upf50?: boolean;
  wicking?: boolean;
  makeupResistant?: boolean;
  meshBack?: boolean;
  rope?: boolean;
  recycled?: boolean;
  warm?: boolean;
}

export interface Product {
  handle: string;
  title: string;
  subtitle: string;
  line: Line;
  style: 'cap' | 'visor' | 'bucket' | 'beanie';
  price: number; // cents
  decoration: Decoration;
  description: string;
  features: Features;
  fit: string;
  details: { label: string; value: string }[];
  colors: ColorOption[];
  gallery: ProductImage[];
  collections: string[];
  badge?: string;
  source:
    | { kind: 'flagship'; note: string; suggestedBlueprintId?: number }
    | { kind: 'printify'; blueprintId: number; printProviderId: number; brand: string; model: string };
}

const P = 928;
const H = 1152;
const img = (file: string, alt: string, ai = true): ProductImage => ({
  src: `/images/products/${file}.webp`,
  alt,
  width: P,
  height: H,
  ai,
});

export const products: Product[] = [
  {
    handle: 'cream-rope-cap',
    title: 'The Cream Rope Cap',
    subtitle: 'Embroidered rope cap',
    line: 'flagship',
    style: 'cap',
    price: 3800,
    decoration: 'embroidery',
    description:
      'Warm cream with a white rope across the brim and our golfer stitched mid-swing on the front. The hat that started Bogey Baby: good for the first tee, the 19th hole and lunch after.',
    features: { rope: true },
    fit: 'Adjustable. Not sure about fit? Exchanges are free within 30 days.',
    details: [
      { label: 'Color', value: 'Warm cream with a white rope across the brim' },
      { label: 'Decoration', value: 'Multicolor embroidered golfer on the front' },
      { label: 'Shape', value: 'Five-panel cap with a curved brim' },
    ],
    colors: [
      {
        name: 'Cream',
        slug: 'cream',
        swatch: '#EFE6CF',
        image: { src: '/images/products/flagship-cream-front.webp', alt: 'The Cream Rope Cap, front view, with the embroidered golfer', width: 1200, height: 1500 },
      },
    ],
    gallery: [
      { src: '/images/products/flagship-cream-macro.webp', alt: 'Close-up of the golfer embroidered on the Cream Rope Cap', width: 928, height: 1152, ai: true },
      { src: '/images/lifestyle/cap-on-pine.webp', alt: 'The Cream Rope Cap on dark green fabric beside a golf ball', width: 900, height: 1125 },
      { src: '/images/lifestyle/flagship-on-head.webp', alt: 'A golfer wearing the Cream Rope Cap on the course', width: 928, height: 1152, ai: true },
      { src: '/images/lifestyle/cart-friends.webp', alt: 'Two friends in Cream Rope Caps laugh beside a golf cart', width: 1350, height: 900 },
    ],
    collections: ['all', 'embroidered', 'caps', 'rope-caps'],
    badge: 'Best seller',
    source: {
      kind: 'flagship',
      note: 'Hero product from the existing Bogey Baby store. Closest embroidered Printify match: Comfort Colors Sunwashed Rope Cap (Ivory).',
      suggestedBlueprintId: 6597,
    },
  },
  {
    handle: 'sunwashed-rope-cap',
    title: 'The Sunwashed Rope Cap',
    subtitle: 'Embroidered rope cap',
    line: 'classics',
    style: 'cap',
    price: 3800,
    decoration: 'embroidery',
    description:
      'Our golfer, stitched on a lightweight ripstop rope cap in soft washed colors. A performance sweatband keeps it comfortable through a long round.',
    features: { rope: true },
    fit: 'Adjustable plastic snapback.',
    details: [
      { label: 'Fabric', value: '100% polyester micro ripstop, 3.69 oz./yd²' },
      { label: 'Shape', value: 'Semi-structured five-panel, high profile' },
      { label: 'Brim', value: 'Slightly curved bill with a rope braid' },
      { label: 'Inside', value: 'Performance sweatband' },
      { label: 'Closure', value: 'Plastic snapback' },
      { label: 'Decoration', value: 'Embroidered golfer on the front' },
    ],
    colors: [
      { name: 'Espresso', slug: 'espresso', swatch: '#4A3226', image: img('p-rope-espresso', 'The Sunwashed Rope Cap in Espresso with the embroidered golfer'), printify: { color: 'Espresso', variantId: 288210 } },
      { name: 'Chambray', slug: 'chambray', swatch: '#8FA6BF', image: img('p-rope-chambray', 'The Sunwashed Rope Cap in Chambray with the embroidered golfer'), printify: { color: 'Chambray', variantId: 288214 } },
      { name: 'Peachy', slug: 'peachy', swatch: '#F2C1A5', image: img('p-rope-peachy', 'The Sunwashed Rope Cap in Peachy with the embroidered golfer'), printify: { color: 'Peachy', variantId: 288212 } },
    ],
    gallery: [],
    collections: ['all', 'embroidered', 'caps', 'rope-caps'],
    badge: 'New',
    source: { kind: 'printify', blueprintId: 6597, printProviderId: 99, brand: 'Comfort Colors', model: 'CCRC0' },
  },
  {
    handle: 'front-nine-ponytail-cap',
    title: 'The Front Nine Ponytail Cap',
    subtitle: 'Embroidered ponytail cap',
    line: 'classics',
    style: 'cap',
    price: 3800,
    decoration: 'embroidery',
    description:
      'A concealed ponytail opening at the back means your hair goes where you want it. Washed cotton, a low-profile fit and a sweatband that resists makeup. Our golfer is stitched on the front.',
    features: { ponytail: 'concealed', makeupResistant: true, wicking: true },
    fit: 'Unstructured, low profile. Antique brass tri-glide strap adjusts to fit.',
    details: [
      { label: 'Fabric', value: '100% cotton pigment-washed twill' },
      { label: 'Shape', value: 'Unstructured six-panel, low profile' },
      { label: 'Hair', value: 'Evolve™ concealed ponytail opening' },
      { label: 'Inside', value: 'Elude™ makeup-resistant, breathable, wicking sweatband' },
      { label: 'Brim', value: 'Pre-curved, with a contrasting pattern undervisor' },
      { label: 'Closure', value: 'Antique brass tri-glide' },
      { label: 'Decoration', value: 'Embroidered golfer on the front' },
    ],
    colors: [
      { name: 'Sage', slug: 'sage', swatch: '#A9B8A0', image: img('p-ponytail-sage', 'The Front Nine Ponytail Cap in Sage with the embroidered golfer'), printify: { color: 'Sage / Polka Dots', variantId: 147848 } },
      { name: 'Vanilla', slug: 'vanilla', swatch: '#EFE6CF', image: img('p-ponytail-vanilla', 'The Front Nine Ponytail Cap in Vanilla with the embroidered golfer'), printify: { color: 'Vanilla / Longhorn', variantId: 147857 } },
      { name: 'Rose', slug: 'rose', swatch: '#D9A5A5', image: img('p-ponytail-rose', 'The Front Nine Ponytail Cap in Rose with the embroidered golfer'), printify: { color: 'Rose / Polka Dots', variantId: 147850 } },
    ],
    gallery: [
      { src: '/images/lifestyle/ponytail-back.webp', alt: 'A golfer from behind with her ponytail through the back of the cap', width: 928, height: 1152, ai: true },
    ],
    collections: ['all', 'embroidered', 'caps', 'ponytail-caps'],
    badge: 'Made for ponytails',
    source: { kind: 'printify', blueprintId: 2667, printProviderId: 99, brand: 'Infinity Her', model: 'CASSIE' },
  },
  {
    handle: 'range-day-mesh-cap',
    title: 'The Range Day Mesh Cap',
    subtitle: 'Embroidered mesh-back cap',
    line: 'classics',
    style: 'cap',
    price: 3600,
    decoration: 'embroidery',
    description:
      'A washed-cotton front, a soft mesh back for hot range sessions and a concealed ponytail opening. Our golfer is stitched on the front.',
    features: { ponytail: 'concealed', makeupResistant: true, meshBack: true, wicking: true },
    fit: 'Unstructured, low profile. Plastic snapback.',
    details: [
      { label: 'Fabric', value: '100% cotton pigment-washed twill front, 100% soft polyester mesh back' },
      { label: 'Shape', value: 'Unstructured six-panel, low profile' },
      { label: 'Hair', value: 'Evolve™ concealed ponytail opening' },
      { label: 'Inside', value: 'Elude™ makeup-resistant, breathable, moisture-management sweatband' },
      { label: 'Brim', value: 'Pre-curved, pattern undervisor' },
      { label: 'Closure', value: 'Plastic snapback' },
      { label: 'Decoration', value: 'Embroidered golfer on the front' },
    ],
    colors: [
      { name: 'Sage', slug: 'sage', swatch: '#A9B8A0', image: img('p-mesh-sage', 'The Range Day Mesh Cap in Sage with the embroidered golfer'), printify: { color: 'Sage / Polka Dots', variantId: 123002 } },
      { name: 'Lavender', slug: 'lavender', swatch: '#B9A9CF', image: img('p-mesh-lavender', 'The Range Day Mesh Cap in Lavender with the embroidered golfer'), printify: { color: 'Lavender / Stripes', variantId: 122995 } },
    ],
    gallery: [],
    collections: ['all', 'embroidered', 'caps', 'ponytail-caps'],
    source: { kind: 'printify', blueprintId: 2003, printProviderId: 99, brand: 'Infinity Her', model: 'TESS' },
  },
  {
    handle: 'tee-time-dad-cap',
    title: 'The Tee Time Dad Cap',
    subtitle: 'Embroidered dad cap',
    line: 'classics',
    style: 'cap',
    price: 3400,
    decoration: 'embroidery',
    description:
      'The easy, broken-in cap for early tee times. Soft cotton, a relaxed low profile and an antique brass buckle, with our golfer stitched on the front.',
    features: {},
    fit: 'Unstructured, low profile. Hideaway strap with antique brass buckle.',
    details: [
      { label: 'Fabric', value: '100% cotton' },
      { label: 'Shape', value: 'Unstructured six-panel, low profile' },
      { label: 'Brim', value: 'Permacurv® visor with four-row stitching' },
      { label: 'Closure', value: 'Self-fabric hideaway strap with antique brass buckle' },
      { label: 'Decoration', value: 'Embroidered golfer on the front' },
    ],
    colors: [
      { name: 'Spruce', slug: 'spruce', swatch: '#1F4A3A', image: img('p-dad-spruce', 'The Tee Time Dad Cap in Spruce with the embroidered golfer'), printify: { color: 'Spruce', variantId: 105379 } },
      { name: 'Stone', slug: 'stone', swatch: '#CFC4AD', image: img('p-dad-stone', 'The Tee Time Dad Cap in Stone with the embroidered golfer'), printify: { color: 'Stone', variantId: 105380 } },
      { name: 'White', slug: 'white', swatch: '#F8F8F4', image: img('p-dad-white', 'The Tee Time Dad Cap in White with the embroidered golfer'), printify: { color: 'White', variantId: 105381 } },
    ],
    gallery: [],
    collections: ['all', 'embroidered', 'caps'],
    source: { kind: 'printify', blueprintId: 1447, printProviderId: 217, brand: 'Yupoong', model: '6245CM' },
  },
  {
    handle: 'winter-rules-beanie',
    title: 'The Winter Rules Beanie',
    subtitle: 'Embroidered cuffed beanie',
    line: 'classics',
    style: 'beanie',
    price: 3200,
    decoration: 'embroidery',
    description:
      'For frosty early rounds and the walk to the clubhouse. A soft, stretchy cuffed knit with our golfer stitched on the cuff.',
    features: { warm: true },
    fit: 'One size fits all, with a stretchy knit.',
    details: [
      { label: 'Fabric', value: '100% Turbo acrylic, hypoallergenic' },
      { label: 'Shape', value: '12" (30 cm) cuffed beanie' },
      { label: 'Fit', value: 'One size fits all' },
      { label: 'Decoration', value: 'Embroidered golfer on the cuff' },
    ],
    colors: [
      { name: 'Spruce', slug: 'spruce', swatch: '#1F4A3A', image: img('p-beanie-spruce', 'The Winter Rules Beanie in Spruce with the embroidered golfer'), printify: { color: 'Spruce', variantId: 116432 } },
      { name: 'Gold', slug: 'gold', swatch: '#C9A24A', image: img('p-beanie-gold', 'The Winter Rules Beanie in Gold with the embroidered golfer'), printify: { color: 'Gold', variantId: 116422 } },
    ],
    gallery: [],
    collections: ['all', 'embroidered', 'beanies'],
    source: { kind: 'printify', blueprintId: 1691, printProviderId: 99, brand: 'Yupoong', model: '1501KC' },
  },
  {
    handle: 'back-nine-ponytail-cap',
    title: 'The Back Nine Ponytail Cap',
    subtitle: 'UPF 50+ performance ponytail cap',
    line: 'performance',
    style: 'cap',
    price: 3800,
    decoration: 'print',
    description:
      'Built for hot rounds: UPF 50+ fabric, moisture-wicking performance and an open back with elastic cross bands for your ponytail or bun. Our golfer is printed on the front-left panel.',
    features: { ponytail: 'open-back', upf50: true, wicking: true, recycled: true },
    fit: 'Unstructured, low profile. Micro hook-and-loop closure.',
    details: [
      { label: 'Fabric', value: '100% recycled polyester' },
      { label: 'Sun', value: 'UPF 50+ protection' },
      { label: 'Hair', value: 'Open back panel with matching elastic cross bands' },
      { label: 'Inside', value: 'Moisture-management, antimicrobial sweatband' },
      { label: 'Shape', value: 'Unstructured six-panel, low profile; grey undervisor' },
      { label: 'Closure', value: 'Micro hook-and-loop' },
      { label: 'Decoration', value: 'Printed golfer (DTF) on the front-left panel' },
    ],
    colors: [
      { name: 'Winter Green', slug: 'winter-green', swatch: '#BFE0CF', image: img('p-perfpony-wintergreen', 'The Back Nine Ponytail Cap in Winter Green with the printed golfer'), printify: { color: 'Winter Green', variantId: 301482 } },
      { name: 'White', slug: 'white', swatch: '#F8F8F4', image: img('p-perfpony-white', 'The Back Nine Ponytail Cap in White with the printed golfer'), printify: { color: 'White', variantId: 301478 } },
      { name: 'Light Pink', slug: 'light-pink', swatch: '#F4CCD2', image: img('p-perfpony-lightpink', 'The Back Nine Ponytail Cap in Light Pink with the printed golfer'), printify: { color: 'Light Pink', variantId: 301474 } },
    ],
    gallery: [],
    collections: ['all', 'performance', 'caps', 'ponytail-caps'],
    badge: 'UPF 50+',
    source: { kind: 'printify', blueprintId: 6963, printProviderId: 217, brand: 'Imperial', model: 'L338' },
  },
  {
    handle: 'small-fit-performance-cap',
    title: 'The Small Fit Performance Cap',
    subtitle: 'UPF 50+ small-fit cap',
    line: 'performance',
    style: 'cap',
    price: 3600,
    decoration: 'print',
    description:
      'Made in a small fit for smaller heads, so the brim sits where it should. UPF 50+ fabric and moisture-wicking performance for long, sunny rounds. Our golfer is printed on the front-left panel.',
    features: { smallFit: true, upf50: true, wicking: true, recycled: true },
    fit: 'Small fit. D-ring micro hook-and-loop closure.',
    details: [
      { label: 'Fit', value: 'Small fit' },
      { label: 'Fabric', value: '100% recycled polyester' },
      { label: 'Sun', value: 'UPF 50+ protection' },
      { label: 'Inside', value: 'Moisture-wicking, antimicrobial sweatband' },
      { label: 'Shape', value: 'Unstructured six-panel, low profile; grey undervisor' },
      { label: 'Closure', value: 'D-ring micro hook-and-loop' },
      { label: 'Decoration', value: 'Printed golfer (DTF) on the front-left panel' },
    ],
    colors: [
      { name: 'Sage', slug: 'sage', swatch: '#A9B8A0', image: img('p-smallfit-sage', 'The Small Fit Performance Cap in Sage with the printed golfer'), printify: { color: 'Sage', variantId: 301479 } },
      { name: 'Putty', slug: 'putty', swatch: '#CDBFA8', image: img('p-smallfit-putty', 'The Small Fit Performance Cap in Putty with the printed golfer'), printify: { color: 'Putty', variantId: 301488 } },
      { name: 'Light Pink', slug: 'light-pink', swatch: '#F4CCD2', image: img('p-smallfit-lightpink', 'The Small Fit Performance Cap in Light Pink with the printed golfer'), printify: { color: 'Light Pink', variantId: 301495 } },
    ],
    gallery: [],
    collections: ['all', 'performance', 'caps'],
    badge: 'Small fit',
    source: { kind: 'printify', blueprintId: 6962, printProviderId: 217, brand: 'Imperial', model: 'L210P' },
  },
  {
    handle: 'clubhouse-visor',
    title: 'The Clubhouse Visor',
    subtitle: 'Cotton golf visor',
    line: 'performance',
    style: 'visor',
    price: 3000,
    decoration: 'print',
    description:
      'Shade for your eyes, nothing on your hair. Soft bio-washed cotton twill with a pre-curved brim and an easy hook-and-loop strap. Our golfer is printed on the front.',
    features: {},
    fit: 'Adjustable hook-and-loop strap.',
    details: [
      { label: 'Fabric', value: '100% cotton bio-washed chino twill' },
      { label: 'Brim', value: 'Pre-curved visor' },
      { label: 'Closure', value: 'Hook-and-loop' },
      { label: 'Label', value: 'Tear-away label' },
      { label: 'Decoration', value: 'Printed golfer (DTF) on the front' },
    ],
    colors: [
      { name: 'Forest', slug: 'forest', swatch: '#2F4A35', image: img('p-visor-forest', 'The Clubhouse Visor in Forest with the printed golfer'), printify: { color: 'Forest', variantId: 325346 } },
      { name: 'Stone', slug: 'stone', swatch: '#CFC4AD', image: img('p-visor-stone', 'The Clubhouse Visor in Stone with the printed golfer'), printify: { color: 'Stone', variantId: 325362 } },
      { name: 'White', slug: 'white', swatch: '#F8F8F4', image: img('p-visor-white', 'The Clubhouse Visor in White with the printed golfer'), printify: { color: 'White', variantId: 325358 } },
    ],
    gallery: [],
    collections: ['all', 'performance', 'visors'],
    source: { kind: 'printify', blueprintId: 7650, printProviderId: 217, brand: 'ValuCap', model: 'VC500' },
  },
  {
    handle: '19th-hole-bucket',
    title: 'The 19th Hole Bucket',
    subtitle: 'UPF 50+ performance bucket hat',
    line: 'performance',
    style: 'bucket',
    price: 4000,
    decoration: 'print',
    description:
      'All-around shade for the sunniest rounds. UPF 50+ performance fabric, a cooling sweatband and sewn eyelets, with a green-striped band and our golfer printed on the front.',
    features: { upf50: true, wicking: true },
    fit: 'Unstructured, relaxed fit.',
    details: [
      { label: 'Fabric', value: '100% polyester performance fabric' },
      { label: 'Sun', value: 'UPF 50+ protection' },
      { label: 'Inside', value: 'Performance sweatband; sewn eyelets for airflow' },
      { label: 'Shape', value: 'Unstructured bucket with a striped band' },
      { label: 'Maker mark', value: 'Small Imperial logo printed on the left side of the crown' },
      { label: 'Decoration', value: 'Printed golfer (DTF) on the front' },
    ],
    colors: [
      { name: 'White / Green', slug: 'white-green', swatch: '#F8F8F4', image: img('p-bucket19-whitegreen', 'The 19th Hole Bucket in White with a green band and the printed golfer'), printify: { color: 'White/ Green', variantId: 259237 } },
    ],
    gallery: [],
    collections: ['all', 'performance', 'bucket-hats'],
    badge: 'UPF 50+',
    source: { kind: 'printify', blueprintId: 5836, printProviderId: 217, brand: 'Imperial', model: '1371P' },
  },
  {
    handle: 'weekend-bucket-hat',
    title: 'The Weekend Bucket Hat',
    subtitle: 'Cotton bucket hat',
    line: 'classics',
    style: 'bucket',
    price: 3400,
    decoration: 'print',
    description:
      'A soft cotton bucket for range days, beach weekends and everything after. Side eyelets keep it airy. Our golfer is printed on the front.',
    features: {},
    fit: 'Snug fit, one size fits all.',
    details: [
      { label: 'Fabric', value: 'Light to mid-weight 100% cotton' },
      { label: 'Fit', value: 'Snug, one size fits all' },
      { label: 'Brim', value: 'Reinforced brim with stitching detail' },
      { label: 'Airflow', value: 'Side eyelets' },
      { label: 'Decoration', value: 'Printed golfer (DTF) on the front' },
    ],
    colors: [
      { name: 'Ecru', slug: 'ecru', swatch: '#E9E1CF', image: img('p-wbucket-ecru', 'The Weekend Bucket Hat in Ecru with the printed golfer'), printify: { color: 'Ecru', variantId: 402676 } },
      { name: 'Hazy Pink', slug: 'hazy-pink', swatch: '#E7C4C4', image: img('p-wbucket-hazypink', 'The Weekend Bucket Hat in Hazy Pink with the printed golfer'), printify: { color: 'Hazy Pink', variantId: 402677 } },
    ],
    gallery: [],
    collections: ['all', 'bucket-hats'],
    source: { kind: 'printify', blueprintId: 10920, printProviderId: 217, brand: 'AS Colour', model: '1178' },
  },
  {
    handle: 'cart-path-trucker',
    title: 'The Cart Path Trucker',
    subtitle: "Women's trucker cap",
    line: 'classics',
    style: 'cap',
    price: 3600,
    decoration: 'print',
    description:
      'A structured trucker with a breathable mesh back, a makeup-resistant sweatband and a concealed ponytail opening. Our golfer is printed on the front-left panel.',
    features: { ponytail: 'concealed', makeupResistant: true, meshBack: true, wicking: true },
    fit: 'Structured six-panel, mid profile. Snapback closure.',
    details: [
      { label: 'Fabric', value: '100% cotton printed micro canvas front; 100% polyester mesh back' },
      { label: 'Shape', value: 'Structured six-panel, mid profile; pre-curved visor' },
      { label: 'Hair', value: 'Evolve™ concealed ponytail opening' },
      { label: 'Inside', value: 'Elude™ makeup-resistant, breathable sweatband' },
      { label: 'Closure', value: 'Snapback' },
      { label: 'Decoration', value: 'Printed golfer (DTF) on the front-left panel' },
    ],
    colors: [
      { name: 'Emerald', slug: 'emerald', swatch: '#2E7D5B', image: img('p-trucker-emerald', 'The Cart Path Trucker in Emerald with the printed golfer'), printify: { color: 'Emerald/ White', variantId: 305069 } },
      { name: 'Vanilla', slug: 'vanilla', swatch: '#EFE6CF', image: img('p-trucker-vanilla', 'The Cart Path Trucker in Vanilla with the printed golfer'), printify: { color: 'Vanilla/ White', variantId: 305073 } },
    ],
    gallery: [],
    collections: ['all', 'caps', 'ponytail-caps'],
    source: { kind: 'printify', blueprintId: 7033, printProviderId: 217, brand: 'Infinity Her', model: 'CHARLIE' },
  },
  {
    handle: 'the-turn-cord-cap',
    title: 'The Turn Cord Cap',
    subtitle: 'Corduroy ponytail cap',
    line: 'classics',
    style: 'cap',
    price: 3600,
    decoration: 'print',
    description:
      'Thin-wale corduroy for cool-weather rounds, with a mesh back, a makeup-resistant sweatband and a concealed ponytail opening. Our golfer is printed on the front-left panel.',
    features: { ponytail: 'concealed', makeupResistant: true, meshBack: true, wicking: true },
    fit: 'Light-structured six-panel, low profile. Snapback closure.',
    details: [
      { label: 'Fabric', value: '100% cotton thin-wale corduroy front; 100% polyester mesh back' },
      { label: 'Shape', value: 'Light-structured six-panel, low profile; patterned undervisor' },
      { label: 'Hair', value: 'Evolve® concealed ponytail opening' },
      { label: 'Inside', value: 'Elude® makeup-resistant, breathable, moisture-wicking sweatband' },
      { label: 'Closure', value: 'Snapback' },
      { label: 'Maker mark', value: 'Tonal Infinity Her icon on the back left' },
      { label: 'Decoration', value: 'Printed golfer (DTF) on the front-left panel' },
    ],
    colors: [
      { name: 'Vanilla', slug: 'vanilla', swatch: '#EFE6CF', image: img('p-cord-vanilla', 'The Turn Cord Cap in Vanilla corduroy with the printed golfer'), printify: { color: 'Vanilla/ Tonal Longhorn/ Vanilla', variantId: 305090 } },
      { name: 'Chocolate', slug: 'chocolate', swatch: '#5B3A2B', image: img('p-cord-chocolate', 'The Turn Cord Cap in Chocolate corduroy with the printed golfer'), printify: { color: 'Chocolate/ Tonal Fawn/ Chocolate', variantId: 305094 } },
    ],
    gallery: [],
    collections: ['all', 'caps', 'ponytail-caps'],
    source: { kind: 'printify', blueprintId: 7036, printProviderId: 217, brand: 'Infinity Her', model: 'JO' },
  },
];

export interface Collection {
  handle: string;
  title: string;
  eyebrow: string;
  description: string;
  image: { src: string; alt: string; width: number; height: number };
}

export const collections: Collection[] = [
  { handle: 'all', title: 'Golf hats', eyebrow: 'Shop all', description: 'Embroidered classics and UPF 50+ performance hats, made for women golfers and the friends who play with them.', image: { src: '/images/lifestyle/banner-putting.webp', alt: 'A golfer in a Bogey Baby cap reads a putt on the green', width: 1584, height: 672 } },
  { handle: 'embroidered', title: 'Embroidered classics', eyebrow: 'Stitched, not printed', description: 'Our golfer, embroidered thread by thread on caps you will wear well past the 18th hole.', image: { src: '/images/lifestyle/banner-19th.webp', alt: 'Friends in Bogey Baby caps at a clubhouse table after a round', width: 1376, height: 589 } },
  { handle: 'performance', title: 'Performance', eyebrow: 'UPF 50+ and moisture-wicking', description: 'For hot rounds and long days in the sun: UPF 50+ fabrics, wicking sweatbands and caps that stay put.', image: { src: '/images/lifestyle/banner-putting.webp', alt: 'A golfer in a performance cap on a sunny green', width: 1584, height: 672 } },
  { handle: 'ponytail-caps', title: 'Ponytail caps', eyebrow: 'Hair up, hat on', description: 'Concealed ponytail openings and open backs, so your hat works around your hair.', image: { src: '/images/lifestyle/banner-19th.webp', alt: 'Golfers with ponytails through their caps', width: 1376, height: 589 } },
  { handle: 'caps', title: 'Caps', eyebrow: 'Caps', description: 'Rope caps, ponytail caps, dad caps and truckers.', image: { src: '/images/lifestyle/banner-putting.webp', alt: 'A golfer in a Bogey Baby cap on the green', width: 1584, height: 672 } },
  { handle: 'rope-caps', title: 'Rope caps', eyebrow: 'Rope caps', description: 'A rope across the brim, a nod to classic golf caps.', image: { src: '/images/lifestyle/banner-19th.webp', alt: 'Friends in rope caps at the clubhouse', width: 1376, height: 589 } },
  { handle: 'visors', title: 'Visors', eyebrow: 'Visors', description: 'Shade for your eyes, nothing on your hair.', image: { src: '/images/lifestyle/banner-putting.webp', alt: 'A golfer on the green', width: 1584, height: 672 } },
  { handle: 'bucket-hats', title: 'Bucket hats', eyebrow: 'Bucket hats', description: 'All-around shade for the sunniest rounds.', image: { src: '/images/lifestyle/banner-19th.webp', alt: 'Friends at the clubhouse after a round', width: 1376, height: 589 } },
  { handle: 'beanies', title: 'Beanies', eyebrow: 'Beanies', description: 'For frosty early rounds and the walk to the clubhouse.', image: { src: '/images/lifestyle/banner-putting.webp', alt: 'A golfer on the green', width: 1584, height: 672 } },
];
