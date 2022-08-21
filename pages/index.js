import Link from 'next/link';
import Image from 'next/image';

import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';

import Header from '../components/Header/Header';


export default function Home({ btcbusd, ethbusd, bnbbusd }) {
  const { data: session } = useSession();

  return (
    <div>
      <Header activeTab='home' description='Crypto Scanner Trading Alerts' 
        title='GetKendy - Home' showTopHeader={true}/>
      <main className='main'>
        <div className="hero min-h-screen pb-32 bg-base-300">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="max-w-sm rounded-lg shadow-2xl"></div>
            <Image src="/GetKendyLogo.png" width={600} height={600} alt='Logo' />
            <div>
              <div className='grid grid-cols-3'>
                <div className="text-5xl font-bold text-right pr-3 text-primary">BTC </div>
                <div className="text-5xl font-bold text-right col-span-2">${btcbusd?.close.toFixed(0)}</div>
                <div className="text-5xl font-bold text-right pr-3 text-primary">ETH </div>
                <div className="text-5xl font-bold text-right col-span-2">${ethbusd?.close.toFixed(0)}</div>
                <div className="text-5xl font-bold text-right pr-3 text-primary">BNB </div>
                <div className="text-5xl font-bold text-right col-span-2">${bnbbusd?.close.toFixed(0)}</div>
              </div>
              <p className="py-6">Crypto Scanner Trading Alerts</p>
              {session ? (
                <Link href='/alerts'>
                  <button className="btn btn-primary">
                    Open Dashboard
                  </button>
                </Link>
              ) : (
                <button className="btn btn-primary" onClick={() => signIn()} >
                  Get Started</button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getServerSideProps = async ({ req, res }) => {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10, stale-while-revalidate=59'
  )
  // console.log(context);
  try {
    const { data: btcbusd } = await axios.get(`${process.env.BACKEND_API}ticker/BTCBUSD`);
    const { data: ethbusd } = await axios.get(`${process.env.BACKEND_API}ticker/ETHBUSD`);
    const { data: bnbbusd } = await axios.get(`${process.env.BACKEND_API}ticker/BNBBUSD`);
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