import { NextResponse } from "next/server";
import getJwtToken from "~/utils/fastapi"
import { env } from "~/env.mjs"

interface TickerData {
  symbol: string,
  market: string,
  c: string,
  o: string,
  h: string,
  l: string,
  v: string,
  q: string
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const { market, exchange } = Object.fromEntries(searchParams)
    // console.log(market, exchange)
    const token = await getJwtToken()
    const headers = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    const res = await fetch(
      `${env.FASTAPI_URL}tickerredis/${market}?exchange=${exchange}`,
      headers,
    )
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data: TickerData = await res.json()
    // console.log(data)

    return NextResponse.json({ data })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
}

// console.log('redis ticker')
// try {
//   const token = await getJwtToken()
//   const config = {
//     headers: {
//       accept: 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded',
//       Authorization: `${token.token_type} ${token.access_token}`,
//     },
//   };
//   const { data: ticker }: TickerData = await axios.get(`${env.FASTAPI_URL}tickerredis/${req.query.market}?exchange=${req.query.exchange}`,
//     config)
//   console.log(ticker)
//   res.status(200).send(ticker)
// } catch (error) {
//   console.log(error)
//   res.status(500).send(error)
// }

