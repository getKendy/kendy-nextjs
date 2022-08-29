import axios from 'axios'
import { current } from 'daisyui/src/colors'
import React, { useEffect, useState } from 'react'
import formatDate from '../../lib/formatDate'
const AlertGrid = () => {
    const [alerts, setAlerts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages]= useState(0)
    // fetch alert 
    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get(`/api/backend/alert/?size=10&page=${currentPage}`)
            if (data){
                setAlerts(data.items)
                setTotalPages(data.total / data.size)
            }
        }
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 10000)
        return () => clearInterval(interval)
    }, [currentPage,totalPages])

    const handlePageUp = () =>{
        console.log({'page':currentPage})
        if (currentPage < totalPages){
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
        <div className='overflow-x-auto w-full bg-base-200 rounded-t-xl'>
            {
                alerts.length > 0 ? (
                    <table className='w-full table'>
                        <tr className='border-b border-primary'>
                            <th>Date</th>
                            <th>Market</th>
                            <th>Volume 24h</th>
                            <th>Close</th>
                            <th>BBM</th>
                            <th>StochK</th>
                            <th>StochD</th>
                        </tr>
                        {
                            alerts.length > 0 ? alerts.reverse().map((alert, index) => (
                                <tr key={index} className='border-b border-secondary text-primary-content'>
                                    <td>{formatDate(alert.date)}</td>
                                    <td>{alert.market}</td>
                                    <td>{alert.volume24h}</td>
                                    <td>{alert.close}</td>
                                    <td>{alert.bbu}</td>
                                    <td>{alert.stochk}</td>
                                    <td>{alert.stockd}</td>
                                </tr>
                            )) : <div className='text-center text-primary'>No Alerts Found</div>
                        }
                    </table>
                ) : null
            }
            {alerts.length > 0 ?
                <div className="btn-group justify-center mt-1 mb-24">
                    <button className={currentPage == 1 ? 'btn btn-sm btn-primary btn-disabled' : 'btn btn-sm btn-primary'} onClick={() => { handlePageDown() }}>«</button>
                    <button className='btn btn-sm'>{currentPage}</button>
                    <button className={currentPage >= totalPages  ? "btn btn-sm btn-primary btn-disabled" : 'btn btn-sm btn-primary'} onClick={()=>{handlePageUp()}}>»</button>
                </div>
                : null}
        </div>
    )
}

export default AlertGrid