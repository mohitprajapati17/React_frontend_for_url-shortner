// Import Navigate component from React Router for programmatic navigation
import { Navigate } from "react-router-dom";
// Import custom context hook for accessing authentication state
import { useStoreContext } from "./contextApi/ContextApi";

// Private route wrapper component that controls access to protected and public pages
export default function PrivateRoute({ children, publicPage}) {
    // Get authentication token from global context
    const { token } = useStoreContext();

    // If this is a public page (login/register), redirect authenticated users to dashboard
    if (publicPage) {
        return token ? <Navigate to="/dashboard" /> : children;
    }

    // If this is a protected page, redirect unauthenticated users to registration
    return !token ? <Navigate to="/register" /> : children;
}