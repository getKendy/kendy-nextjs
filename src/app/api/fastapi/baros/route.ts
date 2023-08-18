import { NextResponse } from "next/server"
import { env } from "~/env.mjs";

import getJwtToken from "~/utils/fastapi"
import type { Baros } from "~/utils/types";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const { page, size } = Object.fromEntries(searchParams)
    // console.log(market, exchange)
    const token = await getJwtToken()
    const headers = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    const res: Response = await fetch(
      `${env.FASTAPI_URL}baro/?page=${page}&size=${size}`,
      headers,
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: Baros = await res.json()
    // console.log(data)
    return NextResponse.json({ data })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}