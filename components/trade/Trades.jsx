import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import KuApi from '../kucoin/KuApi';
import Link from 'next/link';
import Image from 'next/image';
import { account, getJWT } from '../../utils/sdk';
import useAutotradeStore from '../../utils/store/autotrade';

function Trades() {
  const [prefs, setPrefs] = useState({});
  const [btcPrec, setBtcPerc] = useState({ total: 0, btc: 0 });
  const [activeTrades, setActiveTrades] = useState([]);
  const {
    autotrade,
    coins,
    funds,
    trades,
    volatility,
    setAutotrade,
    setCoins,
    setFunds,
    setTrades,
    setProfitPerc,
    setTradePerc,
  } = useAutotradeStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/kucoin/funds?jwt=${await getJWT()}`);
        // console.log(data);
        setBtcPerc(data);
        setFunds(true);
      } catch (error) {
        setFunds(false);
        console.log(error);
      }
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

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
  }, [volatility]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await account.getPrefs();
      // console.log(data);
      setPrefs(data);
      if (data.profitPerc) {
        setProfitPerc(data.profitPerc);
      }
      if (data.tradePerc) {
        setTradePerc(data.tradePerc);
      }
    };
    fetchData();
  }, []);

  if (!funds) {
    return (
      <div className="flex justify-center items-center">
        <button type="button" className="btn btn-sm btn-outline btn-primary mt-4">
          <Link href="/settings">enter kucoin api</Link>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap justify-around gap-x-5 text-sm font-bold">
        <div className={autotrade ? 'text-green-500' : 'text-red-500'}>
          Open trades: {trades} in {coins} market(s). - {((btcPrec.btc * 100) / btcPrec.total).toFixed(2)}% BTC
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-2 border border-primary rounded-lg px-2 ">
          <div>
            <input
              type="text"
              name="profitPerc"
              id="profitPrec"
              value={prefs.profitPerc}
              className="bg-transparent px-2 w-20 text-right text-orange-500"
              onChange={(e) => {
                setPrefs({ ...prefs, profitPerc: e.currentTarget.value });
                setProfitPerc(e.currentTarget.value);
                account.updatePrefs({ ...prefs, profitPerc: e.currentTarget.value });
              }}
            />
            % Profit per Trade
          </div>
          <div>
            <input
              type="text"
              name="tradePerc"
              id="tradePrec"
              value={prefs.tradePerc}
              className="bg-transparent px-2 w-20 text-right text-orange-500"
              onChange={(e) => {
                setPrefs({ ...prefs, tradePerc: e.currentTarget.value });
                setTradePerc(e.currentTarget.value);
                account.updatePrefs({ ...prefs, tradePerc: e.currentTarget.value });
              }}
            />
            % BTC per Trade
          </div>
        </div>
      </div>
      {/* kucoin trades */}
      <div className="flex flex-wrap justify-around items-center">
        {activeTrades.map((trade) => (
          <div
            key={trade.id}
            className="flex flex-col justify-around items-center gap-x-2 m-1 p-2 border border-primary rounded-lg shdow shadow-lg shadow-secondary"
          >
            <div className="flex items-center justify-around gap-x-2">
              <div>
                <Image alt="kucoin" src="/kucoin.png" width={35} height={35} />
              </div>
              <div className="flex flex-col  items-end">
                <div className="flex items-center gap-x-2">
                  <div className="text-xs text-primary-focus font-bold">{trade.size}</div>
                  <div>{trade.side}</div>
                </div>
                <div>{trade.symbol}</div>
              </div>
            </div>
            <div className="flex gap-x-2">
              <div>{trade.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trades;
