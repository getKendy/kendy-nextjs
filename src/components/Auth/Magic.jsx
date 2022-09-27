import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';
import { account } from '../../appwrite/sdk';

function Magic() {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const [status, setStatus] = useState({
    status: null,
    message: null,
  });
  const [searchParams] = useSearchParams({
    userId: null, secret: null, expire: null, project: null,
  });

  useEffect(() => {
    const magicLogin = async () => {
      try {
        await account.updateMagicURLSession(searchParams.get('userId'), searchParams.get('secret'));
        const data = await account.get();
        if (!data) {
          setStatus({ status: 'error', message: 'Unauthorized' });
        }
        setStatus({ status: 'ok', message: data.name });
        setUser(data);
        navigate('/');
        // navigate(0);
      } catch (error) {
        setStatus({ status: 'error', message: 'Unauthorized' });
      }
    };
    magicLogin();
  }, []);

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
        </div>
      )}
    </div>
  );
}

export default Magic;
