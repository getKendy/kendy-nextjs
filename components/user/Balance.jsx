import React from 'react';
import { LineChart, Line, CartesianGrid } from 'recharts';

function Balance({ balance, balances24h }) {
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
