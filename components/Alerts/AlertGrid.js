import React from 'react'

const AlertGrid = ({alert}) => {
    return (
        <React.Fragment>
            {
                alert.length > 0 ? (
                    <div className='flex justify-between mx-5 border-b'>
                        <div>Date</div>
                        <div>Symbol</div>
                        <div>BTC Volume</div>
                        <div>Close</div>
                        <div>BBU</div>
                        <div>StochK</div>
                        <div>StochD</div>
                    </div>
                ) : null
            }
            {
                alert.length > 0 ? alert.reverse().map((a, index) => (
                    <div key={index} className='flex justify-between mx-5 border-b border-secondary'>
                        <div>{formatDate(a.date)}</div>
                        <div>{a.symbol}</div>
                        <div>{a.quote}</div>
                        <div>{a.close}</div>
                        <div>{a.bbu}</div>
                        <div>{a.stochk}</div>
                        <div>{a.stockd}</div>
                    </div>
                )) : <div className='text-center text-primary'>No Alerts Found</div>
            }
        </React.Fragment>
    )
}

export default AlertGrid