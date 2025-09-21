// Import React and useState hook for component state management
import React, { useState } from 'react'
// Import Graph component for displaying analytics charts
import Graph from './Graph'

// Import custom context hook for accessing authentication state
import { useStoreContext } from '../../contextApi/ContextApi'
// Import custom hooks for fetching user's shortened URLs and click statistics
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
// Import popup component for creating new shortened URLs
import ShortenPopUp from './ShortenPopUp'
// Import link icon from react-icons
import { FaLink } from 'react-icons/fa'
// Import component for displaying list of shortened URLs
import ShortenUrlList from './ShortenUrlList'
// Import useNavigate hook for programmatic navigation
import { useNavigate } from 'react-router-dom'
// Import loading component
import Loader from '../Loader'

// Main dashboard layout component that displays user's URL statistics and management interface
const DashboardLayout = () => {
    // Get authentication token from global context
    const { token } = useStoreContext();
    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // State to control the visibility of the create new URL popup
    const [shortenPopUp, setShortenPopUp] = useState(false);

    // Fetch user's shortened URLs with loading state and refetch function
    const {isLoading, data: myShortenUrls, refetch } = useFetchMyShortUrls(token, onError)
    
    // Fetch total click statistics with loading state
    const {isLoading: loader, data: totalClicks} = useFetchTotalClicks(token, onError)

    // Error handler function that redirects to error page
    function onError() {
      navigate("/error");
    }

  return (
    // Main dashboard container with responsive padding and full height minus navbar
    <div className="lg:px-14 sm:px-8 px-4 min-h-[calc(100vh-64px)] bg-black">
        {/* Show loader while data is being fetched */}
        {loader ? ( 
            <Loader />
        ): ( 
        // Main dashboard content container
        <div className="lg:w-[90%] w-full mx-auto py-16">
            {/* Dashboard header section */}
            <div className="mb-6">
              <h1 className="text-yellow-400 font-bold text-2xl">Dashboard</h1>
              <p className="text-gray-300 text-sm">Overview of your links and activity</p>
            </div>

            {/* Statistics cards grid - responsive 3 columns on larger screens, 1 column on mobile */}
            <div className="grid sm:grid-cols-3 grid-cols-1 gap-4 mb-8">
              {/* Total Links card */}
              <div className="gradient-border rounded-lg card-hover">
                <div className="card-surface rounded-[11px] p-4">
                  <p className="text-gray-300 text-sm">Total Links</p>
                  <p className="text-yellow-400 text-3xl font-bold">{(myShortenUrls && myShortenUrls.length) || 0}</p>
                </div>
              </div>
              {/* Total Clicks card */}
              <div className="gradient-border rounded-lg card-hover">
                <div className="card-surface rounded-[11px] p-4">
                  <p className="text-gray-300 text-sm">Total Clicks</p>
                  <p className="text-yellow-400 text-3xl font-bold">{(totalClicks && totalClicks.reduce((a,b)=>a + (b.count||0),0)) || 0}</p>
                </div>
              </div>
              {/* Active This Month card */}
              <div className="gradient-border rounded-lg card-hover">
                <div className="card-surface rounded-[11px] p-4">
                  <p className="text-gray-300 text-sm">Active This Month</p>
                  <p className="text-yellow-400 text-3xl font-bold">{(totalClicks && totalClicks.length) || 0}</p>
                </div>
              </div>
            </div>
            {/* Analytics chart container with fixed height and gradient border */}
            <div className=" h-[420px] relative gradient-border card-hover rounded-xl">
                {/* Show "No Data" message when there are no click statistics */}
                {(Array.isArray(totalClicks) && totalClicks.length === 0) && (
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
                {/* Chart container with card surface styling */}
                <div className="card-surface rounded-[11px] p-3 h-full">
                  <Graph graphData={Array.isArray(totalClicks) ? totalClicks : []} />
                </div>
            </div>
            {/* Create new URL button section */}
            <div className='py-5 sm:text-end text-center'>
                <button
                    className='bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-4 py-2 rounded-md'
                    onClick={() => setShortenPopUp(true)}>
                    Create a New Short URL
                </button>
            </div>

            {/* Shortened URLs list section */}
            <div>
              {/* Show empty state message when user has no shortened URLs */}
              {!isLoading && Array.isArray(myShortenUrls) && myShortenUrls.length === 0 ? (
                <div className="flex justify-center pt-16">
                  <div className="flex gap-2 items-center justify-center py-6 sm:px-8 px-5 rounded-md shadow-lg card-surface">
                    <h1 className="text-gray-200 font-montserrat sm:text-[18px] text-[14px] font-semibold mb-1 ">
                      You haven't created any short link yet
                    </h1>
                    <FaLink className="text-blue-500 sm:text-xl text-sm " />
                  </div>
              </div>
              ) : (
                  // Render list of shortened URLs
                  <ShortenUrlList data={Array.isArray(myShortenUrls) ? myShortenUrls : []} />
              )}
            </div>
        </div>
        )}

        {/* Popup component for creating new shortened URLs */}
        <ShortenPopUp
          refetch={refetch}
          open={shortenPopUp}
          setOpen={setShortenPopUp}
        />
    </div>
  )
}

export default DashboardLayout