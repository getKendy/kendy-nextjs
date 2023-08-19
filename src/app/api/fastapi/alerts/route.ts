import { NextResponse } from 'next/server';

import getJwtToken from '~/utils/fastapi';
import type { Alerts, JWT } from '~/utils/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    // console.log(searchParams)
    const { page, exchange } = Object.fromEntries(searchParams);
    const token: JWT = await getJwtToken();
    const headers = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    const res = await fetch(
      `${process.env.FASTAPI}alert/?size=20&page=${page}&exchange=${exchange}`,
      headers,
    );
    // console.log(res.status)

    const data: Alerts = await res.json();
    // console.log(data)
    return NextResponse.json({ data });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error });
  }
}