import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { withIronSessionSsr } from 'iron-session/next';
import axios from 'axios';
import sessionOptions from '../lib/iron/config';
import useUserStore from '../lib/store/userStore';
import useBarosStore from '../lib/store/baroStore';
import Header from '../components/Header/Header';
import HomePage from '../components/Home/Home';
import Login from '../components/LoginSignUp/Login';
import Alerts from '../components/Alerts/Alerts';
import Statics from '../components/Statics/Statics';

export default function Home(props) {
  // const { user } = props;
  const { user: userCookie } = props;
  const { user, setUser } = useUserStore();
  const { setBaros } = useBarosStore();
  const [tab, setTab] = useState('home');


  // fetch user / handle login
  useEffect(() => {
    if (!user) {
      if (userCookie) {
        setUser(userCookie);
      } else {
        setTab('login');
      }
    } else {
      setTab('home');
    }
  }, [user]);

  // fetch barometer
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get('/api/appwrite/baro/?size=60');
      await setBaros(data.documents);
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header showTopHeader setTab={setTab} activeTab={tab} />
      {tab === 'home' && user && <HomePage />}
      {tab === 'login' && <Login />}
      {tab === 'alerts' && <Alerts />}
      {tab === 'statics' && <Statics />}
    </>
  );
}

export const getServerSideProps = withIronSessionSsr(async ({ req }) => {
  try {
    const { user } = req.session;
    if (!user) {
      return {
        props: {
          user: null,
        },
      };
    }
    return {
      props: {
        user,
      },
    };
  } catch (error) {
    return {
      props: {
        user: null,
      },
    };
  }
}, sessionOptions);
