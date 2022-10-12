import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { account, serverless } from '../../utils/sdk';


function Balance() {
  const [balances, setBalances] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');


  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setStatus('');
        const token = await account.createJWT();
        let balTotal = 0;
        const { response } = await serverless.createExecution('GetBinanceBalance', token.jwt);
        const data = JSON.parse(response);
        if (data.length > 0) {
          setBalances(data);
          // eslint-disable-next-line no-restricted-syntax
          for (const balance of data) {
            balTotal += +(balance.btcValuation);
          }
          if (balTotal > 0) {
            setTotal(balTotal.toFixed(8));
          }
        }
      } catch (error) {
        setStatus('could not load data from API.');
      }
    };
    fetchBalance();
    const interval = setInterval(() => {
      fetchBalance();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-2 mb-2 p-1 text-secondary-content border border-secondary rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 text-xl font-black">
          <div>Balance Total:</div>
          <div>
            ₿
            {total}
          </div>
        </div>
        <Link href="/settings" className="btn bnt-sm">Edit API</Link>
      </div>
      <div className="text-left">
        {balances
          && (
            <div>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th>Asset</th>
                    <th>Free</th>
                    <th>Used</th>
                    <th>BTC</th>
                  </tr>
                </thead>
                <tbody>
                  {balances.map((balance) => (
                    balance.btcValuation > 0 && (
                      <tr key={balance.asset} className="border-b border-primary">
                        <td>{balance.asset}</td>
                        <td>{balance.free}</td>
                        <td>{balance.locked}</td>
                        <td>{balance.btcValuation}</td>
                      </tr>
                    )
                  ))}
                </tbody>
              </table>
            </div>
          )}
      </div>
      <div className="text-red-500">{status}</div>
    </div>
  );
}

export default Balance;
