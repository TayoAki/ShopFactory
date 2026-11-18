import { NextResponse } from 'next/server';

/**
 * Waitlist and newsletter signups. With KLAVIYO_PRIVATE_KEY and KLAVIYO_LIST_ID set, subscribes the
 * profile to the list; otherwise logs the signup so nothing is lost in development.
 */
export async function POST(req: Request) {
  let body: { email?: string; phone?: string; source?: string; productHandle?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const email = String(body.email || '').trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254) return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });
  const phone = body.phone ? String(body.phone).replace(/[^\d+]/g, '').slice(0, 16) : undefined;

  const key = process.env.KLAVIYO_PRIVATE_KEY;
  const list = process.env.KLAVIYO_LIST_ID;
  if (key && list) {
    const res = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs', {
      method: 'POST',
      headers: { Authorization: `Klaviyo-API-Key ${key}`, revision: '2024-10-15', 'Content-Type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        data: {
          type: 'profile-subscription-bulk-create-job',
          attributes: {
            custom_source: `site:${body.source ?? 'unknown'}`,
            profiles: {
              data: [
                {
                  type: 'profile',
                  attributes: {
                    email,
                    ...(phone ? { phone_number: phone } : {}),
                    subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } }, ...(phone ? { sms: { marketing: { consent: 'SUBSCRIBED' } } } : {}) },
                  },
                },
              ],
            },
          },
          relationships: { list: { data: { type: 'list', id: list } } },
        },
      }),
    }).catch(() => null);
    if (!res || !res.ok) return NextResponse.json({ ok: false, error: 'provider' }, { status: 502 });
  } else {
    console.log(JSON.stringify({ type: 'signup', email, phone: phone ? 'provided' : undefined, source: body.source, product: body.productHandle, ts: new Date().toISOString() }));
  }
  return NextResponse.json({ ok: true });
}
