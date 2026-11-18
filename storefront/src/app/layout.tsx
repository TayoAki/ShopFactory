import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { CartProvider } from '@/lib/cart';
import { site } from '@/lib/site';
import { UmamiTracker } from '@/components/UmamiTracker';
import { JsonLd } from '@/components/JsonLd';
import './globals.css';

const stitch = localFont({
  src: '../fonts/bogey-baby-stitch.woff2',
  variable: '--font-stitch',
  display: 'swap',
  weight: '400',
  fallback: ['Georgia', 'serif'],
});

const dmSans = localFont({
  src: '../fonts/dm-sans.woff2',
  variable: '--font-sans',
  display: 'swap',
  weight: '400 700',
  fallback: ['Arial', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'Bogey Baby | Golf Hats Made for Women Golfers', template: '%s | Bogey Baby' },
  description: site.description,
  openGraph: { siteName: site.name, type: 'website', locale: 'en_US' },
  twitter: { card: 'summary_large_image' },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#082D22',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${stitch.variable} ${dmSans.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <CartProvider>
          <UmamiTracker />
          {children}
        </CartProvider>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.name,
            url: site.url,
            logo: `${site.url}/icon.png`,
            slogan: site.tagline,
          }}
        />
      </body>
    </html>
  );
}
