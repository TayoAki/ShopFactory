import type {Metadata} from 'next';
import {cookies} from 'next/headers';
import {cookieNames,session} from '@/lib/customer-security';
import GrowthDashboard from './dashboard';
import './growth.css';
export const metadata:Metadata={title:'Growth scorecard',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function GrowthPage(){
 const jar=await cookies();const admin=await session(jar.get(cookieNames.admin)?.value,'admin');
 if(!admin)return <main id="main" className="growth-login"><a href="/">Bogey Baby</a><p className="g-eyebrow">PRIVATE CLUBHOUSE</p><h1>Growth scorecard</h1><p>Sign in with your customer-care admin key.</p><form action="/api/customer-care/login" method="post"><input type="hidden" name="next" value="/growth"/><label>Admin access key<input name="key" type="password" autoComplete="current-password" required maxLength={128}/></label><button>Enter the clubhouse</button></form><p className="g-muted">Store data and growth missions are available to staff only.</p></main>;
 return <GrowthDashboard/>;
}
