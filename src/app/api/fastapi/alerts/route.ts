import { NextResponse } from 'next/server';
import { env } from '~/env.mjs';

import getJwtToken from '~/utils/fastapi';
import type { Alerts, JWT } from '~/utils/types';

export async function GET(request: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const { searchParams } = new URL(request.url);
    // console.log(searchParams)
    const { page, exchange } = Object.fromEntries(searchParams);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const token: JWT = await getJwtToken();
    const headers = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    const res = await fetch(
      `${env.FASTAPI_URL}alert/?size=20&page=${page}&exchange=${exchange}`,
      headers,
    );
    // console.log(res.status)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: Alerts = await res.json();
    // console.log(data)
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}