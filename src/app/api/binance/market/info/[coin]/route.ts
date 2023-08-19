import { createEdgeRouter } from "next-connect";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import cors from 'cors';
import { logRequest } from "~/utils/middleware";
import axios from "axios";

interface RequestContext {
  params: {
    coin: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.use(logRequest)

router.get(async (req, { params: { coin } }) => {
  const {data}  = await axios.get(`https://api.binance.com/api/v3/exchangeInfo?symbol=${coin}`)
  // console.log(req.params)
  // const coin = req.params.coin
  // console.log(data.symbols)
  return NextResponse.json({ binance: data.symbols[0].baseAssetPrecision })
})

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}