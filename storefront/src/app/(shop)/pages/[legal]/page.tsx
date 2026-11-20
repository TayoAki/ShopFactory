import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {CookieSettingsButton} from '@/components/CookieBanner';
import Link from 'next/link';

/** Legal pages. These are plain-language drafts: have counsel review them before launch. */
const pages: Record<string, { title: string; summary: string; body: string[] }> = {
  privacy: {
    title: 'Privacy Policy',
    summary: 'We collect what we need to make and ship your order and to email you if you ask us to. We never sell your personal information.',
    body: [
      'What we collect: your name, email, shipping address and order details; your phone number only if you opt in to texts; and, only with your permission, site analytics (pages viewed, products added to your bag) measured on our own servers. Bogey Baby Insights also records a capped sample of public shopping-page layouts, clicks, scrolling and pointer activity to help improve the store.',
      'How we use it: to make and ship your order through our production partner, to answer your questions, and to send marketing only if you opted in. You can unsubscribe at any time.',
      'Who we share it with: our payment processor, our print-on-demand production and shipping partner, and our email provider, each only for the service they provide.',
      'Session replay: text is masked, forms are blocked and recording stops at free-text entry. Custom designs and uploaded artwork, checkout, account, order confirmation, search, contact, feedback and staff pages are excluded. Query-string and fragment pages are excluded. Recordings use random page-session references, not customer identities. We do not link them to your order, email or address. Sanitized recordings are encrypted in our database and retained for up to seven days, subject to storage and sampling limits.',
      'Cookie choices: this optional measurement starts only after a current affirmative choice. Rejecting, withdrawing permission or sending Global Privacy Control or Do Not Track keeps it off. Replay is processed on our own infrastructure; we do not send it to Microsoft Clarity or PostHog Cloud. A renewed choice is requested when replay is introduced.',
      'Your choices: you can ask to see, correct or delete your information, and opt out of any sale or sharing, from the Your Privacy Choices page or through our contact form.',
    ],
  },
  terms: {
    title: 'Terms of Service',
    summary: 'The basics of buying from Bogey Baby: prices, made-to-order production, shipping, exchanges and returns.',
    body: [
      'Orders: every hat is made to order after you buy it. Prices are in US dollars and include any bundle savings shown at checkout.',
      'Shipping: orders ship within 10 business days to US addresses. Standard US shipping is $7, or free on orders $120+ after discounts.',
      'Returns and exchanges: requests must be made within 30 days of ordering. Items must be unused with tags and packaging. Store-credit returns are free; refunds have a $5 fee and shipping charges are not refundable.',
      'Use of the site: please don’t misuse the site or copy our designs, including the Bogey Baby golfer.',
    ],
  },
  accessibility: {
    title: 'Accessibility Statement',
    summary: 'We want every golfer to be able to shop Bogey Baby. We aim to meet WCAG 2.2 AA.',
    body: [
      'What we do: readable color contrast, keyboard access to every action, visible focus outlines, labeled form fields, alt text on images and support for reduced motion.',
      'Something not working? Email us and we’ll help you place your order and fix the problem.',
    ],
  },
  'privacy-choices': {
    title: 'Your Privacy Choices',
    summary: 'You can opt out of the sale or sharing of your personal information for targeted advertising.',
    body: [
      'Use Cookie settings below or in the footer to accept or reject optional analytics. Your choice is stored on this browser for up to 180 days. Essential bag, sign-in, security and checkout storage stays available. Rejecting optional analytics also clears stored campaign attribution and stops future optional recording.',
      'We honor the Global Privacy Control signal: if your browser sends it, we treat it as an opt-out automatically.',
      'To opt out, or to ask us to access or delete your information, email us from the address you shop with and we’ll confirm within 15 business days.',
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(pages).map((legal) => ({ legal }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const { legal } = await params;
  const p = pages[legal];
  return p ? { title: p.title, description: p.summary } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ legal: string }> }) {
  const { legal } = await params;
  const p = pages[legal];
  if (!p) notFound();
  return (
    <section className="section">
      <div className="container prose">
        <h1>{p.title}</h1>
        {legal==='privacy-choices'&&<CookieSettingsButton />}
        <p className="notice" style={{ marginTop: 18 }}>Draft for review: final wording to be approved before launch.</p>
        <p className="lead" style={{ marginTop: 18 }}>{p.summary}</p>
        {p.body.map((para) => (
          <p key={para}>{para}</p>
        ))}
        <p>Questions? <Link className="link" href="/pages/contact">Send us a message</Link>.</p>
      </div>
    </section>
  );
}
