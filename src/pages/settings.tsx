import Overview from '@/components/settings/overview'
import Page from '@/layout/page'
import { useAuthStore } from '@/store/global'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

type Props = {}

const Settings = (props: Props) => {
  const { authStatus } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!authStatus) {
      return void router.push('/')
    }
    setLoading(false)
  }, [authStatus, router])

  if (loading) {
    return <div></div>
  }

  return (
    <Page>
      <Overview />
    </Page>
  )
}

export default Settings