import React, { useEffect, useState } from 'react';
import { account } from '../../appwrite/sdk';
import Api from '../User/Settings/Api';
import Balance from './Balance';

function Binance() {
  const [apiFound, setApiFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPrefs = async () => {
      setLoading(true);
      const prefs = await account.getPrefs();
      const { apiKey, apiSecret } = prefs;
      if (!apiKey || !apiSecret) {
        setApiFound(false);
      } else {
        setApiFound(true);
      }
      setLoading(false);
    };
    fetchPrefs();
  }, [apiFound]);

  return (
    <>
      <div>{!loading && apiFound && <Balance />}</div>
      <div>{!loading && !apiFound && <Api />}</div>
    </>
  );
}

export default Binance;
