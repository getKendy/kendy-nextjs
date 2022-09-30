import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../../../appwrite/sdk';

function Api() {
  const apikey = useRef(null);
  const apisecret = useRef(null);
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  async function handleSubmit() {
    setStatus('');
    await account.updatePrefs({
      apiKey: apikey.current.value,
      apiSecret: apisecret.current.value,
    });
    setStatus('Api Saved');
    navigate(0);
  }

  return (
    <div className="flex flex-col justify-center items-center text-center space-y-4">
      <div className="grid grid-cols-2 justify-center items-center">
        <div>Key</div>
        <input type="text" name="key" id="key" ref={apikey} defaultValue="" className="rounded bg-transparent border border-primary" />
      </div>
      <div className="grid grid-cols-2 justify-center items-center">
        <div>Secret</div>
        <input type="text" name="secret" id="secret" ref={apisecret} defaultValue="" className="rounded bg-transparent border border-primary" />
      </div>
      <div>
        <button type="button" onClick={() => handleSubmit()} className="btn btn-sm btn-primary">submit</button>
      </div>
      <div>{status}</div>
    </div>
  );
}

export default Api;
