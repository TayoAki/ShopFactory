import Stripe from 'stripe';
import {paymentDatabase} from './payments';
import {customerDatabase} from './customer-db';

let providerSchema:Promise<unknown>|undefined;
export async function providerDatabase(){const db=await customerDatabase();providerSchema ||= db.query(`CREATE SCHEMA IF NOT EXISTS bogey_growth; CREATE TABLE IF NOT EXISTS bogey_growth.provider_state(source text PRIMARY KEY,status text NOT NULL,checked_at timestamptz NOT NULL DEFAULT now(),error text);
CREATE TABLE IF NOT EXISTS bogey_growth.financial_orders(session_id text PRIMARY KEY,paid_at timestamptz NOT NULL,livemode boolean NOT NULL,currency text NOT NULL,amount integer NOT NULL,merchandise integer NOT NULL,shipping integer NOT NULL,tax integer NOT NULL,refund integer NOT NULL,refund_ex_tax integer NOT NULL,refund_tax_estimated boolean NOT NULL,fees integer,production integer,supplier_shipping integer,supplier_tax integer,provider_status text,disputed boolean NOT NULL DEFAULT false,ledger_present boolean NOT NULL DEFAULT true,updated_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS bogey_growth.provider_cache(key text PRIMARY KEY,payload jsonb NOT NULL,updated_at timestamptz NOT NULL DEFAULT now());`).catch(e=>{providerSchema=undefined;throw e;});await providerSchema;return db;}
const integer=(v:unknown):v is number=>typeof v==='number'&&Number.isSafeInteger(v)&&v>=0;
export type SupplierOrder={line_items?:{quantity:number;cost:number}[];total_shipping?:number;total_tax?:number;status?:string;currency?:string;external_id?:string;metadata?:{shop_order_id?:string;costs_covered?:boolean;child_reprinted_order_ids?:string[]}};
export function supplierCosts(order:SupplierOrder){
 if(order.currency&&order.currency.toLowerCase()!=='usd')throw new Error('supplier_currency');
 if(!order.line_items?.length||!order.line_items.every(l=>integer(l.cost)&&integer(l.quantity)&&l.quantity>0)||!integer(order.total_shipping)||!integer(order.total_tax))return {production:null,shipping:null,tax:null};
 if(order.metadata?.child_reprinted_order_ids?.length)return {production:null,shipping:null,tax:null}; // Replacement charges need reconciliation, never assume free.
 if(order.metadata?.costs_covered)return {production:0,shipping:0,tax:0};
 return {production:order.line_items.reduce((n,l)=>n+l.cost*l.quantity,0),shipping:order.total_shipping,tax:order.total_tax};
}
export function refundExTax(refund:number,total:number,tax:number){if(!integer(refund)||!integer(total)||!integer(tax)||refund>total||tax>total)throw new Error('invalid_refund_totals');return {amount:total?Math.round(refund*(total-tax)/total):0,estimated:refund>0&&refund<total&&tax>0};}
async function printifyRead(id:string){const token=process.env.PRINTIFY_API_TOKEN,shop=process.env.PRINTIFY_SHOP_ID;if(!token||!shop||!/^\d+$/.test(shop))throw new Error('printify_not_configured');const r=await fetch(`https://api.printify.com/v1/shops/${shop}/orders/${encodeURIComponent(id)}.json`,{headers:{Authorization:`Bearer ${token}`,'User-Agent':'BogeyBaby-Growth'},signal:AbortSignal.timeout(12000),cache:'no-store'});if(!r.ok)throw new Error('printify_read_failed');return await r.json() as SupplierOrder;}
async function state(source:string,status:string,error:string|null=null){await (await providerDatabase()).query('INSERT INTO bogey_growth.provider_state(source,status,error) VALUES($1,$2,$3) ON CONFLICT(source) DO UPDATE SET status=excluded.status,error=excluded.error,checked_at=now()',[source,status,error]);}
export async function syncFinancials(){
 const db=await providerDatabase();const client=await db.connect();let locked=false;
 try{locked=(await client.query("SELECT pg_try_advisory_lock(hashtextextended('bogey-growth-finance',0)) AS locked")).rows[0].locked;if(!locked)return {busy:true};
 const stripe=new Stripe(process.env.STRIPE_SECRET_KEY||'',{timeout:12000,maxNetworkRetries:0});const payments=await paymentDatabase();const cutoff=Math.floor(Date.now()/1000)-190*86400;
 // Discover paid storefront sessions missed by a webhook, without creating fulfillment orders.
 let after:string|undefined;let exhausted=false;let discovered=0;
 for(let page=0;page<10;page++){
  const list=await stripe.checkout.sessions.list({limit:100,created:{gte:cutoff},...(after?{starting_after:after}:{})});
  for(const session of list.data){if(!session.livemode||session.payment_status!=='paid'||!session.metadata?.bogey_attempt||session.currency!=='usd')continue;
   const present=(await payments.query('SELECT 1 FROM bogey_checkout.orders WHERE session_id=$1',[session.id])).rowCount!==0;
   await db.query(`INSERT INTO bogey_growth.financial_orders(session_id,paid_at,livemode,currency,amount,merchandise,shipping,tax,refund,refund_ex_tax,refund_tax_estimated,ledger_present,updated_at) VALUES($1,to_timestamp($2),true,'usd',$3,$4,$5,$6,0,0,false,$7,'1970-01-01') ON CONFLICT(session_id) DO UPDATE SET ledger_present=excluded.ledger_present`,[session.id,session.created,session.amount_total??0,Math.max(0,(session.amount_subtotal??0)-(session.total_details?.amount_discount??0)),session.shipping_cost?.amount_subtotal??0,session.total_details?.amount_tax??0,present]);discovered++;
  }
  if(!list.has_more){exhausted=true;break;}after=list.data.at(-1)?.id;
 }
 if(!exhausted)throw new Error('stripe_discovery_incomplete');
 // Known ledger rows are also reconciled even if they predate discovery or a prior read failed.
 await db.query(`INSERT INTO bogey_growth.financial_orders(session_id,paid_at,livemode,currency,amount,merchandise,shipping,tax,refund,refund_ex_tax,refund_tax_estimated,updated_at) SELECT session_id,created_at,livemode,currency,amount_total,COALESCE((stripe_session->>'amount_subtotal')::int,0)-COALESCE((stripe_session->'total_details'->>'amount_discount')::int,0),COALESCE((stripe_session->'shipping_cost'->>'amount_subtotal')::int,0),COALESCE((stripe_session->'total_details'->>'amount_tax')::int,0),0,0,false,'1970-01-01' FROM bogey_checkout.orders WHERE livemode AND currency='usd' AND created_at>now()-interval '190 days' ON CONFLICT DO NOTHING`);
 let processed=0,providerFailures=0;
 const rows=(await db.query(`SELECT f.session_id,o.printify_order_id,o.basket FROM bogey_growth.financial_orders f LEFT JOIN bogey_checkout.orders o ON o.session_id=f.session_id WHERE f.livemode AND f.paid_at>now()-interval '190 days' ORDER BY f.updated_at LIMIT 5`)).rows;
 for(const row of rows){
  const session=await stripe.checkout.sessions.retrieve(row.session_id,{expand:['payment_intent.latest_charge.balance_transaction']});
  if(!session.livemode||session.payment_status!=='paid'||session.currency!=='usd')throw new Error('payment_not_verified');
  const intent=session.payment_intent;const charge=intent&&typeof intent!=='string'?intent.latest_charge:null;
  if(!charge||typeof charge==='string')throw new Error('charge_unavailable');
  const balance=charge.balance_transaction;let fees:number|null=balance&&typeof balance!=='string'&&balance.currency==='usd'?balance.fee:null;
  if(charge.amount_refunded>0){let cursor:string|undefined;for(let page=0;page<10;page++){const list=await stripe.refunds.list({charge:charge.id,limit:100,expand:['data.balance_transaction'],...(cursor?{starting_after:cursor}:{})});for(const refund of list.data){if(refund.status!=='succeeded')continue;const b=refund.balance_transaction;if(!b||typeof b==='string'||b.currency!=='usd')fees=null;else if(fees!==null)fees+=b.fee;}if(!list.has_more)break;if(page===9)throw new Error('refunds_incomplete');cursor=list.data.at(-1)?.id;}}
  let production:number|null=null,supplierShipping:number|null=null,supplierTax:number|null=null,providerStatus:string|null=null;
  if(row.printify_order_id){try{const order=await printifyRead(row.printify_order_id);if((order.metadata?.shop_order_id||order.external_id)!==session.id)throw new Error('supplier_reference_mismatch');const costs=supplierCosts(order);production=costs.production;supplierShipping=costs.shipping;supplierTax=costs.tax;providerStatus=order.status??null;if(row.basket?.customDesignId)await db.query('UPDATE bogey_custom.designs SET actual_cost=$2,status=$3,updated_at=now() WHERE session_id=$1',[session.id,production!+supplierShipping!+supplierTax!,providerStatus]);}catch{providerFailures++;}}
  const tax=session.total_details?.amount_tax??0;const refunds=refundExTax(charge.amount_refunded,session.amount_total??0,tax);
  await db.query(`UPDATE bogey_growth.financial_orders SET amount=$2,merchandise=$3,shipping=$4,tax=$5,refund=$6,refund_ex_tax=$7,refund_tax_estimated=$8,fees=$9,production=$10,supplier_shipping=$11,supplier_tax=$12,provider_status=$13,disputed=$14,paid_at=to_timestamp($15),updated_at=now() WHERE session_id=$1`,[session.id,session.amount_total??0,Math.max(0,(session.amount_subtotal??0)-(session.total_details?.amount_discount??0)),session.shipping_cost?.amount_subtotal??0,tax,charge.amount_refunded,refunds.amount,refunds.estimated,fees,production,supplierShipping,supplierTax,providerStatus,charge.disputed,charge.created]);processed++;
 }
 // Probe provider even when there are no paid orders, so empty and disconnected are distinguishable.
 if(!rows.length){const token=process.env.PRINTIFY_API_TOKEN,shop=process.env.PRINTIFY_SHOP_ID;if(token&&shop){const r=await fetch(`https://api.printify.com/v1/shops/${shop}/orders.json?limit=1`,{headers:{Authorization:`Bearer ${token}`,'User-Agent':'BogeyBaby-Growth'},signal:AbortSignal.timeout(12000),cache:'no-store'});if(!r.ok)providerFailures++;}else providerFailures++;}
 await state('stripe','connected');await state('printify',providerFailures?'attention':'connected',providerFailures?'Some supplier costs could not be read.':null);
 return {processed,discovered,providerFailures};
 }catch{await state('stripe','attention','Reconciliation incomplete. Previous figures may be stale.');return {error:'Financial reconciliation needs attention.'};}
 finally{let broken=false;if(locked){try{await client.query("SELECT pg_advisory_unlock(hashtextextended('bogey-growth-finance',0))");}catch{broken=true;}}client.release(broken);}
}

