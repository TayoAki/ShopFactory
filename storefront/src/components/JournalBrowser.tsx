'use client';
import {useState,useId} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type {JournalPost} from '@/data/journal-types';
export function JournalBrowser({posts}:{posts:JournalPost[]}){
 const [page,setPage]=useState(0);const id=useId();const perPage=2,start=page*perPage,visible=posts.slice(start,start+perPage);
 return <><div className="journal-grid" id={id}>{visible.map(post=><article className="journal-card" key={post.slug}><Link href={'/journal/'+post.slug}><Image src={post.image} alt={post.alt} width={1200} height={900} sizes="(min-width:900px) 25vw, 100vw"/></Link><div><span className="eyebrow">{post.category}</span><h2><Link href={'/journal/'+post.slug}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="link link--cta" href={'/journal/'+post.slug}>Read the story →</Link></div></article>)}</div><nav className="journal-pagination" aria-label="Journal pagination"><button className="btn btn--secondary" type="button" disabled={page===0} aria-controls={id} onClick={()=>setPage(p=>p-1)}>← Previous</button><p role="status" aria-live="polite">Stories {start+1}–{Math.min(start+perPage,posts.length)} of {posts.length}</p><button className="btn btn--secondary" type="button" disabled={start+perPage>=posts.length} aria-controls={id} onClick={()=>setPage(p=>p+1)}>Next →</button></nav><details className="journal-all-titles"><summary>Browse all article titles</summary><ul>{posts.map(post=><li key={post.slug}><Link href={'/journal/'+post.slug}>{post.title}</Link></li>)}</ul></details></>;
}
