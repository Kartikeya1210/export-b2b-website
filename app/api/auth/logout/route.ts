import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const redirectTo = (body && body.redirectTo) || '/';

  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.cookies.set('wholesale_user', '', {
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
    maxAge: 0
  });

  res.headers.set('X-Redirect-To', redirectTo);
  return res;
}

