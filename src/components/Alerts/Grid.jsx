import React from 'react';

function Grid() {
  return (
    <div className="flex flex-col flex-grow">
      {/* <Test></Test> */}
      <h2 className="text-2xl text-center text-primary-content border-b shadow-inner shadow-secondary">Binance Scanner Alerts:</h2>
      {
        alerts.length > 0 ? (
          <>
            <form onSubmit={formSubmitHandler}>
              <div className="flex flex-grow justify-between items-center">

                <div>
                  <div className="label cursor-pointer space-x-2">
                    <span className="label-text text-secondary ">Enable Audio Alerts</span>
                    <input id="allowAudio" type="checkbox" defaultChecked={false} ref={checkboxAllowAudio} className="checkbox checkbox-primary" />
                  </div>
                </div>
                <div className="flex">
                  <div className="text-center text-secondary">

                    Alert Volume

                    <input id="audioLevel" type="range" min="0" max="100" ref={rangeAudioLevel} defaultValue={50} className="range range-md range-secondary bg-primary" step="5" />

                  </div>
                </div>
              </div>
            </form>
            <table className="mb-2 hidden md:table table-compact table-zebra">
              <thead className="">
                <tr className="">
                  <th>Date</th>
                  <th className="truncate">Interval</th>
                  <th>Market</th>
                  <th>Volume 24h</th>
                  <th>Close</th>
                  <th className="">
                    <div className="flex space-x-1">
                      <div>BBL</div>
                      <div>/</div>
                      <div>BBM</div>
                    </div>
                    <div className="flex space-x-1">
                      <div>BBU</div>
                      <div>/</div>
                      <div>BBB</div>
                    </div>
                  </th>
                  <th className="text-center">Sto %K/%D</th>
                </tr>
              </thead>
              <tbody>

                {
                  alerts.length > 0 ? alerts.map((alert, index) => (

                    <tr key={index} className="text-primary-content">
                      <td>{formatDateAlert(alert.date)}</td>
                      <td>{alert.timeframe}</td>
                      <td>{alert.market}</td>
                      <td>{alert.volume24h}</td>
                      <td>{alert.close}</td>
                      <td className="">
                        <div className="flex space-x-1">
                          <div>{alert.bbl}</div>
                          <div>/</div>
                          <div>{alert.bbm}</div>
                        </div>
                        <div className="flex space-x-1">
                          <div>{alert.bbu}</div>
                          <div>/</div>
                          <div>
                            {alert.bbb}
                            %
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        {alert.stochk}
                        /
                        {alert.stockd}
                      </td>

                    </tr>
                  )) : null
                }
              </tbody>
            </table>
            <div className="md:hidden mb-6">

              {alerts.length > 0 ? alerts.map((alert, index) => (
                <div key={index} className=" grid grid-cols-2 p-2 m-2 border border-primary rounded-lg shadow shadow-secondary">

                  <div>Date:</div>
                  <div className="">{formatDateAlert(alert.date)}</div>
                  <div>Timeframe:</div>
                  <div className="">{alert.timeframe}</div>
                  <div>Market:</div>
                  <div className="">{alert.market}</div>
                  <div>Volume 24h:</div>
                  <div className="">{alert.volume24h}</div>
                  <div>Close:</div>
                  <div className="">{alert.close}</div>
                  <div>BBL:</div>
                  <div className="">{alert.bbl}</div>
                  <div>BBM:</div>
                  <div className="">{alert.bbm}</div>
                  <div>BBU:</div>
                  <div className="">{alert.bbu}</div>
                  <div>BBB:</div>
                  <div className="">
                    {alert.bbb}
                    %
                  </div>
                  <div>Stoch %K/%D:</div>
                  <div className="">
                    {alert.stochk}
                    /
                    {alert.stochk}
                  </div>

                </div>
              )) : null}
            </div>
          </>
        ) : <div className="h-screen text-center text-primary-content">Alerts on 3 and 5min. timeframe are active</div>
      }
      {
        alerts.length > 0
          ? (
            <div className="mb-20 md:mb-2 lg:mb-20 xl:mb-0 btn-group justify-center mt-1">
              <button type="button" className={currentPage == 1 ? 'btn btn-sm btn-primary btn-disabled' : 'btn btn-sm btn-primary'} onClick={() => { handlePageDown(); }}>«</button>
              <button type="button" className="btn btn-sm">
                Page
                {' '}
                {currentPage}
              </button>
              <button type="button" className={currentPage >= totalPages ? 'btn btn-sm btn-primary btn-disabled' : 'btn btn-sm btn-primary'} onClick={() => { handlePageUp(); }}>»</button>
            </div>
          )
          : null
      }

    </div>
  );
}

export default Grid;
