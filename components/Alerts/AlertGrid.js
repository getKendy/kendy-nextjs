import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { formatDateAlert } from '../../lib/formatDate'

// import io from 'socket.io-client'
// import Test from './Test'

const AlertGrid = () => {
    const [alerts, setAlerts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    // fetch alert 
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/backend/alert/?size=10&page=${currentPage}`)
            if (data) {
                setAlerts(data.items)
                setTotalPages(data.total / data.size)
            }
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 10000)
        return () => clearInterval(interval)
    }, [currentPage, totalPages])

    const handlePageUp = () => {
        // console.log({ 'page': currentPage })
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePageDown = () => {
        // console.log({ 'page': currentPage })
        if (currentPage >= 2) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (

        <div className='flex flex-col flex-grow'>
            {/* <Test></Test> */}
            <h2 className='text-2xl text-center text-primary-content border-b shadow-inner shadow-secondary'>Binance Scanner Alerts:</h2>
            {
                alerts.length > 0 ? (
                    <>
                        <table className='mb-2 hidden md:table table-compact table-zebra'>
                            <thead className=''>
                                <tr className=''>
                                    <th>Date</th>
                                    <th className='truncate'>Interval</th>
                                    <th>Market</th>
                                    <th>Volume 24h</th>
                                    <th>Close</th>
                                    <th className=''>
                                        <div className='flex space-x-1'>
                                            <div>BBL</div>
                                            <div>/</div>
                                            <div>BBM</div>
                                        </div>
                                        <div className='flex space-x-1'>
                                            <div>BBU</div>
                                            <div>/</div>
                                            <div>BBB</div>
                                        </div>
                                    </th>
                                    <th className='text-center'>Sto %K/%D</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    alerts.length > 0 ? alerts.map((alert, index) => (

                                        <tr key={index} className='text-primary-content'>
                                            <td>{formatDateAlert(alert.date)}</td>
                                            <td>{alert.timeframe}</td>
                                            <td>{alert.market}</td>
                                            <td>{alert.volume24h}</td>
                                            <td>{alert.close}</td>
                                            <td className=''>
                                                <div className='flex space-x-1'>
                                                    <div>{alert.bbl}</div>
                                                    <div>/</div>
                                                    <div>{alert.bbm}</div>
                                                </div>
                                                <div className='flex space-x-1'>
                                                    <div>{alert.bbu}</div>
                                                    <div>/</div>
                                                    <div>{alert.bbb}%</div>
                                                </div>
                                            </td>
                                            <td className='text-center'>{alert.stochk}/{alert.stockd}</td>

                                        </tr>
                                    )) : null
                                }
                            </tbody>
                        </table>
                        <div className='md:hidden mb-6'>

                        {alerts.length > 0 ? alerts.map((alert, index) => (
                            <div key={index} className=' grid grid-cols-2 p-2 m-2 border border-primary rounded-lg shadow shadow-secondary'>

                                <div>Date:</div>
                                <div className=''>{formatDateAlert(alert.date)}</div>
                                <div>Timeframe:</div>
                                <div className=''>{alert.timeframe}</div>
                                <div>Market:</div>
                                <div className=''>{alert.market}</div>
                                <div>Volume 24h:</div>
                                <div className=''>{alert.volume24h}</div>
                                <div>Close:</div>
                                <div className=''>{alert.close}</div>
                                <div>BBL:</div>
                                <div className=''>{alert.bbl}</div>
                                <div>BBM:</div>
                                <div className=''>{alert.bbm}</div>
                                <div>BBU:</div>
                                <div className=''>{alert.bbu}</div>
                                <div>BBB:</div>
                                <div className=''>{alert.bbb}%</div>
                                <div>Stoch %K/%D:</div>
                                <div className=''>{alert.stochk}/{alert.stochk}</div>

                                
                                

                            </div>
                        )) : null}
                        </div>
                    </>
                ) : <div className='h-screen text-center text-primary-content'>Alerts on 3 and 5min. timeframe are active</div>
            }
            {
                alerts.length > 0 ?
                    <div className="mb-20 md:mb-2 lg:mb-20 xl:mb-0 btn-group justify-center mt-1">
                        <button className={currentPage == 1 ? 'btn btn-sm btn-primary btn-disabled' : 'btn btn-sm btn-primary'} onClick={() => { handlePageDown() }}>«</button>
                        <button className='btn btn-sm'>Page {currentPage}
                        </button>
                        <button className={currentPage >= totalPages ? "btn btn-sm btn-primary btn-disabled" : 'btn btn-sm btn-primary'} onClick={() => { handlePageUp() }}>»</button>
                    </div>
                    : null
            }

        </div>

    )
}

export default AlertGrid