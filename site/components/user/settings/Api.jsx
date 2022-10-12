import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { account, serverless } from '../../../utils/sdk';

function Api() {
  const [apikey, setApikey] = useState('');
  const [apisecret, setApisecret] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  async function submitApi(evt) {
    evt.preventDefault();
    setStatus('');
    try {
      const token = await account.createJWT();
      serverless.createExecution('StoreApi', JSON.stringify({ token: token.jwt, apiKey: apikey, apiSecret: apisecret }));
      setStatus('Api Saved');
      router.reload();
    } catch (error) {
      setStatus('Something went wrong while saving. try again.');
    };
  }


  return (
    <div className="flex flex-col justify-center items-center text-center space-y-4 prose">
      <h1 className="p-2 first-letter:text-primary-focus shadow rounded-full">API</h1>
      <form onSubmit={(evt) => submitApi(evt, setStatus)}>
        <div className="grid grid-cols-2 justify-center items-center">
          <div>Key</div>
          <input type="text" name="key" id="key" value={apikey} onChange={(evt) => setApikey(evt.target.value)} className="rounded bg-transparent border border-primary" />
        </div>
        <div className="grid grid-cols-2 justify-center items-center">
          <div>Secret</div>
          <input type="text" name="secret" id="secret" value={apisecret} onChange={(evt) => setApisecret(evt.target.value)} className="rounded bg-transparent border border-primary" />
        </div>
        <div><button type='submit' className='btn btn-sm'>Save Api</button></div>
        <div>{status}</div>
      </form>
    </div>
  );
}

export default Api;
