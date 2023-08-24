import React, { useState } from 'react'
import ProfileCard from './ProfileCard'

type Props = {}

type SelectedMenu = { selectedMenu: string }
const Profile = (props: SelectedMenu) => {
  return <div className={props.selectedMenu === 'profile' ? 'visible' : 'hidden'}><ProfileCard /></div>
}

const Binance = (props: SelectedMenu) => {
  return <div className={props.selectedMenu === 'binance' ? 'visible' : 'hidden'}>Binance</div>
}

const Kucoin = (props: SelectedMenu) => {
  return <div className={props.selectedMenu === 'kucoin' ? 'visible' : 'hidden'}>Kucoin</div>
}

const Overview = (props: Props) => {
  const [selectedMenu, setSelectedMenu] = useState('profile')


  return (
    <div className='flex flex-col lg:flex-row justify-center lg:justify-start lg:items-start'>
      <ul className="menu menu-horizontal items-center justify-center mt-4 lg:menu-vertical lg:w-44 rounded-box">
        <li><button onClick={() => setSelectedMenu('profile')}>Profile</button></li>
        <li><button onClick={() => setSelectedMenu('binance')}>Binance</button></li>
        <li><button onClick={() => setSelectedMenu('kucoin')}>Kucoin</button></li>
      </ul>
      <Profile selectedMenu={selectedMenu} />
      <Binance selectedMenu={selectedMenu} />
      <Kucoin selectedMenu={selectedMenu} />
    </div>
  )
}

export default Overview