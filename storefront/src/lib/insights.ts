import {gzipSync,gunzipSync} from 'node:zlib';
import {customerDatabase} from './customer-db';
import {CustomerError,customerOrigin,encrypt,decrypt} from './customer-security';
import {publicReplayPage,replayLimits,sanitizeReplayEvent,heatPoint} from './insights-privacy';
let schema:Promise<unknown>|undefined;
const uuid=(v:unknown)=>typeof v==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v);
export async function insightsDatabase(){const db=await customerDatabase();schema||=db.query(`CREATE SCHEMA IF NOT EXISTS bogey_insights;
 CREATE TABLE IF NOT EXISTS bogey_insights.sessions(id uuid PRIMARY KEY,page text NOT NULL,width integer NOT NULL,height integer NOT NULL,qa boolean NOT NULL DEFAULT false,started_at timestamptz NOT NULL DEFAULT now(),updated_at timestamptz NOT NULL DEFAULT now(),expires_at timestamptz NOT NULL DEFAULT now()+interval '7 days');
 CREATE TABLE IF NOT EXISTS bogey_insights.chunks(id uuid PRIMARY KEY,session_id uuid NOT NULL REFERENCES bogey_insights.sessions(id) ON DELETE CASCADE,events_enc text NOT NULL,bytes integer NOT NULL,clicks jsonb NOT NULL DEFAULT '[]',created_at timestamptz NOT NULL DEFAULT now());
 CREATE INDEX IF NOT EXISTS insights_expiry ON bogey_insights.sessions(expires_at);CREATE INDEX IF NOT EXISTS insights_session_chunks ON bogey_insights.chunks(session_id,created_at);
 `).catch(e=>{schema=undefined;throw e;});await schema;return db;}
