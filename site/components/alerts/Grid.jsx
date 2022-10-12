import React, { useEffect, useRef, useState } from 'react';
import { Query } from 'appwrite';
import useAlertStore from '../../utils/store/alert';
import { databases } from '../../utils/sdk';
import { formatDateAlert } from '../../utils/formatDate';



function Grid() {
  const [alerts, setAlerts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { lastAlert, addAlert } = useAlertStore();
  const checkboxAllowAudio = useRef(false);
  const rangeAudioLevel = useRef(50);

  const playAlert = () => {
    const ding = new Audio('ding.mp3');
    ding.volume = ((+(rangeAudioLevel.current.value)) / 100) || 0.50;
    if (checkboxAllowAudio.current.checked) {
      ding.play();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // const { data } = await axios.get(`/api/backend/alert/?size=10&page=${currentPage}`)
      const data = await databases.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_GETKENDY_DATA,
        process.env.NEXT_PUBLIC_APPWRITE_ALERTS,
        [
          Query.orderDesc('$id'),
          Query.limit(10),
        ],
      );

      if (data.documents[0]) {
        setAlerts(data.documents)
        setTotalPages(data.total / 10)
        if (!lastAlert) {
          // console.log('setting lastalert for the fist time')
          addAlert(data.documents[0])
          return
        }

        if (lastAlert.$id !== data.documents[0].$id) {
          // console.log('new alert')
          addAlert(data.documents[0])
          playAlert()
        }
      }
    };
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, [currentPage, totalPages]);



  const handlePageUp = () => {
    // console.log({ 'page': currentPage })
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageDown = () => {
    // console.log({ 'page': currentPage })
    if (currentPage >= 2) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col flex-grow text-neutral-content bg-base-200">
      {/* <Test></Test> */}
      <h2 className="text-2xl text-center border-b shadow-inner shadow-secondary">Binance Scanner Alerts:</h2>
      {
        alerts.length > 0 ? (
          <>
            <form onSubmit={formSubmitHandler}>
              <div className="flex flex-grow justify-between items-center">

                <div>
                  <div className="label cursor-pointer space-x-2">
                    <span className="label-text">Enable Audio Alerts</span>
                    <input id="allowAudio" type="checkbox" defaultChecked={false} ref={checkboxAllowAudio} className="checkbox checkbox-primary" />
                  </div>
                </div>
                <div className="flex">
                  <div className="text-center ">

                    Alert Volume

                    <input id="audioLevel" type="range" min="0" max="100" ref={rangeAudioLevel} defaultValue={50} className="range range-md range-secondary bg-primary" step="5" />

                  </div>
                </div>
              </div>
            </form>
            <table className="mb-2 hidden md:table text-primary ">
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
                  alerts.length > 0 ? alerts.map((alert) => (

                    <tr key={alert.$id} className="bg-base-200">
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

              {alerts.length > 0 ? alerts.map((alert) => (
                <div key={alert.$id} className=" grid grid-cols-2 p-2 m-2 border border-primary rounded-lg shadow shadow-secondary">

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
        ) : <div className="h-screen text-center ">Alerts on 1, 2, 3 and 5min. timeframe are active</div>
      }
      {
        alerts.length > 0
          ? (
            <div className="mb-20 md:mb-2 lg:mb-20 xl:mb-0 btn-group justify-center mt-1">
              <button type="button" className={currentPage === 1 ? 'btn btn-sm btn-primary btn-disabled' : 'btn btn-sm btn-primary'} onClick={() => { handlePageDown(); }}>«</button>
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
