import React from 'react'
import Link from 'next/link'
import Head from 'next/head';
import Image from 'next/image';

import { buttons } from './buttons'
// import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Client, Account } from 'appwrite'
import { useEffect } from 'react';


const Header = ({ title, description, activeTab, showTopHeader }) => {
    // const { data: session } = useSession();
    const router = useRouter();
    // console.log(session)
    const client = new Client()
    const account = new Account(client)
    client
        .setEndpoint('https://baas.hezik.nl/v1')
        .setProject('631db1da6e495d8a4abb')

    const promise = account.get();

    promise.then(function (response) {
        console.log(response); // Success
    }, function (error) {
        console.log(error); // Failure
    });
    
    // useEffect(()=>{
    //     const fetchData = async ()=>{
    //         try {
    //             const data = await account.get()
    //             console.log(data)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     fetchData()
    // },[])

    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content={description} />
                <link rel='icon' href='/GetKendyLogo.png' />
            </Head>
            {showTopHeader && (

                <div className="navbar bg-base-200">
                    <Image src='/GetKendyLogo.png' width={50} height={50} alt='GetKendy Logo is shown here' />
                    <Link href='/' >
                        <div className="btn btn-ghost uppercase text-xl text-primary-focus">
                            GetKendy
                        </div>
                    </Link>
                </div>
            )}
            <div className="btm-nav z-10">
                {buttons.map((button, index) => (
                    <Link key={index} href={button.link}>
                        {/* <button className={session ? activeTab == button.name ? 'text-primary active' : 'text-primary' : 'disabled'}> */}
                        <button className={activeTab == button.name ? 'text-primary active' : 'text-primary'}>
                            {button.svg}
                            <span className="btm-nav-label">
                                {button.Label}
                            </span>
                        </button>
                    </Link>
                ))}
                {/* {session ? (
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
                )} */}
                <button onClick={() => signIn()} className='text-primary'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                    <span className="btm-nav-label">Login</span>
                </button>
            </div>
        </div>
    )
}

export default Header
