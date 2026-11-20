'use client';
import {useEffect,useState,useRef} from 'react';
import Image from 'next/image';
import {money} from '@/lib/money';
import {captureCampaign} from '@/lib/campaign-attribution';
import {analyticsAllowed} from '@/lib/consent';
import {track} from '@/lib/analytics';
type Variant={id:number;color:string;image:string};
type Quote={id:string;token:string;previewUrl:string;artworkHash:string;color:string;quantity:number;unitPrice:number;shipping:number;subtotal:number;expiresAt:string;mockupUrl?:string|null};
export function CustomHatBuilder({variants}:{variants:Variant[]}){
 const [kind,setKind]=useState('logo'),[variant,setVariant]=useState(variants[0]),[busy,setBusy]=useState(false),[error,setError]=useState(''),[quote,setQuote]=useState<Quote|null>(null),[approved,setApproved]=useState(false);
 const [step,setStep]=useState<'design'|'delivery'>('design'),[name,setName]=useState(''),[thread,setThread]=useState('#082D22'),[localLogo,setLocalLogo]=useState(''),[reading,setReading]=useState(false);
 const review=useRef<HTMLDivElement>(null),form=useRef<HTMLFormElement>(null),delivery=useRef<HTMLFieldSetElement>(null),started=useRef(false),fileRead=useRef(0);
 useEffect(()=>{if(quote){review.current?.scrollIntoView({block:'start'});review.current?.focus({preventScroll:true});}},[quote]);
 useEffect(()=>{track('view_item',{item_id:'custom-rope-cap',item_name:'Personalized rope hat'});},[]);
 useEffect(()=>()=>{fileRead.current++;},[]);
 function start(){if(!started.current){started.current=true;track('custom_design_started',{item_id:'custom-rope-cap'});}}
 function fileError(message:string,code:string){setError(message);setLocalLogo('');track('custom_design_error',{stage:'upload',reason:code});}
 async function chooseLogo(file?:File){
  const current=++fileRead.current;setError('');setLocalLogo('');if(!file){setReading(false);return;}
  if(!['image/png','image/jpeg'].includes(file.type)){setReading(false);fileError('Choose a PNG or JPG image.','file_type');return;}
  if(file.size>4*1024*1024){setReading(false);fileError('Your image is too large. Choose a file of 4 MB or less.','file_size');return;}
  setReading(true);
  try{
   const url=await new Promise<string>((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=reject;reader.readAsDataURL(file);});
   const valid=await new Promise<boolean>(resolve=>{const image=new window.Image();image.onload=()=>resolve(image.naturalWidth*image.naturalHeight<=16000000&&image.naturalWidth>0);image.onerror=()=>resolve(false);image.src=url;});
   if(current!==fileRead.current)return;
   if(!valid){fileError('Use a valid image no larger than 16 megapixels.','image_decode');return;}
   setLocalLogo(url);track('custom_preview_viewed',{kind:'logo'});
  }catch{if(current===fileRead.current)fileError('This image could not be opened. Try a different PNG or JPG.','file_read');}
  finally{if(current===fileRead.current)setReading(false);}
 }
 function continueToDelivery(){
  if(reading||!form.current?.reportValidity())return;
  if(kind==='logo'&&!localLogo){setError('Choose a valid PNG or JPG to preview first.');return;}
  setError('');if(kind==='name')track('custom_preview_viewed',{kind:'name'});
  track('custom_delivery_started',{kind});setStep('delivery');
  requestAnimationFrame(()=>{delivery.current?.scrollIntoView({block:'start'});delivery.current?.focus({preventScroll:true});});
 }
 async function prepare(event:React.FormEvent<HTMLFormElement>){
  event.preventDefault();if(step!=='delivery'){continueToDelivery();return;}
  setError('');setBusy(true);track('custom_quote_started',{kind});
  try{const r=await fetch('/api/custom-hats',{method:'POST',body:new FormData(event.currentTarget)});const result=await r.json();if(!r.ok)throw new Error(result.error||'Please try preparing your design again.');setQuote(result);setApproved(false);track('custom_quote_ready',{kind});track('add_to_cart',{item_id:'custom-rope-cap',quantity:result.quantity,value:result.subtotal/100});}
  catch(e){setError(e instanceof Error?e.message:'Please try preparing your design again.');track('custom_design_error',{stage:'quote',reason:'quote_failed'});}
  finally{setBusy(false);}
 }
 async function checkout(){
  if(!quote||!approved)return;setBusy(true);setError('');
  try{const r=await fetch('/api/custom-hats/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:quote.id,token:quote.token,artworkHash:quote.artworkHash,approved:true,attribution:captureCampaign(),attributionOptOut:!analyticsAllowed()})});const result=await r.json();if(!r.ok)throw new Error(result.error||'Checkout is unavailable.');track('custom_checkout_started',{kind});track('begin_checkout',{item_id:'custom-rope-cap',quantity:quote.quantity,value:(quote.subtotal+quote.shipping)/100});window.location.assign(result.url);}
  catch(e){setError(e instanceof Error?e.message:'Checkout is unavailable.');track('custom_design_error',{stage:'checkout',reason:'checkout_failed'});setBusy(false);}
 }
 async function changeDesign(){
  if(!quote)return;setBusy(true);setError('');
  try{const r=await fetch('/api/custom-hats',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:quote.id,token:quote.token})});if(!r.ok)throw new Error('Your current quote could not be released. Please try again.');setQuote(null);setApproved(false);setStep('design');}
  catch(e){setError(e instanceof Error?e.message:'Please try again.');}finally{setBusy(false);}
 }
 return <div className="custom-builder" data-replay-private="true">
  <div className="custom-builder__photo">
   <Image src={variant.image} alt={`Example rope cap in ${variant.color} with Bogey Baby artwork`} width={900} height={900} sizes="(min-width:900px) 45vw, 100vw"/>
   <p className="small muted">Example cap with Bogey Baby artwork. Your design replaces it.</p>
  </div>
  <div>
   <ol className="custom-steps" aria-label="Personalization steps"><li aria-current={!quote&&step==='design'?'step':undefined}>Design</li><li aria-current={!quote&&step==='delivery'?'step':undefined}>Delivery &amp; price</li><li aria-current={quote?'step':undefined}>Approve &amp; checkout</li></ol>
   {quote&&<div className="panel custom-review" ref={review} tabIndex={-1}>
    <h2>Check every detail.</h2>
    {/* Capability URLs stay out of analytics, referrers and browser storage. */}
    <img className="custom-artwork-preview" src={quote.previewUrl} alt="Your submitted artwork preview" referrerPolicy="no-referrer"/>
    {quote.mockupUrl&&<img className="custom-artwork-preview" src={quote.mockupUrl} alt="Product mockup with your uploaded design; final stitches may differ" referrerPolicy="no-referrer"/>}
    <p>{quote.quantity} × {quote.color} · {money(quote.unitPrice)} per hat</p>
    <dl className="custom-totals"><dt>Hats and design setup</dt><dd>{money(quote.subtotal)}</dd><dt>US shipping</dt><dd>{quote.shipping?money(quote.shipping):'Free'}</dd><dt>Total before tax</dt><dd>{money(quote.subtotal+quote.shipping)}</dd></dl>
    <p className="small">Quote valid for 20 minutes. Tax is calculated at checkout. Your delivery details carry into secure checkout. Changing the address may require a new quote before production.</p>
    <label className="custom-check"><input type="checkbox" checked={approved} onChange={e=>{setApproved(e.target.checked);if(e.target.checked)track('custom_artwork_approved',{kind});}}/><span>I approve this artwork, including spelling, color and orientation. I understand this is a design preview and final stitches can differ.</span></label>
    <div className="btn-row"><button type="button" className="btn" disabled={!approved||busy} onClick={checkout}>{busy?'Opening checkout…':'Approve and checkout'}</button><button className="btn btn--secondary" type="button" disabled={busy} onClick={changeDesign}>Change my design</button></div>
   </div>}
   <form ref={form} className="panel form-grid" hidden={!!quote} onSubmit={prepare} onChange={start}>
    <fieldset className="custom-stage" hidden={step!=='design'}>
     <legend className="h3">Start with your design</legend>
     <p>From $49 per hat, including one design setup. From $56 with US shipping, before tax. Preview your artwork here before entering an address.</p>
     <fieldset className="custom-kind"><legend>What goes on the front?</legend><label><input type="radio" name="kind" value="name" checked={kind==='name'} onChange={()=>{setKind('name');setError('');}}/> A name</label><label><input type="radio" name="kind" value="logo" checked={kind==='logo'} onChange={()=>{setKind('logo');setError('');}}/> My logo</label></fieldset>
     {kind==='name'?<><label className="field"><span>Name · up to 18 characters</span><input className="input" name="name" maxLength={18} pattern="[A-Za-z][A-Za-z .'-]{0,17}" placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} required/><span className="small">Letters, spaces, apostrophes, periods and hyphens. One simple typeface.</span></label><label className="field"><span>Thread color</span><select className="input" name="thread" value={thread} onChange={e=>setThread(e.target.value)}><option value="#082D22">Forest green</option><option value="#FFFFFF">White</option><option value="#111111">Black</option></select></label></>:<label className="field"><span>Your logo · PNG or JPG, up to 4 MB</span><input className="input" name="logo" type="file" accept="image/png,image/jpeg" onChange={e=>chooseLogo(e.target.files?.[0])} required/><span className="small">Use clear artwork you own. A transparent PNG avoids an unwanted background. Exact thread colors are not guaranteed.</span></label>}
     <div className="custom-local-preview" aria-live="polite"><h3>Your artwork preview</h3>{reading?<p>Opening your image…</p>:kind==='logo'&&localLogo?<img src={localLogo} alt="Local preview of your uploaded artwork"/>:kind==='name'&&name?<p className="custom-name-preview" style={{color:thread}}>{name}</p>:<p>{kind==='name'?'Type your name to see it here.':'Choose your logo to see it here.'}</p>}<p className="small">Artwork only, not a stitch simulation or a photo of your finished cap. This preview stays on your device.</p></div>
     <label className="field"><span>Cap color</span><select className="input" name="variantId" value={variant.id} onChange={e=>setVariant(variants.find(v=>v.id===Number(e.target.value))!)}>{variants.map(v=><option value={v.id} key={v.id}>{v.color}</option>)}</select></label>
     <label className="field"><span>Quantity · same design and color</span><input className="input" name="quantity" type="number" min="1" max="6" defaultValue="1" required/></label>
     <button className="btn" type="button" disabled={reading} onClick={continueToDelivery}>Continue to delivery &amp; exact price</button>
    </fieldset>
    <fieldset className="custom-stage custom-review" ref={delivery} tabIndex={-1} hidden={step!=='delivery'} disabled={step!=='delivery'}>
     <legend className="h3">Where is it going?</legend><p className="small">We need a US delivery address to check production costs and your exact price. We’ll carry it into secure checkout so you can confirm it.</p>
     <label className="field"><span>Recipient name</span><input className="input" name="recipientName" autoComplete="shipping name" maxLength={100} required/></label>
     <label className="field"><span>Street address</span><input className="input" name="address" autoComplete="shipping address-line1" maxLength={150} required/></label>
     <label className="field"><span>City</span><input className="input" name="city" autoComplete="shipping address-level2" maxLength={100} required/></label>
     <div className="custom-address"><label className="field"><span>State · two letters</span><input className="input" name="state" autoComplete="shipping address-level1" minLength={2} maxLength={2} pattern="[A-Za-z]{2}" placeholder="CA" required/></label><label className="field"><span>ZIP code</span><input className="input" name="zip" autoComplete="shipping postal-code" pattern="[0-9]{5}(-[0-9]{4})?" maxLength={10} required/></label></div>
     <label className="custom-check"><input type="checkbox" name="rights" value="yes" required/><span>I own this artwork or have permission to reproduce it, and understand it will be shared with our production partner to make my order.</span></label>
     <p className="small">Made to order: ships within 10 business days after payment and any artwork approval; delivery time is additional. US shipping $7 below $120, free at $120+. Returns must be requested within 30 days of ordering; $5 per-item refund fee.</p>
     <div className="btn-row"><button className="btn" disabled={busy}>{busy?'Preparing your exact quote…':'Get my exact price'}</button><button type="button" className="btn btn--secondary" disabled={busy} onClick={()=>setStep('design')}>Back to my design</button></div>
    </fieldset>
   </form>
   {error&&<p className="notice" role="alert" style={{marginTop:16}}>{error}</p>}
  </div>
 </div>;
}
