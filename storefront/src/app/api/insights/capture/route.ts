import {cookies} from 'next/headers';
import {requireOrigin,CustomerError,customerFailure,clientKey,rateLimit,session,cookieNames} from '@/lib/customer-security';
import {requireCustomerAdmin} from '@/lib/customer-admin';
import {captureInsights} from '@/lib/insights';
import {replayLimits} from '@/lib/insights-privacy';
export const runtime='nodejs';
export async function POST(request:Request){try{
 requireOrigin(request);if(process.env.INSIGHTS_ENABLED!=='true')return new Response(null,{status:204});
 if(request.headers.get('sec-gpc')==='1'||request.headers.get('dnt')==='1')throw new CustomerError('Optional recording is disabled.',403);
 await rateLimit('insights:'+clientKey(request),200,3600);
 const reader=request.body?.getReader();if(!reader)throw new CustomerError('Empty recording.');let bytes=0;const pieces:Uint8Array[]=[];
 while(true){const r=await reader.read();if(r.done)break;bytes+=r.value.length;if(bytes>replayLimits.bodyBytes){await reader.cancel();throw new CustomerError('Recording batch is too large.',413);}pieces.push(r.value);}
 let input:Record<string,unknown>;try{input=JSON.parse(Buffer.concat(pieces).toString());if(!input||typeof input!=='object'||Array.isArray(input))throw new Error();}catch{throw new CustomerError('Invalid recording.');}
 const jar=await cookies();const staff=!!await session(jar.get(cookieNames.admin)?.value,'admin');
 const qa=staff||input.qa===true;if(input.qa===true&&!staff)await requireCustomerAdmin();
 return Response.json(await captureInsights(input,qa),{headers:{'Cache-Control':'no-store'}});
 }catch(e){return customerFailure(e);}}
