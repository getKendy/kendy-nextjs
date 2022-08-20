import React from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Image from 'next/image';

import { buttons } from './button'
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

const Header = ({ title, description, activeTab }) => {
    const { data: session } = useSession();
    const router = useRouter();
    // console.log(session)
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <link rel='icon' href='/GetKendyLogo.png' />
            </Head>
            <div className="navbar bg-base-200">
                <Image src='/GetKendyLogo.png' width={50} height={50} alt='GetKendy Logo is shown here'/>
                <a className="btn btn-ghost uppercase text-xl text-primary-focus">GetKendy</a>
            </div>
            <div className="btm-nav z-10">
                {buttons.map((button, index) => (
                    <Link key={index} href={button.link}>
                        <button className={session ? activeTab == button.name ? 'text-primary active' : 'text-primary' :'disabled'}>
                            {button.svg}
                            <span className="btm-nav-label">
                                {button.Label}
                            </span>
                        </button>
                    </Link>
                ))}
                {session ? (
                    <button onClick={() => signOut() && router.push('/')} className='text-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span className="btm-nav-label">Logout</span>
                    </button>
                ) : (
                    <button onClick={() => signIn()} className='text-primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                        <span className="btm-nav-label">Login</span>
                    </button>
                )}

            </div>
        </div>
    )
}

export default Header
