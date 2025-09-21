// Import dayjs library for date formatting
import dayjs from 'dayjs';
// Import React hooks for component state management and side effects
import React, { useEffect, useState } from 'react'
// Import various icons from react-icons for UI elements
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
// Import configured axios instance for API calls
import api from '../../api/api';
// Import React Router components for navigation and linking
import { Link, useNavigate } from 'react-router-dom';
// Import custom context hook for accessing authentication state
import { useStoreContext } from '../../contextApi/ContextApi';
// Import Graph component for displaying analytics charts
import Graph from './Graph';

// Component that displays individual shortened URL item with analytics and management features
const ShortenItem = ({ originalUrl, shortUrl, clickcount, createDate }) => {
    // Get authentication token from global context
    const { token } = useStoreContext();
    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // State to track if URL has been copied to clipboard
    const [isCopied, setIsCopied] = useState(false);
    // State to control analytics section visibility
    const [analyticToggle, setAnalyticToggle] = useState(false);
    // State to manage loading state during analytics fetch
    const [loader, setLoader] = useState(false);
    // State to store the selected URL for analytics
    const [selectedUrl, setSelectedUrl] = useState("");
    // State to store fetched analytics data
    const [analyticsData, setAnalyticsData] = useState([]);

    // Extract subdomain from environment variable for URL display
    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
        /^https?:\/\//,
        ""
      );

    // Function to handle analytics toggle and URL selection
    const analyticsHandler = (shortUrl) => {
        // If analytics is not currently shown, set the selected URL
        if (!analyticToggle) {
            setSelectedUrl(shortUrl);
        }
        // Toggle analytics visibility
        setAnalyticToggle(!analyticToggle);
    }

    // Function to fetch analytics data for a specific shortened URL
    const fetchMyShortUrl = async () => {
        // Set loading state to true
        setLoader(true);
        try {
             // Make API call to fetch analytics data with date range
             const { data } = await api.get(`/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`, {
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                          Authorization: "Bearer " + token,
                        },
                      });
            // Store fetched analytics data
            setAnalyticsData(data);
            // Clear selected URL
            setSelectedUrl("");
            console.log(data);
            
        } catch (error) {
            // Navigate to error page on API failure
            navigate("/error");
            console.log(error);
        } finally {
            // Always set loading state to false
            setLoader(false);
        }
    }

    // Effect hook to fetch analytics when a URL is selected
    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

  return (
    <div className={`gradient-border card-hover rounded-md`}>
    <div className={`card-surface rounded-[11px] flex sm:flex-row flex-col  sm:justify-between w-full sm:gap-0 gap-5 py-5 px-6 `}>
      <div className="flex-1 sm:space-y-1 max-w-full overflow-x-auto overflow-y-hidden ">
        <div className="text-yellow-400 pb-1 sm:pb-0   flex items-center gap-2 ">
            {/* <a href={`${import.meta.env.VITE_REACT_SUBDOMAIN}/${shortUrl}`}
                target="_blank"
                className=" text-[17px]  font-montserrat font-[600] text-linkColor ">
                {subDomain + "/" + `${shortUrl}`}
            </a> */}

            <Link
              target='_'
              className='text-[17px]  font-montserrat font-[600] text-yellow-400'
              to={import.meta.env.VITE_REACT_FRONT_END_URL+ "/s/" + `${shortUrl}`}>
                  {subDomain  +'/s/'+ `${shortUrl}`}
            </Link>
            <FaExternalLinkAlt className="text-yellow-400" />
            </div>

        <div className="flex items-center gap-1 ">
            <h3 className=" text-gray-300 font-[400] text-[17px] ">
              {originalUrl}
            </h3>
          </div>

          <div className="flex   items-center gap-8 pt-6 ">
            <div className="flex gap-1  items-center font-semibold  text-green-400">
              <span>
                <MdOutlineAdsClick className="text-[22px] me-1" />
              </span>
              <span className="text-[16px]">{clickcount}</span>
              <span className="text-[15px] ">
                {clickcount === 0 || clickcount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 font-semibold text-lg text-gray-200">
              <span>
                <FaRegCalendarAlt />
              </span>
              <span className="text-[17px]">
                {dayjs(createDate).format("MMM DD, YYYY")}
              </span>
            </div>
            </div>
        </div>

        <div className="flex  flex-1  sm:justify-end items-center gap-4">
            <div 
                onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(`${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}`);
                        setIsCopied(true);
                        setTimeout(() => setIsCopied(false), 2000);
                    } catch (err) {
                        console.error('Failed to copy: ', err);
                    }
                }}
                className="flex cursor-pointer gap-1 items-center bg-yellow-500 hover:bg-yellow-400 py-2  font-semibold shadow-md shadow-black/40 px-6 rounded-md text-black "
            >
                <button className="  ">{isCopied ? "Copied" : "Copy"}</button>
                {isCopied ? (
                    <LiaCheckSolid className="text-md" />
                ) : (
                    <IoCopy className="text-md" />
                )}
            </div>

            <div
                onClick={() => analyticsHandler(shortUrl)}
                className="flex cursor-pointer gap-1 items-center bg-yellow-600 hover:bg-yellow-500 py-2 font-semibold shadow-md shadow-black/40 px-6 rounded-md text-black "
            >
                <button>Analytics</button>
                <MdAnalytics className="text-md" />
          </div>
          </div>
        </div>
    <React.Fragment>
        <div className={`${
            analyticToggle ? "flex" : "hidden"
          }  sm:mt-0 mt-5 min-h-96 relative  border-t-2 w-full overflow-hidden `}>
            {loader ? (
                <div className="min-h-[calc(450px-140px)] flex justify-center items-center w-full">
                    <div className="flex flex-col items-center gap-1">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
                        <p className='text-gray-300'>Please Wait...</p>
                    </div>
                </div>
                ) : ( 
                    <>{analyticsData.length === 0 && (
                        <div className="absolute flex flex-col justify-center items-center w-full h-full left-0 top-0">
                            <h1 className=" text-yellow-400 font-serif sm:text-2xl text-[15px] font-bold mb-1">
                                No Data For This Time Period
                            </h1>
                            <h3 className="sm:w-96 w-[90%] sm:ml-0 pl-6 text-center sm:text-lg text-[12px] text-gray-300 ">
                                Share your short link to view where your engagements are
                                coming from
                            </h3>
                        </div>
                    )}
                        <div className='card-surface rounded-md p-0 w-full'>
                          <div className='w-full min-h-[420px] h-auto'>
                            <Graph graphData={analyticsData} />
                          </div>
                        </div>
                    </>
                    )}
        </div>
    </React.Fragment>
    </div>
  )
}

export default ShortenItem