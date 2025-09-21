// Import the main app router and subdomain router components
import AppRouter, { SubDomainRouter } from "../AppRouter";

// Configuration array that maps subdomains to their corresponding app components
export const subDomainList=[
    // Main application router for www subdomain (or no subdomain)
    {subdomain:"www" ,app  :AppRouter  ,main:true},
    // Subdomain router for shortened URL handling on 'url' subdomain
    {subdomain:"url"  ,app:SubDomainRouter   ,main:false}
]