import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { authOptions } from './api/auth/[...nextauth].js'
import { unstable_getServerSession } from "next-auth/next"
import axios from 'axios'

const Statics = () => {
  const [workers,setWorkers] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const {data} = await axios.get('/api/flower')
      // console.log(data)
      let workers = []
      for (const worker in data) {
        if (Object.hasOwnProperty.call(data, worker)) {
          const element = data[worker];
          console.log(element)
          workers.push(element)
        }
      }
      console.log(workers)
      setWorkers(workers)
    }
    fetchData()
  },[])
  return (
    <div><Header activeTab='statics' description='Crypto Scanner Trading Alerts' title='GetKendy - Statics' />
    <div className='w-screen grid justify-center'>
        <div className="tabs">
          <a className="tab tab-lifted">Tab 1</a>
          <a className="tab tab-lifted tab-active">Tab 2</a>
          <a className="tab tab-lifted">Server Stats</a>
      </div>
    </div>
      
      
      {workers?.map((worker,index)=>(
      <div key={index}>
        {worker.active_queues?.map((queue,index)=>(
          <div key={index}>
            {queue.name}
          </div>
        ))}
      </div>
    ))}
    
    </div>

  )
}

export default Statics

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      
    },
  }
}