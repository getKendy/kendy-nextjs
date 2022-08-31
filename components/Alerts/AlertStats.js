import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {formatDate} from '../../lib/formatDate'

const AlertStats = ({baros}) => {
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

    // console.log(baro)
    return (
        <div className="stats shadow grid place-items-center bg-base-200">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title">BTC - Fiat Binance Dominance</div>
                <div className="stat-value">{baros[0]?.btcStrength.toFixed(2)}%</div>
                <div className="stat-desc">{formatDate(baros[0]?.date)}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                </div>
                <div className="stat-title">BTC - Alts Binance Dominance</div>
                <div className="stat-value">{baros[0]?.altBtcStrength.toFixed(2)}%</div>
                <div className='flex flex-row space-x-2 mb-1'>
                    <div className='border-b border-r border-base-300'>

                        {baros[5]?.altBtcStrength && baros[0]?.altBtcStrength - baros[4]?.altBtcStrength < 0 ?
                            <div className="text-sm text-red-500">5m: ↘︎ {(baros[0]?.altBtcStrength - baros[4]?.altBtcStrength).toFixed(2)} ({(baros[0]?.altBtcStrength * 100 / baros[4]?.altBtcStrength - 100).toFixed(2)}%)</div>
                            :
                            <div className="text-sm text-green-500">5m: ↗︎ {(baros[0]?.altBtcStrength - baros[4]?.altBtcStrength).toFixed(2)} ({(baros[0]?.altBtcStrength * 100 / baros[4]?.altBtcStrength - 100).toFixed(2)}%)</div>
                        }
                    </div>
                    <div className='border-b border-l border-base-300'>

                        {baros[5]?.altBtcStrength && baros[0]?.altBtcStrength - baros[15]?.altBtcStrength < 0 ?
                            <div className="text-sm text-red-500">15m: ↘︎ {(baros[0]?.altBtcStrength - baros[14]?.altBtcStrength).toFixed(2)} ({(baros[0]?.altBtcStrength * 100 / baros[14]?.altBtcStrength - 100).toFixed(2)}%)</div>
                            :
                            <div className="text-sm text-green-500">15m: ↗︎ {(baros[0]?.altBtcStrength - baros[14]?.altBtcStrength).toFixed(2)} ({(baros[0]?.altBtcStrength * 100 / baros[14]?.altBtcStrength - 100).toFixed(2)}%)</div>
                        }
                    </div>
                </div>

                <div className='flex flex-row space-x-2'>

                    <div className='border-t border-r border-base-300'>

                        {baros[5]?.altBtcStrength && baros[0]?.altBtcStrength - baros[29]?.altBtcStrength < 0 ?
                            <div className="text-sm text-red-500">30m: ↘︎ {(baros[0]?.altBtcStrength - baros[29]?.altBtcStrength).toFixed(2)} ({(baros[0]?.altBtcStrength * 100 / baros[29]?.altBtcStrength - 100).toFixed(2)}%)</div>
                            :
                            <div className="text-sm text-green-500">30m: ↗︎ {(baros[0]?.altBtcStrength - baros[29]?.altBtcStrength).toFixed(2)} ({(baros[0]?.altBtcStrength * 100 / baros[29]?.altBtcStrength - 100).toFixed(2)}%)</div>
                        }
                    </div>
                    <div className='border-t border-l border-base-300'>

                        {baros[5]?.altBtcStrength && baros[0]?.altBtcStrength - baros[59]?.altBtcStrength < 0 ?
                            <div className="text-sm text-red-500">1h: ↘︎ {(baros[0]?.altBtcStrength - baros[59]?.altBtcStrength).toFixed(2)} ({(baros[0]?.altBtcStrength * 100 / baros[59]?.altBtcStrength - 100).toFixed(2)}%)</div>
                            :
                            <div className="text-sm text-green-500">1h: ↗︎ {(baros[0]?.altBtcStrength - baros[59]?.altBtcStrength).toFixed(2)} ({(baros[0]?.altBtcStrength * 100 / baros[59]?.altBtcStrength - 100).toFixed(2)}%)</div>
                        }
                    </div>

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