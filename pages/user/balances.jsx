import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Query } from 'appwrite';
import useUserStore from '../../utils/store/user';
import Page from '../../components/layout/Page';
import { account, databases, serverless } from '../../utils/sdk';
import Balance from '../../components/user/Balance';

function Balances() {
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
          <Balance key={balance.asset} balance={balance} balances24h={balances24h} />
        ))}
      </div>
    </Page>
  );
}

export default Balances;
