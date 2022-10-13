import React, { useEffect, useRef, useState } from 'react';
import { account } from '../../utils/sdk';
import Page from '../../components/layout/Page';
import useActiveTabStore from '../../utils/store/activeTab';

function Login() {
  const email = useRef();
  const [mailStatus, setMailStatus] = useState();
  const { setActiveTab } = useActiveTabStore();

  useEffect(() => {
    setActiveTab('login');
  }, [setActiveTab]);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      await account.createMagicURLSession(
        'unique()',
        email.current.value,
        `${process.env.NEXT_PUBLIC_DOMAIN}/auth/magic-url/`
      );
      setMailStatus('Mail send.');
    } catch (error) {
      setMailStatus('Error sending mail.');
    }
  };

  return (
    <Page title="GetKendy - Login" description="Free Crypto Scanner Trading Alerts. CryptoCoiners Scanner GUI">
      <div className="flex flex-col h-screen justify-center items-center">
        <form onSubmit={loginUser}>
          <div className="space-y-2">
            <div className="space-y-1 ">
              <div className="flex justify-center">Email</div>
              <input
                type="email"
                name="email"
                id="email"
                ref={email}
                defaultValue=""
                required
                className="text-center"
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-sm">
                Login
              </button>
            </div>
          </div>
        </form>
        <div>{mailStatus}</div>
      </div>
    </Page>
  );
}

export default Login;
