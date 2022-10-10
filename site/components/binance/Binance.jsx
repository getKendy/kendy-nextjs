import React, { useEffect, useState } from 'react';
import { account } from '../../utils/sdk';
import Api from '../user/settings/Api';
import Balance from './Balance';

function Binance() {
  const [apiFound, setApiFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPrefs = async () => {
      try {
        setLoading(true);
        const prefs = await account.getPrefs();
        const { apiKey, apiSecret } = prefs;
        if (!apiKey || !apiSecret) {
          setApiFound(false);
        } else {
          setApiFound(true);
        }
        setLoading(false);
        setError('');
      } catch (err) {
        setError(err)
      }
    };
    fetchPrefs();
  }, [apiFound]);

  return (

    error !== '' ? error : (
      <>
        {!loading && apiFound && <Balance />}
        {!loading && !apiFound && <Api />}
      </>

    )


  );
}

export default Binance;
