import React, { useEffect, useState } from 'react';
import { account, serverless } from '../../utils/sdk';
import Api from '../user/settings/Api';
import Balance from './Balance';
import useJwtStore from '../../utils/store/jwt';

function Binance() {
  const [apiFound, setApiFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { jwt, setJwt } = useJwtStore();

  useEffect(() => {
    const checkApi = async () => {
      try {
        setLoading(true);
        const tenMinuteAgo = new Date(Date.now() - 1000 * 60 * 10)
        if (jwt.age < tenMinuteAgo) {
          const token = await account.createJWT();
          setJwt(token.jwt)
        }
        const { api } = await JSON.parse((await serverless.createExecution('CheckApi', jwt.token)).response);
        setApiFound(api);
        setLoading(false);
        setError('');
      } catch (err) {
        setError(err)
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
