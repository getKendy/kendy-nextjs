import connect from 'next-connect';
import cors from 'cors';
import axios from 'axios';

const handler = connect();
handler.use(cors());

handler.get(async (req, res) => {
  const { jwt, page, size } = req.query;
  if (!jwt) {
    return res.status(401).send({ error: 'Missing JWT' });
  }
  try {
    const { data: token } = await axios.get(`${process.env.NEXT_PUBLIC_DOMAIN}/api/fastapi/token`);
    // console.log(token);
    if (!token) {
      return res.status(500).send({ error: 'Missing JWT FastAPI' });
    }
    const config = {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `${token.token_type} ${token.access_token}`,
      },
    };
    // console.log(exchange);
    const { data: baro } = await axios.get(`${process.env.FASTAPI}baro/?size=${size}&page=${page}`, config);
    // console.log(alerts);
    return res.status(200).send(baro);
  } catch (error) {
    // console.log(error.message);
    return res.status(500).send(error);
  }
});

export default handler;
