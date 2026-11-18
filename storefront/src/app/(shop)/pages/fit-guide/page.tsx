import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { products } from '@/data/products';
import { site } from '@/lib/site';

export const metadata: Metadata = { title: "Women's Golf Hat Fit Guide", description: 'Find your Bogey Baby fit in 10 seconds: how to measure your head, which hats run small, and which caps work with a ponytail.' };

function MeasureDiagram() {
  return (
    <svg viewBox="0 0 960 300" role="img" aria-label="Wrap a tape above your ears, read the inches, then match your fit" style={{ width: '100%', height: 'auto' }}>
      <g fill="none" stroke="#082D22" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Panel 1: head profile with tape */}
        <rect x="10" y="10" width="300" height="280" rx="18" fill="#F4F0E1" stroke="none" />
        <path d="M120 230c-20-10-30-40-26-70 4-40 34-70 72-70s66 26 66 66c0 18-6 30-14 40l6 34h-40" fill="#C08A5B" stroke="#082D22" />
        <path d="M100 120c10-40 50-60 90-50 30 8 46 30 50 56-30-12-70-14-140-6z" fill="#1E1B18" />
        <ellipse cx="166" cy="128" rx="78" ry="16" stroke="#A67843" strokeWidth="5" strokeDasharray="10 8" />
        {/* Panel 2: tape reading */}
        <rect x="330" y="10" width="300" height="280" rx="18" fill="#F4F0E1" stroke="none" />
        <rect x="370" y="120" width="220" height="60" rx="8" fill="#F1DFB5" />
        <path d="M390 120v22M412 120v14M434 120v22M456 120v14M478 120v30M500 120v14M522 120v22M544 120v14M566 120v22" />
        <path d="M478 205l0 40" stroke="#620719" />
        {/* Panel 3: two caps */}
        <rect x="650" y="10" width="300" height="280" rx="18" fill="#F4F0E1" stroke="none" />
        <path d="M690 170c0-30 24-50 52-50s52 20 52 50z" fill="#A9B8A0" />
        <path d="M690 170h80" />
        <path d="M806 170c0-34 26-56 58-56s58 22 58 56z" fill="#EFE6CF" />
        <path d="M806 170h90" />
      </g>
      <g fontFamily="Arial, sans-serif" fontWeight="700" fill="#082D22" fontSize="22" textAnchor="middle">
        <text x="160" y="270">1. Wrap above the ears</text>
        <text x="480" y="100">2. Read the inches</text>
        <text x="478" y="160" fontSize="26">22 in</text>
        <text x="800" y="230">3. Match your fit</text>
        <text x="742" y="200" fontSize="17">Small fit</text>
        <text x="862" y="200" fontSize="17">Adjustable</text>
      </g>
    </svg>
  );
}

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
          <div className="panel"><MeasureDiagram /></div>
          <ol className="steps" style={{ marginTop: 24 }}>
            <li><h3>Wrap</h3><p className="muted" style={{ margin: 0 }}>Run a soft tape around your head, just above your ears and across your forehead.</p></li>
            <li><h3>Read</h3><p className="muted" style={{ margin: 0 }}>Note the measurement in inches where the tape meets.</p></li>
            <li><h3>Match</h3><p className="muted" style={{ margin: 0 }}>Hats often feel big on you? Start with the Small Fit Performance Cap. Everything else adjusts.</p></li>
          </ol>
        </div>
      </section>

      <section className="section section--paper2">
        <div className="container">
          <div className="section-head">
            <h2>How each hat fits</h2>
            <p className="muted" style={{ marginTop: 8 }}>Between sizes or not sure? Pick the hat you love. If the fit is off, exchanges are free within 30 days.</p>
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
