/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import axios from 'axios';

import { serverless } from '../utils/sdk';
import useActiveTabStore from '../utils/store/activeTab';
import useUserStore from '../utils/store/user';
import Page from '../components/layout/Page';
import NewsCard from '../components/NewsCard';

export default function Home() {
  const { user } = useUserStore();
  const { setActiveTab } = useActiveTabStore();
  const [btcbusd, setBtcbusd] = useState();
  const [ethbusd, setEthbusd] = useState();
  const [bnbbusd, setBnbbusd] = useState();
  const router = useRouter();
  const [error, setError] = useState(false);
  const [news, setNews] = useState([]);

  // useEffect hook to fetch news data
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data } = await axios.get(
          'https://newsapi.org/v2/top-headlines?sources=crypto-coins-news&apiKey=76bc65a61ba549c489e6738da9d45aec'
        );
        setNews(data.articles);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchNews();
  }, []);

  // render news cards
  const renderNews = () => news.slice(0, 9).map((article) => <NewsCard key={article.title} article={article} />);

  useEffect(() => {
    setActiveTab('home');
  }, [user, setActiveTab]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { response } = await serverless.createExecution('GetTicker', 'BTCBUSD');
        const { ticker } = JSON.parse(response);
        setBtcbusd(ticker);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { response } = await serverless.createExecution('GetTicker', 'ETHBUSD');
        const { ticker } = JSON.parse(response);
        setEthbusd(ticker);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const { response } = await serverless.createExecution('GetTicker', 'BNBBUSD');
        const { ticker } = JSON.parse(response);
        setBnbbusd(ticker);
        setError(false);
      } catch (err) {
        setError(true);
      }
    };
    fetchdata();
    const interval = setInterval(() => {
      fetchdata();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Page title="GetKendy - Home" description="Free Crypto Scanner Trading Alerts. CryptoCoiners Scanner GUI">
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="max-w-sm rounded-lg shadow-2xl" />
          <Image src="/GetKendyLogo.png" width={600} height={600} alt="Logo" />
          <div>
            <div className="grid grid-cols-3">
              <div className="text-5xl font-bold text-right pr-3 text-primary">BTC </div>
              <div className="text-5xl font-bold text-right col-span-2">${(+btcbusd?.c).toFixed()}</div>
              <div className="text-5xl font-bold text-right pr-3 text-primary">ETH </div>
              <div className="text-5xl font-bold text-right col-span-2">${(+ethbusd?.c).toFixed()}</div>
              <div className="text-5xl font-bold text-right pr-3 text-primary">BNB </div>
              <div className="text-5xl font-bold text-right col-span-2">${(+bnbbusd?.c).toFixed()}</div>
            </div>
            <p className="py-6">Crypto Scanner Trading Alerts</p>
            {user ? (
              <Link href="/alerts">
                <button type="button" className="btn btn-primary">
                  Open Dashboard
                </button>
              </Link>
            ) : (
              <button
                type="button"
                className="btn btn-primary hover:bg-primary-focus"
                onClick={() => router.push('/auth/login')}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
        {error}
      </div>
      <div className="text-section">
        <h2 className="text-2xl font-bold text-center mb-4">Welcome to GetKendy</h2>
        <p className="text-gray-600 text-center mb-4">
          GetKendy is a free crypto scanner and trading alert tool that helps you stay on top of the crypto market.
        </p>
        <p className="text-gray-600 text-center mb-4">
          Our scanner GUI allows you to monitor multiple crypto assets and exchanges in real-time, so you can make
          informed trades and investments.
        </p>
        <p className="text-gray-600 text-center mb-4">
          Sign up now and start tracking your favorite crypto assets and stay ahead of the market trends.
        </p>
      </div>
      <div className="news-section mx-2 mb-20">
        <h2 className="text-2xl font-bold text-center mb-4">Latest News</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">{renderNews()}</div>
      </div>
    </Page>
  );
}
