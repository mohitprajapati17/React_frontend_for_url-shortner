// Import React and useState hook for component state management
import React, { useState } from "react";
// Import React Router components for navigation and routing
import { Link, useLocation, useNavigate } from "react-router-dom";
// Import hamburger menu icon from react-icons
import { IoIosMenu } from "react-icons/io";
// Import close/cross icon from react-icons
import { RxCross2 } from "react-icons/rx";
// Import custom context hook for global state management (token)
import { useStoreContext } from "../contextApi/ContextApi";
// Import query client from main.jsx for clearing cached data
import { queryClient } from "../main";

// Main Navbar component function
const Navbar = () => {
  // Hook to programmatically navigate to different routes
  const navigate = useNavigate();
  // Destructure token and setToken from global context for authentication state
  const { token, setToken } = useStoreContext();
  // Get current pathname from URL to highlight active navigation link
  const path = useLocation().pathname;
  // State to control mobile menu visibility (open/closed)
  const [navbarOpen, setNavbarOpen] = useState(false);

  // Function to handle user logout process
  const onLogOutHandler = () => {
    // Clear authentication token from global state
    setToken(null);
    // Remove JWT token from browser's localStorage
    localStorage.removeItem("JWT_TOKEN");
    // Clear all cached queries to avoid showing previous user's data
    queryClient.clear();
    // Redirect user to login page after logout
    navigate("/login");
  };

  return (
    // Main navbar container with fixed height, semi-transparent black background, backdrop blur, high z-index, sticky positioning, and yellow border
    <div className="h-16 bg-black/80 backdrop-blur z-50 flex items-center sticky top-0 border-b border-yellow-500/20">
      {/* Inner container with responsive padding and flex layout for space between logo and nav items */}
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
        {/* Logo/Brand link that navigates to home page */}
        <Link to="/">
          {/* Brand name with yellow color and responsive text sizing */}
          <h1 className="font-bold text-3xl text-yellow-400 sm:mt-0 mt-2">
            Shortify
          </h1>
        </Link>
        {/* Navigation menu list with complex responsive classes for mobile/desktop behavior */}
        <ul
          className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-gray-200 sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          }  transition-all duration-100 sm:h-fit sm:bg-none bg-black sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          {/* Home navigation item with hover effects and active state styling */}
          <li className="hover:text-yellow-400 font-[500]  transition-all duration-150">
            <Link
              // Conditional styling: yellow if current path is home, gray otherwise
              className={`${
                path === "/" ? "text-yellow-400 font-semibold" : "text-gray-300"
              }`}
              to="/"
            >
              Home
            </Link>
          </li>
          {/* About navigation item with hover effects and active state styling */}
          <li className="hover:text-yellow-400 font-[500]  transition-all duration-150">
            <Link
              // Conditional styling: yellow if current path is about, gray otherwise
              className={`${
                path === "/about" ? "text-yellow-400 font-semibold" : "text-gray-300"
              }`}
              to="/about"
            >
              About
            </Link>
          </li>
          {/* Dashboard link - only shown when user is authenticated (token exists) */}
          {token && (
            <li className="hover:text-yellow-400 font-[500]  transition-all duration-150">
            <Link
              // Conditional styling: yellow if current path is dashboard, gray otherwise
              className={`${
                path === "/dashboard" ? "text-yellow-400 font-semibold" : "text-gray-300"
              }`}
              to="/dashboard"
            >
              Dashboard
            </Link>
          </li>
          )}
          {/* Sign Up button - only shown when user is NOT authenticated (no token) */}
          {!token && (
            <Link to="/register">
              {/* Styled button with yellow background, black text, and hover effects */}
              <li className=" sm:ml-0 -ml-1 bg-yellow-400 text-black cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md hover:bg-yellow-300 transition-all duration-150">
                SignUp
              </li>
            </Link>
            )}

          {/* Logout button - only shown when user is authenticated (token exists) */}
          {token && (
            <button
             // Call logout handler when clicked
             onClick={onLogOutHandler}
             // Styled button with yellow background, black text, and hover effects
             className="sm:ml-0 -ml-1 bg-yellow-500 text-black cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md hover:bg-yellow-400 transition-all duration-150">
              LogOut
            </button>
            )}
        </ul>
        {/* Mobile menu toggle button - only visible on small screens */}
        <button
          // Toggle mobile menu state when clicked
          onClick={() => setNavbarOpen(!navbarOpen)}
          // Hidden on larger screens, visible on mobile with flex layout
          className="sm:hidden flex items-center sm:mt-0 mt-2"
        >
          {/* Conditional rendering: show close icon if menu is open, hamburger icon if closed */}
          {navbarOpen ? (
            // Close/cross icon when menu is open
            <RxCross2 className="text-yellow-400 text-3xl" />
          ) : (
            // Hamburger menu icon when menu is closed
            <IoIosMenu className="text-yellow-400 text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

// Export the Navbar component as default export
export default Navbar;