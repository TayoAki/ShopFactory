'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { products, type Product } from '@/data/products';
import { track } from '@/lib/analytics';

type Answers = { fit: string; hair: string; sun: string };
const questions = [
  { name: 'fit', title: 'How do most caps fit?', options: [{ value: 'small', label: 'They usually feel too roomy', image: '/images/products/p-smallfit-sage.webp' }, { value: 'regular', label: 'An adjustable fit usually works', image: '/images/products/flagship-cream-front.webp' }] },
  { name: 'hair', title: 'How do you wear your hair on the course?', options: [{ value: 'up', label: 'Ponytail or bun', image: '/images/editorial/ponytail-round.webp' }, { value: 'down', label: 'Down, short, or tucked away', image: '/images/models/cream-on-course.webp' }] },
  { name: 'sun', title: 'Is rated sun protection a priority?', options: [{ value: 'upf', label: 'Yes, I want UPF 50+ fabric', image: '/images/products/p-perfpony-wintergreen.webp' }, { value: 'any', label: 'Show me all styles', image: '/images/editorial/find-your-fit.webp' }] },
] as const;

function matches(product: Product, answers: Answers) {
  return [
    answers.fit === 'small' && product.features.smallFit ? { score: 4, text: 'Small-fit design' } : null,
    answers.hair === 'up' && product.features.ponytail ? { score: 3, text: 'Ponytail opening' } : null,
    answers.hair === 'up' && product.style === 'visor' ? { score: 3, text: 'Open crown for your hair' } : null,
    answers.sun === 'upf' && product.features.upf50 ? { score: 2, text: 'UPF 50+ fabric' } : null,
  ].filter((match): match is { score: number; text: string } => match !== null);
}

export function FitQuiz() {
  const [answers, setAnswers] = useState<Answers | null>(null);
  const results = useRef<HTMLDivElement>(null);
  const recommendations = answers ? products.map((product, index) => ({
    product, index, matches: matches(product, answers),
    score: matches(product, answers).reduce((sum, match) => sum + match.score, 0),
  })).sort((a, b) => b.score - a.score || a.index - b.index).slice(0, 3) : [];

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const next = { fit: String(data.get('fit')), hair: String(data.get('hair')), sun: String(data.get('sun')) };
    setAnswers(next);
    track('fit_quiz_completed', next);
    requestAnimationFrame(() => {
      results.current?.focus({ preventScroll: true });
      results.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    });
  }
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <Image className="fit-quiz__intro-image" src="/images/editorial/find-your-fit.webp" alt="Cream and sage Bogey Baby caps beside a measuring tape" width={1200} height={900} sizes="(min-width:900px) 760px, 100vw" priority />
            <h1>Find your fit.</h1>
            <p className="lead" style={{ marginTop: 14 }}>Three quick questions to find hats worth trying on.</p>
          </div>
          <form onSubmit={submit} className="fit-quiz">
            {questions.map(question => (
              <fieldset key={question.name} className="fit-quiz__question">
                <legend>{question.title}</legend>
                <div className="fit-quiz__options">
                  {question.options.map(option => (
                    <label className="fit-quiz__option" key={option.value}>
                      <Image src={option.image} alt="" width={400} height={320} sizes="(min-width:640px) 360px, 45vw" />
                      <input type="radio" name={question.name} value={option.value} required />
                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
            <button type="submit" className="btn">Find my hats</button>
          </form>
        </div>
      </section>
      <section className="section section--paper2" hidden={!answers}>
        <div className="container fit-quiz__results" tabIndex={-1} ref={results}>
          <div className="section-head">
            <h2>Your hat picks</h2>
            <p className="muted" style={{ marginTop: 12 }}>These picks prioritize your fit, then hair, then sun preferences. Check each hat&apos;s details for every feature you need.</p>
          </div>
          <div className="grid grid--3">
            {recommendations.map(({ product, matches }) => (
              <div key={product.handle}>
                <ProductCard product={product} />
                {matches.length > 0 && <p className="small muted" style={{ marginTop: 12 }}>{matches.map(match => match.text).join(' · ')}</p>}
              </div>
            ))}
          </div>
          <p style={{ marginTop: 24 }}><Link className="link" href="/pages/fit-guide">Check measurements and fit details</Link></p>
        </div>
      </section>
    </>
  );
}
