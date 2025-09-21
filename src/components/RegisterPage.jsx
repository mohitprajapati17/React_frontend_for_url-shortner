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

// Registration page component for new user signup
const RegisterPage = () => {
    // Hook to programmatically navigate to different routes
    const navigate = useNavigate();
    // State to manage loading state during registration process
    const [loader, setLoader] = useState(false);

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

    // Function to handle user registration
    const registerHandler = async (data) => {
        // Set loading state to true to show loading indicator
        setLoader(true);
        try {
            // Make API call to registration endpoint with form data
            const { data: response } = await api.post(
                "/api/auth/public/register",
                data
            );
            // Reset form to clear input fields
            reset();
            // Navigate to login page after successful registration
            navigate("/login");
            // Show success message
            toast.success("Registeration Successful!")
        } catch (error) {
            // Handle any API errors
            console.log(error);
            toast.error("Registeration Failed!")
        } finally {
            // Always set loading state to false, regardless of success or failure
            setLoader(false);
        }
    };

  return (
    // Main container with full height minus navbar, centered content, and black background
    <div
        className='min-h-[calc(100vh-64px)] flex justify-center items-center bg-black'>
        {/* Registration form with responsive width and custom styling */}
        <form onSubmit={handleSubmit(registerHandler)}
            className="sm:w-[520px] w-[360px] gradient-border card-hover py-8 sm:px-8 px-4 rounded-md">
            {/* Form title */}
            <h1 className="text-center font-roboto text-yellow-400 font-bold lg:text-3xl text-2xl">
                Create your account
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

                {/* Email input field */}
                <TextField
                    label="Email"
                    required
                    id="email"
                    type="email"
                    message="*Email is required"
                    placeholder="Type your email"
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
                {loader ? "Loading..." : "Create account"}
            </button>

            {/* Link to login page */}
            <p className='text-center text-sm text-gray-300 mt-2'>
                Already have an account? 
                <Link
                    className='font-semibold underline hover:text-yellow-400'
                    to="/login">
                        <span className='text-yellow-400'> Login</span>
                </Link>
            </p>
        </form>
    </div>
  )
}

export default RegisterPage