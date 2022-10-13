/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { account } from '../../utils/sdk';
import useUserStore from '../../utils/store/user';
import useActiveTabStore from '../../utils/store/activeTab';
import buttons from './buttons';

function Header() {
  const [fetchError, setfetchError] = useState('');
  const { activeTab } = useActiveTabStore();
  const { user, setUser } = useUserStore();
  const router = useRouter();

  // console.log(router);
  useEffect(() => {
    const fetchAccount = async () => {
      if (!user) {
        try {
          const curUser = await account.get();
          setUser(curUser);
        } catch (error) {
          setfetchError(error);
        }
      }
    };
    fetchAccount();
  }, [user, setUser]);

  function changeTab(name, link) {
    // setActiveTab(name);
    router.push(link);
  }

  async function logout() {
    await account.deleteSession('current');
    router.reload();
  }

  return (
    <div className="border-b border-primary">
      {/* header */}
      <div className="navbar bg-base-300">
        <div className="flex-1">
          <Image src="/GetKendyLogo.png" width={50} height={50} alt="GetKendy Logo is shown here" />
          <Link href="/" className="btn btn-ghost normal-case prose">
            <h1 className="flex">
              <div className="text-primary-focus">Get</div>
              <div>Kendy</div>
            </h1>
          </Link>
        </div>
        <div className="flex space-x-5 items-center justify-center">
          <p className="items-center">Hello</p>
          <p>{user && user.name}</p>
        </div>
      </div>

      {/* btm nav */}
      <div className="btm-nav z-10 bg-base-300">
        {buttons.slice(0, 1).map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => changeTab(button.name, button.link)}
            className={activeTab === button.name ? 'text-accent-content active' : 'text-accent-content'}
          >
            {button.svg}
            <span className="btm-nav-label">{button.Label}</span>
          </button>
        ))}
        {buttons.slice(1, 3).map((button) => (
          <button
            key={button.id}
            type="button"
            onClick={() => changeTab(button.name, button.link)}
            className={
              user ? (activeTab === button.name ? 'text-accent-content active' : 'text-accent-content') : 'disabled'
            }
          >
            {button.svg}
            <span className="btm-nav-label">{button.Label}</span>
          </button>
        ))}
        {user ? (
          <>
            <button
              type="button"
              onClick={() => changeTab('settings', '/settings')}
              className={`text-accent-content ${activeTab === 'settings' && 'active'}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
                />
              </svg>
              <span className="btm-nav-label">Settings</span>
            </button>
            <button type="button" onClick={logout} className="text-accent-content">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span className="btm-nav-label">Logout</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className={`text-accent-content ${activeTab === 'login' && 'active'}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
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
