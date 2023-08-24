'use client'
import React, { useEffect, useState } from 'react'
import sdk from '@/appwrite/sdk'

import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Models } from 'appwrite'
import { useRouter } from 'next/router'
import { useAuthStore } from '@/store/global'
// interface Props { }

const AuthShowcase = () => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>()
  const { authStatus, setAuthStatus } = useAuthStore()
  const router = useRouter()
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const account = await sdk.getCurrentUser()
        if (account) {
          setUser(account)
        }
        setLoading(false)
      } catch (error) {
        setUser(null)
        setLoading(false)
      }
    }

    const fetchIsLoggedin = async () => {
      try {
        const status = await sdk.isLoggedIn()
        if (status) {
          void setAuthStatus(true)
          return true
        } else {
          setLoading(false)
          return false
        }
      } catch (error) {
        void setAuthStatus(false)
        setLoading(false)
        return false
      }
    }

    void fetchIsLoggedin().then((res: boolean) => res && void fetchUserData())

  }, [setUser, authStatus, setAuthStatus])

  if (loading) {
    return <div><button className='btn btn-sm btn-outline btn-disabled animate-pulse'>loading</button></div>
  }

  if (!user) {
    return (
      <div className='flex gap-3 mr-2'>
        <Link href="/auth/login">
          <button className='btn btn-sm btn-outline btn-secondary'>login</button>
        </Link >
        <Link href="/auth/signup">
          <button className='btn btn-sm btn-outline btn-primary'>signup</button>
        </Link >
      </div>
    )
  }

  return (
    <div className='flex mr-2 gap-3 text-xs'>
      <div className='flex flex-col items-center'>
        <div>Welcome back</div>
        <div className='text-secondary'>{user.name || user.email}</div>
      </div>
      <button className='btn btn-sm btn-outline btn-primary'>
        <Link href={`/settings`}>
          <Cog8ToothIcon className='w-6' />
        </Link>
      </button>
      <button className='btn btn-sm btn-outline btn-secondary' onClick={async () => await sdk.logout() && router.reload()}>logout</button>
    </div>
  )
}

export default AuthShowcase