import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { formatDate } from '../../lib/formatDate'

const AlertStats = ({ baros }) => {
    const [btcbusd, setBtcbusd] = useState({})


    // fetch btc ticker
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/backend/ticker/?symbol=BTCBUSD')
            // console.log({'ticker':data})
            setBtcbusd(data)
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const UpDownRender = ({ begin, end, timeframe }) => {
        // console.log(begin, end, timeframe)
        return (
            <div className={begin * 100 / end - 100 > 0 ?
                begin * 100 / end - 100 > 1 ?
                    begin * 100 / end - 100 > 5 ?
                        'p-1 m-1 rounded-lg  shadow-lg text-white bg-green-800 shadow-green-600 flex items-center justify-center'
                        : 'p-1 m-1 rounded-lg  shadow-md  bg-green-500 shadow-green-300 flex items-center justify-center'
                    : 'p-1 m-1 rounded-lg  shadow-inner shadow-green-500 flex items-center justify-center'
                : begin * 100 / end - 100 < -1 ?
                    begin * 100 / end - 100 < -5 ?
                        'p-1 m-1 rounded-lg shadow-lg text-white bg-red-800 shadow-red-600 flex items-center justify-center'
                        : 'p-1 m-1 rounded-lg shadow-md  bg-red-500 shadow-red-300 flex items-center justify-center'
                    : 'p-1 m-1 rounded-lg shadow-inner shadow-red-500 flex items-center justify-center'
            }>
                <span>{timeframe > 59 ? <>{timeframe / 60}h</> : <>{timeframe}m</>}:</span>
                {begin * 100 / end - 100 > 0 ?
                    begin * 100 / end - 100 > 1 ?
                        <div className="text-sm text-white"> ↗︎  {(begin * 100 / end - 100).toFixed(2)}%</div>
                        : <div className="text-sm text-green-500"> ↗︎  {(begin * 100 / end - 100).toFixed(2)}%</div>
                    :
                    begin * 100 / end - 100 < -1 ?
                        <div className="text-sm text-white"> ↘︎ {(begin * 100 / end - 100).toFixed(2)}%</div>
                        : <div className="text-sm text-red-500"> ↘︎ {(begin * 100 / end - 100).toFixed(2)}%</div>
                }
            </div>
        )
    }
    // console.log(baro)
    return (
        <div className="stats shadow flex flex-col md:flex-row place-items-center bg-base-200">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                        </path></svg>
                </div>
                <div className="stat-title truncate">BTC - Fiat Binance Dominance</div>
                <div className="stat-value">{baros[0]?.btcStrength.toFixed(2)}%</div>
                <div className="stat-desc truncate">{formatDate(baros[0]?.date)}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4">
                        </path></svg>
                </div>
                <div className="stat-title truncate">BTC - Alts Binance Dominance</div>
                <div className="stat-value">{baros[0]?.altBtcStrength.toFixed(2)}%</div>
                <div className='flex flex-row'>
                    <UpDownRender timeframe={5} begin={baros[0]?.altBtcStrength} end={baros[4]?.altBtcStrength} />
                    <UpDownRender timeframe={15} begin={baros[0]?.altBtcStrength} end={baros[14]?.altBtcStrength} />
                </div>

                <div className='flex flex-row'>
                    <UpDownRender timeframe={30} begin={baros[0]?.altBtcStrength} end={baros[29]?.altBtcStrength} />
                    <UpDownRender timeframe={60} begin={baros[0]?.altBtcStrength} end={baros[59]?.altBtcStrength} />
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4">
                        </path></svg>
                </div>
                <div className="stat-title">Ticker BTC/BUSD</div>
                <div className="stat-value">${+(btcbusd.c)}</div>
                {(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100) > 0 ?
                    (+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100) > 1 ?
                        (+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100) > 5 ?
                            <div className="text-white bg-green-800 shadow-lg shadow-green-600 rounded-lg pl-2 ">
                                24h: ↗︎ ${(+(btcbusd.c) - +(btcbusd.o)).toFixed()} ({(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100).toFixed(2)}%)
                            </div>
                            : <div className="text-white bg-green-500 shadow-md shadow-green-300 rounded-lg pl-2 ">
                                24h: ↗︎ ${(+(btcbusd.c) - +(btcbusd.o)).toFixed()} ({(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100).toFixed(2)}%)
                            </div>
                        : <div className=" text-green-500">
                            24h: ↗︎ ${(+(btcbusd.c) - +(btcbusd.o)).toFixed()} ({(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100).toFixed(2)}%)
                        </div>
                    :
                    (+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100) < -1 ?
                        (+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100) < -5 ?
                            <div className=" text-white bg-red-800 shadow-lg shadow-red-600 rounded-lg pl-2 ">
                                24h: ↘︎ ${(+(btcbusd.c) - +(btcbusd.o)).toFixed()} ({(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100).toFixed(2)}%)
                            </div>
                            : <div className=" text-white bg-red-500 shadow-md shadow-red-300 rounded-lg pl-2 ">
                                24h: ↘︎ ${(+(btcbusd.c) - +(btcbusd.o)).toFixed()} ({(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100).toFixed(2)}%)
                            </div>
                        : <div className=" text-red-500">
                            24h: ↘︎ ${(+(btcbusd.c) - +(btcbusd.o)).toFixed()} ({(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100).toFixed(2)}%)
                        </div>
                }
            </div>

        </div>
    )
}

export default AlertStats