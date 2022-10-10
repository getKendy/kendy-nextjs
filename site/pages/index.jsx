/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from "next/router";

import { serverless } from "../utils/sdk";
import useUserStore from "../utils/store/user";
import Page from "../components/layout/Page";

export default function Home() {
  const { user } = useUserStore();

  const [btcbusd, setBtcbusd] = useState();
  const [ethbusd, setEthbusd] = useState();
  const [bnbbusd, setBnbbusd] = useState();
  const router = useRouter();

  useEffect(() => {
    const fetchdata = async () => {
      const { response } = await serverless.createExecution('GetTicker', 'BTCBUSD');
      const { ticker } = JSON.parse(response);
      setBtcbusd(ticker);
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const { response } = await serverless.createExecution('GetTicker', 'ETHBUSD');
      const { ticker } = JSON.parse(response);
      setEthbusd(ticker);
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      const { response } = await serverless.createExecution('GetTicker', 'BNBBUSD');
      const { ticker } = JSON.parse(response);
      setBnbbusd(ticker);
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Page>
      <div className="hero pb-32 bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="max-w-sm rounded-lg shadow-2xl" />
          <Image src="/GetKendyLogo.png" width={600} height={600} alt="Logo" />
          <div>
            <div className="grid grid-cols-3">
              <div className="text-5xl font-bold text-right pr-3 text-primary">BTC </div>
              <div className="text-5xl font-bold text-right col-span-2">
                $
                {(+(btcbusd?.c)).toFixed()}
              </div>
              <div className="text-5xl font-bold text-right pr-3 text-primary">ETH </div>
              <div className="text-5xl font-bold text-right col-span-2">
                $
                {(+(ethbusd?.c)).toFixed()}
              </div>
              <div className="text-5xl font-bold text-right pr-3 text-primary">BNB </div>
              <div className="text-5xl font-bold text-right col-span-2">
                $
                {(+(bnbbusd?.c)).toFixed()}
              </div>
            </div>
            <p className="py-6">Crypto Scanner Trading Alerts</p>
            {user ? (
              <Link href="/alerts">
                <button type="button" className="btn btn-primary" >
                  Open Dashboard
                </button>
              </Link>
            ) : (
              <button type="button" className="btn btn-primary" onClick={() => router.push('/auth/login')}>
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </Page>
  )
}
