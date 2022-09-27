/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account } from '../../appwrite/sdk';
import useUserStore from '../../store/userStore';
import useTabStore from '../../store/tabStore';
import buttons from './buttons';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useUserStore();
  const { activeTab, setActiveTab } = useTabStore();
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await account.get();
        setUser(data);
      } catch (error) {
        setFetchError(error);
      }
    };
    fetchUser();
  }, []);

  function changeTab(name, link) {
    setActiveTab(name);
    navigate(link);
  }

  function logout() {
    navigate('/');
    account.deleteSession('current');
    navigate(0);
  }

  return (
    <div>
      {/* header */}
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <img src="/GetKendyLogo.png" width={50} height={50} alt="GetKendy Logo is shown here" />
          <a href="/" className="btn btn-ghost normal-case text-xl">GetKendy</a>
        </div>
        <div className="flex-none space-x-2 items-center">
          <div>Hello</div>
          <div>{user && user.name}</div>
        </div>
      </div>

      {/* btm nav */}
      <div className="btm-nav z-10">
        {buttons.slice(0, 1).map((button) => (
          <button key={button.id} type="button" onClick={() => changeTab(button.name, button.link)} className={activeTab === button.name ? 'text-primary active' : 'text-primary'}>
            {button.svg}
            <span className="btm-nav-label">
              {button.Label}
            </span>
          </button>
        ))}
        {buttons.slice(1, 3).map((button) => (
          <button key={button.id} type="button" onClick={() => changeTab(button.name, button.link)} className={user ? activeTab === button.name ? 'text-primary active' : 'text-primary' : 'disabled'}>
            {button.svg}
            <span className="btm-nav-label">
              {button.Label}
            </span>
          </button>
        ))}
        {user ? (
          <>
            <button type="button" onClick={() => changeTab('settings', '/settings')} className={`text-primary ${activeTab === 'settings' && 'active'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5" />
              </svg>
              <span className="btm-nav-label">Settings</span>
            </button>
            <button type="button" onClick={() => logout()} className="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span className="btm-nav-label">Logout</span>
            </button>
          </>
        ) : (
          <button type="button" onClick={() => navigate('/auth/login')} className={`text-primary ${activeTab === 'login' && 'active'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="btm-nav-label">Login</span>
          </button>
        )}
      </div>
      {fetchError && ''}
    </div>
  );
}

export default Header;
