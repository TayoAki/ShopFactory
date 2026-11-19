import type {PoolClient} from 'pg';
import {validateAttribution,campaignMetadata} from './campaign-attribution';
import {createHash,randomUUID,randomBytes} from 'node:crypto';
import {paymentDatabase,basketHash,stripeClient,checkoutMode} from './payments';
import {CustomerError,safeEqual,customerOrigin,encrypt,decrypt} from './customer-security';
import {customPrice,customProvider,supplierCeiling,verifiedRopeVariant,ropeConfig,shopPath,shippingQuote,createPrivateProduct,type PrivateProduct,deletePrivateProduct} from './custom-provider';
export const customReady=()=>process.env.CUSTOM_HATS_ENABLED==='true'&&!!process.env.PRINTIFY_API_TOKEN&&!!process.env.PRINTIFY_SHOP_ID&&!!ropeConfig();
let schema:Promise<unknown>|undefined;
export async function customDatabase(){const db=await paymentDatabase();schema||=db.query(`CREATE SCHEMA IF NOT EXISTS bogey_custom;
 CREATE TABLE IF NOT EXISTS bogey_custom.designs(id uuid PRIMARY KEY,token_hash text NOT NULL,artwork bytea NOT NULL,artwork_hash text NOT NULL,kind text NOT NULL,label text NOT NULL,variant_id integer NOT NULL,color text NOT NULL,quantity integer NOT NULL,payload jsonb,price integer,shipping integer,ceiling integer,costs jsonb,status text NOT NULL DEFAULT 'preparing',session_id text UNIQUE,provider_order_id text UNIQUE,provider_product_id text UNIQUE,provider_upload_id text,mockup bytea,created_at timestamptz NOT NULL DEFAULT now(),expires_at timestamptz NOT NULL DEFAULT now()+interval '60 minutes',approved_at timestamptz,last_error text,actual_cost integer,budget_month text NOT NULL DEFAULT to_char(now() AT TIME ZONE 'America/New_York','YYYY-MM'),updated_at timestamptz NOT NULL DEFAULT now());

 ALTER TABLE bogey_custom.designs ADD COLUMN IF NOT EXISTS provider_product_id text,ADD COLUMN IF NOT EXISTS provider_upload_id text,ADD COLUMN IF NOT EXISTS provider_order_id text,ADD COLUMN IF NOT EXISTS mockup bytea,ADD COLUMN IF NOT EXISTS stripe_customer_id text;
 `).catch(e=>{schema=undefined;throw e;});await schema;return db;}
