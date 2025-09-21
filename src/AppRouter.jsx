// Import the shortened URL page component for handling URL redirects
import ShortenUrlPage from './components/ShortenUrlPage'
// Import React Router components for routing functionality
import { BrowserRouter, Route,Router,Routes } from 'react-router-dom'
// Import page components
import AboutPage from './components/AboutPage'
import LandingPage from './components/LandingPage'
// Import layout components
import Navbar from './components/NavBar'
import  Footer from './components/Footer'
// Import authentication page components
import RegisterPage from './components/RegisterPage'
import LoginPage from './components/LoginPage'
// Import dashboard layout component
import DashboardLayout from './components/Dashboard/DashboardLayout'
// Import private route wrapper for protected routes
import PrivateRoute from './PrivateRoute'
// Import error page component for 404 handling
import ErrorPage from './components/ErrorPage'

// Main application router component that defines all routes
const AppRouter=()=>{
    // Check if current path starts with '/s' to hide header/footer for shortened URLs
    const hideHeaderFooter=location.pathname.startsWith('/s')
    return (
    <>
    {/* Conditionally render navbar - hide it for shortened URL pages */}
    {!hideHeaderFooter&&<Navbar/>}
    {/* Define all application routes */}
    <Routes>
      {/* Public routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/about' element={< AboutPage />} />
      
      {/* Authentication routes - only accessible when NOT logged in */}
      <Route path='/register' element={<PrivateRoute publicPage={true} ><RegisterPage/> </PrivateRoute>}/>
      <Route path='/login' element={<PrivateRoute publicPage={true}  > <LoginPage />  </PrivateRoute>} />
      
      {/* Protected route - only accessible when logged in */}
      <Route path='/dashboard' element={<PrivateRoute publicPage={false} >  <DashboardLayout />  </PrivateRoute>} />
      
      {/* Shortened URL route - handles URL redirects */}
      <Route path='/s/:url' element={<ShortenUrlPage />} />
      
      {/* Catch-all route for 404 errors */}
      <Route path="*" element ={<ErrorPage/>}/>
    </Routes>
    {/* Conditionally render footer - hide it for shortened URL pages */}
    {!hideHeaderFooter&&<Footer/>}

    </>
    )
    
}

// Export the main app router as default
export default AppRouter

// Subdomain router for handling shortened URLs on subdomains
export const  SubDomainRouter=()=>{
    return (
        <Routes>
      {/* Route for shortened URLs on subdomains */}
      <Route path='/:url' element={<ShortenUrlPage />} />
      
    </Routes>
    )
}

