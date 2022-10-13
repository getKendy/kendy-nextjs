import React, { useEffect, useState } from 'react';
import { account, serverless } from '../../utils/sdk';
import Api from '../user/settings/Api';
import Balance from './Balance';

function Binance() {
  const [apiFound, setApiFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkApi = async () => {
      try {
        setLoading(true);
        const token = await account.createJWT();
        const { api } = await JSON.parse((await serverless.createExecution('CheckApi', token.jwt)).response);
        setApiFound(api);
        setLoading(false);
        setError('');
      } catch (err) {
        setError(err);
      }
    };
    checkApi();
  }, []);

  return (
    <>
      {!error && !loading && apiFound && <Balance />}
      {!error && !loading && !apiFound && <Api />}
    </>
  );
}

export default Binance;
