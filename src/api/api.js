// Import axios library for making HTTP requests
import axios  from "axios";

// Create and export a configured axios instance with base URL for the backend API
export default axios.create({
    // Base URL for the URL shortener backend API hosted on Render
    baseURL: 'https://url-shortner-puo8.onrender.com',
})

