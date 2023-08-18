'use client'
import { motion, AnimatePresence } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import type { Baros } from '~/utils/types'

interface BaroProp { name: string, baro1: number, baro5: number, baro60: number }

const ShowBaro = (props: BaroProp) => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap md:gap-1 items-center text-sm'>
      <div className='flex flex-col sm:flex-row flex-wrap sm:gap-1 items-center justify-between'>
        <div className='font-bold'>{props.name}</div>
        <div className={props.baro1 > props.baro5 ? 'text-green-600' : 'text-red-600'}>{props.baro1.toFixed(2)}%</div>
      </div>
      <div className='text-xs'>1h: {props.baro1 > props.baro60 ? `↗︎ ${(props.baro1 * 100 / props.baro60 - 100).toFixed(2)}` : `↘︎ ${(props.baro1 * 100 / props.baro60 - 100).toFixed(2)}`}%</div>
    </div>
  )
}
// {((begin * 100) / end - 100).toFixed(2)}%
const BaroStats = () => {
  const [baros, setBaros] = useState<Baros | null>()
  const [timer, setTimer] = useState(30000)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/fastapi/baros?page=1&size=60')
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data }: { data: Baros } = await res.json()
        setBaros(data)
        if (timer !== 30000) {
          setTimer(30000)
        }
      } catch (error) {
        if (timer !== 300000) {
          setTimer(300000)
        }
      }
    }
    void fetchData()
    const interval = setInterval(() => {
      void fetchData();
    }, timer);
    return () => clearInterval(interval);
  }, [timer])

  if (!baros) {
    return <AnimatePresence>

      <motion.div
        className='m-1 mb-3 p-1 flex flex-wrap flex-col flex-grow gap-1 justify-around border border-slate-500 rounded-lg shadow-lg shadow-slate-500 animate-pulse'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className='flex flex-wrap sm:gap-4 items-center justify-around'>
          <ShowBaro name='BTC' baro1={0} baro5={0} baro60={0} />
          <ShowBaro name='ETH' baro1={0} baro5={0} baro60={0} />
          <ShowBaro name='BNB' baro1={0} baro5={0} baro60={0} />
        </div>
        <div className='flex flex-wrap sm:gap-4 items-center justify-around'>
          <ShowBaro name='BTC-Alts' baro1={0} baro5={0} baro60={0} />
          <ShowBaro name='ETH-Alts' baro1={0} baro5={0} baro60={0} />
          <ShowBaro name='BNB-Alts' baro1={0} baro5={0} baro60={0} />
        </div>
      </motion.div>
    </AnimatePresence>
  }

  return (
    <AnimatePresence>
      <motion.div
        className='m-1 mb-3 p-1 flex flex-wrap flex-col flex-grow gap-1 justify-around border border-slate-500 rounded-lg shadow-lg shadow-slate-500'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className='flex flex-wrap sm:gap-4 items-center justify-around'>
          <ShowBaro name='BTC' baro1={baros.items[0]?.btcStrength ?? 0} baro5={baros.items[4]?.btcStrength ?? 0} baro60={baros.items[59]?.btcStrength ?? 0} />
          <ShowBaro name='ETH' baro1={baros.items[0]?.ethStrength ?? 0} baro5={baros.items[4]?.ethStrength ?? 0} baro60={baros.items[59]?.ethStrength ?? 0} />
          <ShowBaro name='BNB' baro1={baros.items[0]?.bnbStrength ?? 0} baro5={baros.items[4]?.bnbStrength ?? 0} baro60={baros.items[59]?.bnbStrength ?? 0} />
        </div>
        <div className='flex flex-wrap sm:gap-4 items-center justify-around'>
          <ShowBaro name='BTC-Alts' baro1={baros.items[0]?.altBtcStrength ?? 0} baro5={baros.items[4]?.altBtcStrength ?? 0} baro60={baros.items[59]?.altBtcStrength ?? 0} />
          <ShowBaro name='ETH-Alts' baro1={baros.items[0]?.altEthStrength ?? 0} baro5={baros.items[4]?.altEthStrength ?? 0} baro60={baros.items[59]?.altEthStrength ?? 0} />
          <ShowBaro name='BNB-Alts' baro1={baros.items[0]?.altBnbStrength ?? 0} baro5={baros.items[4]?.altBnbStrength ?? 0} baro60={baros.items[59]?.altBnbStrength ?? 0} />
        </div>

      </motion.div>
    </AnimatePresence>
  )
}

export default BaroStats