import type { NextConfig } from 'next';

// Security headers. Next.js App Router hydrates with small inline scripts, so script-src
// needs 'unsafe-inline' unless you switch to per-request nonces (see README, "Security").
// Add a vendor's domains here only if you load its browser script; server-side events need none.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.stripe.com",
  "frame-src https://js.stripe.com https://hooks.stripe.com",
  "media-src 'self'",
  "form-action 'self'",
  "base-uri 'none'",
  "frame-ancestors 'self'",
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 2048],
    imageSizes: [48, 96, 160, 240, 320, 480],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(self "https://js.stripe.com")' },
        ],
      },
    ];
  },
};

export default nextConfig;
