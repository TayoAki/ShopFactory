import { NextResponse } from 'next/server';

/** Contact form. Logs the message; connect your help desk or email provider here. */
export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || !/^\S+@\S+\.\S+$/.test(String(b.email || '')) || !String(b.message || '').trim()) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  console.log(JSON.stringify({ type: 'contact', email: String(b.email), order: b.order ? String(b.order) : undefined, length: String(b.message).length, ts: new Date().toISOString() }));
  return NextResponse.json({ ok: true });
}
