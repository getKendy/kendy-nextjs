import axios from "axios";
import type { FormEvent } from "react";
import { getJWT } from "~/utils/sdk";
import type { Alert } from "~/utils/types";

interface HandleBuyCoin { coin: Alert, profitPerc: number, tradePerc: number }



export async function handleBuyMarketKucoin(props: HandleBuyCoin) {
  const { coin, profitPerc, tradePerc } = props
  try {
    // console.log(coin);
    const { data } = await axios.post(`/api/kucoin/marketbuy?jwt=${await getJWT()! ?? ""}`, { coin, profitPerc, tradePerc });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export async function checkBuyLimitKucoin(tradeId: string) {
  try {
    console.log(tradeId);
    const { data } = await axios.get(`/api/kucoin/checktrade?buymarkettrade=${tradeId}&jwt=${await getJWT()}`);
    console.log(data);
    if (data.isActive) {
      void checkBuyLimitKucoin(tradeId);
    } else {
      console.log('create sell trade');
      // craate sell trade
    }
  } catch (error) {
    console.log(error);
  }
}

// export async function handleBuyLimitKucoin(coin: string, profitPerc: number, tradePerc: number) {
//   try {
//     // console.log(coin);
//     const { data } = await axios.post(`/api/kucoin/limitbuy?jwt=${await getJWT()}`, { coin, profitPerc, tradePerc });
//     console.log(data);
//     void checkBuyLimitKucoin(data.orderId);
//   } catch (error) {
//     console.log(error);
//   }
// }