import React from 'react'

import { Inter } from 'next/font/google'
import Page from '../layout/page'
import AlertStats from '../components/alert-stats'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <Page>
      <AlertStats />
    </Page>
  )
}
