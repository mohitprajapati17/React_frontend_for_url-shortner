import React, { useState } from 'react'
import Graph from './Graph'

import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import { FaLink } from 'react-icons/fa'
import ShortenUrlList from './ShortenUrlList'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'

const DashboardLayout = () => {
    // const refetch = false;
    const { token } = useStoreContext();
    const navigate = useNavigate();
    const [shortenPopUp, setShortenPopUp] = useState(false);

    // console.log(useFetchTotalClicks(token, onError));

    const {isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError)
    
    const {isLoading: loader, data: totalClicks} = useFetchTotalClicks(token, onError)

    function onError() {
      navigate("/error");
    }

  return (
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)] bg-black">
        {loader ? ( 
            <Loader />
        ): ( 
        <div className="lg:w-[90%] w-full mx-auto py-16">
            <div className="mb-6">
              <h1 className="text-yellow-400 font-bold text-2xl">Dashboard</h1>
              <p className="text-gray-300 text-sm">Overview of your links and activity</p>
            </div>

            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mb-8">
              <div className="gradient-border rounded-lg card-hover">
                <div className="card-surface rounded-[11px] p-4">
                  <p className="text-gray-300 text-sm">Total Links</p>
                  <p className="text-yellow-400 text-3xl font-bold">{(myShortenUrls && myShortenUrls.length) || 0}</p>
                </div>
              </div>
              <div className="gradient-border rounded-lg card-hover">
                <div className="card-surface rounded-[11px] p-4">
                  <p className="text-gray-300 text-sm">Total Clicks</p>
                  <p className="text-yellow-400 text-3xl font-bold">{(totalClicks && totalClicks.reduce((a,b)=>a + (b.count||0),0)) || 0}</p>
                </div>
              </div>
              <div className="gradient-border rounded-lg card-hover">
                <div className="card-surface rounded-[11px] p-4">
                  <p className="text-gray-300 text-sm">Active This Month</p>
                  <p className="text-yellow-400 text-3xl font-bold">{(totalClicks && totalClicks.length) || 0}</p>
                </div>
              </div>
            </div>
            <div className=" h-[420px] relative gradient-border card-hover rounded-xl">
                {totalClicks&&totalClicks.length === 0 && (
                     <div className="absolute flex flex-col justify-center sm:items-center items-end w-full left-0 top-0 bottom-0 right-0 m-auto">
                     <h1 className=" text-yellow-400 font-serif sm:text-2xl text-[18px] font-bold mb-1">
                       No Data For This Time Period
                     </h1>
                     <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-sm text-gray-300 ">
                       Share your short link to view where your engagements are
                       coming from
                     </h3>
                   </div>
                )}
                <div className="card-surface rounded-[11px] p-3 h-full">
                  <Graph graphData={totalClicks} />
                </div>
            </div>
            <div className='py-5 sm:text-end text-center'>
                <button
                    className='bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded-md'
                    onClick={() => setShortenPopUp(true)}>
                    Create a New Short URL
                </button>
            </div>

            <div>
              {!isLoading && myShortenUrls&&myShortenUrls.length === 0 ? (
                <div className="flex justify-center pt-16">
                  <div className="flex gap-2 items-center justify-center py-6 sm:px-8 px-5 rounded-md shadow-lg card-surface">
                    <h1 className="text-gray-200 font-montserrat sm:text-[18px] text-[14px] font-semibold mb-1 ">
                      You haven't created any short link yet
                    </h1>
                    <FaLink className="text-blue-500 sm:text-xl text-sm " />
                  </div>
              </div>
              ) : (
                  <ShortenUrlList data={myShortenUrls} />
              )}
            </div>
        </div>
        )}

        <ShortenPopUp
          refetch={refetch}
          open={shortenPopUp}
          setOpen={setShortenPopUp}
        />
    </div>
  )
}

export default DashboardLayout