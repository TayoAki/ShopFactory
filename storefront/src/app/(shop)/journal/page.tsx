import {JournalBrowser} from '@/components/JournalBrowser';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { journal } from '@/data/journal';
export const metadata: Metadata = { title: 'The Bogey Baby Journal', description: 'Practical guides to custom rope hats, logo artwork, personalization, golf-hat fit and care.', alternates: {canonical:'/journal'} };
export default function JournalPage() {
  return <section className="section"><div className="container"><div className="section-head"><span className="eyebrow">The journal</span><h1>Hat questions, answered.</h1><p className="lead">Custom designs, better fit and the details to check before your next hat.</p></div><JournalBrowser posts={journal}/></div></section>;
}
