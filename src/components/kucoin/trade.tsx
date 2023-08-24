import sdk from '@/appwrite/sdk'
import { useAuthStore } from '@/store/global'
import React, { useEffect, useState } from 'react'

type Props = {}

const Trade = (props: Props) => {
  const { authStatus } = useAuthStore()
  const [api, setApi] = useState(false)

  useEffect(() => {
    sdk.hasKucoinApi().then(setApi)
  }, [])

  if (!authStatus || !api) {
    return
  }

  return (
    <div></div>
  )
}

export default Trade