import React from 'react'

import { Inter } from 'next/font/google'
import Page from '../layout/page'
import AlertStats from '../components/alert-stats'
import Trade from '@/components/kucoin/trade'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Page>
      <div className='flex flex-col lg:flex-row'>
        <AlertStats />
        <Trade />
      </div>
    </Page>
  )
}
