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
    return res.statusCode(401).send({ error: 'Missing JWT' });
  }
  try {
    databases.client.setJWT(jwt);
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
    const { data } = await API.rest.User.Account.getAccountsList();
    let total = 0.0;
    data.forEach((coin) => {
      if (coin.currency === 'BTC') {
        total += parseFloat(coin.balance);
      }
    });
    console.log(data);
    console.log(total);
    const { data: btc } = await API.rest.User.Account.getAccountsList({ type: 'trade', currency: 'BTC' });
    return res.status(200).send({ data, btc });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

export default handler;
