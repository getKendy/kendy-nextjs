import Link from 'next/link';
import Image from 'next/image';

import axios from 'axios';
// import { useSession, signIn, signOut } from 'next-auth/react';

import Header from '../component/Header/Header';
import Router, { useRouter } from 'next/router';
import { useGetUser } from '../hooks';
import api from './api/api';
import { Server } from '../utils/config';
import React, { useEffect, useState } from 'react';
import { setInternalBufferSize } from 'bson';
import Login from '../component/LoginSignUp/login';

export default function Home({ btcbusd, ethbusd, bnbbusd }) {
  const [{ user, isLoading, isError }, dispatch] = useGetUser();
  const [tab, setTab] = useState('home');

  useEffect(() => {
    console.log({ user });
    if (!user) {
      setTab('login');
    } else {
      setTab('home')
    }
  }, [user]);

  return (
    <React.Fragment>
      {tab == 'home' &&
        <div>
          <Header activeTab='home' description='Crypto Scanner Trading Alerts'
            title='GetKendy - Home' showTopHeader={true} />
          <main className='main'>
            <div className="hero min-h-screen pb-32 bg-base-300">
              <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="max-w-sm rounded-lg shadow-2xl"></div>
                <Image src="/GetKendyLogo.png" width={600} height={600} alt='Logo' />
                <div>
                  <div className='grid grid-cols-3'>
                    <div className="text-5xl font-bold text-right pr-3 text-primary">BTC </div>
                    <div className="text-5xl font-bold text-right col-span-2">${(+(btcbusd?.c)).toFixed()}</div>

                    <div className="text-5xl font-bold text-right pr-3 text-primary">ETH </div>
                    <div className="text-5xl font-bold text-right col-span-2">${(+(ethbusd?.c)).toFixed()}</div>

                    <div className="text-5xl font-bold text-right pr-3 text-primary">BNB </div>
                    <div className="text-5xl font-bold text-right col-span-2">${(+(bnbbusd?.c)).toFixed()}</div>

                  </div>
                  <p className="py-6">Crypto Scanner Trading Alerts</p>
                  {/* {session ? (
                <Link href='/alerts'>
                  <button className="btn btn-primary">
                    Open Dashboard
                  </button>
                </Link>
              ) : (
                <button className="btn btn-primary" onClick={() => signIn()} >
                  Get Started</button>
              )} */}
                </div>
              </div>
            </div>
          </main>
        </div>
      }
      {tab=='login' && 
      <>
        <Login dispatch={dispatch}/>
      </>}
    </React.Fragment>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  // console.log(context);
  try {
    // const { data: btcbusd } = await axios.get(`${process.env.BACKEND_API}tickerredis/BTCBUSD`);
    // const { data: ethbusd } = await axios.get(`${process.env.BACKEND_API}tickerredis/ETHBUSD`);
    // const { data: bnbbusd } = await axios.get(`${process.env.BACKEND_API}tickerredis/BNBBUSD`);
    return {
      props: {
        btcbusd, ethbusd, bnbbusd,

      },
    };
  }
  catch (error) {
    return {
      props: {


      },
    };
  }


}