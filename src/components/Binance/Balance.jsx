import React, { useEffect, useState } from 'react';
import { account, serverless } from '../../appwrite/sdk';

function Balance() {
  const [balances, setBalances] = useState([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setStatus('');
        const prefs = await account.getPrefs();
        const { apiKey, apiSecret } = prefs;
        let balTotal = 0;
        const { response } = await serverless.createExecution('GetBinanceBalance', JSON.stringify({ apiKey, apiSecret }));
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
        console.error(error);
        setStatus(error);
      }
    };
    fetchBalance();
    const interval = setInterval(() => {
      fetchBalance();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-2 mb-2 p-1 border border-secondary rounded-lg shadow-lg">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4 text-xl text-primary-content font-black">
          <div>Balance Total:</div>
          <div>
            ₿
            {total}
          </div>
        </div>
        Edit API
      </div>
      <div className="text-primary-content text-left">
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