type FunnelStep={type:string;value:string;visitors:number;previous:number;dropped:number;dropoff:number|null};
async function umamiGet(path:string){const host=process.env.NEXT_PUBLIC_UMAMI_URL,key=process.env.UMAMI_API_KEY;if(!host||!key)throw new Error('umami_not_configured');const url=new URL(path,host);if(url.protocol!=='https:'&&process.env.NODE_ENV!=='test')throw new Error('https_required');const r=await fetch(url,{headers:{Authorization:`Bearer ${key}`},cache:'no-store',signal:AbortSignal.timeout(12000)});if(!r.ok)throw new Error('umami_read_failed');return r.json();}
export async function syncAnalytics(days:number,start:number,end:number){const db=await providerDatabase();const website=process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;if(!website)return {error:true};try{const params=new URLSearchParams({startAt:String(start),endAt:String(end-1),timezone:'America/New_York',hostname:'www.bogeybaby.com'});const base=`/api/websites/${encodeURIComponent(website)}`;const stats=await umamiGet(`${base}/stats?${params}`);
 const definitions=[{id:'custom-design',name:'Custom design → checkout handoff (not sales)',events:['custom_design_started','custom_preview_viewed','custom_delivery_started','custom_quote_ready','custom_artwork_approved','custom_checkout_started']},{id:'product',name:'Product page → real purchase',events:['view_item','add_to_cart','begin_checkout','purchase']},{id:'bag',name:'Bag → real purchase (includes quick add)',events:['add_to_cart','begin_checkout','purchase']},{id:'demo',name:'Demo checkout — excluded from sales',events:['view_item','add_to_cart','begin_checkout','demo_checkout_completed']},{id:'test',name:'Test payment — excluded from sales',events:['add_to_cart','begin_checkout','test_purchase']}];
 const funnels=await Promise.all(definitions.map(async definition=>{const q=new URLSearchParams(params);q.set('window','60');q.set('steps',JSON.stringify(definition.events.map(value=>({type:'event',value}))));const data=await umamiGet(`${base}/funnels/stats?${q}`);if(!Array.isArray(data)||data.length!==definition.events.length||data.some(s=>!integer(s.visitors)))throw new Error('invalid_funnel');return {id:definition.id,name:definition.name,steps:data.map((s:FunnelStep)=>({event:s.value,visitors:s.visitors,dropped:s.dropped,dropoff:s.dropoff}))};}));
 const payload={visitors:Number(stats.visitors),pageviews:Number(stats.pageviews),visits:Number(stats.visits),funnels,start,end};if(![payload.visitors,payload.pageviews,payload.visits].every(integer))throw new Error('invalid_stats');
 await db.query('INSERT INTO bogey_growth.provider_cache(key,payload) VALUES($1,$2) ON CONFLICT(key) DO UPDATE SET payload=excluded.payload,updated_at=now()',['analytics:'+days,JSON.stringify(payload)]);await state('umami','connected');return payload;
 }catch{await state('umami','attention','Analytics refresh failed. Previous figures may be stale.');return {error:true};}}
