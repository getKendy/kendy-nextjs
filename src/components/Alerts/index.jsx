import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../../appwrite/sdk';
import useUserStore from '../../store/userStore';
import useTabStore from '../../store/tabStore';
import Stats from '../Baro/Stats';
import Grid from './Grid';
import Side from './Side';

function Alert() {
  const { user, setUser } = useUserStore();
  const { setActiveTab } = useTabStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      if (!user) {
        try {
          const data = await account.get();
          setUser(data);
        } catch (error) {
          setActiveTab('login');
          navigate('/auth/login');
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [user]);

  return (!loading && (
    <div>
      <Stats />
      <div className="flex flex-row flex-wrap-reverse">
        <Grid />
        <Side />
      </div>
    </div>
  ));
}

export default Alert;
