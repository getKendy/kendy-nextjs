import sdk from '@/appwrite/sdk'
import { useAuthStore } from '@/store/global'
import { KucoinOrder, KucoinOrderList } from '@/utils/types'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Reorder, motion } from 'framer-motion'
import Image from 'next/image'

type Props = {}

const KuOverview = (props: Props) => {
  const { authStatus } = useAuthStore()
  const [api, setApi] = useState(false)
  const [trades, setTrades] = useState<Array<KucoinOrder> | null>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data }: { data: KucoinOrderList } = await axios.get(`/api/kucoin/trades?jwt=${await sdk.getJWT()}`)
        setTrades(data.items)
      } catch (error) {
        console.log(error)
        setTrades(null)
      }
    }

    sdk.hasKucoinApi().then(setApi)
    if (api) {
      void fetchData()
    }

    const interval = setInterval(() => {
      sdk.hasKucoinApi().then(setApi)
      if (api) {
        void fetchData()
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [api])

  if (!authStatus || !api) {
    return
  }


  return (
    <div className={`${(trades?.length ?? 0 > 0) && 'mr-2'} flex flex-grow flex-col`}>

      {trades && trades?.length > 0 &&
        <div className="flex justify-around text-2xl text-center">
          <motion.div key='alertsScannerHeader' className='text-primary' initial={{ opacity: 0, scale: 0.1, x: 200 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0 }}>Kucoin&nbsp;Trades:</motion.div>


        </div>
      }
      <Reorder.Group className="mr-4 flex flex-wrap gap-2 justify-evenly" values={trades || []} onReorder={setTrades} drag={false}>

        {trades?.map((trade) => (
          <Reorder.Item key={`wrap${trade.id}`} value={trade.id} initial={{ opacity: 0 }} drag={false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <div className='p-1 flex flex-col gap-1 shadow-sm shadow-primary rounded-md'>
              <div className='flex gap-3'>
                <Image src='/kucoin.png' width={20} height={15} alt='kucoin logo' />
                <div>{trade.symbol}</div>
                <div>{trade.side}</div>
              </div>
              <div className='flex gap-3'>
                <div>{trade.price}</div>
                <div>{trade.size}</div>
              </div>
            </div>
          </Reorder.Item>

        ))}
      </Reorder.Group>

    </div>
  )
}

export default KuOverview