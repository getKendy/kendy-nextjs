import React from 'react'
import Header from '../components/Header/Header'
import { authOptions } from './api/auth/[...nextauth].js'
import { unstable_getServerSession } from "next-auth/next"

const Alerts = () => {
  return (
      <div><Header activeTab='alerts' description='Crypto Scanner Trading Alerts' title='GetKendy - Alerts' /></div>
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