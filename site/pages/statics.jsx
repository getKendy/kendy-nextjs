import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useUserStore from '../utils/store/user';
import useActiveTabStore from '../utils/store/activeTab';

import { account } from '../utils/sdk';
import Layout from '../components/layout/Page';

function Statics() {
  const { user } = useUserStore();
  const { setActiveTab } = useActiveTabStore();
  const router = useRouter();
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else {
      setActiveTab('statics')
    }
  }, [user])

  useEffect(() => {
    const createJWT = async () => {
      const token = await account.createJWT();
      console.log(token);
      setJwt(token);
    }
    createJWT();
    const interval = setInterval(() => {
      createJWT();
    }, 300000);
    return () => clearInterval(interval);
  }, [])
  return (
    <Layout>
      .
    </Layout>
  );
}

export default Statics;
