import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { formatDateAlert } from '../../lib/formatDate'

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
        console.log({ 'page': currentPage })
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handlePageDown = () => {
        console.log({ 'page': currentPage })
        if (currentPage >= 2) {
            setCurrentPage(currentPage - 1)
        }
    }

    return (

        <div className='flex flex-col flex-grow'>
            <h2 className='mb-5 text-2xl text-center text-primary-content border-b shadow-inner shadow-secondary'>Binance Scanner Alerts:</h2>
            {
                alerts.length > 0 ? (
                    <table className='mb-5 table table-compact table-zebra'>
                        <thead className='table-header-group'>
                            <tr className=''>
                                <th>Date</th>
                                <th className='truncate'>Interval</th>
                                <th>Market</th>
                                <th>Volume 24h</th>
                                <th>Close</th>
                                <th className=''>
                                    <div className='flex space-x-2'>
                                        <div>BBL</div>
                                        <div>/</div>
                                        <div>BBM</div>
                                    </div>
                                    <div className='flex space-x-2'>
                                        <div>BBU</div>
                                        <div>/</div>
                                        <div>BBB</div>
                                    </div>
                                </th>
                                <th className='text-center'>Stoch K/D</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                alerts.length > 0 ? alerts.map((alert, index) => (
                                    <tr key={index} className='text-primary-content'>
                                        <td className='table-cell'>{formatDateAlert(alert.date)}</td>
                                        <td>{alert.timeframe}</td>
                                        <td>{alert.market}</td>
                                        <td>{alert.volume24h}</td>
                                        <td>{alert.close}</td>
                                        <td className=''>
                                            <div className='flex space-x-2'>
                                                <div>{alert.bbl}</div>
                                                <div>/</div>
                                                <div>{alert.bbm}</div>
                                            </div>
                                            <div className='flex space-x-2'>
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
                ) : <div className='h-screen text-center text-primary-content'>Alerts on 3 and 5min. timeframe are active</div>
            }
            {
                alerts.length > 0 ?
                    <div className="btn-group justify-center mt-1 mb-24">
                        <button className={currentPage == 1 ? 'btn btn-sm btn-primary btn-disabled' : 'btn btn-sm btn-primary'} onClick={() => { handlePageDown() }}>«</button>
                        <button className='btn btn-sm'>{currentPage}</button>
                        <button className={currentPage >= totalPages ? "btn btn-sm btn-primary btn-disabled" : 'btn btn-sm btn-primary'} onClick={() => { handlePageUp() }}>»</button>
                    </div>
                    : null
            }

        </div>

    )
}

export default AlertGrid