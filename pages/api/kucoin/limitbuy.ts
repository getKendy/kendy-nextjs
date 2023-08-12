import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import cors from 'cors';
import API from 'kucoin-node-sdk';
import { databases } from '../../../utils/sdk';
import generateUUID from '../../../utils/uuid';

const handler = connect();

handler.use(cors());

handler.post(async (req: NextApiRequest, res: NextApiResponse) => {
  const { jwt } = req.query;
  const { coin, tradePerc } = req.body;
  if (!jwt) {
    return res.status(401).send({ error: 'Missing JWT' });
  }
  try {
    databases.client.setJWT(jwt as string);
    const api = await databases.listDocuments(process.env.APPWRITE_KUCOIN_DATA, process.env.APPWRITE_KUCOIN_API);
    if (api.total !== 1) {
      return res.status(500).send('no API found');
    }
    API.init({
      baseUrl: 'https://openapi-v2.kucoin.com',
      apiAuth: {
        key: api.documents[0].apiKey, // KC-API-KEY
        secret: api.documents[0].apiSecret, // API-Secret
        passphrase: api.documents[0].apiPassphrase, // KC-API-PASSPHRASE
      },
      authVersion: 2, // KC-API-KEY-VERSION. Notice: for v2 API-KEY, not required for v1 version.
    });
    const { data: balance } = await API.rest.User.Account.getAccountsList({ type: 'trade', currency: 'BTC' });
    // console.log(balance);
    const tradeAmount = balance[0].available * (tradePerc / 100);
    // console.log(tradeAmount);
    if (!tradeAmount || tradeAmount === 0.0) {
      return res.status(500).send({ error: 'Nothing to trade with' });
    }
    const { data: buylimittrade } = await API.rest.Trade.Orders.postOrder(
      {
        clientOid: generateUUID(),
        side: 'buy',
        symbol: coin.market.replace('/', '-'),
        type: 'limit',
        tradeType: 'TRADE',
      },
      {
        price: coin.bbl,
        size: tradeAmount / +coin.bbl,
      }
    );
    return res.status(201).send(buylimittrade);
  } catch (error) {
    console.log(error);
    return res.status(201).send(error);
  }
});

export default handler;
