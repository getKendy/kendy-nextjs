import axios from 'axios';
import { createClient } from 'redis';
import type { JWT } from './types'


async function setJwtToken() {
  const redis = createClient({
    url: 'redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@10.20.30.23:6379/5',
  });
  redis.on('error', (err) => console.log('Redis Client Error', err));

  await redis.connect();
  const config = {
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  const data = { username: 'ron', password: 'Oldsch00l' };
  const { data: jwt }: { data: JWT } = await axios.post(`https://cryptoapi.hezik.nl/api/v2/login/`, data, config);
  // console.log({ newToken: jwt });
  const jwtExpires = Date.now() + 2 * 60 * 1000;
  // console.log(jwtExpires);
  await redis.set('fastapi_tr_token', JSON.stringify({ jwt, jwtExpires }));
  await redis.disconnect();
  // redis.off();
  return jwt;
}

async function getJwtToken() {
  const redis = createClient({
    url: 'redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@10.20.30.23:6379/5',
  });
  redis.on('error', (err) => console.log('Redis Client Error', err));
  await redis.connect();
  const token = await redis.get('fastapi_tr_token');
  await redis.disconnect();
  // redis.off();
  if (!token) {
    const newToken = await setJwtToken();
    return newToken;
  }

  // { jwt: { token_type: string, access_token: string, }, jwtExpires: number | null }
  const tokenData: { jwt: JWT, jwtExpires: number } = JSON.parse(token)
  // console.log(tokenData)
  const { jwt, jwtExpires } = tokenData;
  if (!jwt || !jwtExpires) {
    const newToken = await setJwtToken();
    return newToken;
  }
  if (jwtExpires < Date.now()) {
    const newToken = await setJwtToken();
    // console.log(newToken.access_token);
    return newToken;
  }
  // if (token)
  return jwt;
}

export default getJwtToken
