import {test} from 'node:test';
import assert from 'node:assert/strict';
import {analyticsAllowed,readConsent,saveConsent,consentKey} from './consent';
test('optional measurement requires a current affirmative choice and honors privacy signals',()=>{
 const originalWindow=Object.getOwnPropertyDescriptor(globalThis,'window');const originalNavigator=Object.getOwnPropertyDescriptor(globalThis,'navigator');const originalLocal=Object.getOwnPropertyDescriptor(globalThis,'localStorage');const originalSession=Object.getOwnPropertyDescriptor(globalThis,'sessionStorage');
 const data=new Map<string,string>();const store={getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>data.set(k,v),removeItem:(k:string)=>data.delete(k)};const browser={dispatchEvent:()=>true};const privacy={globalPrivacyControl:false,doNotTrack:'0'};
 try{
  Object.defineProperty(globalThis,'window',{value:browser,configurable:true});Object.defineProperty(globalThis,'navigator',{value:privacy,configurable:true});Object.defineProperty(globalThis,'localStorage',{value:store,configurable:true});Object.defineProperty(globalThis,'sessionStorage',{value:store,configurable:true});
  assert.equal(readConsent(),null);assert.equal(analyticsAllowed(),false);
  saveConsent(true);assert.equal(analyticsAllowed(),true);
  privacy.globalPrivacyControl=true;assert.equal(analyticsAllowed(),false);privacy.globalPrivacyControl=false;
  privacy.doNotTrack='1';assert.equal(analyticsAllowed(),false);privacy.doNotTrack='0';
  data.set('bb_campaign_v1','sensitive attribution');saveConsent(false);assert.equal(analyticsAllowed(),false);assert.equal(data.has('bb_campaign_v1'),false);
  data.set(consentKey,JSON.stringify({analytics:true,at:Date.now()-181*86400000}));assert.equal(analyticsAllowed(),false);
  data.set(consentKey,'malformed');assert.equal(analyticsAllowed(),false);
 }finally{
  for(const [key,value]of [['window',originalWindow],['navigator',originalNavigator],['localStorage',originalLocal],['sessionStorage',originalSession]]as const){if(value)Object.defineProperty(globalThis,key,value);else Reflect.deleteProperty(globalThis,key);}
 }
});
