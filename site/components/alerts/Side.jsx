/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';

import { serverless } from '../../utils/sdk';
import Binance from '../binance/Binance';

function TickerDisplay({ ticker, coin }) {
  return (
    <div className={(+(ticker?.c) - +(ticker?.o)) > 0
      ? ((+(ticker?.c) * 100) / +(ticker?.o) - 100) > 1
        ? ((+(ticker?.c) * 100) / +(ticker?.o) - 100) > 5
          ? 'flex flex-col flex-shrink flex-grow justify-center md:flex-col-reverse space-x-3 mb-5 shadow-lg text-white bg-green-800 shadow-green-600 p-2 rounded-xl'
          : 'flex flex-col flex-shrink flex-grow justify-center md:flex-col-reverse space-x-3 mb-5 shadow-md bg-green-500 shadow-green-300 p-2 rounded-xl'
        : 'flex flex-col flex-shrink flex-grow justify-center md:flex-col-reverse space-x-3 mb-5 shadow-inner shadow-green-500 p-2 rounded-xl'
      : ((+(ticker?.c) * 100) / +(ticker?.o) - 100) < -1
        ? ((+(ticker?.c) * 100) / +(ticker?.o) - 100) < -5
          ? 'flex flex-col flex-shrink flex-grow justify-center md:flex-col-reverse space-x-3 mb-5 shadow-lg text-white bg-red-800 shadow-red-600 p-2 rounded-xl'
          : 'flex flex-col flex-shrink flex-grow justify-center md:flex-col-reverse space-x-3 mb-5 shadow-md bg-red-500 shadow-red-300 p-2 rounded-xl'
        : 'flex flex-col flex-shrink flex-grow justify-center md:flex-col-reverse space-x-3 mb-5 shadow-inner shadow-red-500 p-2 rounded-xl'}
    >
      <div className="flex space-x-2 justify-center">
        <div className="font-bold">
          {coin}
          /BUSD:
        </div>
        <div>
          $
          {(+(ticker.c)).toFixed(2)}
        </div>
      </div>
      <div className="md:text-sm text-center justify-center flex space-x-2">
        <span>24h:</span>
        {(+(ticker?.c) - +(ticker?.o)) > 0
          ? ((+(ticker?.c) * 100) / +(ticker?.o) - 100) > 1
            ? (
              <div className="text-white">
                {' '}
                ↗︎ $
                {(+(ticker.c) - +(ticker.o)).toFixed(2)}
              </div>
            )
            : (
              <div className="text-green-600">
                {' '}
                ↗︎ $
                {(+(ticker.c) - +(ticker.o)).toFixed(2)}
              </div>
            )
          : ((+(ticker?.c) * 100) / +(ticker?.o) - 100) < -1
            ? (
              <div className="text-white">
                {' '}
                ↘︎ $
                {(+(ticker.c) - +(ticker.o)).toFixed(2)}
              </div>
            )
            : (
              <div className="text-red-600">
                {' '}
                ↘︎ $
                {(+(ticker.c) - +(ticker.o)).toFixed(2)}
              </div>
            )}
        <span>
          {' '}
          (
          {((+(ticker?.c) * 100) / +(ticker?.o) - 100).toFixed(2)}
          %)
        </span>
      </div>
    </div>
  );
}

TickerDisplay.defaultProps = {
  ticker: { o: '', c: '' },
  coin: '',
};

TickerDisplay.propTypes = {
  ticker: Proptypes.shape({
    o: Proptypes.string,
    c: Proptypes.string,
  }),
  coin: Proptypes.string,
};

function Side() {
  const [ethbusd, setEthbusd] = useState({});
  const [bnbbusd, setBnbbusd] = useState({});
  const [paxgbusd, setPaxgbusd] = useState({});

  const [error, setError] = useState('');

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { response } = await serverless.createExecution('GetTicker', 'ETHBUSD');
        const { ticker } = JSON.parse(response);
        setEthbusd(ticker);
      } catch (err) {
        setError(err);
      }
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { response } = await serverless.createExecution('GetTicker', 'BNBBUSD');
        const { ticker } = JSON.parse(response);
        setBnbbusd(ticker);
      } catch (err) {
        setError(err);
      }
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { response } = await serverless.createExecution('GetTicker', 'PAXGBUSD');
        const { ticker } = JSON.parse(response);
        setPaxgbusd(ticker);
      } catch (err) {
        setError(err);
      }
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    error === '' ? (
      <div className="flex flex-col flex-grow">
        <h2 className="mb-5 text-2xl text-center  border-b shadow-inner shadow-secondary">Tickers:</h2>
        <div className="p-2 flex flex-col text-xl justify-center text-secondary-content">
          <div className="flex flex-col md:flex-row md:space-x-2 xl:flex-row xl:space-x-2">
            <TickerDisplay ticker={ethbusd} coin="ETH" />
            <TickerDisplay ticker={bnbbusd} coin="BNB" />
          </div>
          <TickerDisplay ticker={paxgbusd} coin="PAXG" />
        </div>
        <Binance />
      </div>
    ) : null
  );
}

export default Side;
