import React, { useState } from 'react';

import Profile from './Profile';
import Api from './Api';

function Settings() {
  const [settingId, setSEttingId] = useState('profile');

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap space-x-5 border-b border-secondary">
        <div>
          <button type="button" onClick={() => setSEttingId('profile')}>
            Profile
          </button>
        </div>
        <div>
          <button type="button" onClick={() => setSEttingId('api')}>
            API
          </button>
        </div>
      </div>
      <div>
        {settingId === 'profile' && <Profile />}
        {settingId === 'api' && <Api />}
      </div>
    </div>
  );
}

export default Settings;
