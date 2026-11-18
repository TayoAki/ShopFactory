import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'FAQ', description: 'Answers about fit, ponytails, materials, care, shipping, exchanges and returns for Bogey Baby golf hats.' };

const groups: { title: string; qa: [string, string][] }[] = [
  {
    title: 'Fit and hair',
    qa: [
      ['Will it fit my small head?', 'The Small Fit Performance Cap is made in a small fit for smaller heads. Most other caps adjust with a strap, snapback or hook-and-loop closure. If the fit is off, exchanges are free within 30 days.'],
      ['Which hats work with a ponytail?', 'The Front Nine Ponytail Cap, Range Day Mesh Cap, Cart Path Trucker and Turn Cord Cap have concealed ponytail openings. The Back Nine Ponytail Cap has an open back with elastic cross bands. Visors leave your hair completely free.'],
      ['How do I measure my head?', 'Wrap a soft tape just above your ears. See the Fit Guide for details.'],
    ],
  },
  {
    title: 'Materials and care',
    qa: [
      ['Which hats are embroidered?', 'Our embroidered classics: the Cream Rope Cap, Sunwashed Rope Cap, Front Nine Ponytail Cap, Range Day Mesh Cap, Tee Time Dad Cap and Winter Rules Beanie. Our other hats carry a full-color printed golfer.'],
      ['Which hats have UPF 50+?', 'The Back Nine Ponytail Cap, Small Fit Performance Cap and 19th Hole Bucket are made with UPF 50+ fabric.'],
      ['How do I wash my hat?', 'Spot clean with cool water and a soft brush, or hand wash cold. Reshape and air dry. Don’t machine dry.'],
    ],
  },
  {
    title: 'Shipping, exchanges and returns',
    qa: [
      ['How fast does it ship?', 'Every hat is made to order and ships within 10 business days. US shipping is free on every order.'],
      ['Can I exchange for a different fit?', 'Yes. Fit exchanges are free within 30 days of delivery. Start one from your account or reply to your order email.'],
      ['What is your return policy?', 'Return unworn hats within 30 days of delivery, with no restocking fee.'],
      ['Do you ship internationally?', 'We ship to US addresses at launch.'],
    ],
  },
];

export default function FaqPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 860 }}>
        <span className="eyebrow">Help</span>
        <h1>Questions, answered.</h1>
        {groups.map((g) => (
          <div key={g.title} style={{ marginTop: 36 }}>
            <h2 className="h3">{g.title}</h2>
            <div className="accordion" style={{ marginTop: 10 }}>
              {g.qa.map(([q, a]) => (
                <details key={q}><summary>{q}</summary><div className="acc-body">{a}</div></details>
              ))}
            </div>
          </div>
        ))}
        <p style={{ marginTop: 36 }}>Still stuck? Email <a className="link" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and a real person will reply within one business day, or see the <Link className="link" href="/pages/fit-guide">Fit Guide</Link>.</p>
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: groups.flatMap((g) => g.qa.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))),
        }}
      />
    </section>
  );
}
