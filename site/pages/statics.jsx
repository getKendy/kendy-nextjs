import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import useUserStore from '../utils/store/user';
import useActiveTabStore from '../utils/store/activeTab';

import { account, serverless } from '../utils/sdk';
import Layout from '../components/layout/Page';

function Statics() {
  const { user } = useUserStore();
  const { setActiveTab } = useActiveTabStore();
  const router = useRouter();


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
      console.log(token.jwt)
      const data = await serverless.createExecution('StoreApi', token.jwt);
      console.log('fetch complete');
      try {
        const { curUser, docs } = JSON.parse(data.response);
        console.log({ curUser, docs })
      } catch (err) {
        console.log(err)
      }
    };


    createJWT();


    // const interval = setInterval(() => {
    // createJWT();
    // }, 300000);
    // return () => clearInterval(interval);
  }, [])



  return (
    <Layout>
      ok
    </Layout>
  );
}

export default Statics;
