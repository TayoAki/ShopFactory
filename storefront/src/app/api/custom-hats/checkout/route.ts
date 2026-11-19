import {requireOrigin,body,customerFailure,CustomerError,rateLimit,clientKey} from '@/lib/customer-security';
import {customCheckout,cancelCustomCheckout} from '@/lib/custom-hats';
export const runtime='nodejs';
export async function POST(request:Request){try{requireOrigin(request);await rateLimit('custom-checkout:'+clientKey(request),15);const input=await body(request);if(input.approved!==true)throw new CustomerError('Approve the artwork and personalization details before checkout.');return Response.json({url:await customCheckout(String(input.id),String(input.token),String(input.artworkHash),input.attribution,input.attributionOptOut===true||request.headers.get('dnt')==='1'||request.headers.get('sec-gpc')==='1')},{headers:{'Cache-Control':'no-store'}});}catch(e){return customerFailure(e);}}

export async function DELETE(request:Request){try{requireOrigin(request);const input=await body(request);await cancelCustomCheckout(String(input.id),String(input.token));return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});}catch(e){return customerFailure(e);}}
