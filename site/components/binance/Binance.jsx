import React, { useEffect, useState } from 'react';
import { serverless } from '../../utils/sdk';
import Api from '../user/settings/Api';
import Balance from './Balance';
import useJWT from '../../utils/useJwt';

function Binance() {
  const [apiFound, setApiFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const newJWT = useJWT();

  useEffect(() => {
    const checkApi = async () => {
      try {
        setLoading(true);
        const { api } = await JSON.parse((await serverless.createExecution('CheckApi', await newJWT)).response)
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

    error !== '' ? error : (
      <>
        {!loading && apiFound && <Balance />}
        {!loading && !apiFound && <Api />}
      </>

    )


  );
}

export default Binance;
