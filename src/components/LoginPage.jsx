// Import React and useState hook for component state management
import React, { useState } from 'react'
// Import useForm hook from react-hook-form for form handling and validation
import { useForm } from 'react-hook-form'
// Import custom TextField component for form inputs
import TextField from './TextField';
// Import React Router components for navigation
import { Link, useNavigate } from 'react-router-dom';
// Import configured axios instance for API calls
import api from '../api/api';
// Import toast notification library for user feedback
import toast from 'react-hot-toast';
// Import custom context hook for global state management
import { useStoreContext } from '../contextApi/ContextApi';

// Login page component for user authentication
const LoginPage = () => {
    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // State to manage loading state during login process
    const [loader, setLoader] = useState(false);
    // Destructure setToken function from global context
    const { setToken } = useStoreContext();

    // Configure react-hook-form with default values and validation mode
    const {
        register,        // Function to register form inputs
        handleSubmit,    // Function to handle form submission
        reset,          // Function to reset form to default values
        formState: {errors}  // Object containing form validation errors
    } = useForm({
        // Default values for form fields
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        // Validation mode: validate on touched (when user interacts with field)
        mode: "onTouched",
    });

    // Commented out original login handler for reference
    // const loginHandler = async (data) => {
    //     setLoader(true);
    //     try {
    //         const { data: response } = await api.post(
    //             "/api/auth/public/login",
    //             data
    //         );
    //         console.log(response.token);
    //         setToken(response.token);
    //         localStorage.setItem("JWT_TOKEN", (response.token));
    //         toast.success("Login Successful!");
    //         reset();
    //         navigate("/dashboard");
    //     } catch (error) {
    //         console.log(error);
    //         toast.error("Login Failed!")
    //     } finally {
    //         setLoader(false);
    //     }
    // };

    // Enhanced login handler with better token validation and error handling
    const loginHandler = async (data) => {
        // Set loading state to true to show loading indicator
        setLoader(true);
        try {
            // Make API call to login endpoint with form data
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
    
            // Debug logging to understand response structure
            console.log("Login Response:", response);
            console.log("Response type:", typeof response);
            console.log("Response starts with 'ey':", response.startsWith("ey"));
            console.log("Response length:", response.length);
            console.log("Response contains periods:", (response.match(/\./g) || []).length);
    
            // Validate if response is a valid JWT token (starts with 'ey' and is a string)
            if (typeof response === "string" && response.startsWith("ey")) {
                console.log("Setting token:", response);
                // Update global token state
                setToken(response);
                // Store token in localStorage for persistence
                localStorage.setItem("JWT_TOKEN", response);
                console.log("Token stored in localStorage");
    
                // Show success message and navigate to dashboard
                toast.success("Login Successful!");
                // Reset form to clear input fields
                reset();
                // Navigate to dashboard page
                navigate("/dashboard");
            } else {
                // Response is not a valid token, show error
                console.log("No")
                toast.error("Wrong credentials!");

            }
        } catch (error) {
            // Handle any API errors
            console.error("Login error:", error);
            toast.error("Login Failed!");
        } finally {
            // Always set loading state to false, regardless of success or failure
            setLoader(false);
        }
    };
    
    

  return (
    // Main container with full height minus navbar, centered content, and black background
    <div
        className='min-h-[calc(100vh-64px)] flex justify-center items-center bg-black'>
        {/* Login form with responsive width and custom styling */}
        <form onSubmit={handleSubmit(loginHandler)}
            className="sm:w-[520px] w-[360px] gradient-border card-hover py-8 sm:px-8 px-4 rounded-md">
            {/* Form title */}
            <h1 className="text-center font-roboto text-yellow-400 font-bold lg:text-3xl text-2xl">
                Welcome back
            </h1>

            {/* Decorative horizontal line */}
            <hr className='mt-2 mb-5 border-yellow-500/30'/>

            {/* Form fields container */}
            <div className="flex flex-col gap-3">
                {/* Username input field */}
                <TextField
                    label="UserName"
                    required
                    id="username"
                    type="text"
                    message="*Username is required"
                    placeholder="Type your username"
                    register={register}
                    errors={errors}
                />

                {/* Password input field */}
                <TextField
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="*Password is required"
                    placeholder="Type your password"
                    register={register}
                    min={6}
                    errors={errors}
                />
            </div>

            {/* Submit button with loading state */}
            <button
                disabled={loader}
                type='submit'
                className='font-semibold text-black bg-yellow-500 hover:bg-yellow-400 w-full py-3 transition-colors duration-150 rounded-md my-4'>
                {loader ? "Loading..." : "Sign in"}
            </button>

            {/* Link to registration page */}
            <p className='text-center text-sm text-gray-300 mt-2'>
                Don't have an account? 
                <Link
                    className='font-semibold underline hover:text-yellow-400'
                    to="/register">
                        <span className='text-yellow-400'> Sign up</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default LoginPage