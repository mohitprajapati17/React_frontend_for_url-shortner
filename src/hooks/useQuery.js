// Import useQuery hook from React Query for server state management
import { useQuery } from "@tanstack/react-query";
// Import configured axios instance for API calls
import api from "../api/api";

// Custom hook to fetch user's shortened URLs from the API
export const useFetchMyShortUrls = (token, onError) => {
    // Log the token being used for debugging purposes
    console.log("Fetching with token:", token);

  // Return a React Query hook for fetching shortened URLs
  return useQuery({
    // Unique query key that includes the token to ensure proper caching
    queryKey: ["my-shortenurls", token],
    // Async function that makes the API call to fetch user's URLs
    queryFn: async () =>
      await api.get("/api/urls/Urls", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }),
    // Transform the data after fetching - sort by creation date (newest first)
    select: (data) => {
      const sortedData = data.data.sort(
        (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
      );
      return sortedData;
    },
    // Error handler function passed from component
    onError,
    // Only run the query if token exists (user is authenticated)
    enabled: !!token,
    // Data is considered fresh for 1 minute
    staleTime: 60 * 1000,
    // Keep data in cache for 5 minutes after component unmounts
    gcTime: 5 * 60 * 1000,
    // Don't refetch when window regains focus
    refetchOnWindowFocus: false,
    // Don't refetch when network reconnects
    refetchOnReconnect: false,
    // Don't refetch when component mounts if data exists
    refetchOnMount: false,
  });
};

// Custom hook to fetch total click statistics for analytics
export const useFetchTotalClicks = (token, onError) => {
    // Log the token being used for debugging purposes
    console.log("Fetching total clicks with token:", token);

  // Return a React Query hook for fetching click statistics
  return useQuery({
    // Unique query key that includes the token to ensure proper caching
    queryKey: ["url-totalclick", token],
    // Async function that makes the API call to fetch click statistics
    queryFn: async () =>
      await api.get(
        // API endpoint with date range parameters for click statistics
        "/api/urls/totalClicks?startDate=2024-01-01&endDate=2025-12-31",
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      ),
    // Transform the data after fetching - convert object to array format for charts
    select: (data) => {
      // Convert object with date keys to array of objects with clickDate and count
      const convertToArray = Object.keys(data.data).map((key) => ({
        clickDate: key,
        count: data.data[key],
      }));
      return convertToArray;
    },
    // Error handler function passed from component
    onError,
    // Only run the query if token exists (user is authenticated)
    enabled: !!token,
    // Data is considered fresh for 1 minute
    staleTime: 60 * 1000,
    // Keep data in cache for 5 minutes after component unmounts
    gcTime: 5 * 60 * 1000,
    // Don't refetch when window regains focus
    refetchOnWindowFocus: false,
    // Don't refetch when network reconnects
    refetchOnReconnect: false,
    // Don't refetch when component mounts if data exists
    refetchOnMount: false,
  });
};
