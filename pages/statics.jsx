import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUserStore from '../utils/store/user';
import useActiveTabStore from '../utils/store/activeTab';

// import { account, serverless } from '../utils/sdk';
import Page from '../components/layout/Page';

function Statics() {
  const { user } = useUserStore();
  const { setActiveTab } = useActiveTabStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      setActiveTab('statics');
    }
  }, [user]);

  return (
    <Page title="GetKendy - Statics" description="Free Crypto Scanner Trading Alerts. CryptoCoiners Scanner GUI">
      <div>ok</div>
    </Page>
  );
}

export default Statics;
