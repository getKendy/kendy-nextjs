import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../../appwrite/sdk';
import useTabStore from '../../store/tabStore';
import useUserStore from '../../store/userStore';

function Home() {
  const { user, setUser } = useUserStore();
  const { setActiveTab } = useTabStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) {
        try {
          const data = await account.get();
          setUser(data);
        } catch (error) {
          setActiveTab('login');
          navigate('/auth/login');
        }
      }
    };
    fetchUser();
  }, [user]);

  return (
    <div>Home</div>
  );
}

export default Home;
