import { NextResponse } from "next/server"

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
      `${process.env.FASTAPI}baro/?page=${page}&size=${size}`,
      headers,
    )
    const data: Baros = await res.json()
    // console.log(data)
    return NextResponse.json({ data })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}