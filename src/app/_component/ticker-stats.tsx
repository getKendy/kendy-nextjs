'use client'
import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'


interface TickerProps { market: string, exchange: string }
interface TickerState { symbol: string, market: string, c: string, o: string, h: string, l: string, v: string, q: string }

const TickerDisplay = (props: TickerProps) => {
  const [ticker, setTicker] = useState<TickerState | null>()
  const [timer, setTimer] = useState(10000)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/fastapi/tickerredis?market=${props.market}&exchange=${props.exchange}`)
        const {data}: {data: TickerState}  = await res.json()
        // console.log(data)
        setTicker(data)
        if (timer !== 3000) {
          setTimer(3000)
        }
      } catch (error) {
        if (timer !== 300000) {
          setTimer(300000)
        }
        console.log(error)
      }
    }
    void fetchData()
    const interval = setInterval(() => {
      void fetchData();
    }, timer);
    return () => clearInterval(interval);
  }, [])

  if (!ticker) {
    return <motion.div key={`notick${props.market}`}
      className='p-1 flex flex-col border shadow-lg rounded-lg animate-pulse border-slate-500 shadow-slate-500 text-slate-400'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='font-bold'>
        {props.market} loading
      </div>
      <div className="md:text-sm text-center justify-center items-center flex space-x-2">
        <span>24h:</span>
        <div> ↘︎ $0</div>
        <span>0%</span>
      </div>
    </motion.div>
  }
  return (
    <motion.div key={`tick${props.market}`}
      className={`p-1 flex flex-col border shadow-lg rounded-lg text-sm ${ticker.c > ticker.o ? 'shadow-green-600 border-green-600' : 'shadow-red-600 border-red-600'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className='flex gap-2 justify-around'>

        <div className='font-bold'>{ticker.symbol} </div>
        <div className='text-slate-300'>${(+ticker.c).toFixed(2)}</div>
      </div>
      <div className="text-xs text-center justify-center items-center flex space-x-2">

        {+ticker?.c - +ticker?.o > 0 ? (
          (+ticker?.c * 100) / +ticker?.o - 100 > 1 ? (
            <div className="text-green-600">24h: ↗︎ ${(+ticker.c - +ticker.o).toFixed(2)}</div>
          ) : (
            <div className="text-slate-400">24h: ↗︎ ${(+ticker.c - +ticker.o).toFixed(2)}</div>
          )
        ) : (+ticker?.c * 100) / +ticker?.o - 100 < -1 ? (
          <div className="text-red-600">24h: ↘︎ ${(+ticker.c - +ticker.o).toFixed(2)}</div>
        ) : (
          <div className="text-slate-400">24h: ↘︎ ${(+ticker.c - +ticker.o).toFixed(2)}</div>
        )}
        <span>
          {' '}
          ({((+ticker?.c * 100) / +ticker?.o - 100).toFixed(2)}
          %)
        </span>
      </div>
    </motion.div>
  )
}

const TickerStats = () => {
  return (
    <AnimatePresence>
      <div
        className='flex flex-wrap flex-grow gap-2 items-center justify-around'
      >
        <TickerDisplay market='BTCUSDT' exchange='binance' />
        <TickerDisplay market='ETHUSDT' exchange='binance' />
        <TickerDisplay market='BNBUSDT' exchange='binance' />
        <TickerDisplay market='PAXGUSDT' exchange='binance' />
      </div>
    </AnimatePresence>
  )
}


export default TickerStats