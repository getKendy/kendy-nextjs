import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { authOptions } from './api/auth/[...nextauth].js'
import { unstable_getServerSession } from "next-auth/next"
import axios from 'axios'
import formatDate from '../lib/formatDate'
import AlertStats from '../components/Alerts/AlertStats'
import AlertGrid from '../components/Alerts/AlertGrid'

const Alerts = () => {
    const [baro, setBaro] = useState([])
    const [btcbusd, setBtcbusd] = useState({})
    const [alert, setAlert] = useState([])

    // fetch alert 
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/backend/alert')
            console.log(data)
            setAlert(data.items)
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 10000)
        return () => clearInterval(interval)
    }, [])
    // fetch 1min baro 
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/backend/baro/')
            // console.log({'baro':data})
            setBaro(data.items)
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 60000)
        return () => clearInterval(interval)
    }, [])

    // fetch btc ticker
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/backend/ticker/?symbol=BTCBUSD')
            // console.log({'ticker':data})
            setBtcbusd(data)
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div>
            <Header activeTab='alerts' description='Crypto Scanner Trading Alerts' title='GetKendy - Alerts' />
            <AlertStats baro={baro} btcbusd={btcbusd}/>
            <AlertGrid alert={alert}/>
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