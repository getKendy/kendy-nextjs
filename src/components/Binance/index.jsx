import React, { useEffect, useState } from 'react';
import { account } from '../../appwrite/sdk';
import Api from '../User/Settings/Api';
import Balance from './Balance';

function Binance() {
  const [apiFound, setApiFound] = useState(false);

  useEffect(() => {
    const fetchPrefs = async () => {
      const prefs = await account.getPrefs();
      const { apiKey, apiSecret } = prefs;
      if (!apiKey || !apiSecret) {
        setApiFound(false);
        return;
      }
      setApiFound(true);
    };
    fetchPrefs();
  }, [apiFound]);
  return (
    <div>{apiFound ? <Balance /> : <Api />}</div>
  );
}

export default Binance;
