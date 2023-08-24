import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'
import cors from 'cors'
import sdk, { database } from '@/appwrite/sdk'
import kucoin from '@/kucoin/sdk'
const router = createRouter<NextApiRequest, NextApiResponse>()


router.get(async (req, res) => {
  const { jwt } = req.query
  if (!jwt) {
    return res.status(401).send({ error: 'Missing JWT' });
  }
  try {
    database.client.setJWT(jwt as string)
    const api = await sdk.getKucoinApi()
    if (!api) {
      return res.status(401).send({ error: 'Missing API' });
    }
    const data = await kucoin.getTrades()
    // console.log(data)
    return res.status(200).json(data)
  } catch (error: any) {
    // console.log(error)
    return res.status(500).send(error)
  }
})

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({ error: (err as Error).message })
  }
})