export function digest(value:string|Buffer){return createHash('sha256').update(value).digest('hex');}
export async function designAccess(id:string,token:unknown,database?:PoolClient){
 if(!/^[0-9a-f-]{36}$/i.test(id)||typeof token!=='string'||token.length!==43)throw new CustomerError('This design link is not valid.',404);
 const db=database||await customDatabase();const row=(await db.query('SELECT * FROM bogey_custom.designs WHERE id=$1',[id])).rows[0];
 if(!row||!safeEqual(row.token_hash,digest(token)))throw new CustomerError('This design link is not valid.',404);return row;
}
export function recipientInput(input:Record<string,unknown>){
 const take=(key:string,max:number)=>{const v=String(input[key]||'').trim();if(!v||v.length>max||/[\x00-\x1f]/.test(v))throw new CustomerError('Please complete your US shipping address.');return v;};
 const state=take('state',2).toUpperCase(),zip=take('zip',10);if(!/^[A-Z]{2}$/.test(state)||!/^\d{5}(-\d{4})?$/.test(zip))throw new CustomerError('Please check the state and ZIP code.');
 return {name:take('recipientName',100),address1:take('address',150),city:take('city',100),state_code:state,zip,country_code:'US'};
}
export async function prepareDesign(input:{artwork:Buffer;kind:string;label:string;variantId:number;quantity:number;recipient:ReturnType<typeof recipientInput>}){
 if(!customReady())throw new CustomerError('Custom ordering is not available yet. Please check back shortly.',503);
 if(!Number.isInteger(input.quantity)||input.quantity<1||input.quantity>6)throw new CustomerError('Choose one to six hats with the same design.');
 const {config}=await verifiedRopeVariant(input.variantId);const color=config.variants.find(v=>v.id===input.variantId)!;
 const db=await customDatabase();
 await cleanupUnpaidDesigns();
 const usage=(await db.query("SELECT count(*)::int AS n,COALESCE(sum(octet_length(artwork)+COALESCE(octet_length(mockup),0)),0)::bigint AS bytes FROM bogey_custom.designs WHERE status IN ('preparing','quoted','abandoned','expired')")).rows[0];
 if(usage.n>=200||Number(usage.bytes)>128*1024*1024)throw new CustomerError('Custom ordering is busy. Please try again later.',503);
 const id=randomUUID(),token=randomBytes(32).toString('base64url'),hash=digest(input.artwork);const previewUrl=`${customerOrigin()}/api/custom-hats/artwork/${id}?token=${token}`;
 await db.query('INSERT INTO bogey_custom.designs(id,token_hash,artwork,artwork_hash,kind,label,variant_id,color,quantity) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)',[id,digest(token),input.artwork,hash,input.kind,input.label,input.variantId,color.color,input.quantity]);
 try{
  const uploaded=await customProvider<{id:string}>('/uploads/images.json','POST',{file_name:'design-'+id+'.png',contents:input.artwork.toString('base64')});
  await db.query('UPDATE bogey_custom.designs SET provider_upload_id=$2 WHERE id=$1',[id,uploaded.id]);
  const product=await createPrivateProduct(id,uploaded.id,input.variantId);
  await db.query('UPDATE bogey_custom.designs SET provider_product_id=$2 WHERE id=$1',[id,product.id]);
  if(product.visible!==false)throw new CustomerError('Your design could not be prepared privately. Please contact us.',503);
  const variant=product.variants.find(v=>v.id===input.variantId);if(!variant?.is_available||!Number.isSafeInteger(variant.cost)||variant.cost<=0)throw new CustomerError('This cap is not available. Please choose another color.');
  const [first_name,...last]=input.recipient.name.split(/\s+/);const address={first_name,last_name:last.join(' '),email:'hello@bogeybaby.com',country:'US',region:input.recipient.state_code,address1:input.recipient.address1,city:input.recipient.city,zip:input.recipient.zip};
  const shipping=await shippingQuote(product.id,input.variantId,input.quantity,address);const production=variant.cost*input.quantity;const taxReserve=Math.ceil((production+shipping)*.1);const costs={production,shipping,taxReserve,total:production+shipping+taxReserve};const ceiling=supplierCeiling(costs);const price=customPrice(ceiling,input.quantity);
  const payload={productId:product.id,uploadId:uploaded.id,variantId:input.variantId,quantity:input.quantity,artworkHash:hash,recipientEncrypted:encrypt(input.recipient)};
  const mockup=product.images?.find(image=>image.variant_ids.includes(input.variantId)&&image.position==='front');
  if(mockup){try{const url=new URL(mockup.src);if(url.protocol==='https:'&&url.hostname==='images-api.printify.com'){url.searchParams.set('size','900');const response=await fetch(url,{headers:{'User-Agent':'BogeyBaby-Custom'},signal:AbortSignal.timeout(15000),redirect:'error'});if(response.ok){const reader=response.body?.getReader();const parts:Uint8Array[]=[];let bytes=0;if(reader){while(true){const r=await reader.read();if(r.done)break;bytes+=r.value.length;if(bytes>4*1024*1024){await reader.cancel();throw new Error();}parts.push(r.value);}const sharp=(await import('sharp')).default;const normalized=await sharp(Buffer.concat(parts),{limitInputPixels:16000000}).resize({width:1000,height:1000,fit:'inside'}).png().toBuffer();await db.query('UPDATE bogey_custom.designs SET mockup=$2 WHERE id=$1',[id,normalized]);}}}}catch{/* The immutable artwork proof remains available if a mockup is delayed. */}}
  const client=await db.connect();try{await client.query('BEGIN');await client.query("SELECT pg_advisory_xact_lock(hashtextextended('bogey-custom-budget',0))");await assertCustomBudget(client,ceiling);await client.query("UPDATE bogey_custom.designs SET payload=$2,price=$3,shipping=$4,ceiling=$5,costs=$6,status='quoted' WHERE id=$1",[id,JSON.stringify(payload),price.price,price.shipping,ceiling,JSON.stringify(costs)]);await client.query('COMMIT');}catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
  const storedMockup=(await db.query('SELECT mockup IS NOT NULL AS ready FROM bogey_custom.designs WHERE id=$1',[id])).rows[0].ready;
  return {id,token,previewUrl,mockupUrl:storedMockup?previewUrl+'&view=mockup':null,artworkHash:hash,color:color.color,quantity:input.quantity,unitPrice:price.price,shipping:price.shipping,subtotal:price.subtotal,expiresAt:new Date(Date.now()+50*60000).toISOString()};
 }catch(error){try{await discardUnpaidDesign(id);}catch{await db.query("UPDATE bogey_custom.designs SET status='abandoned',expires_at=now() WHERE id=$1 AND session_id IS NULL",[id]);}throw error;}
}
// Known growth expenses plus at least $125 infrastructure headroom and our own supplier reservations.
export async function customBudgetState(db:{query:(text:string,values?:unknown[])=>Promise<{rows:Record<string,number>[]} >}){
 const result=(await db.query(`WITH m AS(SELECT to_char(now() AT TIME ZONE 'America/New_York','YYYY-MM') AS month), b AS(SELECT LEAST(COALESCE((SELECT cap_cents FROM bogey_growth.budgets,m WHERE budgets.month=m.month),45000),45000) AS cap),e AS(SELECT COALESCE(sum(cents)FILTER(WHERE state IN('actual','committed')),0) AS spend,COALESCE(sum(cents)FILTER(WHERE state IN('actual','committed') AND category='Software'),0) AS software FROM bogey_growth.expenses,m WHERE expenses.month=m.month),r AS(SELECT COALESCE(sum(COALESCE(actual_cost,ceiling)),0) AS reserved FROM bogey_custom.designs WHERE (session_id IS NOT NULL OR(status='quoted' AND expires_at>now())) AND status NOT IN('expired','canceled','refunded') AND budget_month=(SELECT month FROM m)) SELECT b.cap-e.spend-GREATEST(0,12500-e.software)-r.reserved AS remaining,r.reserved AS supplier_reservations,GREATEST(0,12500-e.software) AS software_headroom FROM b,e,r`)).rows[0];
 return result;
}
export async function assertCustomBudget(db:{query:(text:string,values?:unknown[])=>Promise<{rows:Record<string,number>[]} >},additional=0){
 const result=await customBudgetState(db);
 if(!result||Number(result.remaining)<additional)throw new CustomerError('Custom orders are at capacity for this month. Please contact us before ordering.',409);
}

