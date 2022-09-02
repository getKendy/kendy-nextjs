import React, { useEffect, useState } from 'react'
// import { useSession } from 'next-auth/react'
import axios from 'axios'

// import Api from '../Binance/Api'

const AlertSide = ({ baros }) => {
  const [ethbusd, setEthbusd] = useState({})
  const [bnbbusd, setBnbbusd] = useState({})
  const [paxgbusd, setPaxgbusd] = useState({})
  // const {data:session}=useSession()
  // console.log(session)

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


  const TickerDisplay = ({ ticker, coin }) => (
    <div className='flex flex-row justify-center md:flex-col-reverse space-x-3 mb-5 shadow shadow-primary p-2 rounded-xl'>
      <div className='flex space-x-2 justify-center'>
        <div className='font-bold'>{coin}/BUSD:</div>
        <div>
          ${(+(ticker.c)).toFixed(2)}
        </div>
      </div>
      <div className='md:text-sm text-center justify-center flex space-x-2'>
        <span>24h:</span>
        {(+(ticker?.c) - +(ticker?.o)) < 0 ?
          <div className="text-red-600"> ↘︎ ${(+(ticker.c) - +(ticker.o)).toFixed()}</div>
          :
          <div className="text-green-600"> ↗︎ ${(+(ticker.c) - +(ticker.o)).toFixed()}</div>
        }
        <span> ({(+(ticker?.c) * 100 / +(ticker?.o) - 100).toFixed(2)}%)</span>
      </div>
    </div>
  )

  return (
    <div className='flex flex-col flex-grow text-primary-content'>
      <h2 className='mb-5 text-2xl text-center  border-b shadow-inner shadow-secondary'>Tickers:</h2>
      <div className='p-2 flex flex-col text-xl justify-center'>
        <TickerDisplay ticker={ethbusd} coin='ETH' />
        <TickerDisplay ticker={bnbbusd} coin='BNB' />
        <TickerDisplay ticker={paxgbusd} coin='PAXG' />
      </div>
      {/* <Api /> */}
    </div>
  )
}

export default AlertSide