export async function pruneInsights(){const db=await insightsDatabase();return (await db.query('DELETE FROM bogey_insights.sessions WHERE expires_at<now()')).rowCount;}
export async function captureInsights(input:Record<string,unknown>,qa=false){
 if(input.consent!==2||!uuid(input.sessionId)||!uuid(input.batchId))throw new CustomerError('A current analytics choice is required.');
 const page=publicReplayPage(String(input.page||''),customerOrigin());if(!page)throw new CustomerError('This page is excluded from replay.',403);
 const width=Number(input.width),height=Number(input.height);if(!Number.isInteger(width)||!Number.isInteger(height)||width<200||width>4000||height<200||height>4000)throw new CustomerError('Invalid viewport.');
 if(!Array.isArray(input.events)||input.events.length>replayLimits.eventsPerChunk||!Array.isArray(input.clicks)||input.clicks.length>100)throw new CustomerError('Recording batch is too large.');
 const events=input.events.map(e=>sanitizeReplayEvent(e,customerOrigin())).filter((e):e is Record<string,unknown>=>!!e);
 if(events.some(e=>Math.abs(Date.now()-Number(e.timestamp))>10*60000))throw new CustomerError('Recording batch has expired.');
 const clicks=input.clicks.map(heatPoint).filter(Boolean);if(!events.length&&!clicks.length)return {accepted:false,reason:'empty'};
 const data=JSON.stringify(events);if(Buffer.byteLength(data)>replayLimits.bodyBytes)throw new CustomerError('Recording batch is too large.',413);
 const sealed=encrypt(gzipSync(data).toString('base64')),bytes=Buffer.byteLength(sealed)+Buffer.byteLength(JSON.stringify(clicks));
 const db=await insightsDatabase(),client=await db.connect();try{
  await client.query('BEGIN');await client.query("SELECT pg_advisory_xact_lock(hashtextextended('bogey-insights-cap',0))");
  await client.query('DELETE FROM bogey_insights.sessions WHERE expires_at<now()');
  if((await client.query('SELECT id FROM bogey_insights.chunks WHERE id=$1',[input.batchId])).rowCount){await client.query('COMMIT');return{accepted:true,duplicate:true};}
  const existing=(await client.query('SELECT * FROM bogey_insights.sessions WHERE id=$1',[input.sessionId])).rows[0];
  if(existing&&(existing.page!==page||existing.qa!==qa||Date.now()-new Date(existing.started_at).getTime()>replayLimits.sessionMs+15000))throw new CustomerError('This page recording has ended.',409);
  const storage=Number((await client.query('SELECT COALESCE(sum(bytes),0) AS bytes FROM bogey_insights.chunks')).rows[0].bytes);
  if(storage+bytes>replayLimits.storageBytes)throw new CustomerError('Recording storage is at capacity.',429);
  if(!existing){
   const count=Number((await client.query("SELECT count(*) FROM bogey_insights.sessions WHERE qa=false AND (started_at AT TIME ZONE 'America/New_York')::date=(now() AT TIME ZONE 'America/New_York')::date")).rows[0].count);
   if(!qa&&count>=replayLimits.dailySessions)throw new CustomerError('Today’s recording sample is full.',429);
   if(!events.some(e=>e.type===2))throw new CustomerError('A recording must start with a public snapshot.');
   await client.query('INSERT INTO bogey_insights.sessions(id,page,width,height,qa) VALUES($1,$2,$3,$4,$5)',[input.sessionId,page,width,height,qa]);
  }
  const chunks=Number((await client.query('SELECT count(*) FROM bogey_insights.chunks WHERE session_id=$1',[input.sessionId])).rows[0].count);
  if(chunks>=replayLimits.chunks)throw new CustomerError('This page recording has ended.',409);
  await client.query('INSERT INTO bogey_insights.chunks(id,session_id,events_enc,bytes,clicks) VALUES($1,$2,$3,$4,$5)',[input.batchId,input.sessionId,sealed,bytes,JSON.stringify(clicks)]);
  await client.query('UPDATE bogey_insights.sessions SET updated_at=now() WHERE id=$1',[input.sessionId]);await client.query('COMMIT');return{accepted:true};
 }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
}
export async function insightsRecordings(includeQA=false){const db=await insightsDatabase();await pruneInsights();const recordings=(await db.query(`SELECT s.id,s.page,s.width,s.height,s.started_at,s.updated_at,s.qa,count(c.id)::int AS chunks,COALESCE(sum(c.bytes),0)::int AS bytes,COALESCE(sum(jsonb_array_length(c.clicks)),0)::int AS clicks FROM bogey_insights.sessions s LEFT JOIN bogey_insights.chunks c ON c.session_id=s.id WHERE ($1::boolean OR NOT s.qa) GROUP BY s.id ORDER BY s.started_at DESC LIMIT 50`,[includeQA])).rows;
 const heat=(await db.query(`SELECT s.page,c.clicks FROM bogey_insights.chunks c JOIN bogey_insights.sessions s ON s.id=c.session_id WHERE NOT s.qa AND jsonb_array_length(c.clicks)>0 ORDER BY c.created_at DESC LIMIT 300`)).rows;
 const totals=(await db.query('SELECT count(*)::int AS sessions FROM bogey_insights.sessions WHERE qa=false')).rows[0];
 const storage=(await db.query('SELECT COALESCE(sum(bytes),0)::int AS bytes FROM bogey_insights.chunks')).rows[0];
 return{recordings,heat,totals,storage,limits:replayLimits};}
export async function replayEvents(id:string){if(!uuid(id))throw new CustomerError('Recording not found.',404);const db=await insightsDatabase();const rows=(await db.query('SELECT c.events_enc FROM bogey_insights.chunks c JOIN bogey_insights.sessions s ON s.id=c.session_id WHERE s.id=$1 AND s.expires_at>now() ORDER BY c.created_at,c.id',[id])).rows;
 if(!rows.length)throw new CustomerError('Recording not found.',404);
 return rows.flatMap(row=>JSON.parse(gunzipSync(Buffer.from(decrypt<string>(row.events_enc),'base64'),{maxOutputLength:replayLimits.bodyBytes}).toString())).sort((a,b)=>a.timestamp-b.timestamp);
}
export async function deleteRecording(id:string){if(!uuid(id))throw new CustomerError('Recording not found.',404);await(await insightsDatabase()).query('DELETE FROM bogey_insights.sessions WHERE id=$1',[id]);}
