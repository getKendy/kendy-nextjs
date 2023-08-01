import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUserStore from '../utils/store/user';
import useActiveTabStore from '../utils/store/activeTab';

import Page from '../components/layout/Page';
import Stats from '../components/barometer/Stats';
import Grid from '../components/alerts/Grid';
import Side from '../components/alerts/Side';

function Alerts() {
  const { user } = useUserStore();
  const router = useRouter();
  const { setActiveTab } = useActiveTabStore();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      setActiveTab('alerts');
    }
  }, [router, setActiveTab, user]);

  return (
    <Page title="GetKendy - Alerts" description="Free Crypto Scanner Trading Alerts. CryptoCoiners Scanner GUI">
      <div className="bg-base-200">
        <Stats />
        <div className="flex flex-wrap-reverse lg:flex-nowrap">
          <Grid />
          <Side />
        </div>
      </div>
    </Page>
  );
}

export default Alerts;
