/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "standalone",
  env: {
    APPWRITE_ENDPOINT: 'https://baas.hezik.nl/v1',
    APPWRITE_PROJECT:'64ce8c876695923fa07b',
    APPWRITE_BINANCE_DATA:'64cf6e2c4a9d40f7c365',
    APPWRITE_BALANCE:'64cf6e2d55ef25372b3e',
    APPWRITE_APIKEY:'',
    NEXT_PUBLIC_DOMAIN:'http://localhost:3000',
    APPWRITE_KUCOIN_DATA:'64cf6e2f197d1fce5222',
    APPWRITE_KUCOIN_API:'64cf6e2f5eb1ac0275c0',
    FASTAPI:'https://cryptoapi.hezik.nl/api/v2/',
    FASTAPI_USER:'ron',
    FASTAPI_PASSWORD:'Oldsch00l',
    APP_ENV_API:'cryptoapi.hezik.nl',
    REDIS:'redis://:eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81@10.20.30.23:6379/5',
  }
}

module.exports = nextConfig
