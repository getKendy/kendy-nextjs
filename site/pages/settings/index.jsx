import React, { useState } from 'react';

import Page from '../../components/layout/Page';
import Profile from '../../components/user/settings/Profile';
import Api from '../../components/user/settings/Api';

function Settings() {
  const [settingId, setSettingId] = useState('profile');


  return (
    <Page>
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
    </Page>
  );
}

export default Settings;
