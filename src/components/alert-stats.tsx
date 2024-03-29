'use client'
import React, { useEffect, useState, type FormEvent } from 'react'
import Image from 'next/image';
import { AnimatePresence, Reorder, motion } from 'framer-motion';
// import { useAutotradeStore } from '@/store/global';
import { formatDate } from '@/utils/formatDate';
// import sdk, { getJWT } from '@/utils/sdk';
import sdk, { account } from '@/appwrite/sdk';
import axios from 'axios';
import type { Alert, Alerts } from '@/utils/types';
import { Models } from 'appwrite';
import { useAuthStore } from '@/store/global';


type Prefs = Models.Preferences & { binanceAlerts?: boolean, kucoinAlerts?: boolean } | null
type AlertProps = {
  blur?: boolean
  alert: Alert
  prefs: Prefs
}
// interface SettingsProps { prefs: Prefs, setPrefs: SetStateAction<Prefs> }
// interface ShowAlertProps { }

const ShowAlert = (props: AlertProps) => {
  const precision = 8

  return (
    <div
      // key={`alert${props.alert._id}`}
      // initial={{ opacity: 0, scale: 0.5 }}
      // animate={{ opacity: 1, scale: 1, x: 0 }}
      // exit={{ opacity: 0, scale: 0 }}
      className={`m-1 p-1 shadow shadow-primary rounded-2xl ${(props.alert.exchange === 'binance' && !props.prefs?.binanceAlerts && 'hidden') ||
        (props.alert.exchange === 'kucoin' && !props.prefs?.kucoinAlerts && 'hidden')
        } ${props.blur && 'blur'}`}
    >
      <div className="flex gap-x-2 justify-between items-center">
        <div className='h-12'>
          {props.alert.exchange === 'kucoin' && (
            <Image alt="kucoin" src="/kucoin.png" width={40} height={40} loading='lazy' />
          )}
          {props.alert.exchange === 'binance' && (
            <Image alt="binance" src="/binance.png" width={40} height={40} />
          )}
        </div>
        <div className="text-2xl font-bold">{props.alert.market}</div>
      </div>
      <div className="mt-1 flex text-xs justify-between font-bold">
        <div>{formatDate(props.alert.date, { localeMatcher: 'lookup', year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', })}</div>
        <div className="text-slate-400 font-extrabold">{props.alert.timeframe}</div>
      </div>
      <div className="mt-1 flex justify-between items-center text-xs">
        <div>24h Vol. {props.alert.volume24h} ₿</div>
        <div className={`font-bold ${props.alert.trend24h > 0.0 ? 'text-green-500' : 'text-red-500'}`}>
          {props.alert.trend24h} %
        </div>
      </div>
      <div className="text-secondary-focus font-bold border-b">Close: {props.alert.close.toFixed(precision)}</div>
      <div className="flex justify-evenly items-center">
        <div>BB</div>
        <div className="text-xs">
          <div>(low / medium)</div>
          <div>(upper / perc)</div>
        </div>
      </div>
      <div className="border-b">
        <div className="flex justify-evenly">
          <div>{(+props.alert.bbl).toFixed(precision)}</div>
          <div>/</div>
          <div>{(+props.alert.bbm).toFixed(precision)}</div>
        </div>
        <div className="flex justify-evenly">
          <div>{(+props.alert.bbu).toFixed(precision)}</div>
          <div>/</div>
          <div>{props.alert.bbb}%</div>
        </div>
      </div>
      <div className="text-center">
        Stoch <span className="mr-5 text-xs">(K/D)</span>
        {props.alert.stochk}/{props.alert.stockd}
      </div>
      {/* <div className="items-center text-center">
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
                              className={`btn btn-sm ${autotrade ? 'btn-secondary' : 'btn-error'}`}
                              onClick={() => handleBuyLimitKucoin(alert)}
                            >
                              limit buy
                            </button>
                          </div>
                        )}
                      </div> */}
    </div>
  )
}

const AlertStats = () => {
  const [alerts, setAlerts] = useState<Alert[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [lastAlert, setLastAlert] = useState<Alert | null>();
  const [checkboxAllowAudio, setCheckboxAllowAudio] = useState(false);
  const [rangeAudioLevel, setRangeAudioLevel] = useState(25);
  const [prefs, setPrefs] = useState<Prefs>({ binanceAlerts: true, kucoinAlerts: true });
  const { authStatus } = useAuthStore()
  // const { autotrade, profitPerc, tradePerc } = useAutotradeStore();



  useEffect(() => {
    const playAlert = async (checkboxAllowAudio: boolean, rangeAudioLevel: number) => {
      // console.log(checkboxAllowAudio)
      const ding = new Audio('ding.mp3');
      ding.volume = rangeAudioLevel / 100 || 0.5;
      if (checkboxAllowAudio) {
        ding.play();
      }
    };

    const fetchData = async () => {
      let data = null;
      try {
        if (prefs?.binanceAlerts && !prefs?.kucoinAlerts) {
          data = await axios.get(`/api/fastapi/alerts?page=${currentPage}&exchange=binance`);
        } else if (!prefs?.binanceAlerts && prefs?.kucoinAlerts) {
          data = await axios.get(`/api/fastapi/alerts?page=${currentPage}&exchange=kucoin`);
        } else {
          data = await axios.get(`/api/fastapi/alerts?page=${currentPage}&exchange=all`);
        }
        // console.log(data);
        // console.log(checkboxAllowAudio)
        // data = await data.json();
        data = data.data
        if (data.items[0]) {
          setAlerts(data.items);
          setTotalPages(data.pages);
          if (!lastAlert && currentPage === 1) {
            // console.log('setting lastalert for the fist time')
            setLastAlert(data.items[0]);
            return;
          }


          if (lastAlert && lastAlert._id !== data.items[0]._id && currentPage === 1) {
            // console.log('new alert')
            setLastAlert(data.items[0]);
            if (
              (data.items[0].exchange === 'binance' && prefs?.binanceAlerts) ??
              (data.items[0].exchange === 'kucoin' && prefs?.kucoinAlerts)
            ) {
              void playAlert(checkboxAllowAudio, rangeAudioLevel);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    // console.log(rangeAudioLevel)
    void fetchData();
    const interval = setInterval(() => {
      void fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, [checkboxAllowAudio, prefs?.binanceAlerts, prefs?.kucoinAlerts, rangeAudioLevel, currentPage, lastAlert]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sdk.getCurrentUserPrefs();
        // console.log(data);
        setPrefs(data);
      } catch (error) {

      }
    };
    void fetchData();
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



  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col flex-grow items-center justify-around">
      {/* <AnimatePresence key='aminateAlertStats'> */}

      <div className="flex justify-around text-2xl w-full text-center">
        <motion.div key='alertsScannerHeader' className='text-primary' initial={{ opacity: 0, scale: 0.5, x: -200 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0 }}>Scanner Alerts:</motion.div>
        <div>
          <div className="label cursor-pointer space-x-2">
            <span className="label-text text-slate-400">Enable Binance</span>
            <input
              id="binanceAlerts"
              type="checkbox"
              checked={prefs?.binanceAlerts ?? true}
              className="checkbox checkbox-primary"
              onChange={() => {
                void setPrefs({ ...prefs, binanceAlerts: !prefs?.binanceAlerts });
                authStatus && void account.updatePrefs({ ...prefs, binanceAlerts: !prefs?.binanceAlerts });
              }}
            />
          </div>
        </div>
        <div>
          <div className="label cursor-pointer space-x-2">
            <span className="label-text text-slate-400">Enable Kucoin</span>
            <input
              id="kucoinAlerts"
              type="checkbox"
              checked={prefs?.kucoinAlerts ?? true}
              className="checkbox checkbox-primary"
              onChange={() => {
                setPrefs({ ...prefs, kucoinAlerts: !prefs?.kucoinAlerts });
                authStatus && void account.updatePrefs({ ...prefs, kucoinAlerts: !prefs?.kucoinAlerts });
              }}
            />
          </div>
        </div>
      </div>
      {alerts?.length ?? 0 > 0 ? (
        <div className="m-1 p-1 w-full">
          <form onSubmit={formSubmitHandler}>
            <div className="flex justify-around items-center">
              <div>
                <div className="label cursor-pointer space-x-2">
                  <span className="label-text text-slate-400">Enable Audio Alerts</span>
                  <input
                    id="allowAudio"
                    className="checkbox checkbox-primary"
                    type="checkbox"
                    // defaultChecked={false}
                    checked={checkboxAllowAudio}
                    onChange={() => setCheckboxAllowAudio(!checkboxAllowAudio)}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="text-center text-slate-400">
                  Alert Volume
                  <input
                    id="audioLevel"
                    type="range"
                    min="0"
                    max="100"
                    className="range range-md range-secondary bg-primary"
                    step="5"
                    value={rangeAudioLevel}
                    onChange={(e: FormEvent<HTMLInputElement>) => setRangeAudioLevel(+e.currentTarget.value)}
                  />
                </div>
              </div>
            </div>
          </form>

          <div className="mb-2">
            <Reorder.Group className="flex flex-wrap justify-evenly" values={alerts || []} onReorder={setAlerts} draggable={false}>
              {(alerts?.length ?? 0 > 0)
                && alerts?.map((alert: Alert, index: number) => (
                  <Reorder.Item key={`wrap${alert._id}`} value={alert._id} initial={{ opacity: 0.5 }}  drag={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0.5 }}>
                    <ShowAlert alert={alert} prefs={prefs} blur={(!authStatus && index < 1) || (!authStatus && alert.timeframe === '1m') || (!authStatus && alert.timeframe === '2m')} />
                  </Reorder.Item>
                ))}
            </Reorder.Group>
          </div>
        </div>
      ) : (
        <div className="h-screen text-center text-primary">Alerts on 1, 2, 3 and 5min. timeframe are active</div>
      )}
      {/* Pagination */}
      {alerts?.length ?? 0 > 0 ? (
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

      {/* </AnimatePresence> */}
    </div>
  )
}

export default AlertStats