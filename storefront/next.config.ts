import type { NextConfig } from 'next';

// Security headers. Next.js App Router hydrates with small inline scripts, so script-src
// needs 'unsafe-inline' unless you switch to per-request nonces (see README, "Security").
// Add a vendor's domains here only if you load its browser script; server-side events need none.
const umamiOrigin = process.env.NEXT_PUBLIC_UMAMI_URL
  ? ' ' + new URL(process.env.NEXT_PUBLIC_UMAMI_URL).origin
  : '';
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://js.stripe.com" + umamiOrigin,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://api.stripe.com" + umamiOrigin,
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
  // Client chunk files are named after their routes, e.g. "app/(shop)/products/[handle]/page". Some
  // proxies and browsers percent-encode "(" and ")" in those URLs, and Next's static server then
  // returns 404 for the chunk, so the page never hydrates. Keep chunk filenames to safe characters.
  webpack(config, { isServer, dev }) {
    if (!isServer && !dev) {
      const original = config.output.filename;
      config.output.filename = (pathData: { chunk?: { name?: string | null } }) => {
        const name = pathData.chunk?.name;
        if (!name || !/[^a-zA-Z0-9/_.-]/.test(name)) return typeof original === 'string' ? original : 'static/chunks/[name]-[chunkhash].js';
        const safe = name.replace(/[()]/g, '').replace(/\[/g, '_').replace(/\]/g, '_').replace(/[^a-zA-Z0-9/_.-]/g, '_');
        return `static/chunks/${safe}-[chunkhash].js`;
      };
    }
    return config;
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
      {
        // Hero video files aren't content-hashed, so cache for a week rather than forever.
        source: '/video/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default nextConfig;
