export interface Alert {
  '_id': string, exchange: string, market: string, date: string, timeframe: string, volume24h: string,
  trend24h: number, bbl: string, bbm: string, bbu: string, bbb: string, stochk: string, stockd: string, close: number
}

export interface Alerts {
  items: Array<Alert>,
  total: number,
  page: number,
  size: number,
  pages: number,
}

export interface Baro {
  _id: string,
  fiatBtcVolume: number,
  fiatBnbVolume: number,
  fiatEthVolume: number,
  btcAltVolume: number,
  ethAltVolume: number,
  bnbAltVolume: number,
  totalVolume: number,
  altBtcStrength: number,
  altEthStrength: number,
  altBnbStrength: number,
  btcStrength: number,
  ethStrength: number,
  bnbStrength: number,
  date: string
}

export interface Baros {
  items: Array<Baro>
  total: number,
  page: number,
  size: number,
  pages: number
}

export interface JWT {
  token_type: string,
  access_token: string,
}