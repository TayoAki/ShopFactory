import type { Metadata } from 'next';
import Link from 'next/link';
import { ContactForm } from './ContactForm';

export const metadata: Metadata = { title: 'Contact', description: 'Talk to a real person at Bogey Baby.' };

export default async function ContactPage({searchParams}:{searchParams:Promise<{kind?:string;order?:string}>}) {
  const params=await searchParams;
  return (
    <section className="section">
      <div className="container split" style={{ alignItems: 'start' }}>
        <div>
          <span className="eyebrow">Contact</span>
          <h1>Talk to a real person.</h1>
          <p className="lead" style={{ marginTop: 14 }}>Questions about your order, a return, or finding your fit? Send us a message.</p>
          <p>Use the form to save your request and receive a reference. Questions about fit? The <Link className="link" href="/pages/fit-guide">Fit Guide</Link> and <Link className="link" href="/pages/faq">FAQ</Link> may answer them faster.</p>
        </div>
        <ContactForm defaultKind={['order','return','fit','review'].includes(params.kind||'')?params.kind:'other'} defaultOrder={(params.order||'').slice(0,255)} />
      </div>
    </section>
  );
}
