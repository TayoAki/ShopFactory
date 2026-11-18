import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { journal } from '@/data/journal';
export const metadata: Metadata = { title: 'The Bogey Baby Journal', description: 'Fit notes, hat details, and good company from Bogey Baby.', alternates: {canonical:'/journal'} };
export default function JournalPage() {
  return <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">The journal</span><h1>A little off the course.</h1><p className="lead">Fit notes, small details, and hats worth getting to know.</p></div><div className="journal-grid">{journal.map(post => <article className="journal-card" key={post.slug}><Link href={`/journal/${post.slug}`}><Image src={post.image} alt={post.alt} width={1200} height={900} sizes="(min-width:900px) 45vw, 100vw" /></Link><div><span className="eyebrow">{post.category} · November 18, 2026</span><h2><Link href={`/journal/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="link link--cta" href={`/journal/${post.slug}`}>Read the story →</Link></div></article>)}</div></div></section>;
}
