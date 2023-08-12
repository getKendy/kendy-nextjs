import React, { useEffect, useRef, useState } from 'react';
// import { Query } from 'appwrite';
import axios from 'axios';
import Image from 'next/image';
import useAlertStore from '../../utils/store/alert';
import { account, getJWT } from '../../utils/sdk';
import { formatDateAlert } from '../../utils/formatDate';
import useAutotradeStore from '../../utils/store/autotrade';

function Grid() {
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { lastAlert, addAlert } = useAlertStore();
  const checkboxAllowAudio = useRef(false);
  const rangeAudioLevel = useRef(25);
  const [prefs, setPrefs] = useState({});
  const { autotrade, profitPerc, tradePerc } = useAutotradeStore();

  const playAlert = () => {
    const ding = new Audio('ding.mp3');
    ding.volume = +rangeAudioLevel.current.value / 100 || 0.5;
    if (checkboxAllowAudio.current.checked) {
      ding.play();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let data = {};
      try {
        // const { data } = await axios.get(`/api/backend/alert/?size=10&page=${currentPage}`)
        if (prefs.binanceAlerts && !prefs.kucoinAlerts) {
          data = await axios.get(`/api/fastapi/alerts?page=${currentPage}&exchange=binance&jwt=${await getJWT()}`);
        } else if (!prefs.binanceAlerts && prefs.kucoinAlerts) {
          data = await axios.get(`/api/fastapi/alerts?page=${currentPage}&exchange=kucoin&jwt=${await getJWT()}`);
        } else {
          data = await axios.get(`/api/fastapi/alerts?page=${currentPage}&exchange=all&jwt=${await getJWT()}`);
        }
        data = data.data;
        // console.log(data);
        if (data.items[0]) {
          setAlerts(data.items);
          setTotalPages(data.pages);
          if (!lastAlert && currentPage === 1) {
            // console.log('setting lastalert for the fist time')
            addAlert(data.items[0]);
            return;
          }

          // eslint-disable-next-line no-underscore-dangle
          if (lastAlert._id !== data.items[0]._id && currentPage === 1) {
            // console.log('new alert')
            addAlert(data.items[0]);
            if (
              (data.items[0].exchange === 'binance' && prefs.binanceAlerts) ||
              (data.items[0].exchange === 'kucoin' && prefs.kucoinAlerts)
            ) {
              playAlert();
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentPage, totalPages, addAlert, lastAlert, prefs]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await account.getPrefs();
      // console.log(data);
      setPrefs(data);
    };
    fetchData();
  }, []);

  const handlePageUp = () => {
    // console.log({ 'page': currentPage })
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageDown = () => {
    // console.log({ 'page': currentPage })
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formSubmitHandler = (e) => {
    e.prevendivefault();
  };

  async function handleBuyMarketKucoin(coin) {
    try {
      // console.log(coin);
      const { data } = await axios.post(`/api/kucoin/marketbuy?jwt=${await getJWT()}`, { coin, profitPerc, tradePerc });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function checkBuyLimitKucoin(trade) {
    try {
      console.log(trade);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleBuyLimitKucoin(coin) {
    try {
      // console.log(coin);
      const { data } = await axios.post(`/api/kucoin/limitbuy?jwt=${await getJWT()}`, { coin, profitPerc, tradePerc });
      console.log(data);
      checkBuyLimitKucoin(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col flex-grow items-center justify-around bg-base-200">
      {/* <Test></Test> */}
      <div className="flex justify-around text-2xl w-full text-center border-b shadow-inner shadow-secondary">
        <div>Scanner Alerts:</div>
        <div>
          <div className="label cursor-pointer space-x-2">
            <span className="label-text">Enable Binance</span>
            <input
              id="binanceAlerts"
              type="checkbox"
              checked={prefs.binanceAlerts ?? true}
              className="checkbox checkbox-primary"
              onChange={() => {
                setPrefs({ ...prefs, binanceAlerts: !prefs.binanceAlerts });
                account.updatePrefs({ ...prefs, binanceAlerts: !prefs.binanceAlerts });
              }}
            />
          </div>
        </div>
        <div>
          <div className="label cursor-pointer space-x-2">
            <span className="label-text">Enable Kucoin</span>
            <input
              id="kucoinAlerts"
              type="checkbox"
              checked={prefs.kucoinAlerts ?? true}
              className="checkbox checkbox-primary"
              onChange={() => {
                setPrefs({ ...prefs, kucoinAlerts: !prefs.kucoinAlerts });
                account.updatePrefs({ ...prefs, kucoinAlerts: !prefs.kucoinAlerts });
              }}
            />
          </div>
        </div>
      </div>
      {alerts.length > 0 ? (
        <div className="m-1 p-1 w-full shadow shadow-primary rounded-xl">
          <form onSubmit={formSubmitHandler}>
            <div className="flex justify-around items-center">
              <div>
                <div className="label cursor-pointer space-x-2">
                  <span className="label-text">Enable Audio Alerts</span>
                  <input
                    id="allowAudio"
                    type="checkbox"
                    defaultChecked={false}
                    ref={checkboxAllowAudio}
                    className="checkbox checkbox-primary"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="text-center ">
                  Alert Volume
                  <input
                    id="audioLevel"
                    type="range"
                    min="0"
                    max="100"
                    ref={rangeAudioLevel}
                    defaultValue={25}
                    className="range range-md range-secondary bg-primary"
                    step="5"
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="mb-2">
            <div className="flex flex-wrap justify-evenly">
              {alerts.length > 0
                ? alerts.map((alert) => (
                    <div
                      key={alert.$id}
                      className={`m-1 p-1 shadow shadow-primary-content rounded-2xl ${
                        (alert.exchange === 'binance' && !prefs.binanceAlerts && 'hidden') ||
                        (alert.exchange === 'kucoin' && !prefs.kucoinAlerts && 'hidden')
                      }`}
                    >
                      <div className="flex gap-x-2 justify-between items-center">
                        <div>
                          {alert.exchange === 'kucoin' && (
                            <Image alt="kucoin" src="/kucoin.png" width={40} height={40} />
                          )}
                          {alert.exchange === 'binance' && (
                            <Image alt="binance" src="/binance.png" width={40} height={40} />
                          )}
                        </div>
                        <div className="text-2xl font-bold">{alert.market}</div>
                      </div>
                      <div className="mt-1 flex text-xs justify-between font-bold">
                        <div>{formatDateAlert(alert.date)}</div>
                        <div className="text-primary-focus font-extrabold">{alert.timeframe}</div>
                      </div>
                      <div className="mt-1 flex justify-between items-center text-xs">
                        <div>24h Vol. {alert.volume24h} ₿</div>
                        <div className={`font-bold ${alert.trend24h > 0.0 ? 'text-green-500' : 'text-red-500'}`}>
                          {alert.trend24h} %
                        </div>
                      </div>
                      <div className="text-primary-focus font-bold border-b">Close: {alert.close}</div>
                      <div className="flex justify-evenly items-center">
                        <div>BB</div>
                        <div className="text-xs">
                          <div>(low / medium)</div>
                          <div>(upper / perc)</div>
                        </div>
                      </div>
                      <div className="border-b">
                        <div className="flex justify-evenly">
                          <div>{alert.bbl}</div>
                          <div>/</div>
                          <div>{alert.bbm}</div>
                        </div>
                        <div className="flex justify-evenly">
                          <div>{alert.bbu}</div>
                          <div>/</div>
                          <div>{alert.bbb}%</div>
                        </div>
                      </div>
                      <div className="text-center">
                        Stoch <span className="mr-5 text-xs">(K/D)</span>
                        {alert.stochk}/{alert.stockd}
                      </div>
                      <div className="items-center text-center">
                        {alert.exchange === 'kucoin' && (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className={`btn btn-sm  ${autotrade ? 'btn-primary' : 'btn-error'}`}
                              onClick={() => handleBuyMarketKucoin(alert)}
                            >
                              market buy
                            </button>
                            <button
                              type="button"
                              className={`btn btn-sm  ${autotrade ? 'btn-secondary' : 'btn-error'}`}
                              onClick={() => handleBuyLimitKucoin(alert)}
                            >
                              limit buy
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
          {/* small view */}
        </div>
      ) : (
        <div className="h-screen text-center ">Alerts on 1, 2, 3 and 5min. timeframe are active</div>
      )}
      {/* Pagination */}
      {alerts.length > 0 ? (
        <div className="mb-20 md:mb-2 lg:mb-20  btn-group justify-center mt-1">
          <button
            type="button"
            className={currentPage === 1 ? 'btn btn-sm btn-primary btn-disabled' : 'btn btn-sm btn-primary'}
            onClick={() => {
              handlePageDown();
            }}
          >
            «
          </button>
          <button type="button" className="btn btn-sm">
            Page {currentPage}
          </button>
          <button
            type="button"
            className={currentPage >= totalPages ? 'btn btn-sm btn-primary btn-disabled' : 'btn btn-sm btn-primary'}
            onClick={() => {
              handlePageUp();
            }}
          >
            »
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Grid;
