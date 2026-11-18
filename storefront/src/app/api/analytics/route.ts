/**
 * First-party analytics sink. Logs one JSON line per event. To forward events server-side, add the
 * GA4 Measurement Protocol, Meta Conversions API and TikTok Events API calls here, reusing event_id
 * for deduplication, and skip forwarding when the request carries Sec-GPC: 1 (Global Privacy Control).
 */
export async function POST(req: Request) {
  try {
    const e = await req.json();
    const gpc = req.headers.get('sec-gpc') === '1';
    console.log(JSON.stringify({ type: 'analytics', gpc, ...e }));
  } catch {
    /* ignore malformed beacons */
  }
  return new Response(null, { status: 204 });
}
