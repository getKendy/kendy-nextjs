import React, { useEffect, useRef, useState } from 'react';
import { Query } from 'appwrite';
import axios from 'axios';
import Image from 'next/image';
import useAlertStore from '../../utils/store/alert';
import { account, databases, getJWT } from '../../utils/sdk';
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
      try {
        // const { data } = await axios.get(`/api/backend/alert/?size=10&page=${currentPage}`)
        const data = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_GETKENDY_DATA,
          process.env.NEXT_PUBLIC_APPWRITE_ALERTS,
          [Query.orderDesc('$id'), Query.limit(10), Query.offset((currentPage - 1) * 10 || 0)]
        );
        // console.log(data);
        if (data.documents[0]) {
          setAlerts(data.documents);
          setTotalPages(data.total / 10);
          if (!lastAlert && currentPage === 1) {
            // console.log('setting lastalert for the fist time')
            addAlert(data.documents[0]);
            return;
          }

          if (lastAlert.$id !== data.documents[0].$id && currentPage === 1) {
            // console.log('new alert')
            addAlert(data.documents[0]);
            if (
              (data.documents[0].exchange === 'binance' && prefs.binanceAlerts) ||
              (data.documents[0].exchange === 'kucoin' && prefs.kucoinAlerts)
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
  }, [currentPage, totalPages, addAlert, lastAlert]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await account.getPrefs();
      console.log(data);
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

  async function handleBuyKucoin(coin) {
    try {
      // console.log(coin);
      const { data } = await axios.post(`/api/kucoin/buy?jwt=${await getJWT()}`, { coin, profitPerc, tradePerc });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-around bg-base-200">
      {/* <Test></Test> */}
      <h2 className="text-2xl text-center border-b shadow-inner shadow-secondary">Scanner Alerts:</h2>
      {alerts.length > 0 ? (
        <div className="m-1 p-1 justify-center items-center self-center shadow shadow-primary rounded-xl">
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
              <div>
                <div className="label cursor-pointer space-x-2">
                  <span className="label-text">Enable Binance Alerts</span>
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
                  <span className="label-text">Enable Kucoin Alerts</span>
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
            {/* <thead className="">
              <tr className="">
                <th>Date</th>
                <th>Exchange</th>
                <th className="truncate">Interval</th>
                <th>Market</th>
                <th>Volume 24h</th>
                <th>Close</th>
                <th className="">
                  <div className="flex space-x-1">
                    <div>BBL</div>
                    <div>/</div>
                    <div>BBM</div>
                  </div>
                  <div className="flex space-x-1">
                    <div>BBU</div>
                    <div>/</div>
                    <div>BBB</div>
                  </div>
                </th>
                <th className="text-center">Sto %K/%D</th>
                <th className="text-center">Trend 24h</th>
                <th className="text-center w-14"> </th>
              </tr>
            </thead> */}
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
                      <div className="flex justify-between items-center">
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
                      <div className="flex justify-between items-center font-bold">
                        <div>{formatDateAlert(alert.date)}</div>
                        <div>{alert.timeframe}</div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <div>24h Vol. {alert.volume24h} ₿</div>
                        <div>{alert.trend24h}</div>
                      </div>
                      <div className="text-center text-primary-focus">Candle Close {alert.close}</div>
                      <div className="flex justify-evenly items-center">
                        <div>BB</div>
                        <div className="text-xs">
                          <div>(low / medium)</div>
                          <div>(upper / perc)</div>
                        </div>
                      </div>
                      <div className="">
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
                        Stoch {alert.stochk}/{alert.stockd}
                      </div>
                      <div className="items-center text-center">
                        {alert.exchange === 'kucoin' && (
                          <button
                            type="button"
                            className={`btn btn-sm  ${autotrade ? 'btn-primary' : 'btn-error'}`}
                            onClick={() => handleBuyKucoin(alert)}
                          >
                            market buy
                          </button>
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
