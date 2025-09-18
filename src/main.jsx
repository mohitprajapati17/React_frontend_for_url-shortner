import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";

import { ContextProvider } from "./contextApi/ContextApi"; // adjust the path
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
   <ContextProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />

    </ContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
