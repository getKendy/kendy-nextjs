import React from 'react'
import Header from '@/layout/header'
import TickerStats from '@/components/ticker-stats'
import BaroStats from '@/components/baro-stats'

type Props = { children: React.ReactNode }

const Page = (props: Props) => {
  return (
    <div>
      <Header />
      <div className="flex flex-wrap justify-between">
        <BaroStats />
        <TickerStats />
      </div>
      {props.children}
    </div>
  )
}

export default Page