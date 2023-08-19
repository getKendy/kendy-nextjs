import { createEdgeRouter } from "next-connect";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import cors from 'cors';
import { logRequest } from "~/utils/middleware";
// import API from 'kucoin-node-sdk';
import axios from "axios";

interface RequestContext {
  params: {
    coin: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

router.use(logRequest)

router.get(async (req, { params: { coin } }) => {
  try {
    const {data} = await axios.get(`https://openapi-v2.kucoin.com/api/v1/currencies/${coin}`)
    // console.log(data)
    return NextResponse.json({ kucoin: data.data.precision })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error })
  }
})

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx)
}