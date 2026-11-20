/** Original Bogey Baby recorder boundary and serialized-data sanitizer. */
const publicPages=new Set(['/', '/pages/about-us','/pages/gift-guide','/pages/fit-guide','/pages/faq','/pages/shipping-returns','/pages/golf-buddy','/pages/5-reasons']);
export const replayLimits={days:7,dailySessions:50,sessionMs:180000,chunks:12,storageBytes:50*1024*1024,bodyBytes:512*1024,eventsPerChunk:300};
export function publicReplayPage(value:string,origin='https://www.bogeybaby.com'):string|null{
 try{const url=new URL(value,origin);if(url.origin!==new URL(origin).origin||url.search||url.hash)return null;const p=url.pathname.replace(/\/$/,'')||'/';return publicPages.has(p)||/^\/(products|collections)\/[a-z0-9-]+$/.test(p)||/^\/journal(?:\/[a-z0-9-]+)?$/.test(p)?p:null;}catch{return null;}
}
export function replayBoundary(current:string,destination:string,origin:string):boolean{
 try{const u=new URL(destination,current);return u.origin===origin&&!!publicReplayPage(current,origin)!==!!publicReplayPage(u.href,origin);}catch{return false;}
}
const obj=(v:unknown):Record<string,unknown>=>v&&typeof v==='object'&&!Array.isArray(v)?v as Record<string,unknown>:{};
const n=(v:unknown,min=-100000,max=100000)=>typeof v==='number'&&Number.isFinite(v)&&v>=min&&v<=max?v:null;
const mask=(v:unknown)=>typeof v==='string'?v.slice(0,50000).replace(/\S/g,'•'):'';
export function publicReplayAsset(value:unknown,origin:string,depth=0):string|null{
 if(depth>3||typeof value!=='string'||value.length>1500)return null;
 try{const u=new URL(value,origin);if(u.origin!==origin||u.hash)return null;
  if(u.pathname==='/_next/image'){const path=u.searchParams.get('url');if(!path||!publicReplayAsset(path,origin,depth+1)||[...u.searchParams.keys()].some(k=>!['url','w','q'].includes(k)))return null;return u.pathname+u.search;}
  if(u.search)return null;
  return /^\/(images|brand|_next\/static)\/[a-zA-Z0-9_/.%()-]+\.(webp|png|jpg|jpeg|avif|svg|woff2?|css)$/.test(u.pathname)?u.pathname:null;
 }catch{return null;}
}
function attrs(value:unknown,origin:string){const a=obj(value),out:Record<string,string>={};
 for(const k of ['class','id','role','type','rel'])if(typeof a[k]==='string'&&/^[a-zA-Z0-9_:\s-]{0,180}$/.test(a[k]))out[k]=a[k] as string;
 for(const k of ['width','height','rr_width','rr_height','rr_scrollTop','rr_scrollLeft','rr_mediaCurrentTime'])if(typeof a[k]==='string'&&/^\d{1,7}(\.\d{1,3})?(px|%)?$/.test(a[k]))out[k]=a[k] as string;
 for(const k of ['src','href']){const asset=publicReplayAsset(a[k],origin);if(asset)out[k]=asset;}
 return out;
}
export function sanitizeReplayEvent(input:unknown,origin:string):Record<string,unknown>|null{
 const e=obj(input),type=n(e.type,0,6),timestamp=n(e.timestamp,0,1e14),d=obj(e.data);if(type===null||timestamp===null)return null;
 let count=0;
 function node(raw:unknown,depth=0):Record<string,unknown>|null{
  const x=obj(raw),id=n(x.id,0,1e8),t=n(x.type,0,5);if(id===null||t===null||depth>40||++count>6000)return null;
  const base={id,type:t};
  if(t===0)return {...base,childNodes:Array.isArray(x.childNodes)?x.childNodes.map(c=>node(c,depth+1)).filter(Boolean):[]};
  if(t===1)return {...base,name:'html',publicId:'',systemId:''};
  if(t===3)return {...base,textContent:mask(x.textContent)};
  if(t!==2)return null;
  const tag=typeof x.tagName==='string'?x.tagName.toLowerCase():'';
  if(!/^[a-z][a-z0-9-]{0,30}$/.test(tag))return null;
  // No private form state, scripts, frames, inline CSS, canvases or embedded resources.
  if(['script','iframe','object','embed','input','textarea','select','form','style','meta','canvas','link'].includes(tag)){
   if(tag==='link'){const attributes=attrs(x.attributes,origin);return attributes.href?.endsWith('.css')?{...base,tagName:'link',attributes:{rel:'stylesheet',href:attributes.href},childNodes:[]}:null;}
   return {...base,tagName:'div',attributes:{class:'replay-private'},childNodes:[]};
  }
  return {...base,tagName:tag,attributes:attrs(x.attributes,origin),childNodes:Array.isArray(x.childNodes)?x.childNodes.map(c=>node(c,depth+1)).filter(Boolean):[],...(x.isSVG===true?{isSVG:true}:{})};
 }
 if(type===0||type===1)return {type,timestamp,data:{}};
 if(type===4){const page=publicReplayPage(String(d.href||''),origin);return page?{type,timestamp,data:{href:origin+page,width:n(d.width,200,4000)||390,height:n(d.height,200,4000)||844}}:null;}
 if(type===2){const root=node(d.node);return root?{type,timestamp,data:{node:root,initialOffset:{left:n(obj(d.initialOffset).left,0,100000)||0,top:n(obj(d.initialOffset).top,0,100000)||0}}}:null;}
 if(type!==3)return null;
 const source=n(d.source,0,16);if(source===null)return null;
 if(source===0){return {type,timestamp,data:{source,texts:Array.isArray(d.texts)?d.texts.slice(0,1000).map(raw=>{const x=obj(raw);return{id:n(x.id,0,1e8),value:mask(x.value)};}).filter(x=>x.id!==null):[],attributes:Array.isArray(d.attributes)?d.attributes.slice(0,1000).map(raw=>{const x=obj(raw);return{id:n(x.id,0,1e8),attributes:attrs(x.attributes,origin)};}).filter(x=>x.id!==null):[],removes:Array.isArray(d.removes)?d.removes.slice(0,1000).map(raw=>{const x=obj(raw);return{parentId:n(x.parentId,0,1e8),id:n(x.id,0,1e8)};}).filter(x=>x.id!==null&&x.parentId!==null):[],adds:Array.isArray(d.adds)?d.adds.slice(0,1000).map(raw=>{const x=obj(raw);return{parentId:n(x.parentId,0,1e8),nextId:n(x.nextId,0,1e8),node:node(x.node)};}).filter(x=>x.parentId!==null&&x.node):[]}};}
 if(source===1||source===6||source===12)return{type,timestamp,data:{source,positions:Array.isArray(d.positions)?d.positions.slice(0,100).map(raw=>{const x=obj(raw);return{x:n(x.x),y:n(x.y),id:n(x.id,0,1e8),timeOffset:n(x.timeOffset)};}).filter(p=>p.x!==null&&p.y!==null&&p.id!==null&&p.timeOffset!==null):[]}};
 if(source===2||source===3||source===4){const data:Record<string,unknown>={source};for(const k of ['id','type','x','y','width','height']){const value=n(d[k]);if(value!==null)data[k]=value;}return{type,timestamp,data};}
 // Input, logs, font payloads, canvas, plugin/custom events and CSS mutations are not retained.
 return null;
}
export type HeatPoint={x:number;y:number;docHeight:number;width:number;height:number};
export function heatPoint(raw:unknown):HeatPoint|null{const p=obj(raw);const x=n(p.x,0,4000),y=n(p.y,0,100000),docHeight=n(p.docHeight,200,100000),width=n(p.width,200,4000),height=n(p.height,200,4000);return x!==null&&y!==null&&docHeight!==null&&width!==null&&height!==null&&x<=width&&y<=docHeight?{x,y,docHeight,width,height}:null;}
