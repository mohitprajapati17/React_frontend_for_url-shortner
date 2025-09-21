
// Import global CSS styles for the application
import './App.css'
// Import BrowserRouter from React Router for client-side routing
import { BrowserRouter as Router } from 'react-router-dom'

// Import helper function to determine which app component to render
import { getApps } from './utils/helper'

// Main App component that serves as the root of the application
function App() {
 // Get the appropriate app component based on current domain/subdomain
 const CurrentApp=getApps()
  return (
    // Wrap the entire app with Router to enable client-side routing
    <Router>
      {/* Render the determined app component (main app or subdomain app) */}
      <CurrentApp/>
    </Router>
  )
}

// Export App component as default export
export default App
