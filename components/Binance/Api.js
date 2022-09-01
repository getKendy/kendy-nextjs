import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Api = () => {
  const [apiFound, setApiFound] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('/api/binance/secret/get')
        console.log(data)
        if (data) {
          setApiFound(true)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const RenderApiFound = () => {
    return (
      <div>api found</div>
    )
  }
  const RenderApiNotFound = () => {
    return (
      <Link href='/settings/addKey'>
      <button className='m-5 btn btn-primary text-primary-content'>Add Binance Api Key </button>
      </Link>
    )
  }

  return (
    <>
      {apiFound ? RenderApiFOund() : RenderApiNotFound()}
    </>
  )
}

export default Api