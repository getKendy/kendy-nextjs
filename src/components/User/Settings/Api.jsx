import React, { useRef, useState } from 'react';
import { account } from '../../../appwrite/sdk';

function Api() {
  const apikey = useRef(null);
  const apisecret = useRef(null);
  const [status, setStatus] = useState('');

  async function handleSubmit() {
    setStatus('');
    if ((apikey.current.value != null || '') || (apisecret.current.value != null || '')) {
      await account.updatePrefs({
        apiKey: apikey.current.value,
        apiSecret: apisecret.current.value,
      });
      setStatus('Api Saved');
    }
  }

  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <div className="flex flex-col justify-center items-center">
        <div>Key</div>
        <input type="text" name="key" id="key" ref={apikey} defaultValue="" className="rounded" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <div>Secret</div>
        <input type="text" name="secret" id="secret" ref={apisecret} defaultValue="" className="rounded" />
      </div>
      <div>
        <button type="button" onClick={() => handleSubmit()} className="btn btn-sm btn-primary">submit</button>
      </div>
      <div>{status}</div>
    </div>
  );
}

export default Api;
