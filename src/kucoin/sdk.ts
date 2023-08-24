import sdk from '@/appwrite/sdk'
import { KucoinOrderList } from '@/utils/types'
import API from 'kucoin-node-sdk'

function initApi(apiKey: string, apiSecret: string, apiPassphrase: string) {
  return API.init(
    {
      baseUrl: 'https://openapi-v2.kucoin.com',
      apiAuth: {
        key: apiKey, // KC-API-KEY
        secret: apiSecret, // API-Secret
        passphrase: apiPassphrase, // KC-API-PASSPHRASE
      },
      authVersion: 2, // KC-API-KEY-VERSION. Notice: for v2 API-KEY, not required for v1 version.
    }
  )
}

export class KucoinService {
  async getTrades() {
    try {
      const api = await sdk.getKucoinApi()
      if (!api) {
        return null
      }
      initApi(api.apiKey, api.apiSecret, api.apiPassphrase)
      const { data }: { data: KucoinOrderList } = await API.rest.Trade.Orders.getOrdersList('TRADE', { status: 'active' });
      return data
    } catch (error) {
      return null
    }
  }
}

const kucoin = new KucoinService()
export default kucoin