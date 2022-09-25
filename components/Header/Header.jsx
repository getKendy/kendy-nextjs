import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { useRouter } from 'next/router';
import buttons from './buttons';
import useUserStore from '../../lib/store/userStore';

function Header({
  title, description, activeTab, showTopHeader, setTab
}) {
  const { user, cleanUser } = useUserStore();
  const router = useRouter();
  const signOut = async () => {
    await axios.post('/api/auth/logout', {});
    cleanUser();
    router.reload();
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/GetKendyLogo.png" />
      </Head>
      {showTopHeader && (

        <div className="navbar bg-base-200">
          <Image src="/GetKendyLogo.png" width={50} height={50} alt="GetKendy Logo is shown here" />
          <Link href="/">
            <div className="btn btn-ghost uppercase text-xl text-primary-focus">
              GetKendy
            </div>
          </Link>
        </div>
      )}
      <div className="btm-nav z-10">
        {buttons.slice(0, 1).map((button) => (

          <button
            type="button"
            key={button.id}
            className={activeTab === button.name ? 'text-primary active' : 'text-primary'}
            onClick={() => (user ? setTab(button.name) : setTab('login'))}
          >
            {button.svg}
            <span className="btm-nav-label">
              {button.Label}
            </span>
          </button>

        ))}
        {buttons.slice(1, 3).map((button) => (

          <button
            type="button"
            key={button.id}
            className={user ? activeTab == button.name ? 'text-primary active' : 'text-primary' : 'disabled'}
            onClick={() => setTab(button.name)}
          >
            {button.svg}
            <span className="btm-nav-label">
              {button.Label}
            </span>
          </button>

        ))}
        {user && (
          <button type="button" onClick={() => signOut()} className="text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span className="btm-nav-label">Logout</span>
          </button>
        )}

      </div>
    </div>
  );
}

export default Header;
