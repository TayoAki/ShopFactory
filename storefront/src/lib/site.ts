/** Site-wide settings. Policies here are business decisions: confirm them before launch (see README). */
export const site = {
  name: 'Bogey Baby',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  tagline: 'Good company. Better hats.',
  description:
    'Golf hats made for women golfers and the friends who play with them. Embroidered classics and UPF 50+ performance caps, with US shipping and 30-day returns.',
  supportEmail: 'hello@bogeybaby.com',
  dropMode: process.env.NEXT_PUBLIC_DROP_MODE === 'true',
  dropDate: process.env.NEXT_PUBLIC_DROP_DATE || '',
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === 'true',
  checkoutMode: (['live', 'test'].includes(process.env.NEXT_PUBLIC_CHECKOUT_MODE || '') ? process.env.NEXT_PUBLIC_CHECKOUT_MODE : 'demo') as 'live' | 'test' | 'demo',
  policies: {
    freeShippingThreshold: 12000,
    standardShipping: 700,
    exchangeDays: 30,
    returnDays: 30,
    makeTime: 'up to 10 business days',
    transitTime: '2–5 business days',
  },
} as const;

export const trustItems = [
  { icon: 'truck', label: 'Free US shipping $120+' },
  { icon: 'calendar', label: '30-day returns' },
] as const;
