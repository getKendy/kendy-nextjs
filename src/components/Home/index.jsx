/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { account, serverless } from '../../appwrite/sdk';
import useTabStore from '../../store/tabStore';
import useUserStore from '../../store/userStore';

function Home() {
  const { user, setUser } = useUserStore();
  const { setActiveTab } = useTabStore();
  const [btcbusd, setBtcbusd] = useState();
  const [ethbusd, setEthbusd] = useState();
  const [bnbbusd, setBnbbusd] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const data = await account.get();
          setUser(data);
        } catch (error) {
          setActiveTab('login');
          navigate('/auth/login');
        }
      }
    };
    fetchUser();
  }, [user]);

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
    <div>
      <main className="main">
        <div className="hero min-h-screen pb-32 bg-base-300">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="max-w-sm rounded-lg shadow-2xl" />
            <img src="/GetKendyLogo.png" width={600} height={600} alt="Logo" />
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
                <Link to="/alerts">
                  <button type="button" className="btn btn-primary">
                    Open Dashboard
                  </button>
                </Link>
              ) : (
                <button type="button" className="btn btn-primary" onClick={() => navigate('/auth/login')}>
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
