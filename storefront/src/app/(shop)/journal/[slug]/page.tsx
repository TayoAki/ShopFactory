import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { journal } from '@/data/journal';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/site';
export function generateStaticParams() { return journal.map(p=>({slug:p.slug})); }
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata> {const {slug}=await params;const p=journal.find(p=>p.slug===slug);return p?{title:p.title,description:p.excerpt,alternates:{canonical:`/journal/${p.slug}`}}:{};}
export default async function JournalArticle({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;const post=journal.find(p=>p.slug===slug);if(!post)notFound();
 return <article className="section"><div className="container"><div className="section-head"><Link className="eyebrow" href="/journal">The Bogey Baby Journal</Link><h1>{post.title}</h1><p className="lead">{post.excerpt}</p><p className="small muted">{post.category} · November 18, 2026 · By Bogey Baby</p></div><Image className="journal-hero" src={post.image} alt={post.alt} width={1200} height={900} sizes="(min-width:900px) 900px, 100vw" priority /><div className="prose journal-body">{post.sections.map(s=><section key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}<p><Link href={post.collection} className="btn">{post.cta}</Link></p><p><Link className="link" href="/pages/shipping-returns">Shipping &amp; Returns</Link></p></div></div><JsonLd data={{'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.excerpt,datePublished:post.date,author:{'@type':'Organization',name:'Bogey Baby'},image:`${site.url}${post.image}`,mainEntityOfPage:`${site.url}/journal/${post.slug}`}} /></article>;
}
