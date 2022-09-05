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

    const UpDownRender = ({ timeframe }) => {

        return (
            <div className={baros[0]?.altBtcStrength - baros[timeframe - 1]?.altBtcStrength > 0 ?
                baros[0]?.altBtcStrength - baros[timeframe - 1]?.altBtcStrength > 1 ?
                    'p-1 m-1 rounded-lg  shadow text-white bg-green-500 shadow-green-500 flex items-center justify-center'
                    : 'p-1 m-1 rounded-lg  shadow-inner shadow-green-500 flex items-center justify-center'
                : baros[0]?.altBtcStrength - baros[timeframe - 1]?.altBtcStrength < -1 ?
                    'p-1 m-1 rounded-lg shadow text-white bg-red-500 shadow-red-500 flex items-center justify-center'
                    : 'p-1 m-1 rounded-lg shadow-inner shadow-red-500 flex items-center justify-center'
            }>
                <span>{timeframe > 59 ? <>{timeframe / 60}h</> : <>{timeframe}m</>}:</span>
                {baros[0]?.altBtcStrength - baros[timeframe - 1]?.altBtcStrength > 0 ?
                    baros[0]?.altBtcStrength - baros[timeframe - 1]?.altBtcStrength > 1 ?
                        <div className="text-sm text-white"> ↗︎  {(baros[0]?.altBtcStrength * 100 / baros[timeframe - 1]?.altBtcStrength - 100).toFixed(2)}%</div>
                        : <div className="text-sm text-green-500"> ↗︎  {(baros[0]?.altBtcStrength * 100 / baros[timeframe - 1]?.altBtcStrength - 100).toFixed(2)}%</div>
                    :
                    baros[0]?.altBtcStrength - baros[timeframe - 1]?.altBtcStrength < -1 ?
                        <div className="text-sm text-white"> ↘︎ {(baros[0]?.altBtcStrength * 100 / baros[timeframe - 1]?.altBtcStrength - 100).toFixed(2)}%</div>
                        : <div className="text-sm text-red-500"> ↘︎ {(baros[0]?.altBtcStrength * 100 / baros[timeframe - 1]?.altBtcStrength - 100).toFixed(2)}%</div>
                }
            </div>
        )
    }
    // console.log(baro)
    return (
        <div className="stats shadow flex flex-col md:flex-row place-items-center bg-base-200">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title truncate">BTC - Fiat Binance Dominance</div>
                <div className="stat-value">{baros[0]?.btcStrength.toFixed(2)}%</div>
                <div className="stat-desc truncate">{formatDate(baros[0]?.date)}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                </div>
                <div className="stat-title truncate">BTC - Alts Binance Dominance</div>
                <div className="stat-value">{baros[0]?.altBtcStrength.toFixed(2)}%</div>
                <div className='flex flex-row'>
                    <UpDownRender timeframe={5} />
                    <UpDownRender timeframe={15} />
                </div>

                <div className='flex flex-row'>
                    <UpDownRender timeframe={30} />
                    <UpDownRender timeframe={60} />
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <div className="stat-title">Ticker BTC/BUSD</div>
                <div className="stat-value">${+(btcbusd.c)}</div>
                {(+(btcbusd?.c) - +(btcbusd?.o)) < 0 ?
                    <div className=" text-red-500">24h: ↘︎ ${(+(btcbusd.c) - +(btcbusd.o)).toFixed()} ({(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100).toFixed(2)}%)</div>
                    :
                    <div className=" text-green-500">24h: ↗︎ ${(+(btcbusd.c) - +(btcbusd.o)).toFixed()} ({(+(btcbusd?.c) * 100 / +(btcbusd?.o) - 100).toFixed(2)}%)</div>
                }
            </div>

        </div>
    )
}

export default AlertStats