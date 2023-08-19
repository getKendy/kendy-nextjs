import React from 'react'
import AuthShowcase from './auth-showcase'
import Image from 'next/image'

// type Props = {}

const Header = () => {
  return (
    <div className='mx-2 flex justify-between items-center'>
      <Image alt='logo' src='/GetKendyLogoXS.png' width={60} height={60}/>
      <AuthShowcase />
    </div>
  )
}

export default Header