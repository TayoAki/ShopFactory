import { customerDatabase } from './customer-db';
import { paymentDatabase } from './payments';
import { CustomerError } from './customer-security';
import { growthSeed } from './growth-seed';
import {providerDatabase,syncAnalytics,financialSummary,syncGrowthSources} from './growth-providers';
let initialized: Promise<unknown> | undefined;
export async function growthDatabase() {
 const db=await customerDatabase();
 initialized ||= (async()=>{
  await db.query(`CREATE SCHEMA IF NOT EXISTS bogey_growth;
   CREATE TABLE IF NOT EXISTS bogey_growth.tasks(id text PRIMARY KEY,status text NOT NULL DEFAULT 'planned',evidence text NOT NULL DEFAULT '',updated_at timestamptz NOT NULL DEFAULT now(),verified_at timestamptz);
   CREATE TABLE IF NOT EXISTS bogey_growth.activity(id bigserial PRIMARY KEY,task_id text NOT NULL,status text NOT NULL,evidence text NOT NULL,xp_delta integer NOT NULL,created_at timestamptz NOT NULL DEFAULT now());
   CREATE TABLE IF NOT EXISTS bogey_growth.budgets(month text PRIMARY KEY,cap_cents integer NOT NULL CHECK(cap_cents>0 AND cap_cents<50000));
   CREATE TABLE IF NOT EXISTS bogey_growth.expenses(id uuid PRIMARY KEY,month text NOT NULL,label text NOT NULL,category text NOT NULL,cents integer NOT NULL CHECK(cents>0),state text NOT NULL,created_at timestamptz NOT NULL DEFAULT now());
   ALTER TABLE bogey_growth.expenses ADD COLUMN IF NOT EXISTS spent_at timestamptz;
   UPDATE bogey_growth.expenses SET spent_at=created_at WHERE state='actual' AND spent_at IS NULL;
   CREATE TABLE IF NOT EXISTS bogey_growth.experiments(id uuid PRIMARY KEY,title text NOT NULL,hypothesis text NOT NULL,metric text NOT NULL,baseline text NOT NULL,guardrail text NOT NULL,start_date date NOT NULL,end_date date NOT NULL,status text NOT NULL,outcome text NOT NULL,updated_at timestamptz NOT NULL DEFAULT now());`);
  for(const task of growthSeed)await db.query('INSERT INTO bogey_growth.tasks(id) VALUES($1) ON CONFLICT DO NOTHING',[task.id]);
 })().catch(error=>{initialized=undefined;throw error;});
 await initialized;return db;
}
export const taskStatuses=['planned','in progress','needs verification','verified','blocked'];
function bounded(value:unknown,max:number,required=true){if(typeof value!=='string'||value.length>max||(required&&!value.trim()))throw new CustomerError('Please check the fields and try again.');return value.trim();}
function monthValue(value:unknown){const month=bounded(value,7);if(!/^20\d{2}-(0[1-9]|1[0-2])$/.test(month))throw new CustomerError('Choose a valid month.');return month;}
export function centsValue(value:unknown,max=100000000){const raw=bounded(value,12);if(!/^\d+(\.\d{1,2})?$/.test(raw))throw new CustomerError('Enter a positive dollar amount with up to two decimal places.');const cents=Math.round(Number(raw)*100);if(!Number.isSafeInteger(cents)||cents<=0||cents>=max)throw new CustomerError('Check the amount. The monthly cap must be below $500.');return cents;}
export function levelFor(xp:number){return xp>=500?'Building Momentum':xp>=250?'On the Fairway':xp>=100?'Finding Our Swing':'Getting Teed Up';}
export async function mutateGrowth(data:Record<string,unknown>){
 const db=await growthDatabase();
 if(data.action==='sync'){await syncGrowthSources();return;}
 if(data.action==='task'){
  const task=growthSeed.find(t=>t.id===data.id);const status=bounded(data.status,30);const evidence=bounded(data.evidence,1500,false);
  if(!task||!taskStatuses.includes(status))throw new CustomerError('Choose a valid mission and status.');
  if(status==='verified'&&evidence.length<12)throw new CustomerError('Add an evidence note of at least 12 characters before verification.');
  const client=await db.connect();try{await client.query('BEGIN');const old=(await client.query('SELECT status,evidence FROM bogey_growth.tasks WHERE id=$1 FOR UPDATE',[task.id])).rows[0];
   if(old.status!==status||old.evidence!==evidence){const delta=(status==='verified'?task.xp:0)-(old.status==='verified'?task.xp:0);
    await client.query("UPDATE bogey_growth.tasks SET status=$2,evidence=$3,updated_at=now(),verified_at=CASE WHEN $2='verified' THEN COALESCE(verified_at,now()) ELSE NULL END WHERE id=$1",[task.id,status,evidence]);
    await client.query('INSERT INTO bogey_growth.activity(task_id,status,evidence,xp_delta) VALUES($1,$2,$3,$4)',[task.id,status,evidence,delta]);}
   await client.query('COMMIT');}catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
 }else if(data.action==='budget'){
  await db.query('INSERT INTO bogey_growth.budgets(month,cap_cents) VALUES($1,$2) ON CONFLICT(month) DO UPDATE SET cap_cents=excluded.cap_cents',[monthValue(data.month),centsValue(data.amount,50000)]);
 }else if(data.action==='expense'){
  const id=bounded(data.id,36);if(!/^[0-9a-f-]{36}$/i.test(id))throw new CustomerError('Invalid entry.');const state=bounded(data.state,12);if(!['actual','committed'].includes(state))throw new CustomerError('Choose an expense state.');
  await db.query(`INSERT INTO bogey_growth.expenses(id,month,label,category,cents,state,spent_at) VALUES($1,$2,$3,$4,$5,$6,CASE WHEN $6='actual' THEN now() ELSE NULL END) ON CONFLICT(id) DO NOTHING`,[id,monthValue(data.month),bounded(data.label,120),bounded(data.category,60),centsValue(data.amount),state]);
 }else if(data.action==='expense-state'){
  const id=bounded(data.id,36);const state=bounded(data.state,12);if(!/^[0-9a-f-]{36}$/i.test(id)||!['actual','committed','void'].includes(state))throw new CustomerError('Invalid expense update.');
  await db.query(`UPDATE bogey_growth.expenses SET state=$2,spent_at=CASE WHEN $2='actual' THEN COALESCE(spent_at,now()) WHEN $2='committed' THEN NULL ELSE spent_at END WHERE id=$1`,[id,state]);
 }else if(data.action==='experiment'){
  const id=bounded(data.id,36);const status=bounded(data.status,20);const start=bounded(data.start,10),end=bounded(data.end,10);const outcome=bounded(data.outcome,1500,false);
  const validDate=(s:string)=>/^\d{4}-\d{2}-\d{2}$/.test(s)&&!isNaN(Date.parse(s))&&new Date(s).toISOString().slice(0,10)===s;
  if(!/^[0-9a-f-]{36}$/i.test(id)||!['planned','running','complete','paused'].includes(status)||!validDate(start)||!validDate(end)||end<start)throw new CustomerError('Check experiment dates and status.');
  if(status==='complete'&&outcome.length<12)throw new CustomerError('Record the result and decision before completing an experiment.');
  await db.query(`INSERT INTO bogey_growth.experiments(id,title,hypothesis,metric,baseline,guardrail,start_date,end_date,status,outcome) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) ON CONFLICT(id) DO UPDATE SET title=excluded.title,hypothesis=excluded.hypothesis,metric=excluded.metric,baseline=excluded.baseline,guardrail=excluded.guardrail,start_date=excluded.start_date,end_date=excluded.end_date,status=excluded.status,outcome=excluded.outcome,updated_at=now()`,[id,bounded(data.title,120),bounded(data.hypothesis,1000),bounded(data.metric,200),bounded(data.baseline,300),bounded(data.guardrail,500),start,end,status,outcome]);
 }else throw new CustomerError('Unknown dashboard action.');
}
export async function growthSnapshot(days:number){
 const db=await growthDatabase();const timezone='America/New_York';
 // Explicit formatToParts avoids locale-specific month ordering.
 const parts=new Intl.DateTimeFormat('en-US',{timeZone:timezone,year:'numeric',month:'2-digit'}).formatToParts(new Date());
 const localMonth=`${parts.find(p=>p.type==='year')!.value}-${parts.find(p=>p.type==='month')!.value}`;
 const [taskRows,activity,budgets,expenses,experiments,subscribers,support,costTotals,consistency]=await Promise.all([
  db.query('SELECT * FROM bogey_growth.tasks'),db.query('SELECT task_id,status,xp_delta,created_at FROM bogey_growth.activity ORDER BY id DESC LIMIT 30'),
  db.query('SELECT cap_cents FROM bogey_growth.budgets WHERE month=$1',[localMonth]),db.query('SELECT * FROM bogey_growth.expenses WHERE month=$1 ORDER BY created_at DESC LIMIT 200',[localMonth]),
  db.query('SELECT * FROM bogey_growth.experiments ORDER BY updated_at DESC LIMIT 30'),
  db.query("SELECT count(*)::int AS total FROM bogey_customer.subscribers WHERE status='subscribed' AND email NOT LIKE '%@resend.dev' AND email NOT LIKE '%.invalid'"),
  db.query("SELECT count(*)::int AS total FROM bogey_customer.support_requests WHERE status='open' AND email NOT LIKE '%@resend.dev' AND email NOT LIKE '%.invalid'"),
  db.query("SELECT COALESCE(sum(cents) FILTER(WHERE state='actual'),0)::int AS actual,COALESCE(sum(cents) FILTER(WHERE state='committed'),0)::int AS committed FROM bogey_growth.expenses WHERE month=$1",[localMonth]),
  db.query("SELECT count(DISTINCT (a.created_at AT TIME ZONE 'America/New_York')::date)::int AS days FROM bogey_growth.activity a JOIN bogey_growth.tasks t ON t.id=a.task_id WHERE a.xp_delta>0 AND t.status='verified' AND a.created_at >= (date_trunc('week',now() AT TIME ZONE 'America/New_York') AT TIME ZONE 'America/New_York')")]);
 let orders:null|{paid:number;previous:number;merchandise:number;exceptions:number;test:number}=null;
 try{const payments=await paymentDatabase();const result=await payments.query(`WITH bounds AS(SELECT CASE WHEN $1::int=0 THEN now() ELSE ((now() AT TIME ZONE $2)::date AT TIME ZONE $2) END AS finish, (((now() AT TIME ZONE $2)::date - $1::int) AT TIME ZONE $2) AS start, (((now() AT TIME ZONE $2)::date - ($1::int*2)) AT TIME ZONE $2) AS previous_start), eligible AS(SELECT * FROM bogey_checkout.orders WHERE created_at >= (SELECT previous_start FROM bounds))
 SELECT count(*) FILTER(WHERE livemode AND created_at >= b.start AND created_at<b.finish)::int AS paid,
 count(*) FILTER(WHERE livemode AND created_at >= b.previous_start AND created_at<b.start)::int AS previous,
 COALESCE(sum(GREATEST(0,COALESCE((stripe_session->>'amount_subtotal')::bigint,0)-COALESCE((stripe_session->'total_details'->>'amount_discount')::bigint,0))) FILTER(WHERE livemode AND created_at>=b.start AND created_at<b.finish),0)::text AS merchandise,
 count(*) FILTER(WHERE NOT livemode AND created_at>=b.start AND created_at<b.finish)::int AS test,
 (SELECT count(*)::int FROM bogey_checkout.orders WHERE livemode AND fulfillment_status NOT IN('submitted_to_printify')) AS exceptions FROM eligible CROSS JOIN bounds b`,[days,timezone]);const r=result.rows[0];orders={...r,merchandise:Number(r.merchandise)};}catch{ /* Missing payment source must not look like zero orders. */ }
 const providerDb=await providerDatabase();
 const bounds=(await db.query("SELECT (((now() AT TIME ZONE 'America/New_York')::date-$1::int) AT TIME ZONE 'America/New_York') AS start,CASE WHEN $1::int=0 THEN now() ELSE ((now() AT TIME ZONE 'America/New_York')::date AT TIME ZONE 'America/New_York') END AS finish",[days])).rows[0];
 const start=new Date(bounds.start).getTime(),end=new Date(bounds.finish).getTime();
 let analytics=null;let analyticsRefreshFailed=false;
 const cached=(await providerDb.query('SELECT payload,updated_at FROM bogey_growth.provider_cache WHERE key=$1',['analytics:'+days])).rows[0];
 if(!cached||Date.now()-new Date(cached.updated_at).getTime()>120000||cached.payload.start!==start){const result=await syncAnalytics(days,start,end);analyticsRefreshFailed='error' in result;}
 const fresh=(await providerDb.query('SELECT payload,updated_at FROM bogey_growth.provider_cache WHERE key=$1',['analytics:'+days])).rows[0];
 if(fresh)analytics={...fresh.payload,updated_at:fresh.updated_at,stale:analyticsRefreshFailed||Date.now()-new Date(fresh.updated_at).getTime()>900000||fresh.payload.start!==start};
 const finance=await financialSummary(start,end);
 const expenseTotal=(await providerDb.query("SELECT COALESCE(sum(cents),0)::float8 AS total FROM bogey_growth.expenses WHERE state='actual' AND spent_at>=to_timestamp($1/1000.0) AND spent_at<to_timestamp($2/1000.0)",[start,end])).rows[0].total;
 const sources=(await providerDb.query('SELECT source,status,checked_at,error FROM bogey_growth.provider_state ORDER BY source')).rows;
 const stripeSource=sources.find(s=>s.source==='stripe');
 const financeFresh=!!stripeSource&&stripeSource.status==='connected'&&Date.now()-new Date(stripeSource.checked_at).getTime()<900000;
 const contribution=financeFresh&&finance.incomplete===0?finance.provisional_contribution:null;
 const tasks=growthSeed.map(t=>({...t,...taskRows.rows.find(r=>r.id===t.id)}));const xp=tasks.reduce((sum,t)=>sum+(t.status==='verified'?t.xp:0),0);
 return {analytics,finance:{...finance,fresh:financeFresh,contribution,recorded_growth_cost:expenseTotal,after_growth:contribution===null?null:contribution-expenseTotal},sources,costTotals:costTotals.rows[0],consistency:consistency.rows[0].days,days,month:localMonth,refreshed:new Date().toISOString(),tasks,xp,level:levelFor(xp),activity:activity.rows,budget:budgets.rows[0]?.cap_cents??null,expenses:expenses.rows,experiments:experiments.rows,subscribers:subscribers.rows[0].total,support:support.rows[0].total,orders};
}
