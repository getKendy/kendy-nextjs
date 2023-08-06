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
  // console.log({ newToken: jwt });
  const jwtExpires = Date.now() + 2 * 60 * 1000;
  // console.log(jwtExpires);

  redis.set('fastapi_token', JSON.stringify({ jwt, jwtExpires }), 5 * 60);
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
      const newToken = await setJwtToken();
      return res.status(200).send(newToken);
    }
    const { jwt, jwtExpires } = JSON.parse(token);
    if (!jwt || !jwtExpires) {
      const newToken = await setJwtToken();
      return res.status(200).send(newToken);
    }
    if (jwtExpires < Date.now()) {
      const newToken = await setJwtToken();
      // console.log(newToken.access_token);
      return res.status(200).send(newToken);
    }
    // if (token)
    return res.status(200).send(jwt);
  } catch (error) {
    // console.log(error);
    return res.statusCode(500).send(error);
  }
});
export default handler;
