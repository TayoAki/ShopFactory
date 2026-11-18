import { NextResponse } from 'next/server';

/** Placeholder until customer accounts connect to the order system (Medusa or your auth provider). */
export async function POST(req: Request) {
  const url = new URL('/account?sent=1', req.url);
  return NextResponse.redirect(url, { status: 303 });
}
