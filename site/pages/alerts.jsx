import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUserStore from '../utils/store/user';

import Page from '../components/layout/Page';
import Stats from '../components/barometer/Stats';
import Grid from '../components/alerts/Grid';
import Side from '../components/alerts/Side';

function Alerts() {
  const { user } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

  return (
    <Page>
      <div className="bg-base-200">
        <Stats />
        <div className="flex flex-row flex-wrap-reverse">
          <Grid />
          <Side />
        </div>
      </div>
    </Page>
  );
}

export default Alerts;
