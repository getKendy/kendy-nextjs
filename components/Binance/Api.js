import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Api = () => {
  const [apiFound, setApiFound] = useState(false)
  const [balances, setBalances] = useState(null)
  const [total, setTotal] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/binance/secret/get')
        if (data) {
          setApiFound(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      if (apiFound) {
        const { data } = await axios.get('/api/binance/balance')
        setBalances(data)
        const totalBal = 0
        for (const balance of data) {
          totalBal += +(balance.btcValuation)
        }
        if (totalBal > 0) {
          setTotal(totalBal.toFixed(8))
        }
      }
    }
    fetchData()
    const interval = setInterval(() => {
      fetchData()
    }, 60000)
  }, [apiFound])


  const ApiFound = () => {
    return (
      <div className='mx-2 mb-2 p-1 border border-secondary rounded-lg shadow-lg'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-4 text-xl text-primary-content font-black'>
            <div>Balance Total:</div>
            <div>₿{total}</div>
          </div>
          <EditApi />
        </div>
        <div className='text-primary-content text-left'>
          {balances &&

            <div>
              <table className='w-full'>
                <thead>
                  <tr className='border-b'>
                    <th>Asset</th>
                    <th>Free</th>
                    <th>Used</th>
                    <th>BTC</th>
                  </tr>
                </thead>
                <tbody>
                  {balances.map((balance, index) => (
                    <tr key={index} className='border-b border-primary'>
                      <td>{balance.asset}</td>
                      <td>{balance.free}</td>
                      <td>{balance.locked}</td>
                      <td>{balance.btcValuation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    )
  }

  const ApiNotFound = () => {
    return (
      <Link href='/settings/addKey'>
        <button className='m-5 btn btn-primary text-primary-content'>Add Binance Api Key </button>
      </Link>
    )
  }

  const EditApi = () => {

    return (
      <div className='btn btn-sm btn-secondary'>

        <Link href='/settings/editKey'>edit api</Link>
      </div>

    )
  }
  return (
    <>
      {apiFound ? ApiFound() : ApiNotFound()}
    </>
  )
}

export default Api