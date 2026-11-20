import type {Metadata} from 'next';
import {cookies} from 'next/headers';
import {cookieNames,session} from '@/lib/customer-security';
import InsightsDashboard from './dashboard';
import '../growth/growth.css';
import './insights.css';
import 'rrweb/dist/style.css';
export const metadata:Metadata={title:'Bogey Baby Insights',robots:{index:false,follow:false}};
export const dynamic='force-dynamic';
export default async function InsightsPage(){
 const jar=await cookies();if(!await session(jar.get(cookieNames.admin)?.value,'admin'))return <main id="main" className="growth-login"><a href="/">Bogey Baby</a><h1>Store Insights</h1><p>Private analytics. Sign in with your customer-care admin key.</p><form action="/api/customer-care/login" method="post"><input name="next" type="hidden" value="/insights"/><label>Admin access key<input name="key" type="password" autoComplete="current-password" required maxLength={128}/></label><button>Open Insights</button></form></main>;
 return <InsightsDashboard/>;
}
