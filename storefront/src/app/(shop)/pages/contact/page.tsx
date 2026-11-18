import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from './ContactForm';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: 'Contact', description: 'Talk to a real person at Bogey Baby.' };

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container split" style={{ alignItems: 'start' }}>
        <div>
          <span className="eyebrow">Contact</span>
          <h1>Talk to a real person.</h1>
          <p className="lead" style={{ marginTop: 14 }}>We reply within one business day.</p>
          <p>Email <a className="link" href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>, or use the form. Questions about fit? The <Link className="link" href="/pages/fit-guide">Fit Guide</Link> and <Link className="link" href="/pages/faq">FAQ</Link> may answer them faster.</p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