async function customCheckoutLocked(db:PoolClient,id:string,token:string,approvedHash:string,attribution:unknown=null,optOut=false){
 if(!customReady())throw new CustomerError('Custom ordering is not available yet.',503);const row=await designAccess(id,token,db);
 if(!safeEqual(row.artwork_hash,approvedHash))throw new CustomerError('Please approve the current artwork preview.');
 const mode=checkoutMode();if(!['live','test'].includes(mode)||!process.env.STRIPE_WEBHOOK_SECRET||(/^(sk|rk)_live_/.test(process.env.STRIPE_SECRET_KEY||''))!==(mode==='live'))throw new CustomerError('Checkout is unavailable.',503);
 const stripe=stripeClient();if(row.session_id){const existing=await stripe.checkout.sessions.retrieve(row.session_id);if(existing.status==='open'&&existing.url)return existing.url;throw new CustomerError('This checkout has ended. Start a new design.');}
 if(row.status!=='quoted'||new Date(row.expires_at).getTime()<Date.now()+31*60000)throw new CustomerError('This quote has expired. Please prepare your design again.');
 await verifiedRopeVariant(row.variant_id);const settings=await stripe.tax.settings.retrieve();if(settings.status!=='active'||!(settings.defaults.tax_code||process.env.STRIPE_PRODUCT_TAX_CODE))throw new CustomerError('Checkout is unavailable.',503);
 await db.query("SELECT pg_advisory_xact_lock(hashtextextended('bogey-custom-budget',0))");await assertCustomBudget(db,0);
 const basket={lines:[{handle:'custom-rope-cap',color:row.color,qty:row.quantity,title:'Your custom rope hat',colorName:row.color,unitAmount:row.price,printifyProductId:row.provider_product_id,printifyVariantId:row.variant_id}],count:row.quantity,subtotal:row.price*row.quantity,discount:0,shipping:row.shipping,fulfillmentProvider:'printify',customDesignId:id,artworkHash:row.artwork_hash};
 const hash=basketHash(basket);await db.query('INSERT INTO bogey_checkout.attempts(id,basket_hash,basket,campaign_attribution) VALUES($1,$2,$3,$4) ON CONFLICT DO NOTHING',[id,hash,JSON.stringify(basket),validateAttribution(attribution,optOut)]);
 if(optOut)await db.query('UPDATE bogey_checkout.attempts SET campaign_attribution=NULL WHERE id=$1',[id]);
 const savedAttribution=(await db.query('SELECT campaign_attribution FROM bogey_checkout.attempts WHERE id=$1',[id])).rows[0].campaign_attribution;
 // Reuse this approved quote's address in hosted Checkout. Legacy quotes still collect it there.
 let customerId=row.stripe_customer_id as string|undefined;
 const recipient=row.payload?.recipientEncrypted?decrypt<ReturnType<typeof recipientInput>>(row.payload.recipientEncrypted):undefined;
 if(recipient&&!customerId){
  const customer=await stripe.customers.create({name:recipient.name,shipping:{name:recipient.name,address:{line1:recipient.address1,city:recipient.city,state:recipient.state_code,postal_code:recipient.zip,country:'US'}},metadata:{bogey_custom_design:id}},{idempotencyKey:'custom-address-'+id});
  customerId=customer.id;await db.query('UPDATE bogey_custom.designs SET stripe_customer_id=$2 WHERE id=$1',[id,customerId]);
 }
 const session=await stripe.checkout.sessions.create({mode:'payment',...(customerId?{customer:customerId,customer_update:{shipping:'auto' as const}}:{}),line_items:[{quantity:row.quantity,price_data:{currency:'usd',unit_amount:row.price,tax_behavior:'exclusive',product_data:{name:'Custom embroidered rope hat / '+row.color,description:'Customer-approved artwork. One front embroidery placement. Same design on all hats.',tax_code:process.env.STRIPE_PRODUCT_TAX_CODE||settings.defaults.tax_code!}}}],automatic_tax:{enabled:true},shipping_address_collection:{allowed_countries:['US']},shipping_options:[{shipping_rate_data:{display_name:row.shipping?'Standard US shipping':'Free standard US shipping',type:'fixed_amount',fixed_amount:{amount:row.shipping,currency:'usd'},tax_behavior:'exclusive'}}],expires_at:Math.floor(new Date(row.expires_at).getTime()/1000),metadata:{bogey_attempt:id,basket_hash:hash,...campaignMetadata(savedAttribution),fulfillment_provider:'printify'},success_url:customerOrigin()+'/order/confirmed?session_id={CHECKOUT_SESSION_ID}',cancel_url:customerOrigin()+'/custom-rope-hats'},{idempotencyKey:'custom-'+id});
 await db.query('UPDATE bogey_checkout.attempts SET session_id=$2 WHERE id=$1',[id,session.id]);await db.query("UPDATE bogey_custom.designs SET session_id=$2,approved_at=now(),status='checkout' WHERE id=$1",[id,session.id]);if(!session.url)throw new CustomerError('Checkout is unavailable.',503);return session.url;
}

