import axios from 'axios'
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
      <div className='flex justify-center text-secondary-content'>
        <form action="" method="">
          <div className='flex space-x-4 items-center text-center'>
            <div>
              <div>Api Key</div>
              <input type="text" name="apiKey" id="apiKey" />
            </div>
            <div>
              <div>Api Secret</div>
              <input type="text" name="apiSecret" id="apiSecret" />
            </div>
            <button type="submit" className='btn btn-sm btn-secondary'>add new api</button>
          </div>
        </form>
      </div>
    )
  }

  return (
    <>
      {apiFound ? RenderApiFOund() : RenderApiNotFound()}
    </>
  )
}

export default Api