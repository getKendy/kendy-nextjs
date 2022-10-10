import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { account } from '../../utils/sdk';
import useUserStore from '../../utils/store/user';

function Magic() {
  const router = useRouter();
  const { userId, secret } = router.query;
  const { setUser } = useUserStore();
  const [status, setStatus] = useState({
    status: null,
    message: null,
  });

  useEffect(() => {
    const magicLogin = async () => {
      await account.updateMagicURLSession(userId, secret);
      const data = await account.get();
      if (!data) {
        setStatus({ status: 'error', message: 'Unauthorized' });
      }
      setStatus({ status: 'ok', message: data.name });
      setUser(data);
      router.push('/')
    }
    if (userId && secret) {
      magicLogin();
    } else {
      setStatus('no input received from query')
    }
  }, [router.query]);

  return (
    <div className="flex h-screen justify-center items-center">
      {status.status === 'ok' && (
        <div className="flex flex-col justify-center items-center">
          <div>Welcome</div>
          <div>{status.message}</div>
        </div>
      )}
      {status.status === 'error' && (
        <div className="flex flex-col justify-center items-center">
          <div>Error, Something went wrong..</div>
          <div className="text-red-500">{status.message}</div>
          <Link href="/">
            <div className='underline cursor-pointer'>
              return Home
            </div>
          </Link>
        </div>
      )}
    </div >
  );
}

export default Magic;
