// Import the subdomain configuration list from constants
import { subDomainList } from "./constant";

// Function to determine which app component to render based on current subdomain
export const getApps = () => {
    // Extract subdomain from current window hostname
    const subdomain = getSubDomain(window.location.hostname);

    // Find the main app configuration (www subdomain)
    const mainApp = subDomainList.find((app) => app.main);
    // If no subdomain found, return the main app
    if (subdomain === "") return mainApp.app;

    // Find the app configuration that matches the current subdomain
    const apps = subDomainList.find((app) => subdomain === app.subdomain);

    // Return the matching app or fallback to main app if no match found
    return apps ? apps.app : mainApp.app;
}

// Function to extract subdomain from a given hostname
// Examples: 
// - "url.localhost" returns "url"
// - "url.urlbestshort.com" returns "url"
export const getSubDomain = (location) => {
    // Split the hostname by dots to get individual parts
    const locationParts = location.split(".");
    // Check if the last part is "localhost" (for development)
    const isLocalhost = locationParts.slice(-1)[0] === "localhost";
    // Determine how many parts to slice from the end
    // For localhost: slice 1 part (remove "localhost")
    // For production: slice 2 parts (remove "com" and domain)
    const sliceTill = isLocalhost ? -1 : -2;
    // Join the remaining parts to get the subdomain
    return locationParts.slice(0, sliceTill).join("");
};