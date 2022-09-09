import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { authOptions } from '../api/auth/[...nextauth].js'
import { unstable_getServerSession } from "next-auth/next"
import Header from '../../components/Header/Header'
import { connectToDatabase } from '../../lib/mongoData.js'


const EditKey = ({ api }) => {
    const apiKey = useRef(null)
    const apiSecret = useRef(null)
    const [status, setStatus] = useState('')
    const router = useRouter()

    const formSubmitHandler = async (e) => {
        try {
            e.preventDefault()
            setStatus('')
            if (!apiKey.current.value || !apiSecret.current.value) {
                setStatus('Key or Secret is empty.')
                return
            }
            const data = await axios.put(`/api/binance/secret/put/`, {
                apikey: apiKey.current.value,
                apisecret: apiSecret.current.value,
            })
            router.push('/alerts')
        } catch (error) {
            setStatus(error)
        }
    }
    return (
        <div>
            <Header showTopHeader={true} title='GetKendy - Change Api Key' />
            <div className='flex  h-screen items-center justify-center'>
                <form onSubmit={formSubmitHandler}>
                    <div className='flex flex-col space-y-5 text-secondary text-3xl'>
                        <label className='p-2 border rounded-xl'>
                            Api Key
                            <input id='apikey' className='ml-5 border-b rounded-xl text-center float-right' ref={apiKey} defaultValue={api.apikey} type="text" name="apiKey" />
                        </label>
                        <label className='p-2 border rounded-xl'>
                            Api Secret
                            <input id='apisecret' className='ml-5 border-b rounded-xl text-center float-right' ref={apiSecret} defaultValue={''} type="password" name="apiSecret" />
                        </label>
                        <button className='btn btn-primary' >Edit Key</button>
                        <label className='text-red-500 text-center'>{status}</label>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditKey


export async function getServerSideProps(context) {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const { db } = await connectToDatabase()


    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    const data = await db.collection("binanceKey").findOne({
        username: session.user.email
    })
    
    return {
        props: {
            api: { _id: JSON.stringify(data._id), apikey: data.apikey }
        },
    }
}