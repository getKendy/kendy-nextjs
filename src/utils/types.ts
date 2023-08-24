import { type } from "os"

export type Alert = {
  '_id': string, exchange: string, market: string, date: string, timeframe: string, volume24h: string,
  trend24h: number, bbl: string, bbm: string, bbu: string, bbb: string, stochk: string, stockd: string, close: number
}

export type Alerts = {
  items: Array<Alert>,
  total: number,
  page: number,
  size: number,
  pages: number,
}

export type Baro = {
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

export type Baros = {
  items: Array<Baro>
  total: number,
  page: number,
  size: number,
  pages: number
}

export type JWT = {
  token_type: string,
  access_token: string,
}

export type KucoinAPI = {
  apiKey: string,
  apiSecret: string,
  apiPassphrase: string,
  userId: string
}

export type KucoinOrder = {
  id: string,   //orderid
  symbol: string,   //symbol
  opType: string,      // operation type: DEAL
  type: string,       // order type,e.g. limit,market,stop_limit.
  side: string,         // transaction direction,include buy and sell
  price: string,         // order price
  size: string,           // order quantity
  funds: string,          // order funds
  dealFunds: string,  // deal funds
  dealSize: string,       // deal quantity
  fee: string,            // fee
  feeCurrency: string, // charge fee currency
  stp: string,             // self trade prevention,include CN,CO,DC,CB
  stop:string,            // stop type
  stopTriggered: boolean,  // stop order is triggered
  stopPrice: string,      // stop price
  timeInForce: string,  // time InForce,include GTC,GTT,IOC,FOK
  postOnly: boolean,     // postOnly
  hidden: boolean,       // hidden order
  iceberg: boolean,      // iceberg order
  visibleSize: string,    // display quantity for iceberg order
  cancelAfter: number,      // cancel orders time，requires timeInForce to be GTT
  channel: string,      // order source
  clientOid: string,       // user-entered order unique mark
  remark: string,          // remark
  tags: string,            // tag order source        
  isActive: boolean,     // status before unfilled or uncancelled
  cancelExist: boolean,   // order cancellation transaction record
  createdAt: number,  // create time
  tradeType: string
}

export type KucoinOrderList = {
  currentPage: number,
    pageSize: number,
    totalNum: number,
    totalPage: number,
    items: Array<KucoinOrder>
}

