export const consentKey='bb_consent_v2';
export const consentEvent='bb-consent-change';
const maxAge=180*24*60*60*1000;
let memory: {analytics:boolean;at:number}|null=null;
export function readConsent():boolean|null{
 if(typeof window==='undefined')return null;
 let stored:unknown;
 try{stored=localStorage.getItem(consentKey);}catch{stored=memory;}
 try{
  const value=typeof stored==='string'?JSON.parse(stored):stored;
  if(value&&typeof value.analytics==='boolean'&&Number.isFinite(value.at)&&value.at<=Date.now()&&Date.now()-value.at<maxAge)return value.analytics;
 }catch{/* Invalid choices fail closed. */}
 return null;
}
export function analyticsAllowed(){return typeof window!=='undefined'&&!navigator.globalPrivacyControl&&navigator.doNotTrack!=='1'&&readConsent()===true;}
export function saveConsent(analytics:boolean){
 memory={analytics,at:Date.now()};
 try{localStorage.setItem(consentKey,JSON.stringify(memory));}catch{/* Session-only choice if storage is unavailable. */}
 if(!analyticsAllowed()){try{sessionStorage.removeItem('bb_campaign_v1');}catch{}}
 window.dispatchEvent(new Event(consentEvent));
}
