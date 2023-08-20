import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from 'next-connect';
import getJwtToken from "@/utils/fastapi";
import { Alerts, JWT } from "@/utils/types";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  try {

    // console.log(searchParams)
    const { page, exchange } = req.query;
    const token: JWT = await getJwtToken();
    const headers = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    const { data }: { data: Alerts } = await axios.get(
      `https://cryptoapi.hezik.nl/api/v2/alert/?size=20&page=${page}&exchange=${exchange}`,
      headers,
    );
    // console.log(data)


    return res.status(200).json(data);
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: (error as Error).message });
  }
})

export default router.handler({
  onError(err, req, res) {
    res.status(500).json({ error: (err as Error).message })
  }
})