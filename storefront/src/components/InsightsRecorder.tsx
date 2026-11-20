'use client';
import {useEffect} from 'react';
import {usePathname} from 'next/navigation';
import {analyticsAllowed,consentEvent} from '@/lib/consent';
import {publicReplayPage,replayBoundary,replayLimits,sanitizeReplayEvent,type HeatPoint} from '@/lib/insights-privacy';

/** No vendor SDK or replay data leaves the store's own origin. */
export function InsightsRecorder(){
 const pathname=usePathname();
 useEffect(()=>{
  if(process.env.NEXT_PUBLIC_INSIGHTS_ENABLED!=='true'||window.top!==window)return;
  function boundary(event:MouseEvent){
   if(event.button!==0||event.defaultPrevented||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
   const link=event.target instanceof Element?event.target.closest<HTMLAnchorElement>('a[href]'):null;
   if(link&&link.target!=='_blank'&&!link.hasAttribute('download')&&replayBoundary(location.href,link.href,location.origin)){event.preventDefault();event.stopImmediatePropagation();window.location.assign(link.href);}
  }
  document.addEventListener('click',boundary,true);return()=>document.removeEventListener('click',boundary,true);
 },[]);
 useEffect(()=>{
  if(process.env.NEXT_PUBLIC_INSIGHTS_ENABLED!=='true'||window.top!==window)return;
  const page=publicReplayPage(location.href,location.origin);if(!page)return;
  let stopped=false,started=false,stopRecord:(()=>void)|undefined,timer:ReturnType<typeof setInterval>|undefined,deadline:ReturnType<typeof setTimeout>|undefined,events:Record<string,unknown>[]=[],clicks:HeatPoint[]=[],chunks=0,sending=false;
  const origin=location.origin,id=crypto.randomUUID();
  let qa=false;try{qa=sessionStorage.getItem('bb_insights_qa')==='1';}catch{/* no persistent recording identity */}
  const sample=qa||crypto.getRandomValues(new Uint8Array(1))[0]<51;
  async function flush(){
   if(sending||stopped||!analyticsAllowed()||publicReplayPage(location.href,origin)!==page||!events.length&&!clicks.length)return;
   const payload={consent:2,sessionId:id,batchId:crypto.randomUUID(),page,width:innerWidth,height:innerHeight,events,clicks,qa};
   events=[];clicks=[];sending=true;const body=JSON.stringify(payload);if(body.length>replayLimits.bodyBytes){stop();return;}
   try{const response=await fetch('/api/insights/capture',{method:'POST',headers:{'Content-Type':'application/json'},body,credentials:'same-origin',keepalive:body.length<60000});if(!response.ok||++chunks>=replayLimits.chunks)stop();}catch{stop();}finally{sending=false;}
  }
  function stop(){stopped=true;stopRecord?.();if(timer)clearInterval(timer);if(deadline)clearTimeout(deadline);events=[];clicks=[];}
  function privateEntry(event:FocusEvent){if(event.target instanceof Element&&event.target.matches('textarea,[contenteditable="true"],input:not([type="checkbox"]):not([type="radio"]):not([type="button"]):not([type="submit"])'))stop();}
  function click(event:MouseEvent){if(stopped||!started||!analyticsAllowed()||event.target instanceof Element&&event.target.closest('form,[data-replay-private]'))return;clicks.push({x:event.clientX,y:event.pageY,docHeight:document.documentElement.scrollHeight,width:innerWidth,height:innerHeight});if(clicks.length>=50||event.target instanceof Element&&event.target.closest('a[href]'))void flush();}
  function refresh(){
   if(!analyticsAllowed()){if(started)stop();return;}
   if(started||stopped||!sample||document.activeElement?.matches('input,textarea,[contenteditable="true"]'))return;
   started=true;
   void import('rrweb').then(({record})=>{
    if(stopped||!analyticsAllowed()||publicReplayPage(location.href,origin)!==page)return;
    stopRecord=record({emit(event){if(stopped||!analyticsAllowed())return;const clean=sanitizeReplayEvent(event,origin);if(clean)events.push(clean);if(events.length>=150)void flush();},maskAllInputs:true,maskTextSelector:'*',blockSelector:'form,[data-replay-private],iframe,canvas',inlineStylesheet:false,recordCanvas:false,collectFonts:false,sampling:{mousemove:1000,scroll:1000}});
    setTimeout(()=>void flush(),1000);timer=setInterval(()=>void flush(),15000);deadline=setTimeout(()=>{void flush().finally(stop);},replayLimits.sessionMs);
   }).catch(stop);
  }
  const visibility=()=>{if(document.hidden)void flush();};
  document.addEventListener('focusin',privateEntry,true);document.addEventListener('submit',stop,true);document.addEventListener('click',click,true);document.addEventListener('visibilitychange',visibility);
  window.addEventListener(consentEvent,refresh);window.addEventListener('storage',refresh);refresh();
  return()=>{stop();document.removeEventListener('focusin',privateEntry,true);document.removeEventListener('submit',stop,true);document.removeEventListener('click',click,true);document.removeEventListener('visibilitychange',visibility);window.removeEventListener(consentEvent,refresh);window.removeEventListener('storage',refresh);};
 },[pathname]);
 return null;
}
