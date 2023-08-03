import connect from 'next-connect';
import cors from 'cors';
import axios from 'axios';

const handler = connect();

handler.use(cors());

handler.get(async (req, res) => {
  const { market, exchange } = req.query;

  try {
    const { data: token } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/fastapi/token`);
    // console.log(token);
    if (!token) {
      return res.status(500).send({ error: 'MIssing JWT FastAPI' });
    }
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    const { data: ticker } = await axios.get(`${process.env.FASTAPI}ticker/${market}?exchange=${exchange}`, config);
    // console.log(ticker);
    return res.status(200).send(ticker);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default handler;
