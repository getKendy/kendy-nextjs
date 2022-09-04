import React, { useEffect, useState } from 'react'
import { authOptions } from './api/auth/[...nextauth].js'
import { unstable_getServerSession } from "next-auth/next"
import axios from 'axios'

import Header from '../components/Header/Header'
import AlertStats from '../components/Alerts/AlertStats'
import AlertGrid from '../components/Alerts/AlertGrid'
import AlertSide from '../components/Alerts/AlertSide'

const Alerts = () => {
    const [baros, setBaros] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/backend/baro/?size=60')
            // console.log({'baro':data})
            setBaros(data.items)
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 60000)
        return () => clearInterval(interval)
    }, [])

    return (
        <React.Fragment>
            <Header activeTab='alerts' description='Crypto Scanner Trading Alerts' title='GetKendy - Alerts' />
            <AlertStats baros={baros}/>
            <div className='mb-2 sm:mb-4 md:mb-16 lg:mb-0 overflow-x-auto w-full min-h-screen bg-base-300 rounded-t-xl'>
                <div className=' flex flex-grow flex-shrink flex-col-reverse  justify-center xl:flex-row '>
                    <AlertGrid />
                    <AlertSide baros={baros}/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Alerts

export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {

        },
    }
}