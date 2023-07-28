import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import KuApi from '../kucoin/KuApi';
import { getJWT } from '../../utils/sdk';
import useAutotradeStore from '../../utils/store/autotrade';

function Trades() {
  const [activeTrades, setActiveTrades] = useState([]);
  const { autotrade, coins, trades, volatility, setAutotrade, setCoins, setTrades } = useAutotradeStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/kucoin/trades/?jwt=${await getJWT()}`);
        setActiveTrades(data.items);
        // setCoins(data.items);
        setTrades(data.items.length);
        const symbols = [];
        data.items.forEach((item) => {
          symbols.push(item.symbol);
        });
        const unique = [...new Set(symbols)];
        setCoins(unique.length);
        if (
          coins != null &&
          trades != null &&
          volatility != null &&
          coins <= 2 &&
          trades <= 6 &&
          volatility > -1 &&
          volatility < 1
        ) {
          setAutotrade(true);
        } else {
          setAutotrade(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    // const interval = setInterval(() => {
    //   fetchData();
    // }, 5000);
    // return () => clearInterval(interval);
  }, [volatility]);

  return (
    <div className="flex flex-col max-w-full">
      <h1 className={`text-lg font-bold ${autotrade ? 'text-green-500' : 'text-red-500'}`}>
        Open trades: {trades} in {coins} market(s).
      </h1>
      {/* <KuApi /> */}
      <div className="flex flex-wrap">
        {activeTrades.map((trade) => (
          <div key={trade.id} className="flex flex-col m-1 p-2 border border-primary rounded-lg">
            <div className="flex gap-x-4">
              <div>{trade.symbol}</div>
              <div>{trade.price}</div>
            </div>
            <div className="flex gap-x-2">
              <div>{trade.side}</div>
              <div>{trade.size}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trades;
