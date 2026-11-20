'use client';
import {useEffect,useRef,useState} from 'react';
import type {Replayer} from 'rrweb';
export default function Replay({id}:{id:string}){
 const root=useRef<HTMLDivElement>(null),player=useRef<Replayer|null>(null);const [error,setError]=useState(''),[ready,setReady]=useState(false),[playing,setPlaying]=useState(false),[scale,setScale]=useState(1),[height,setHeight]=useState(500),[width,setWidth]=useState(390);
 useEffect(()=>{let canceled=false;setReady(false);setError('');setPlaying(false);
  void(async()=>{try{const r=await fetch('/api/insights/replay?id='+id,{cache:'no-store'});const data=await r.json();if(!r.ok)throw new Error(data.error||'Recording unavailable.');if(data.events.length<2)throw new Error('This recording is too short to play.');const {Replayer}=await import('rrweb');if(canceled||!root.current)return;
   const meta=data.events.find((e:{type:number})=>e.type===4)?.data;setWidth(meta?.width||390);setHeight(meta?.height||844);
   player.current=new Replayer(data.events,{root:root.current,showWarning:false,showDebug:false,mouseTail:false,skipInactive:true,UNSAFE_replayCanvas:false});setReady(true);
  }catch(e){if(!canceled)setError(e instanceof Error?e.message:'Recording unavailable.');}})();
  return()=>{canceled=true;player.current?.destroy();player.current=null;};
 },[id]);
 useEffect(()=>{const parent=root.current?.parentElement;if(!parent)return;const resize=()=>setScale(Math.min(1,parent.clientWidth/width));resize();const observer=new ResizeObserver(resize);observer.observe(parent);return()=>observer.disconnect();},[width]);
 return <section className="i-replay"><div className="i-controls"><button className="g-button" disabled={!ready} onClick={()=>{player.current?.play();setPlaying(true);}}>Play</button><button className="g-button" disabled={!ready||!playing} onClick={()=>{player.current?.pause();setPlaying(false);}}>Pause</button><button className="g-button" disabled={!ready} onClick={()=>{player.current?.play(0);setPlaying(true);}}>Restart</button></div><p className="g-muted">Public layout and interactions only. Text, forms and personal content are hidden.</p>{error&&<p role="alert">{error}</p>}<div className="i-replay-window" style={{height:height*scale+30}}><div ref={root} className="i-replay-stage" style={{width,transform:`scale(${scale})`}}/></div></section>;
}
