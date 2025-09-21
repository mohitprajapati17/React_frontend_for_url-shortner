
// Import React hooks for creating and using context
import { createContext, useContext, useState } from "react";

// Create a new React context for global state management
const ContextApi = createContext();

// Context provider component that wraps the entire app to provide global state
export const ContextProvider = ({ children }) => {
    // Read JWT token from localStorage, default to null if not found
    const storedToken = localStorage.getItem("JWT_TOKEN") || null;

    // State to manage the authentication token globally
    const [token, setToken] = useState(storedToken);

    // Object containing all the data and functions to be shared via context
    const sendData = {
        token,        // Current authentication token
        setToken,     // Function to update the authentication token
    };

    // Return the context provider with the shared data
    return (
        <ContextApi.Provider value={sendData}>
            {/* Render all child components wrapped by this provider */}
            {children}
        </ContextApi.Provider>
    );
};

// Custom hook to easily access the context data in any component
export const useStoreContext = () => {
    // Return the context value (token and setToken)
    return useContext(ContextApi);
};
