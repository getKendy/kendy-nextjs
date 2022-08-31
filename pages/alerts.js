import React from 'react'
import Header from '../components/Header/Header'
import { authOptions } from './api/auth/[...nextauth].js'
import { unstable_getServerSession } from "next-auth/next"

import AlertStats from '../components/Alerts/AlertStats'
import AlertGrid from '../components/Alerts/AlertGrid'

const Alerts = () => {
    return (
        <React.Fragment>
            <Header activeTab='alerts' description='Crypto Scanner Trading Alerts' title='GetKendy - Alerts' />
            <AlertStats />
            <AlertGrid />
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