async function discardUnpaidDesignLocked(db:PoolClient,id:string){const row=(await db.query('SELECT provider_product_id,provider_upload_id,session_id,status FROM bogey_custom.designs WHERE id=$1',[id])).rows[0];if(!row)return;if(row.session_id&&row.status!=='expired')throw new CustomerError('This design has a checkout in progress.',409);if(row.provider_product_id){try{await deletePrivateProduct(row.provider_product_id);}catch(e){if(!(e instanceof Error)||e.message!=='not_found')throw e;}}if(row.provider_upload_id){try{await customProvider('/uploads/images/'+row.provider_upload_id+'/archive.json','POST',{});}catch{/* Product removal prevents fulfillment; unused upload can be archived later. */}}await db.query('DELETE FROM bogey_custom.designs WHERE id=$1',[id]);}
export async function cleanupUnpaidDesigns(){const db=await customDatabase();const rows=(await db.query("SELECT id FROM bogey_custom.designs WHERE (session_id IS NULL AND expires_at<now()) OR status='expired' ORDER BY created_at LIMIT 2")).rows;for(const row of rows){try{await discardUnpaidDesign(row.id);}catch{/* Keep identifiers so the next run can retry provider cleanup. */}}}
async function cancelCustomCheckoutLocked(db:PoolClient,id:string,token:string){const row=await designAccess(id,token,db);if(row.session_id){const stripe=stripeClient();const session=await stripe.checkout.sessions.retrieve(row.session_id);if(session.payment_status==='paid'||session.status==='complete')throw new CustomerError('This order cannot be canceled here. Please contact us.',409);if(session.status==='open')await stripe.checkout.sessions.expire(row.session_id);else if(session.status!=='expired')throw new CustomerError('Checkout is still processing.',409);await db.query("UPDATE bogey_custom.designs SET status='expired' WHERE id=$1",[id]);}await discardUnpaidDesignLocked(db,id);}

async function withDesignLock<T>(id:string,work:(db:PoolClient)=>Promise<T>){if(!/^[0-9a-f-]{36}$/i.test(id))throw new CustomerError('This design is not valid.',404);const db=await customDatabase(),client=await db.connect();try{await client.query('BEGIN');await client.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))',['custom-design:'+id]);const result=await work(client);await client.query('COMMIT');return result;}catch(error){await client.query('ROLLBACK');throw error;}finally{client.release();}}
export function customCheckout(id:string,token:string,hash:string,attribution:unknown=null,optOut=false){return withDesignLock(id,db=>customCheckoutLocked(db,id,token,hash,attribution,optOut));}
export function discardUnpaidDesign(id:string){return withDesignLock(id,db=>discardUnpaidDesignLocked(db,id));}
export function cancelCustomCheckout(id:string,token:string){return withDesignLock(id,db=>cancelCustomCheckoutLocked(db,id,token));}
