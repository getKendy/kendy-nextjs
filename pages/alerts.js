import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import { authOptions } from './api/auth/[...nextauth].js'
import { unstable_getServerSession } from "next-auth/next"
import axios from 'axios'

const Alerts = () => {
    const [baro, setBaro] = useState([])
    const [btcbusd, setBtcbusd] = useState({})

    // fetch 1min baro 
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get('/api/backend/baro')
            console.log(data)
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
            console.log(data)
            setBtcbusd(data)
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 60000)
        return () => clearInterval(interval)
    }, [])
    return (
        <div>
            <Header activeTab='alerts' description='Crypto Scanner Trading Alerts' title='GetKendy - Alerts' />
            <div className="lg:mx-20 stats shadow grid place-items-center ">

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div className="stat-title">BTC - Fiat Binance Dominance</div>
                    <div className="stat-value">{baro[0]?.btcStrength}</div>
                    <div className="stat-desc">{baro[0]?.date}</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                    </div>
                    <div className="stat-title">BTC - Alts Binance Dominance</div>
                    <div className="stat-value">{baro[0]?.altBtcStrength}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                    </div>
                    <div className="stat-title">Ticker BTC/BUSD</div>
                    <div className="stat-value">{btcbusd.close}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>
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