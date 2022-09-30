import React, { useEffect, useState } from 'react';
import useTabStore from '../../../store/tabStore';
import Profile from './Profile';
import Api from './Api';

function Settings() {
  const [settingId, setSettingId] = useState('profile');
  const { setActiveTab } = useTabStore();

  useEffect(() => {
    setActiveTab('settings');
  }, []);

  return (
    <div className="flex flex-row items-center justify-center">
      <div className="p-5 text-xl flex flex-col self-start justify-start items-start">

        <button type="button" onClick={() => setSettingId('profile')} className="self-stretch btn btn-sm btn-ghost">
          Profile
        </button>

        <button type="button" onClick={() => setSettingId('api')} className="self-stretch btn btn-sm btn-ghost">
          API
        </button>

      </div>
      <div className="flex flex-grow justify-center items-center mt-5">
        {settingId === 'profile' && <Profile />}
        {settingId === 'api' && <Api />}
      </div>
    </div>
  );
}

export default Settings;
