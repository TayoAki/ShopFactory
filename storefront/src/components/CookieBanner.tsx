'use client';
import Link from 'next/link';
import {useEffect,useRef,useState} from 'react';
import {readConsent,saveConsent} from '@/lib/consent';
export function CookieSettingsButton(){return <button type="button" className="cookie-settings" onClick={()=>window.dispatchEvent(new Event('bb-open-consent'))}>Cookie settings</button>;}
export function CookieBanner(){
 const [open,setOpen]=useState(false);const [saved,setSaved]=useState(false);const [privacy,setPrivacy]=useState(false);const heading=useRef<HTMLHeadingElement>(null);const previous=useRef<HTMLElement|null>(null);
 useEffect(()=>{
  const refresh=()=>{setSaved(readConsent()!==null);setPrivacy(!!navigator.globalPrivacyControl||navigator.doNotTrack==='1');};
  refresh();setOpen(readConsent()===null);
  const show=()=>{previous.current=document.activeElement as HTMLElement;refresh();setOpen(true);requestAnimationFrame(()=>heading.current?.focus());};
  window.addEventListener('bb-open-consent',show);window.addEventListener('storage',refresh);
  return()=>{window.removeEventListener('bb-open-consent',show);window.removeEventListener('storage',refresh);};
 },[]);
 function choose(analytics:boolean){saveConsent(analytics);setSaved(true);setOpen(false);previous.current?.focus();}
 if(!open)return null;
 return <section className="cookie-banner" role="region" aria-labelledby="cookie-title">
  <div><h2 id="cookie-title" ref={heading} tabIndex={-1}>Your privacy, your choice</h2>
  <p>We use essential cookies and storage to keep your bag, sign-in and checkout working. With your permission, we also measure visits and shopping activity with Umami. <Link href="/pages/privacy">Privacy policy</Link></p>
  {privacy&&<p className="cookie-signal">Your browser’s privacy signal keeps optional analytics off.</p>}</div>
  <div className="cookie-actions"><button type="button" onClick={()=>choose(false)}>Reject optional</button><button type="button" onClick={()=>choose(true)} disabled={privacy}>Accept analytics</button>{saved&&<button type="button" onClick={()=>{setOpen(false);previous.current?.focus();}}>Close settings</button>}</div>
 </section>;
}