export async function financialSummary(start:number,end:number){const db=await providerDatabase();const result=(await db.query(`SELECT count(*)::int AS orders,COALESCE(sum(merchandise),0)::float8 AS merchandise,COALESCE(sum(refund),0)::float8 AS refunds,COALESCE(sum(refund_ex_tax),0)::float8 AS refunds_ex_tax,COALESCE(sum(fees),0)::float8 AS fees,COALESCE(sum(production),0)::float8 AS production,COALESCE(sum(supplier_shipping),0)::float8 AS supplier_shipping,COALESCE(sum(supplier_tax),0)::float8 AS supplier_tax,COALESCE(sum(amount-tax-refund_ex_tax-COALESCE(fees,0)-COALESCE(production,0)-COALESCE(supplier_shipping,0)-COALESCE(supplier_tax,0)),0)::float8 AS provisional_contribution,count(*) FILTER(WHERE fees IS NULL OR production IS NULL OR supplier_shipping IS NULL OR supplier_tax IS NULL OR disputed OR NOT ledger_present OR updated_at<now()-interval '24 hours')::int AS incomplete,count(*) FILTER(WHERE fees IS NULL)::int AS missing_fees,count(*) FILTER(WHERE production IS NULL OR supplier_shipping IS NULL OR supplier_tax IS NULL)::int AS missing_supplier,count(*) FILTER(WHERE refund_tax_estimated)::int AS estimated_refunds,count(*) FILTER(WHERE NOT ledger_present)::int AS ledger_gaps FROM bogey_growth.financial_orders WHERE livemode AND currency='usd' AND paid_at>=to_timestamp($1/1000.0) AND paid_at<to_timestamp($2/1000.0)`,[start,end])).rows[0];return result as {orders:number;merchandise:number;refunds:number;refunds_ex_tax:number;fees:number;production:number;supplier_shipping:number;supplier_tax:number;provisional_contribution:number;incomplete:number;missing_fees:number;missing_supplier:number;estimated_refunds:number;ledger_gaps:number};}

