import Login from '@/components/auth/Login'
import Page from '@/layout/page'
import { useAuthStore } from '@/store/global'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const LoginStatus = () => {
  const { authStatus } = useAuthStore()
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (authStatus) {
      return void router.push('/')
    }
    setLoading(false)
  }, [authStatus, router])

  if (loading) {
    return <div></div>
  }

  return (
    <Page>
      <Login />
    </Page>
  )
}

export default LoginStatus