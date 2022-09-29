import React, { useState } from 'react';

import Profile from './Profile';
import Api from './Api';

function Settings() {
  const [settingId, setSettingId] = useState('profile');

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap space-x-5 border-b border-secondary">
        <div>
          <button type="button" onClick={() => setSettingId('profile')}>
            Profile
          </button>
        </div>
        <div>
          <button type="button" onClick={() => setSettingId('api')}>
            API
          </button>
        </div>
      </div>
      <div className="mt-5">
        {settingId === 'profile' && <Profile />}
        {settingId === 'api' && <Api />}
      </div>
    </div>
  );
}

export default Settings;
