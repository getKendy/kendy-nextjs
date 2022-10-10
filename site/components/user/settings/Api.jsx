import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { account } from '../../../utils/sdk';

function Api() {
  const [apikey, setApikey] = useState('');
  const [apisecret, setApisecret] = useState('');
  const [status, setStatus] = useState('');
  const router = useRouter();

  useEffect(() => {
    const saveApi = async () => {
      setStatus('');
      if (apikey !== '' && apisecret !== '') {
        await account.updatePrefs({
          apiKey: apikey,
          apiSecret: apisecret,
        });
        setStatus('Api Saved');
        router.push('/alerts');
      }
    };
    saveApi();
  }, [apikey, apisecret]);

  function onChangeApikey(evt) {
    setApikey(evt.target.value);
  }

  function onChangeApisecret(evt) {
    setApisecret(evt.target.value);
  }

  return (
    <div className="flex flex-col justify-center items-center text-center space-y-4 prose">
      <h1 className="p-2 first-letter:text-primary-focus shadow rounded-full">API</h1>
      <div className="grid grid-cols-2 justify-center items-center">
        <div>Key</div>
        <input type="text" name="key" id="key" value={apikey} onChange={onChangeApikey} className="rounded bg-transparent border border-primary" />
      </div>
      <div className="grid grid-cols-2 justify-center items-center">
        <div>Secret</div>
        <input type="text" name="secret" id="secret" value={apisecret} onChange={onChangeApisecret} className="rounded bg-transparent border border-primary" />
      </div>
      <div>{status}</div>
    </div>
  );
}

export default Api;