export async function syncGrowthSources(){
 const financials=await syncFinancials();const db=await providerDatabase();
 const analytics=await Promise.all([0,7,28,90].map(async days=>{const b=(await db.query("SELECT (((now() AT TIME ZONE 'America/New_York')::date-$1::int) AT TIME ZONE 'America/New_York') AS start,CASE WHEN $1::int=0 THEN now() ELSE ((now() AT TIME ZONE 'America/New_York')::date AT TIME ZONE 'America/New_York') END AS finish",[days])).rows[0];const result=await syncAnalytics(days,new Date(b.start).getTime(),new Date(b.finish).getTime());return {days,connected:!('error' in result)};}));
 return {financials,analytics};
}

/** Read-only aggregate metrics for the private Insights view; never return query strings. */
export async function insightsTraffic(start:number,end:number){
 const website=process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;if(!website)return null;
 const base=`/api/websites/${encodeURIComponent(website)}/metrics`;
 const results=await Promise.allSettled(['url','device','browser','referrer'].map(async type=>{
  const q=new URLSearchParams({startAt:String(start),endAt:String(end-1),timezone:'America/New_York',hostname:'www.bogeybaby.com',type,limit:'15'});
  const data=await umamiGet(base+'?'+q);if(!Array.isArray(data))throw new Error();
  return {type,rows:data.map((r:{x?:unknown;y?:unknown})=>{
   let label=typeof r.x==='string'?r.x.slice(0,180):'Unknown';
   if(type==='url'){try{label=new URL(label,'https://www.bogeybaby.com').pathname;}catch{label='Other page';}if(!/^\/[a-z0-9/-]*$/i.test(label)||label.length>100)label='Other page';}
   if(type==='referrer'){try{label=new URL(label.includes('://')?label:'https://'+label).hostname;}catch{label='Direct / unknown';}}
   if(label.includes('@'))label='Other';return {label,count:Number.isSafeInteger(r.y)&&Number(r.y)>=0?Number(r.y):0};
  })};
 }));
 return results.flatMap(r=>r.status==='fulfilled'?[r.value]:[]);
}
