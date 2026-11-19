/** Campaign tags only: no customer identifiers, click IDs, cookies or cross-site tracking. */
export const campaignKeys=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'] as const;
type CampaignKey=typeof campaignKeys[number];
export type CampaignTouch=Partial<Record<CampaignKey,string>>&{at:string};
export type CampaignAttribution={first:CampaignTouch;last:CampaignTouch};
const storageKey='bb_campaign_v1';const maxAge=24*60*60*1000;
function touch(value:unknown,now:number):CampaignTouch|null{
 if(!value||typeof value!=='object'||Array.isArray(value))return null;
 const input=value as Record<string,unknown>;const time=typeof input.at==='string'?Date.parse(input.at):NaN;
 if(!Number.isFinite(time)||time>now+60000||now-time>maxAge)return null;
 const result:CampaignTouch={at:new Date(time).toISOString()};
 for(const key of campaignKeys){const tag=input[key];if(typeof tag==='string'&&/^[a-z0-9 ._+~-]{1,100}$/i.test(tag))result[key]=tag.trim();}
 return campaignKeys.some(k=>!!result[k])?result:null;
}
export function validateAttribution(value:unknown,optOut=false,now=Date.now()):CampaignAttribution|null{
 if(optOut||!value||typeof value!=='object'||Array.isArray(value))return null;
 const input=value as Record<string,unknown>;const first=touch(input.first,now),last=touch(input.last,now);
 if(!first||!last||Date.parse(first.at)>Date.parse(last.at))return null;
 return {first,last};
}
export function captureCampaign():CampaignAttribution|null{
 if(typeof window==='undefined')return null;
 try{
  if(navigator.doNotTrack==='1'||navigator.globalPrivacyControl){sessionStorage.removeItem(storageKey);return null;}
  const now=Date.now();const old=validateAttribution(JSON.parse(sessionStorage.getItem(storageKey)||'null'),false,now);
  const query=new URLSearchParams(window.location.search);const incoming:Record<string,string>={at:new Date(now).toISOString()};
  for(const key of campaignKeys){const value=query.get(key);if(value)incoming[key]=value;}
  const latest=touch(incoming,now);if(!latest)return old;
  const result={first:old?.first||latest,last:latest};sessionStorage.setItem(storageKey,JSON.stringify(result));return result;
 }catch{return null;}
}
export function campaignMetadata(value:CampaignAttribution|null){return value?{bb_attribution:'campaign',bb_source:value.last.utm_source||'unknown',bb_medium:value.last.utm_medium||'unknown',bb_campaign:value.last.utm_campaign||'unknown'}:{bb_attribution:'unknown',bb_source:'unknown',bb_medium:'unknown',bb_campaign:'unknown'};}
