import type {PoolClient} from 'pg';
import {customDatabase,assertCustomBudget,cleanupUnpaidDesigns} from './custom-hats';
import {stripeClient,recordPaidSession} from './payments';
import {customProvider,shopPath,type PrivateProduct} from './custom-provider';
import {FulfillmentError,type PrintifyOrder} from './printify';
type CustomBasket={customDesignId:string;artworkHash:string;lines:{printifyProductId?:string;printifyVariantId?:number;qty:number}[]};
export async function validateCustomBasket(sessionId:string,basket:CustomBasket,db:PoolClient){await customDatabase();const row=(await db.query('SELECT * FROM bogey_custom.designs WHERE id=$1 AND session_id=$2',[basket.customDesignId,sessionId])).rows[0];
 if(!row||row.artwork_hash!==basket.artworkHash||!row.approved_at||basket.lines.length!==1||basket.lines[0].printifyProductId!==row.provider_product_id||basket.lines[0].printifyVariantId!==row.variant_id||basket.lines[0].qty!==row.quantity)throw new FulfillmentError('custom_artwork_not_approved');
 const product=await customProvider<PrivateProduct>(shopPath()+`/products/${row.provider_product_id}.json`);
 if(product.visible!==false||product.blueprint_id!==6597||product.print_provider_id!==99||!product.variants.some(v=>v.id===row.variant_id&&v.is_available)||!product.print_areas.some(a=>a.variant_ids.includes(row.variant_id)&&a.placeholders.some(p=>p.position==='front_embroidery'&&p.images.length===1&&p.images[0].id===row.provider_upload_id)))throw new FulfillmentError('custom_product_changed');
}
export async function guardCustomProduction(sessionId:string,order:PrintifyOrder,client:PoolClient){
 const row=(await client.query('SELECT * FROM bogey_custom.designs WHERE session_id=$1',[sessionId])).rows[0];const lines=order.line_items;
 if(!row||!lines||lines.length!==1||lines[0].product_id!==row.provider_product_id||lines[0].variant_id!==row.variant_id||lines[0].quantity!==row.quantity||!Number.isSafeInteger(lines[0].cost)||lines[0].cost!<0||!Number.isSafeInteger(order.total_shipping)||order.total_shipping!<0||!Number.isSafeInteger(order.total_tax)||order.total_tax!<0)throw new FulfillmentError('custom_supplier_cost_unavailable');
 const total=lines[0].cost!*row.quantity+order.total_shipping!+order.total_tax!;if(total>row.ceiling)throw new FulfillmentError('custom_supplier_cost_changed');
 await client.query('BEGIN');try{await client.query("SELECT pg_advisory_xact_lock(hashtextextended('bogey-custom-budget',0))");const month=(await client.query("SELECT to_char(now() AT TIME ZONE 'America/New_York','YYYY-MM') AS month")).rows[0].month;if(row.budget_month!==month){await assertCustomBudget(client,row.ceiling);await client.query('UPDATE bogey_custom.designs SET budget_month=$2 WHERE id=$1',[row.id,month]);}else await assertCustomBudget(client,0);await client.query('COMMIT');}catch(e){await client.query('ROLLBACK');throw e;}
}
export async function completeCustomOrder(sessionId:string,providerId:string,db:PoolClient){await customDatabase();await db.query("UPDATE bogey_custom.designs SET provider_order_id=$2,status='submitted_to_printify',last_error=NULL,updated_at=now() WHERE session_id=$1",[sessionId,providerId]);}
export async function expireCustomCheckouts(){
 if(process.env.CUSTOM_HATS_ENABLED!=='true')return;await cleanupUnpaidDesigns();const db=await customDatabase();const rows=(await db.query("SELECT id,session_id FROM bogey_custom.designs WHERE status='checkout' AND expires_at<now() ORDER BY expires_at LIMIT 5")).rows;
 for(const row of rows){try{const session=await stripeClient().checkout.sessions.retrieve(row.session_id);if(session.payment_status==='paid')await recordPaidSession(session.id);else if(session.status==='expired')await db.query("UPDATE bogey_custom.designs SET status='expired' WHERE id=$1",[row.id]);}catch{console.warn('Custom checkout expiry check deferred');}}
}
