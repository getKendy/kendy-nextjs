import connect from 'next-connect';
import cors from 'cors';
import API from 'kucoin-node-sdk';
import { databases } from '../../../utils/sdk';

const handler = connect();

handler.use(cors());

handler.get(async (req, res) => {
  const { query } = req;
  const { jwt } = query;
  if (!jwt) {
    return res.status(401).send({ error: 'Missing JWT' });
  }
  try {
    // account.client.setJWT(jwt);
    databases.client.setJWT(jwt);
    // const user = account.get();
    const api = await databases.listDocuments(process.env.APPWRITE_KUCOIN_DATA, process.env.APPWRITE_KUCOIN_API);
    API.init({
      baseUrl: 'https://openapi-v2.kucoin.com',
      apiAuth: {
        key: api.documents[0].apiKey, // KC-API-KEY
        secret: api.documents[0].apiSecret, // API-Secret
        passphrase: api.documents[0].apiPassphrase, // KC-API-PASSPHRASE
      },
      authVersion: 2, // KC-API-KEY-VERSION. Notice: for v2 API-KEY, not required for v1 version.
    });
    const { data } = await API.rest.Trade.Orders.getOrdersList('TRADE', { status: 'active' });
    // console.log(data);
    // const data = 'test';
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default handler;
