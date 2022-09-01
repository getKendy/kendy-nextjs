import React from 'react'

import Header from '../../components/Header/Header'
const AddKey = () => {
    return (
        <div>
            <Header showTopHeader={true} title='GetKendy - Add Api Key' />
            <div className='flex  h-screen items-center justify-center'>
                <form action=''>
                    <div className='flex flex-col space-y-5 text-secondary text-3xl'>
                        <label className='p-2 border rounded-xl'>
                            Api Key
                            <input className='ml-5 border-b rounded-xl text-center float-right' type="text" name="apiKey" id="" />
                        </label>
                        <label className='p-2 border rounded-xl'>
                            Api Secret
                            <input className='ml-5 border-b rounded-xl text-center float-right' type="password" name="apiSecret" id="" />
                        </label>
                        <button className='btn btn-primary'>Save Key</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddKey