import Link from 'next/link'
import Header from '../component/Header/Header'
// pages/404.js
export default function Custom404() {
    return (
        <div>
            <Header showTopHeader={true} />
            <div className='flex flex-col justify-center items-center min-h-screen'>

                <h1 className='text-center'>404 - Page Not Found </h1>
                <h2 className='text-center link'>
                    <Link href='/'>

                        Return to Home
                    </Link>
                </h2>
            </div>
        </div>
    )
}