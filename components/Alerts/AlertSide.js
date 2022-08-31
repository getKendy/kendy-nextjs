import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AlertSide = ({ baros }) => {
  const [ethbusd, setEthbusd] = useState({})
  const [bnbbusd, setBnbbusd] = useState({})
  const [paxgbusd, setPaxgbusd] = useState({})
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/backend/ticker/?symbol=ETHBUSD')
      // console.log({ 'ticker': data })
      setEthbusd(data)
    }
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/backend/ticker/?symbol=BNBBUSD')
      // console.log({'ticker':data})
      setBnbbusd(data)
    }
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/backend/ticker/?symbol=PAXGBUSD')
      // console.log({'ticker':data})
      setPaxgbusd(data)
    }
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 5000)
    return () => clearInterval(interval)
  }, [])


  const TickerDisplay = ({ ticker,coin }) => (
    <div className='flex flex-row justify-center md:flex-col-reverse space-x-3 mb-5'>
      <div className='flex space-x-2'>
        <div className='font-bold'>{coin}/BUSD:</div>
        <div>
          ${(+(ticker.c)).toFixed(2)}
        </div>
      </div>
      <div className='text-center md:text-sm'>{(+(ticker?.c) - +(ticker?.o)) < 0 ?
        <div className="text-red-600">24h: ↘︎ ${(+(ticker.c) - +(ticker.o)).toFixed()} ({(+(ticker?.c) * 100 / +(ticker?.o) - 100).toFixed(2)}%)</div>
        :
        <div className="text-green-600">24h: ↗︎ ${(+(ticker.c) - +(ticker.o)).toFixed()} ({(+(ticker?.c) * 100 / +(ticker?.o) - 100).toFixed(2)}%)</div>
      }</div>
    </div>
  )

  return (
    <div className='flex flex-col flex-grow '>
      <h2 className='text-2xl text-center border-b shadow-inner shadow-secondary'>Tickers:</h2>
      <div className='flex flex-col md:flex-row md:space-x-5 text-xl justify-center'>
        <TickerDisplay ticker={ethbusd} coin='ETH' />
        <TickerDisplay ticker={bnbbusd} coin='BNB'/>
        <TickerDisplay ticker={paxgbusd} coin='PAXG'/>
      </div>
    </div>
  )
}

export default AlertSide