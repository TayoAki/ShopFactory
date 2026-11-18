import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { media } from '@/data/media';
import { products } from '@/data/products';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: "Women's Golf Hat Fit Guide", description: 'Find your Bogey Baby fit in 10 seconds: how to measure your head, which hats run small, and which caps work with a ponytail.' };

export default function FitGuidePage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Fit Guide</span>
            <h1>Find your fit in 10 seconds.</h1>
            <p className="lead" style={{ marginTop: 14 }}>Measure around your head just above the ears with a soft tape. No tape? Use a phone charger cable, then lay it against a ruler.</p>
          </div>
          <ol className="steps steps--photos">
            {[
              { img: media.fitWrap, title: 'Wrap', text: 'Run a soft tape around your head, just above your ears and across your forehead.' },
              { img: media.fitRead, title: 'Read', text: 'Note the measurement in inches where the tape meets.' },
              { img: media.fitMatch, title: 'Match', text: 'Hats often feel big on you? Start with the Small Fit Performance Cap. Everything else adjusts.' },
            ].map((s, i) => (
              <li key={s.title}>
                <Image src={s.img.src} alt={s.img.alt} width={s.img.width} height={s.img.height} sizes="(min-width: 900px) 33vw, 100vw" priority={i === 0} />
                <div className="steps__body">
                  <h3>{s.title}</h3>
                  <p className="muted" style={{ margin: 0 }}>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="container">
          <div className="section-head">
            <h2>How each hat fits</h2>
            <p className="muted" style={{ marginTop: 8 }}>Between sizes or not sure? Pick the hat you love. If the fit is off, see our 30-day return policy for eligibility and fees.</p>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table className="table">
              <thead><tr><th scope="col">Hat</th><th scope="col">Fit</th><th scope="col">Ponytail</th></tr></thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.handle}>
                    <th scope="row"><Link className="link" href={`/products/${p.handle}`}>{p.title}</Link></th>
                    <td>{p.fit}</td>
                    <td>{p.features.ponytail === 'concealed' ? 'Concealed opening' : p.features.ponytail === 'open-back' ? 'Open back' : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split">
          <div>
            <h2>Hair up? Pick a ponytail cap.</h2>
            <p className="lead" style={{ marginTop: 12 }}>Five of our caps are made for ponytails and low buns. Visors leave your hair completely free.</p>
          </div>
          <div className="btn-row">
            <Link href="/collections/ponytail-caps" className="btn">Shop ponytail caps</Link>
            <Link href="/collections/visors" className="btn btn--secondary">Shop visors</Link>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: 'How to measure your head for a golf hat',
          step: [
            { '@type': 'HowToStep', name: 'Wrap', text: 'Run a soft tape around your head, just above your ears and across your forehead.' },
            { '@type': 'HowToStep', name: 'Read', text: 'Note the measurement in inches where the tape meets.' },
            { '@type': 'HowToStep', name: 'Match', text: 'If hats often feel big, start with a small-fit cap; otherwise choose an adjustable cap.' },
          ],
          url: `${site.url}/pages/fit-guide`,
        }}
      />
    </>
  );
}
