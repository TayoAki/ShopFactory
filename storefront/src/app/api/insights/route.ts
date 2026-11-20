import {requireCustomerAdmin} from '@/lib/customer-admin';
import {customerFailure} from '@/lib/customer-security';
import {growthSnapshot} from '@/lib/growth';
import {insightsTraffic} from '@/lib/growth-providers';
import {insightsRecordings} from '@/lib/insights';
export const dynamic='force-dynamic';
export async function GET(request:Request){try{
 await requireCustomerAdmin();const url=new URL(request.url),days=[0,7,28].includes(Number(url.searchParams.get('days')))?Number(url.searchParams.get('days')):7;
 const growth=await growthSnapshot(days);const results=await Promise.allSettled([insightsRecordings(url.searchParams.get('qa')==='1'),growth.analytics?insightsTraffic(growth.analytics.start,growth.analytics.end):Promise.resolve(null)]);
 return Response.json({analytics:growth.analytics,finance:growth.finance,budget:growth.budget,costTotals:growth.costTotals,sources:growth.sources,days,replay:results[0].status==='fulfilled'?results[0].value:null,traffic:results[1].status==='fulfilled'?results[1].value:null,recordingEnabled:process.env.INSIGHTS_ENABLED==='true',refreshed:new Date().toISOString()},{headers:{'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'}});
 }catch(e){return customerFailure(e);}}
