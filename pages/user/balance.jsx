import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LineChart, Line, CartesianGrid } from 'recharts';

import { Query } from 'appwrite';
import useUserStore from '../../utils/store/user';
import Page from '../../components/layout/Page';
import { account, databases, serverless } from '../../utils/sdk';

function Balance() {
  const { user } = useUserStore();
  const router = useRouter();
  const [balances, setBalances] = useState([]);
  const [balances24h, setBalances24h] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (!user) {
      router.push('/alerts');
      return;
    }
    const fetchBalance = async () => {
      const token = await account.createJWT();
      let balTotal = 0;
      const { response } = await serverless.createExecution('GetBinanceBalance', token.jwt);
      const data = JSON.parse(response);

      data.forEach((balance) => {
        balTotal += +balance.btcValuation;
      });
      setBalances(data);
      setTotal(balTotal);
      const oldbal = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_BINANCE_DATA,
        process.env.NEXT_PUBLIC_APPWRITE_BALANCE,
        [Query.limit(100)]
      );
      setBalances24h(oldbal.documents);
    };
    fetchBalance();
  }, [user, router]);

  return (
    <Page>
      <div className="prose flex items-center justify-center place-items-center">
        <h3 className="flex bg-base-200 rounded-xl p-2 mt-1 shadow shadow-primary-content">
          Total: ₿{total.toFixed(8)}
        </h3>
      </div>
      <div className="mb-20 flex flex-wrap items-center justify-center">
        {balances.map((balance) => (
          <Bal key={balance.asset} balance={balance} balances24h={balances24h} />
        ))}
      </div>
    </Page>
  );
}

function Bal({ balance, balances24h }) {
  const oldbal = balances24h.filter((old) => old.asset === balance.asset);
  if (balance.btcValuation === '0') {
    return null;
  }
  return (
    <div className="m-3 grid grid-cols-2 shadow shadow-primary-content rounded-xl bg-base-200 prose">
      <h2 className="col-span-2 text-center text-primary">{balance.asset}</h2>
      <div className="ml-2">Free</div>
      <div>{balance.free}</div>
      <div className="ml-2">Used</div>
      <div>{balance.locked}</div>
      <div className="ml-2">BTC total</div>
      <div>{balance.btcValuation}</div>
      <div className="col-span-2">
        <LineChart width={300} height={150} data={oldbal}>
          <Line type="monotone" dataKey="btcValuation" stroke="#82ca9d" dot={false} activeDot={false} />
          <CartesianGrid strokeDasharray="3 3" />
        </LineChart>
      </div>
    </div>
  );
}
export default Balance;
