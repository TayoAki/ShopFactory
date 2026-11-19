import {requireOrigin,rateLimit,clientKey,customerFailure,CustomerError,body} from '@/lib/customer-security';
import {customReady,prepareDesign,recipientInput,designAccess,customDatabase,discardUnpaidDesign} from '@/lib/custom-hats';
import {logoArtwork,nameArtwork,customName} from '@/lib/custom-artwork';
export const runtime='nodejs';
export async function POST(request:Request){try{
 requireOrigin(request);if(!customReady())throw new CustomerError('Custom ordering is not available yet.',503);await rateLimit('custom-design:'+clientKey(request),5);await rateLimit('custom-design:global',60);
 const reader=request.body?.getReader();if(!reader)throw new CustomerError('Please complete your design.');const chunks:Uint8Array[]=[];let size=0;
 while(true){const r=await reader.read();if(r.done)break;size+=r.value.byteLength;if(size>5*1024*1024){await reader.cancel();throw new CustomerError('Upload a PNG or JPG up to 4 MB.',413);}chunks.push(r.value);}
 const form=await new Request(request.url,{method:'POST',headers:{'Content-Type':request.headers.get('content-type')||''},body:Buffer.concat(chunks)}).formData();
 if(form.get('rights')!=='yes')throw new CustomerError('Confirm that you have permission to use this artwork.');const kind=form.get('kind');if(kind!=='name'&&kind!=='logo')throw new CustomerError('Choose a name or logo.');
 const file=form.get('logo');const label=kind==='name'?customName(form.get('name')):'Customer logo';const artwork=kind==='name'?await nameArtwork(label,String(form.get('thread'))):file instanceof File?await logoArtwork(file):null;if(!artwork)throw new CustomerError('Upload your logo.');
 const result=await prepareDesign({artwork,kind,label,variantId:Number(form.get('variantId')),quantity:Number(form.get('quantity')),recipient:recipientInput(Object.fromEntries(form))});return Response.json(result,{headers:{'Cache-Control':'no-store','Referrer-Policy':'no-referrer'}});
 }catch(e){return customerFailure(e);}}

export async function DELETE(request:Request){try{requireOrigin(request);const input=await body(request);const row=await designAccess(String(input.id),input.token);if(row.session_id)throw new CustomerError('A checkout already exists for this design.',409);await discardUnpaidDesign(row.id);return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});}catch(e){return customerFailure(e);}}
