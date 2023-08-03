import connect from 'next-connect';
import cors from 'cors';
import axios from 'axios';
import { createClient } from 'redis';

async function setJwtToken() {
  const redis = createClient({
    url: process.env.REDIS,
  });
  redis.on('error', (err) => console.log('Redis Client Error', err));

  await redis.connect();
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const data = { username: process.env.FASTAPI_USER, password: process.env.FASTAPI_PASSWORD };
  const { data: jwt } = await axios.post(`${process.env.FASTAPI}login/`, data, config);
  console.log(jwt);
  redis.set('fastapi_token', JSON.stringify(jwt), { TTL: 1420 * 60 * 60 });
  return jwt;
}

const handler = connect();
handler.use(cors());
handler.get(async (req, res) => {
  try {
    const redis = createClient({
      url: process.env.REDIS,
    });
    redis.on('error', (err) => console.log('Redis Client Error', err));
    await redis.connect();

    const token = await redis.get('fastapi_token');
    if (!token) {
      // console.log('request new token');
      const newToken = await setJwtToken();
      // console.log(newToken);
      return res.status(200).send(newToken);
    }
    // console.log(token);
    return res.status(200).send(JSON.parse(token));
  } catch (error) {
    return res.statusCode(500).send(error);
  }
});
export default handler;
