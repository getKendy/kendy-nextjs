import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../../appwrite/sdk';
import useTabStore from '../../store/tabStore';
import useUserStore from '../../store/userStore';

function Statics() {
  const { user, setUser } = useUserStore();
  const { setActiveTab } = useTabStore();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setActiveTab('statics');
  }, []);

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
    <div>Statics</div>
  ));
}

export default Statics;
