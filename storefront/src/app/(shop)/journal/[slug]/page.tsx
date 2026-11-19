import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { journal } from '@/data/journal';
import { JsonLd } from '@/components/JsonLd';
import { site } from '@/lib/site';
export function generateStaticParams() { return journal.map(p=>({slug:p.slug})); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = journal.find((item) => item.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: 'Bogey Baby' }],
    alternates: { canonical: `/journal/${post.slug}` },
    openGraph: {
      type: 'article', title: post.title, description: post.excerpt,
      url: `/journal/${post.slug}`, publishedTime: post.date,
      images: [{ url: post.image, width: 1200, height: 900, alt: post.alt }],
    },
    twitter: { card: 'summary_large_image', title: post.title, description: post.excerpt, images: [post.image] },
  };
}
export default async function JournalArticle({params}:{params:Promise<{slug:string}>}) {
 const {slug}=await params;const post=journal.find(p=>p.slug===slug);if(!post)notFound();
 const sectionId=(i:number)=>`section-${i+1}`;
 const related=(post.related||journal.filter(p=>p.slug!==post.slug).slice(0,3).map(p=>p.slug)).map(slug=>journal.find(p=>p.slug===slug)).filter(Boolean);
 return <article className="section"><div className="container"><div className="section-head"><Link className="eyebrow" href="/journal">The Bogey Baby Journal</Link><h1>{post.title}</h1><p className="lead">{post.excerpt}</p><p className="small muted">{post.category} · <time dateTime={post.date}>{new Date(post.date+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'America/New_York'})}</time> · By Bogey Baby editorial</p></div><figure><Image className="journal-hero" src={post.image} alt={post.alt} width={1200} height={900} sizes="(min-width:900px) 900px, 100vw" priority />{post.imageCredit&&<figcaption className="journal-photo-credit">Editorial photograph, edited with AI. <a href={post.imageCredit.source} rel="noopener noreferrer">{post.imageCredit.label}</a> · <a href={post.imageCredit.license} rel="noopener noreferrer">License</a></figcaption>}</figure><div className="prose journal-body">
 {post.answer&&<aside className="journal-answer" aria-label="Quick answer"><strong>The quick answer</strong><p>{post.answer}</p></aside>}
 <nav className="journal-toc" aria-label="In this guide"><h2>In this guide</h2><ol>{post.sections.map((s,i)=><li key={s.title}><a href={'#'+sectionId(i)}>{s.title}</a></li>)}</ol></nav>
 {post.table&&<div className="journal-table" tabIndex={0} role="region" aria-label="Comparison checklist"><table><caption>Before you choose</caption><thead><tr>{post.table.headers.map(h=><th scope="col" key={h}>{h}</th>)}</tr></thead><tbody>{post.table.rows.map((r,i)=><tr key={i}>{r.map((cell,j)=>j===0?<th scope="row" key={j}>{cell}</th>:<td key={j}>{cell}</td>)}</tr>)}</tbody></table></div>}
 {post.sections.map((s,i)=><section id={sectionId(i)} key={s.title}><h2>{s.title}</h2><p>{s.text}</p></section>)}
 {post.faq&&<section><h2>Frequently asked questions</h2>{post.faq.map(f=><div key={f.question}><h3>{f.question}</h3><p>{f.answer}</p></div>)}</section>}
 {post.sources&&<section className="journal-sources"><h2>Sources and product references</h2><p className="small">Checked {post.modified||post.date}. Product availability, fees and provider instructions can change. These guides do not describe hands-on tests of a personalized Bogey Baby hat.</p><ul>{post.sources.map(source=><li key={source.url}><a href={source.url} rel="noopener noreferrer">{source.title}</a></li>)}</ul></section>}
 <p><Link href={post.collection} className="btn">{post.cta}</Link></p><p><Link className="link" href="/pages/shipping-returns">Shipping &amp; Returns</Link></p>
 <section><h2>Keep reading</h2><ul>{related.map(p=>p&&<li key={p.slug}><Link href={'/journal/'+p.slug}>{p.title}</Link></li>)}</ul></section>
 </div></div><JsonLd data={{'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.excerpt,datePublished:post.date,dateModified:post.modified||post.date,author:{'@type':'Organization',name:'Bogey Baby',url:site.url+'/pages/about-us'},publisher:{'@type':'Organization',name:'Bogey Baby',logo:{'@type':'ImageObject',url:site.url+'/icon.png'}},image:`${site.url}${post.image}`,mainEntityOfPage:`${site.url}/journal/${post.slug}`}} /></article>;
}
