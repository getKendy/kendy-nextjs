import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import cors from 'cors';
import API from 'kucoin-node-sdk';

const handler = connect();
handler.use(cors());

handler.get(async (req: NextApiRequest, res: NextApiResponse) => {
  const { jwt, buymarkettrade } = req.query;
  if (!jwt) {
    return res.status(500).send({ error: 'Missing JWT' });
  }
  try {
    const { data: order } = await API.rest.Trade.Orders.getOrderByID(buymarkettrade);
    console.log(order);

    return res.status(200).send(order);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default handler;
