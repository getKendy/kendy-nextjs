import React from 'react'
import AuthShowcase from '../components/auth-showcase'
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/store/global'

// type Props = {}

const Header = () => {
  const { authStatus } = useAuthStore()
  return (
    <div className='mx-2 flex justify-between items-center'>
      <Link href="/">
        <Image alt='logo' src='/GetKendyLogoXS.png' width={60} height={60} />
      </Link>
      {!authStatus &&
        <div className='mx-1 px-2 text-primary  rounded-md border-b '>Login to unlock all Features</div>
      }
      <AuthShowcase />
    </div>
  )
}

export default Header