/** Site-wide settings. Policies here are business decisions: confirm them before launch (see README). */
export const site = {
  name: 'Bogey Baby',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  tagline: 'Good company. Better hats.',
  description:
    'Golf hats made for women golfers and the friends who play with them. Embroidered classics and UPF 50+ performance caps, with free US shipping and free fit exchanges.',
  supportEmail: 'hello@bogeybaby.com',
  dropMode: process.env.NEXT_PUBLIC_DROP_MODE === 'true',
  dropDate: process.env.NEXT_PUBLIC_DROP_DATE || '',
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === 'true',
  checkoutMode: (process.env.NEXT_PUBLIC_CHECKOUT_MODE === 'live' ? 'live' : 'demo') as 'live' | 'demo',
  policies: {
    freeShippingUS: true,
    exchangeDays: 30,
    returnDays: 30,
    makeTime: '2–5 business days',
    transitTime: '2–5 business days',
  },
} as const;

export const trustItems = [
  { icon: 'truck', label: 'Free US shipping' },
  { icon: 'exchange', label: 'Free fit exchanges' },
  { icon: 'calendar', label: '30-day returns' },
] as const;
