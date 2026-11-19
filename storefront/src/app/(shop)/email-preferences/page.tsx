import type {Metadata} from 'next';
import Link from 'next/link';
import {preferenceEmail} from '@/lib/customer-security';
export const metadata:Metadata={title:'Email preferences',robots:{index:false,follow:false}};
export default async function Preferences({searchParams}:{searchParams:Promise<{token?:string;confirmed?:string;unsubscribed?:string;error?:string}>}) {
 const params=await searchParams;let valid=false;try{if(params.token){preferenceEmail(params.token);valid=true;}}catch{}
 return <section className="section"><div className="container" style={{maxWidth:600}}><h1>Email preferences</h1>{params.error?<p role="alert">That confirmation link is expired or was already used. Request a new signup email from the homepage.</p>:params.confirmed?<p className="lead" role="status">You’re on the list. Look out for new colors and drops.</p>:params.unsubscribed?<p className="lead" role="status">You’re unsubscribed from Bogey Baby marketing emails.</p>:valid?<><p>Choose unsubscribe to stop marketing emails. Order and support messages are separate.</p><form method="post" action="/api/email-preferences/unsubscribe"><input type="hidden" name="token" value={params.token}/><button className="btn">Unsubscribe</button></form></>:<p>Use the preference link in your Bogey Baby email.</p>}<p style={{marginTop:24}}><Link className="link" href="/">Back to Bogey Baby</Link></p></div></section>;
}
