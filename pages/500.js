// pages/500.js
import Link from 'next/link'
import Header from '../components/Header/Header'

export default function Custom500() {

    
    return (
        <div>
            <Header showTopHeader={true} />
            <div className='flex flex-col justify-center items-center min-h-screen'>

                <h1 className='text-center'>500 - Server-side error occurred</h1>
                <h2 className='text-center link'>
                    <Link href='/'>

                        Return to Home
                    </Link>
                </h2>
            </div>
        </div>
    )

}