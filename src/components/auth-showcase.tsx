'use client'
import React, { useEffect, useState } from 'react'
import { useUserStore } from '@/store/global'
import sdk from '@/utils/sdk'

// interface Props { }

const AuthShowcase = () => {
  const [loading, setLoading] = useState(true)
  const { user, setUser, clearUser } = useUserStore()
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const account = await sdk.account.get()
        setUser(account)
        setLoading(false)
      } catch (error) {
        void clearUser()
        setLoading(false)
      }
    }
    void fetchdata()
  }, [setUser, clearUser])

  if (loading) {
    return <div><button className='btn btn-sm btn-outline btn-disabled animate-pulse'>loading</button></div>
  }

  if (!user) {
    return (
      <div><button className='btn btn-sm btn-outline btn-secondary'>login</button></div>
    )
  }

  return (
    <div className='flex gap-3 text-xs'>
      <div className='flex flex-col items-center'>
        <div>Welcome back</div>
        <div className='text-secondary'>{user.name || user.email}</div>
      </div>
      <button className='btn btn-sm btn-outline btn-secondary'>logout</button>
    </div>
  )
}

export default AuthShowcase