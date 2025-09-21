// Import React's StrictMode for additional checks and warnings in development
import { StrictMode } from 'react'
// Import createRoot from React DOM for rendering the app
import { createRoot } from 'react-dom/client'
// Import global CSS styles
import './index.css'
// Import the main App component
import App from './App.jsx'
// Import Toaster component for displaying toast notifications
import { Toaster } from "react-hot-toast";

// Import custom context provider for global state management
import { ContextProvider } from "./contextApi/ContextApi";
// Import React Query components for server state management
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a new QueryClient instance for managing server state and caching
export const queryClient = new QueryClient();

// Create root element and render the application
createRoot(document.getElementById('root')).render(
  // StrictMode wrapper for additional development checks
  <StrictMode>
    {/* QueryClientProvider wraps the app to provide React Query functionality */}
    <QueryClientProvider client={queryClient}>
   {/* ContextProvider wraps the app to provide global state management */}
   <ContextProvider>
      {/* Main App component */}
      <App />
      {/* Toast notification component positioned at top-right */}
      <Toaster position="top-right" reverseOrder={false} />

    </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
