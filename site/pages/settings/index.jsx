import React, { useEffect, useState } from 'react';
import {useRouter} from 'next/router';

import useUserStore from '../../utils/store/user';
import useActiveTabStore from '../../utils/store/activeTab';

import Page from '../../components/layout/Page';
import Profile from '../../components/user/settings/Profile';
import Api from '../../components/user/settings/Api';

function Settings() {
  const { user } = useUserStore();
  const { setActiveTab } = useActiveTabStore();
  const router = useRouter();
  const [settingId, setSettingId] = useState('profile');

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else {
      setActiveTab('settings')
    }
  }, [user]);

  return (
    <Page title="GetKendy - Settings" description="Free Crypto Scanner Trading Alerts. CryptoCoiners Scanner GUI">
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
