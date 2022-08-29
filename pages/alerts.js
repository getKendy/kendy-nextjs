import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { authOptions } from './api/auth/[...nextauth].js'
import { unstable_getServerSession } from "next-auth/next"
import axios from 'axios'
import AlertStats from '../components/Alerts/AlertStats'
import AlertGrid from '../components/Alerts/AlertGrid'

const Alerts = () => {


    // fetch 1min baro 


    return (
        <div>
            <Header activeTab='alerts' description='Crypto Scanner Trading Alerts' title='GetKendy - Alerts' />
            <AlertStats />
            <AlertGrid />
        </div>
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